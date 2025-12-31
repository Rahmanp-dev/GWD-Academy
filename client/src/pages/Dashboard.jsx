import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, TrendingUp, BookOpen } from 'lucide-react';
import Card from '../components/Card';

const StatCard = ({ title, value, icon: Icon, color, prefix = "" }) => (
    <Card className="p-6 flex items-center justify-between">
        <div>
            <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white">{prefix}{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </Card>
);

const Dashboard = () => {
    const { user } = useAuth();

    // Mock Data for demonstration
    const data = [
        { name: 'Mon', sales: 4000, profit: 2400 },
        { name: 'Tue', sales: 3000, profit: 1398 },
        { name: 'Wed', sales: 2000, profit: 9800 },
        { name: 'Thu', sales: 2780, profit: 3908 },
        { name: 'Fri', sales: 1890, profit: 4800 },
        { name: 'Sat', sales: 2390, profit: 3800 },
        { name: 'Sun', sales: 3490, profit: 4300 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400">Welcome back, {user?.name} ({user?.role?.toUpperCase()})</p>
            </div>

            {/* Role Based Views */}

            {/* SUPER ADMIN View */}
            {user?.role === 'superadmin' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Revenue" value="124,500" prefix="$" icon={DollarSign} color="bg-blue-600" />
                        <StatCard title="Net Profit" value="84,200" prefix="$" icon={TrendingUp} color="bg-emerald-600" />
                        <StatCard title="Active Students" value="1,234" icon={Users} color="bg-purple-600" />
                        <StatCard title="Total Courses" value="12" icon={BookOpen} color="bg-amber-600" />
                    </div>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold mb-4">Financial Overview</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis dataKey="name" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            )}

            {/* AMBASSADOR View */}
            {user?.role === 'ambassador' && (
                <div className="space-y-8">
                    <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/20">
                        <h3 className="text-lg font-bold mb-2">Your Referral Code</h3>
                        <div className="flex items-center gap-4">
                            <code className="text-2xl font-mono bg-slate-900 px-4 py-2 rounded border border-slate-700 text-blue-400">
                                {user?.affiliateCode || 'N/A'}
                            </code>
                            <span className="text-sm text-slate-400">Share this code with students to earn commissions.</span>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard title="Total Earnings" value="1,250" prefix="$" icon={DollarSign} color="bg-emerald-600" />
                        <StatCard title="Link Clicks" value="452" icon={TrendingUp} color="bg-blue-600" />
                        <StatCard title="Conversions" value="12" icon={Users} color="bg-purple-600" />
                    </div>
                </div>
            )}

            {/* STUDENT View */}
            {(user?.role === 'student' || !['superadmin', 'ambassador'].includes(user?.role)) && (
                <div className="grid grid-cols-1 gap-6">
                    <Card className="text-center py-20">
                        <h3 className="text-xl font-bold mb-4">My Learning</h3>
                        <p className="text-slate-400 mb-8">You haven't enrolled in any courses yet.</p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500">
                            Browse Courses
                        </button>
                    </Card>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
