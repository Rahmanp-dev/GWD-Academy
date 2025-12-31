import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const Button = ({ children, variant = "primary", className, ...props }) => {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-500/10",
        ghost: "hover:bg-slate-800 text-slate-300 hover:text-white",
        danger: "bg-red-600 hover:bg-red-500 text-white"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
