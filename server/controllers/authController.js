const User = require('../models/User');
const jwt = require('jsonwebtoken');

const PUBLIC_REGISTRATION_ROLES = ['student', 'ambassador'];
const PRIVILEGED_ROLES = ['instructor', 'partner', 'superadmin'];

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role, affiliateCode } = req.body;

    try {
        if (role && !PUBLIC_REGISTRATION_ROLES.includes(role)) {
            return res.status(403).json({
                message: 'Requested role is not allowed through public registration'
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const safeRole = role && PUBLIC_REGISTRATION_ROLES.includes(role) ? role : 'student';

        const user = await User.create({
            name,
            email,
            passwordHash: password, // Pre-save hook will hash this
            role: safeRole,
            affiliateCode: safeRole === 'ambassador' ? affiliateCode : undefined
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a privileged user account
// @route   POST /api/v1/auth/admin/register
// @access  Private/Superadmin
const registerPrivilegedUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!PRIVILEGED_ROLES.includes(role)) {
            return res.status(400).json({
                message: 'Invalid privileged role requested'
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            passwordHash: password,
            role
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/v1/auth/me
// @access  Private
const getUserProfile = async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        affiliateCode: req.user.affiliateCode
    };
    res.status(200).json(user);
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    registerPrivilegedUser
};
