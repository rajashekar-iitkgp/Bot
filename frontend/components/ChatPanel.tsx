"use client";

import { Mic, MicOff, Send, MessageSquare } from "lucide-react";

interface ChatPanelProps {
    prompt: string;
    setPrompt: (value: string) => void;
    handleGenerate: () => void;
    loading: boolean;
    isListening: boolean;
    toggleVoice: () => void;
    history: any[];
}

export default function ChatPanel({
    prompt,
    setPrompt,
    handleGenerate,
    loading,
    isListening,
    toggleVoice,
    history,
}: ChatPanelProps) {
    return (
        <div className="w-1/3 flex flex-col border-r border-gray-700 bg-gray-900 text-white">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Code Generator
                </h1>
                <p className="text-xs text-gray-500 mt-1">AI-Powered UI Assistant</p>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-6 overflow-y-auto space-y-3">
                {history.length === 0 ? (
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                            <p className="text-sm text-gray-300 font-medium">Hello there!</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Describe the UI component you want (e.g., "Login form", "Dashboard sidebar").
                            </p>
                        </div>
                    </div>
                ) : (
                    history.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                            onClick={() => setPrompt(item)}
                        >
                            <p className="text-sm text-gray-300 line-clamp-2">{item}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-900 border-t border-gray-800">
                <div className="relative">
                    <textarea
                        className="w-full bg-gray-800 text-white rounded-xl p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 text-sm"
                        placeholder="Describe your component..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleGenerate();
                            }
                        }}
                    />
                    <button
                        onClick={toggleVoice}
                        className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${isListening
                            ? "bg-red-500 animate-pulse text-white"
                            : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white"
                            }`}
                        title="Toggle Voice Input"
                    >
                        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading ?? !prompt.trim()}
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="text-sm">Generating...</span>
                    ) : (
                        <>
                            <Send size={18} /> Generate UI
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
