import { Sun, Moon, Globe, Bell, Shield, Trash2 } from "lucide-react";

export default function SettingsView({ theme, onToggleTheme }) {
    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Manage your preferences
            </p>

            <div className="space-y-6">
                {/* Appearance */}
                <section>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-600 mb-3">
                        Appearance
                    </h2>
                    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3.5">
                            <div className="flex items-center gap-3">
                                {theme === "light" ? (
                                    <Sun className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                ) : (
                                    <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        Theme
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-600">
                                        {theme === "light"
                                            ? "Light mode"
                                            : "Dark mode"}{" "}
                                        active
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onToggleTheme}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                                    theme === "dark"
                                        ? "bg-zinc-700"
                                        : "bg-gray-200 dark:bg-gray-700"
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                                        theme === "dark"
                                            ? "translate-x-5"
                                            : "translate-x-0"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Search */}
                <section>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-600 mb-3">
                        Search
                    </h2>
                    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3.5">
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        Default Search Mode
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-600">
                                        Web Search
                                    </p>
                                </div>
                            </div>
                            <select className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 outline-none">
                                <option>Web Search</option>
                                <option>Academic</option>
                                <option>News</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-600 mb-3">
                        Notifications
                    </h2>
                    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3.5">
                            <div className="flex items-center gap-3">
                                <Bell className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        Research Complete Alerts
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-600">
                                        Notify when research finishes
                                    </p>
                                </div>
                            </div>
                            <button className="relative w-11 h-6 rounded-full bg-zinc-700 transition-colors">
                                <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Privacy */}
                <section>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-600 mb-3">
                        Privacy & Data
                    </h2>
                    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-3.5">
                            <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    Save Research History
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-600">
                                    Store past sessions locally
                                </p>
                            </div>
                            <button className="relative w-11 h-6 rounded-full bg-zinc-700 transition-colors">
                                <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-5 transition-transform" />
                            </button>
                        </div>
                        <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group">
                            <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-500" />
                            <div>
                                <p className="text-sm font-medium text-red-500">
                                    Clear All History
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-600">
                                    Permanently delete all sessions
                                </p>
                            </div>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
