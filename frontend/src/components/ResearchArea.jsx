import { Sun, Moon, Loader2, Menu } from "lucide-react";
import SearchBox from "./SearchBox";
import ProgressBar from "./ProgressBar";
import ResearchResult from "./ResearchResult";
import HistoryView from "./HistoryView";
import SavedView from "./SavedView";
import SettingsView from "./SettingsView";
import { useEffect, useRef } from "react";

export default function ResearchArea({
    theme,
    onToggleTheme,
    activeTab,
    session,
    status,
    isStreaming,
    sessions,
    onStartResearch,
    onStopResearch,
    onSelectSession,
    onToggleSave,
    onToggleSidebar,
}) {
    let containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [session]);
    return (
        <>
            <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 transition-colors duration-200">
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                        title="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="flex-1" />
                    <button
                        onClick={onToggleTheme}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
                        title="Toggle theme"
                    >
                        {theme === "light" ? (
                            <Moon className="w-4.5 h-4.5" />
                        ) : (
                            <Sun className="w-4.5 h-4.5" />
                        )}
                    </button>
                </div>

                {/* Content */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950"
                >
                    {activeTab === "history" && (
                        <HistoryView
                            sessions={sessions}
                            onSelectSession={onSelectSession}
                        />
                    )}
                    {activeTab === "saved" && (
                        <SavedView
                            sessions={sessions}
                            onSelectSession={onSelectSession}
                            onToggleSave={onToggleSave}
                        />
                    )}
                    {activeTab === "settings" && (
                        <SettingsView
                            theme={theme}
                            onToggleTheme={onToggleTheme}
                        />
                    )}
                    {activeTab === "new" && (
                        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                            {!session && (
                                <>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-3 sm:mb-4">
                                        What would you like to research today?
                                    </h1>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-12">
                                        Get in-depth, well-structured research
                                        on any topic in seconds.
                                    </p>
                                </>
                            )}

                            {session && (
                                <div className="mt-6 sm:mt-8">
                                    <ResearchResult
                                        content={session}
                                        // saved={session.saved ?? false}
                                        // onToggleSave={() => onToggleSave(session.id)}
                                    />
                                </div>
                            )}

                            {/* {status && (
                                <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-4 py-8">
                                    <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center max-w-sm">
                                        {status}
                                    </p>
                                </div>
                            )} */}
                        </div>
                    )}
                </div>
                <SearchBox
                    onSubmit={onStartResearch}
                    status={status}
                    isStreaming={isStreaming}
                    onStop={onStopResearch}
                    // disabled={session?.status === "researching"}
                />
            </main>
        </>
    );
}
