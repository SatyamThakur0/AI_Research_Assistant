import { Bookmark, ChevronRight, BookmarkX } from "lucide-react";

export default function SavedView({ sessions, onSelectSession, onToggleSave }) {
    const saved = sessions.filter((s) => s.saved && s.status === "done");

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Saved Research
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Bookmarked sessions for quick access
            </p>

            {saved.length === 0 ? (
                <div className="text-center py-16">
                    <Bookmark className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No saved research yet.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                        Save a research result to find it here quickly.
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {saved.map((s) => (
                        <div
                            key={s.id}
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 group"
                        >
                            <button
                                onClick={() => onSelectSession(s.id)}
                                className="flex items-center gap-4 flex-1 min-w-0 text-left"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                                    <Bookmark className="w-4 h-4 text-blue-600 dark:text-zinc-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                        {s.query}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
                                        {s.content?.title ?? s.query}
                                    </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0" />
                            </button>
                            <button
                                onClick={() => onToggleSave(s.id)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                                title="Remove from saved"
                            >
                                <BookmarkX className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
