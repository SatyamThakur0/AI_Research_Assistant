import { Clock, ChevronRight } from "lucide-react";

export default function HistoryView({ sessions, onSelectSession }) {
    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Research History
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Your past research sessions
            </p>

            {sessions.length === 0 ? (
                <div className="text-center py-16">
                    <Clock className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No research history yet.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                        Start a new research session to see it here.
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {sessions.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => onSelectSession(s.id)}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950 hover:bg-gray-50 dark:hover:bg-zinc-900/70 text-left transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                                <Clock className="w-4 h-4 text-blue-600 dark:text-zinc-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                    {s.query}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
                                    {s.status === "done"
                                        ? "Completed"
                                        : s.status === "researching"
                                        ? "In progress..."
                                        : "Pending"}
                                </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
