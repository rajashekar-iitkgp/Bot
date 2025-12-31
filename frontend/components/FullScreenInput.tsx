"use client";

import { Mic, MicOff, Send } from "lucide-react";

interface FullScreenInputProps {
    prompt: string;
    setPrompt: (value: string) => void;
    handleGenerate: () => void;
    loading: boolean;
    isListening: boolean;
    toggleVoice: () => void;
}

export default function FullScreenInput({
    prompt,
    setPrompt,
    handleGenerate,
    loading,
    isListening,
    toggleVoice,
}: FullScreenInputProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-8 animate-in fade-in duration-500">
            <div className="w-full max-w-3xl animate-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Code Generator
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Describe any UI component and watch it come to life
                    </p>
                </div>

                {/* Input Card */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl p-8">
                    <div className="relative">
                        <textarea
                            className="w-full bg-gray-900/50 text-white rounded-xl p-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-48 text-lg placeholder-gray-500"
                            placeholder="e.g., Create a modern login form with email and password fields..."
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
                            className={`absolute top-4 right-4 p-3 rounded-full transition-all ${isListening
                                ? "bg-red-500 animate-pulse text-white"
                                : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white"
                                }`}
                            title="Toggle Voice Input"
                        >
                            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !prompt.trim()}
                        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating...
                            </span>
                        ) : (
                            <>
                                <Send size={20} /> Generate UI
                            </>
                        )}
                    </button>
                </div>

                {/* Tips */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>💡 Tip: Be specific for better results. Try "dark mode dashboard" or "pricing table with 3 tiers"</p>
                </div>
            </div>
        </div>
    );
}
