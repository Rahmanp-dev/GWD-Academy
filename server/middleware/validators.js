const { z } = require('zod');

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['student', 'ambassador']).optional(),
    affiliateCode: z.string().optional()
});

const privilegedRegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['instructor', 'partner', 'superadmin'])
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const courseSchema = z.object({
    title: z.string().min(5, "Title is too short"),
    price: z.number().nonnegative(),
    category: z.enum(['Tech', 'Creative', 'Business'])
});

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Validation Error',
            errors: error.errors.map(e => e.message)
        });
    }
};

module.exports = {
    validate,
    registerSchema,
    privilegedRegisterSchema,
    loginSchema,
    courseSchema
};
