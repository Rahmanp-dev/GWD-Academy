import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const Card = ({ children, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
