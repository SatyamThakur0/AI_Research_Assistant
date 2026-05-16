import { Sparkles } from "lucide-react";

const STEPS = [
    "Understanding topic",
    "Searching sources",
    "Analyzing content",
    "Structuring research",
    "Finalizing",
];

const STEP_DESCRIPTIONS = [
    "Analyzing your research topic...",
    "Gathering information from reliable sources and organizing insights.",
    "Deep-diving into gathered sources...",
    "Organizing and structuring findings...",
    "Putting together the final report...",
];

export default function ProgressBar({ step }) {
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 transition-colors">
            <div className="flex items-start gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-zinc-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-zinc-300 animate-pulse" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Creating your research...
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {
                            STEP_DESCRIPTIONS[
                                Math.min(step, STEP_DESCRIPTIONS.length - 1)
                            ]
                        }
                    </p>
                </div>
            </div>

            {/* Step dots */}
            <div className="relative flex items-center justify-between mt-2">
                {/* Track line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-zinc-800" />
                {/* Progress line */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 dark:bg-zinc-500 transition-all duration-700"
                    style={{
                        width:
                            step === 0
                                ? "0%"
                                : `${(step / (STEPS.length - 1)) * 100}%`,
                    }}
                />
                {STEPS.map((label, i) => (
                    <div
                        key={label}
                        className="relative flex flex-col items-center gap-2 z-10"
                    >
                        <div
                            className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                                i < step
                                    ? "bg-blue-600 border-blue-600 dark:bg-zinc-500 dark:border-zinc-500"
                                    : i === step
                                    ? "bg-white dark:bg-zinc-950 border-blue-600 dark:border-zinc-500 shadow-[0_0_0_3px_rgba(63,63,70,0.25)]"
                                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                            }`}
                        />
                        <span
                            className={`text-xs whitespace-nowrap mt-1 transition-colors ${
                                i <= step
                                    ? "text-blue-600 dark:text-zinc-200 font-medium"
                                    : "text-gray-400 dark:text-gray-600"
                            }`}
                        >
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
