import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student', // Default
        affiliateCode: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[120px]" />
            </div>

            <Card className="w-full max-w-md relative z-10 border-slate-800 bg-slate-900/80 backdrop-blur-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                        Join the Elite
                    </h1>
                    <p className="text-slate-400 mt-2">Create your GWD Academy account</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@example.com"
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                    />

                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm text-slate-400 font-medium">I am a...</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="ambassador">Ambassador (Club President)</option>
                            <option value="partner">Partner (Ops)</option>
                        </select>
                    </div>

                    {formData.role === 'ambassador' && (
                        <Input
                            label="Preferred Affiliate Code"
                            name="affiliateCode"
                            value={formData.affiliateCode}
                            onChange={handleChange}
                            placeholder="e.g. HARVARD2024"
                            required
                        />
                    )}

                    <Button type="submit" className="w-full py-3 mt-4">
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign In
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
