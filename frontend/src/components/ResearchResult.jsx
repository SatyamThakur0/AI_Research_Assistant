import { useState, memo } from "react";
import {
    Sparkles,
    FileText,
    ThumbsUp,
    ThumbsDown,
    RotateCcw,
    Copy,
    Bookmark,
    BookmarkCheck,
} from "lucide-react";

import { Streamdown } from "streamdown";
import remarkGfm from "remark-gfm";

const MemoizedMarkdown = memo(({ content }) => {
    return (
        <Streamdown
            parseIncompleteMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                        <table className="w-fit border-collapse bor der border-gray-700 text-sm">
                            {children}
                        </table>
                    </div>
                ),

                thead: ({ children }) => <thead className="">{children}</thead>,

                th: ({ children }) => (
                    <th className="border border-gray-500 px-4 py-3 text-left font-bold">
                        {children}
                    </th>
                ),

                td: ({ children }) => (
                    <td className="border border-gray-500 px-4 py-3">
                        {children}
                    </td>
                ),
                h1: ({ children }) => (
                    <h1 className="text-4xl font-bold tex t-white border-b border-gray-700 pb-4 mb-8">
                        {children}
                    </h1>
                ),

                h2: ({ children }) => (
                    <h2 className="text-3xl font-bold te xt-blue-300 mt-12 mb-6">
                        {children}
                    </h2>
                ),

                h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold text-cy an-300 mt-8 mb-4">
                        {children}
                    </h3>
                ),

                p: ({ children }) => (
                    <p className="text-g ray-300 leading-8 mb-5">{children}</p>
                ),

                tr: ({ children }) => <tr className="">{children}</tr>,
            }}
        >
            {content}
        </Streamdown>
    );
});

export default function ResearchResult({ content }) {
    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState(null);

    // function handleCopy() {
    //   const text = content.sections
    //     .map(
    //       (s) =>
    //         `${s.heading}\n${s.body}${
    //           s.bullets ? "\n" + s.bullets.map((b) => `• ${b}`).join("\n") : ""
    //         }`,
    //     )
    //     .join("\n\n");
    //   navigator.clipboard.writeText(`${content.title}\n\n${text}`);
    //   setCopied(true);
    //   setTimeout(() => setCopied(false), 2000);

    return (
        <div
            className="
                rounded-2xl bord er border-gray-200 dark:border-zinc-800
                bg-white dark:bg-zinc-950
                p-4 sm:p-6 md:p-8
                prose
                prose-invert
                max-w-none
                prose-headings:text-zinc-100
                prose-p:text-zinc-300
                prose-strong:text-zinc-100
                prose-code:text-zinc-200
                prose-pre:bg-black
                prose-pre:border
                prose-pre:border-zinc-800
                dark:text-zinc-100
              "
        >
            <MemoizedMarkdown content={content} />
        </div>
    );
}
