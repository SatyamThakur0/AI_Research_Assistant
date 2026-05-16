import {
    Sparkles,
    Plus,
    Clock,
    Bookmark,
    Settings,
    ChevronDown,
    Zap,
    X,
} from "lucide-react";

export default function Sidebar({
    activeTab,
    sessions,
    currentSessionId,
    onTabChange,
    onNewResearch,
    onSelectSession,
    isOpen,
    onClose,
}) {
    const navItems = [
        { id: "new", label: "New Research", icon: Plus },
        { id: "history", label: "History", icon: Clock },
        { id: "saved", label: "Saved", icon: Bookmark },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}
            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col bg-gray-50 dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 transition-all duration-200 ${
                    isOpen
                        ? "w-56 translate-x-0"
                        : "w-56 md:w-0 md:overflow-hidden -translate-x-full"
                }`}
            >
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:hidden p-1 hover:bg-gray-200 dark:hover:bg-zinc-900 rounded-lg"
                >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2.5 px-4 py-5">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">
                        AI Research Assistant
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-2 space-y-0.5">
                    {navItems.map(({ id, label, icon: Icon }) => {
                        const isActive =
                            activeTab === id &&
                            !(id === "new" && currentSessionId);
                        const isNewActive = id === "new" && activeTab === "new";
                        const active = id === "new" ? isNewActive : isActive;
                        return (
                            <button
                                key={id}
                                onClick={() => {
                                    if (id === "new") onNewResearch();
                                    else onTabChange(id);
                                    onClose?.();
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                    active
                                        ? "bg-blue-50 dark:bg-zinc-900 text-blue-700 dark:text-zinc-100"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {label}
                            </button>
                        );
                    })}
                </nav>

                {/* Recent sessions in sidebar when history tab isn't active */}
                {sessions.length > 0 && (
                    <div className="px-3 pb-2">
                        <p className="text-xs font-medium text-gray-400 dark:text-gray-600 px-3 mb-1 uppercase tracking-wide">
                            Recent
                        </p>
                        <div className="space-y-0.5">
                            {sessions.slice(0, 5).map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => {
                                        onSelectSession(s.id);
                                        onClose?.();
                                    }}
                                    className={`w-full text-left px-3 py-1.5 rounded-md text-xs truncate transition-colors ${
                                        currentSessionId === s.id
                                            ? "bg-blue-50 dark:bg-zinc-900 text-blue-700 dark:text-zinc-100"
                                            : "text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-300"
                                    }`}
                                >
                                    {s.query}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upgrade */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-blue-600 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-zinc-900 transition-colors font-medium">
                        <Zap className="w-4 h-4" />
                        Upgrade to Pro
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg mt-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-zinc-700 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                            A
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium flex-1 text-left">
                            Aman Verma
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                </div>
            </aside>
        </>
    );
}
