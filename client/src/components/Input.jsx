import { cn } from "../lib/utils";

const Input = ({ label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-sm text-slate-400 font-medium">{label}</label>}
            <input
                className={cn(
                    "bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all",
                    className
                )}
                {...props}
            />
        </div>
    );
};

export default Input;
