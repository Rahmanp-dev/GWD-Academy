import { motion } from "framer-motion";
import { ArrowRight, Wallet, Users, LineChart, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Card from "../components/Card";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Background Glow */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />

                <div className="text-center max-w-4xl mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                            Enterprise EdTech Platform
                        </span>
                        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Master the Future with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                GWD Academy
                            </span>
                        </h1>
                        <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
                            The premier destination for high-income skills. Learn from industry experts,
                            join a thriving Joint Venture ecosystem, and track your success in real-time.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button className="h-12 px-8 text-lg" onClick={() => navigate('/register')}>
                            Start Learning Now <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button variant="secondary" className="h-12 px-8 text-lg" onClick={() => navigate('/courses')}>
                            View Curriculum
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="hover:border-blue-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                                <LineChart className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
                            <p className="text-slate-400">
                                Track your progress, earnings, and referrals with our enterprise-grade dashboard system.
                            </p>
                        </Card>

                        <Card className="hover:border-emerald-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                                <Wallet className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">JV Revenue Split</h3>
                            <p className="text-slate-400">
                                Transparent financial engine that automatically calculates splits between partners, instructors, and GWD.
                            </p>
                        </Card>

                        <Card className="hover:border-purple-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                                <Users className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Ambassador Network</h3>
                            <p className="text-slate-400">
                                Join our elite network of college presidents and influencers to earn commissions on every enrollment.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-12">Trusted by Future Leaders</h2>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholders for logos */}
                    <div className="text-2xl font-bold flex items-center gap-2"><ShieldCheck className="w-8 h-8" /> GWD Global</div>
                    <div className="text-2xl font-bold flex items-center gap-2"><Users className="w-8 h-8" /> Partner Network</div>
                    <div className="text-2xl font-bold flex items-center gap-2"><Wallet className="w-8 h-8" /> SecurePay</div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
