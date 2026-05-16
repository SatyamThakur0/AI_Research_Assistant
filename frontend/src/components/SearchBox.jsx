import { useState, useRef, useEffect } from "react";
import { ArrowUp, Loader, Pause } from "lucide-react";

export default function SearchBox({
    onSubmit,
    disabled,
    status,
    onStop,
    isStreaming,
}) {
    const [query, setQuery] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [query]);

    function handleSubmit() {
        const trimmed = query.trim();
        if (!trimmed || disabled) return;
        onSubmit(trimmed);
        setQuery("");
    }

    function handleKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <div className="w-full border-t border-gray-100 dark:border-zinc-800 bg- white dark:bg-zinc-950 px-4 sm:px-6 py-4 sm:py-5 transition-colors">
            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-zinc-700 transition-all overflow-hidden">
                    <textarea
                        ref={textareaRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Enter topic of research..."
                        rows={1}
                        disabled={disabled}
                        className="w-full px-4 sm:px-5 pt-3 sm:pt-4 pb-2 text-sm sm:text-base text-gray-800 dark:text-gray-100 bg-transparent resize-none outline-none placeholder-gray-400 dark:placeholder-gray-500 min-h-12 sm:min-h-13 max-h-48 disabled:opacity-50"
                    />
                    <div className="flex items-center justify-between px-3 sm:px-4 pb-3 sm:pb-3 pt-1 gap-2">
                        {status && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 px-2 py-1.5 rounded-md flex-1">
                                <Loader className="w-4 h-4 rounded-full animate-spin" />
                                <span className="truncate">{status}</span>
                            </div>
                        )}
                        {!status && <div className="flex-1" />}
                        {isStreaming ? (
                            <button
                                onClick={onStop}
                                title="Stop research"
                                className="w-8 h-8 cursor-pointer sm:w-9 sm:h-9 rounded-full bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 active:bg-red-800 dark:active:bg-red-800 flex items-center justify-center transition-all shrink-0 shadow-sm hover:shadow-md"
                            >
                                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!query.trim() || disabled}
                                title="Send research query (Enter)"
                                className="w-8 h-8 cursor-pointer sm:w-9 sm:h-9 rounded-full bg-blue-600 dark:bg-zinc-700 hover:bg-blue-700 dark:hover:bg-zinc-600 active:bg-blue-800 dark:active:bg-zinc-500 disabled:bg-gray-200 dark:disabled:bg-zinc-800 flex items-center justify-center transition-all shrink-0 shadow-sm hover:shadow-md disabled:shadow-none"
                            >
                                <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-zinc-100 disabled:text-gray-400" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
