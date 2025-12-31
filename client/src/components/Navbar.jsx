import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform rotate-3">
                            <span className="text-white font-bold text-lg">G</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            GWD Academy
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/courses" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            Explore Courses
                        </Link>
                        <Link to="/about" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            About JV
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-400">Hi, {user.name}</span>
                                <Button variant="secondary" onClick={handleLogout} className="py-1.5 px-3 text-sm">
                                    Logout
                                </Button>
                                <Button onClick={() => navigate('/dashboard')} className="py-1.5 px-3 text-sm">
                                    Dashboard
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-slate-300 hover:text-white font-medium text-sm">
                                    Sign In
                                </Link>
                                <Button onClick={() => navigate('/register')} className="py-1.5 px-4 text-sm">
                                    Get Started <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-4">
                            <Link to="/courses" className="block text-slate-300 hover:text-white font-medium">
                                Explore Courses
                            </Link>
                            <Link to="/about" className="block text-slate-300 hover:text-white font-medium">
                                About JV
                            </Link>
                            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <Button onClick={() => navigate('/dashboard')} className="w-full justify-center">
                                            Dashboard
                                        </Button>
                                        <Button variant="secondary" onClick={handleLogout} className="w-full justify-center">
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="secondary" onClick={() => navigate('/login')} className="w-full justify-center">
                                            Sign In
                                        </Button>
                                        <Button onClick={() => navigate('/register')} className="w-full justify-center">
                                            Get Started
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
