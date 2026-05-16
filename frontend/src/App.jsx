import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ResearchArea from "./components/ResearchArea";

function App() {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") ?? "light",
    );
    const [activeTab, setActiveTab] = useState("new");
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        // Open sidebar by default on desktop, closed on mobile/tablet
        return typeof window !== "undefined" && window.innerWidth >= 768;
    });
    const accumulatedText = useRef("");
    const [streamedData, setStreamedData] = useState("");
    const [sessions, setSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [status, setStatus] = useState("");
    const stepTimerRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Handle sidebar auto-collapse on resize
    useEffect(() => {
        const handleResize = () => {
            // Auto-collapse on mobile/tablet, auto-open on desktop
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const currentSession =
        sessions.find((s) => s.id === currentSessionId) ?? null;

    async function startResearch(query) {
        accumulatedText.current = "";
        setStreamedData("");

        const id = crypto.randomUUID();

        const newSession = {
            id,
            query,
            content: null,
            status: "researching",
        };

        setSessions((prev) => [newSession, ...prev]);

        setCurrentSessionId(id);
        setActiveTab("new");

        setStatus("Initializing...");
        setIsStreaming(true);

        abortControllerRef.current = new AbortController();

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/get-research?topic=${query}`,
            // "http://localhost:8000/test-stream",
            { signal: abortControllerRef.current.signal },
        );

        const reader = response.body.getReader();

        const decoder = new TextDecoder();

        let buffer = "";
        let animationFrame = null;

        const flushBuffer = () => {
            if (buffer.length > 0) {
                accumulatedText.current += buffer;

                setStreamedData(accumulatedText.current);

                buffer = "";
            }

            animationFrame = null;
        };

        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    setStatus("");
                    break;
                }
                let decoded = decoder.decode(value, { stream: true });
                let lines = decoded.split("\n");
                for (let line of lines) {
                    if (line == "") continue;
                    let content = JSON.parse(line);
                    if (content.type === "status") {
                        setStatus(content.data);
                    } else if (content.type === "content") {
                        buffer += content.data;
                    }
                }

                if (!animationFrame) {
                    animationFrame = requestAnimationFrame(flushBuffer);
                }
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error(err);
            }
            setStatus("");
        }

        // Flush remaining buffer
        if (buffer.length > 0) {
            accumulatedText.current += buffer;
            setStreamedData(accumulatedText.current);
        }

        // mark streaming stopped
        setIsStreaming(false);
    }

    function stopResearch() {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setStatus("");
        setIsStreaming(false);
    }

    function newResearch() {
        if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
        stopResearch();
        setCurrentSessionId(null);
        setActiveTab("new");
    }

    function toggleSave(id) {
        setSessions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, saved: !s.saved } : s)),
        );
    }

    return (
        <div
            className={theme === "dark" ? "dark" : ""}
            style={{ height: "100vh" }}
        >
            <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-200">
                {/* <Sidebar
                    theme={theme}
                    activeTab={activeTab}
                    sessions={sessions}
                    currentSessionId={currentSessionId}
                    onTabChange={setActiveTab}
                    onNewResearch={newResearch}
                    onSelectSession={(id) => {
                        setCurrentSessionId(id);
                        setActiveTab("new");
                    }}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                /> */}
                <ResearchArea
                    theme={theme}
                    onToggleTheme={() => {
                        setTheme((t) => (t === "light" ? "dark" : "light"));
                    }}
                    activeTab={activeTab}
                    session={streamedData}
                    status={status}
                    isStreaming={isStreaming}
                    sessions={sessions}
                    onStartResearch={startResearch}
                    onStopResearch={stopResearch}
                    onSelectSession={(id) => {
                        setCurrentSessionId(id);
                        setActiveTab("new");
                    }}
                    onToggleSave={toggleSave}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
            </div>
        </div>
    );
}

export default App;
