"use client";

import { useEffect, useRef } from "react";
import { Eye, Code, Copy, Check } from "lucide-react";

interface PreviewPanelProps {
    generatedCode: string;
    showCode: boolean;
    setShowCode: (value: boolean) => void;
    handleCopy: () => void;
    copied: boolean;
}

export default function PreviewPanel({
    generatedCode,
    showCode,
    setShowCode,
    handleCopy,
    copied,
}: PreviewPanelProps) {
    return (
        <div className="flex-1 flex flex-col bg-gray-100 text-black h-screen">
            {/* Toolbar */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                    {showCode ? <Code size={16} /> : <Eye size={16} />}
                    {showCode ? "Source Code" : "Live Preview"}
                </h2>

                <div className="flex items-center gap-4">
                    <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                        <button
                            onClick={() => setShowCode(false)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${!showCode
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            <Eye size={14} /> UI
                        </button>
                        <button
                            onClick={() => setShowCode(true)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${showCode
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            <Code size={14} /> Code
                        </button>
                    </div>
                    <div className="h-4 w-px bg-gray-300 mx-1" />
                    <button
                        onClick={handleCopy}
                        disabled={!generatedCode}
                        className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 ${copied
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            }`}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-8">
                {generatedCode ? (
                    <div className="max-w-5xl mx-auto h-full flex flex-col">
                        {showCode ? (
                            <div className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm shadow-xl overflow-auto border border-gray-700 h-full">
                                <pre>{generatedCode}</pre>
                            </div>
                        ) : (
                            <div className="animate-in fade-in zoom-in duration-300 w-full h-full bg-white rounded-lg shadow-sm overflow-hidden text-black">
                                <ShadowDOM content={generatedCode} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 select-none">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-3xl animate-pulse">
                            ✨
                        </div>
                        <p className="text-lg font-medium text-gray-500">Ready to create.</p>
                        <p className="text-sm text-gray-400">Enter a prompt to generate UI.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ShadowDOM({ content }: { content: string }) {
    const rootRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<ShadowRoot | null>(null);

    useEffect(() => {
        if (!rootRef.current) return;

        // Ensure only one shadow root exists
        if (!shadowRef.current) {
            shadowRef.current = rootRef.current.attachShadow({ mode: "open" });
        }

        // Reset and inject new content
        if (shadowRef.current) {
            shadowRef.current.innerHTML = content;
        }
    }, [content]);

    return <div ref={rootRef} className="w-full h-full" />;
}