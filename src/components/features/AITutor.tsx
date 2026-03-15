"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, Mic, Paperclip, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    hasCorrection?: boolean;
    correctionData?: {
        original?: string;
        fixed?: string;
        explanation?: string;
    } | null;
}

interface AITutorProps {
    initialMessages: any[];
    conversationId: string;
    userLevel: string;
}

export default function AITutorChat({ initialMessages, conversationId, userLevel }: AITutorProps) {
    const router = useRouter();
    // Transform Prisma messages to local state
    const [messages, setMessages] = useState<ChatMessage[]>(
        initialMessages.map(m => ({
            id: m.id,
            role: m.role as "user" | "assistant" | "system",
            content: m.content,
            hasCorrection: m.hasCorrection,
            correctionData: m.correctionData as any
        }))
    );
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput("");
        setIsLoading(true);

        const tempId = Date.now().toString();
        // Optimistic UI update
        setMessages(prev => [...prev, {
            id: tempId,
            role: "user",
            content: userMessage
        }]);

        try {
            const response = await fetch('/api/tutor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationId,
                    userLevel,
                    message: userMessage
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');
            
            const data = await response.json();
            
            setMessages(prev => [...prev, {
                id: data.id || (Date.now() + 1).toString(),
                role: "assistant",
                content: data.content,
                hasCorrection: !!data.correction,
                correctionData: data.correction
            }]);
        } catch (error) {
            console.error("OpenAI Error:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, I am having trouble connecting to my brain right now. Please check my API key configuration!"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full max-h-[800px] bg-background border border-border-glass rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            
            {/* Abstract Background Glow inside Chat */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-color-accent-500 rounded-full blur-[120px] opacity-[0.05] pointer-events-none"></div>

            {/* Header */}
            <header className="h-20 bg-background/80 backdrop-blur-xl border-b border-border-glass px-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-color-primary-600 to-color-accent-500 flex items-center justify-center p-0.5 shadow-lg shadow-color-primary-500/20">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            <Bot className="w-6 h-6 text-color-primary-600" />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-display font-bold text-foreground flex items-center gap-2">
                            Tutor <Sparkles className="w-4 h-4 text-color-secondary-500" />
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-color-success-500 animate-pulse"></span>
                            <span className="text-xs text-foreground/60">Online • C2 Native Expert</span>
                        </div>
                    </div>
                </div>
                
                <button 
                  onClick={() => router.push('/home')}
                  className="p-2 text-foreground/40 hover:text-foreground transition-colors hover:bg-foreground/5 rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>
            </header>

            {/* Chat History */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
                    >
                        {msg.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-color-primary-100 flex items-center justify-center shrink-0 mt-1">
                                <Bot className="w-5 h-5 text-color-primary-600" />
                            </div>
                        )}
                        
                        <div className={`max-w-[85%] md:max-w-[75%] space-y-3 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                            {/* Main Message Bubble */}
                            <div 
                                className={`p-4 rounded-2xl ${
                                    msg.role === "user" 
                                    ? "bg-color-primary-600 text-white rounded-br-sm shadow-md" 
                                    : "bg-background/80 border border-border-glass text-foreground rounded-bl-sm glass"
                                }`}
                            >
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>

                            {/* Grammar Correction Box (AI Only) */}
                            {msg.hasCorrection && msg.correctionData && (
                                <div className="mt-2 ml-4 p-4 rounded-2xl bg-color-primary-50 border border-color-primary-100 text-foreground animate-in slide-in-from-left-4 fade-in duration-500">
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-5 h-5 text-color-primary-500 shrink-0 mt-0.5" />
                                        <div className="space-y-3">
                                            
                                            {msg.correctionData.original && (
                                                <div className="space-y-1">
                                                    <span className="text-xs font-bold text-color-danger-500 uppercase tracking-wider">Instead of</span>
                                                    <p className="text-color-danger-900/60 line-through decoration-color-danger-500/50">"{msg.correctionData.original}"</p>
                                                </div>
                                            )}

                                            {msg.correctionData.fixed && (
                                                <div className="space-y-1">
                                                    <span className="text-xs font-bold text-color-success-600 uppercase tracking-wider">Say</span>
                                                    <p className="text-color-primary-900 font-bold text-lg">"{msg.correctionData.fixed}"</p>
                                                </div>
                                            )}

                                            {msg.correctionData.explanation && (
                                                <div className="pt-2 border-t border-color-primary-200">
                                                    <p className="text-sm text-color-primary-800/80 leading-relaxed">
                                                        <strong>Why?</strong> {msg.correctionData.explanation}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {msg.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-color-accent-100 flex items-center justify-center shrink-0 mt-1">
                                <span className="font-bold text-color-accent-600 text-xs">U</span>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start gap-3 animate-in fade-in">
                        <div className="w-8 h-8 rounded-full bg-color-primary-100 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="w-5 h-5 text-color-primary-600" />
                        </div>
                        <div className="p-4 rounded-2xl bg-background/80 border border-border-glass text-foreground rounded-bl-sm glass">
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <footer className="p-4 bg-background border-t border-border-glass z-10 shrink-0">
                <form 
                    onSubmit={handleSend}
                    className="glass rounded-2xl border border-border-glass p-2 flex items-end gap-2 focus-within:ring-2 focus-within:ring-color-primary-500/50 transition-all shadow-sm bg-background/50"
                >
                    <button type="button" className="p-3 text-foreground/40 hover:text-color-primary-500 transition-colors shrink-0">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(e);
                            }
                        }}
                        placeholder="Ask anything or check a sentence..."
                        className="w-full bg-transparent border-none focus:outline-none resize-none min-h-[44px] max-h-[120px] py-3 text-foreground placeholder:text-foreground/40 font-sans leading-relaxed disabled:opacity-50"
                        rows={1}
                        disabled={isLoading}
                    />
                    
                    {input.length === 0 ? (
                        <button type="button" className="p-3 text-white bg-gradient-to-tr from-color-primary-600 to-color-accent-500 hover:from-color-primary-500 hover:to-color-accent-400 rounded-xl transition-colors shrink-0 shadow-lg shadow-color-primary-500/20 active:scale-95 disabled:opacity-50" disabled={isLoading}>
                            <Mic className="w-5 h-5" />
                        </button>
                    ) : (
                        <button type="submit" className="p-3 text-white bg-color-primary-600 hover:bg-color-primary-500 rounded-xl transition-colors shrink-0 shadow-lg shadow-color-primary-500/20 active:scale-95 animate-in zoom-in duration-200 disabled:opacity-50" disabled={isLoading}>
                            <Send className="w-5 h-5" />
                        </button>
                    )}
                </form>
                <p className="text-center text-xs text-foreground/40 mt-3 font-medium">
                    Tutor can make mistakes. Consider double-checking grammar rules.
                </p>
            </footer>
        </div>
    );
}
