"use client";

import { useState, useEffect } from "react";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import ChatPanel from "../components/ChatPanel";
import PreviewPanel from "../components/PreviewPanel";
import FullScreenInput from "../components/FullScreenInput";

export default function AgentInterface() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useVoiceInput();

  // Sync voice transcript to prompt
  useEffect(() => {
    if (transcript) {
      setPrompt(transcript);
    }
  }, [transcript]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setGeneratedCode(data.html);
      setShowCode(false); // Switch to UI view on success
      setHistory((prev) => [prompt, ...prev]); // Add to history
      setPrompt(""); // Clear input
    } catch (error) {
      console.error("Generate error:", error);
      setGeneratedCode(
        `<div class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
           <strong>Error:</strong> Could not generate code. Please check backend.
         </div>`
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      resetTranscript();
      setPrompt("");
    }
  };

  const handleCopy = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Conditional rendering: Full-screen before generation, sidebar after
  if (!generatedCode) {
    return (
      <FullScreenInput
        prompt={prompt}
        setPrompt={setPrompt}
        handleGenerate={handleGenerate}
        loading={loading}
        isListening={isListening}
        toggleVoice={toggleVoice}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden animate-in fade-in duration-500">
      <ChatPanel
        prompt={prompt}
        setPrompt={setPrompt}
        handleGenerate={handleGenerate}
        loading={loading}
        isListening={isListening}
        toggleVoice={toggleVoice}
        history={history}
      />
      <PreviewPanel
        generatedCode={generatedCode}
        showCode={showCode}
        setShowCode={setShowCode}
        handleCopy={handleCopy}
        copied={copied}
      />
    </div>
  );
}
