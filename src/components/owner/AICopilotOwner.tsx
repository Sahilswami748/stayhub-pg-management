import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Bot, Send, Sparkles, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

export const AICopilotOwner: React.FC = () => {
  const { askAICopilot } = useStore();
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Property Copilot. Ask me anything about your properties, vacant beds, overdue rent, or unresolved complaints.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const suggestedQueries = [
    'How many beds are vacant right now?',
    'Which tenants have pending or overdue rent?',
    'What is my monthly revenue in Jaipur?',
    'Show unresolved complaint tickets',
    'Give me a summary of today operations'
  ];

  const handleSend = (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [...messages, { sender: 'user' as const, text: q, time: userTime }];
    setMessages(newMessages);
    if (!queryText) setInputQuery('');

    // Ask AI engine
    setTimeout(() => {
      const aiResponse = askAICopilot(q, 'OWNER');
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-purple-600 via-indigoCustom-600 to-brand-600 p-6 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <Bot className="h-7 w-7 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black">AI Property Copilot</h1>
            <p className="text-xs text-white/80">Natural language intelligence engine for your PG & Hostel operations</p>
          </div>
        </div>

        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
          Connected to Live State
        </span>
      </div>

      {/* Suggested Quick Queries */}
      <div className="flex flex-wrap gap-2">
        {suggestedQueries.map((sq, i) => (
          <button
            key={i}
            onClick={() => handleSend(sq)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            <span>{sq}</span>
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex h-[480px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  m.sender === 'user' ? 'bg-brand-600' : 'bg-purple-600'
                }`}
              >
                {m.sender === 'user' ? 'You' : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`max-w-xl rounded-2xl p-4 text-xs ${
                  m.sender === 'user'
                    ? 'bg-brand-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                <p className={`mt-1.5 text-[10px] ${m.sender === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800"
        >
          <input
            type="text"
            placeholder="Ask AI Copilot (e.g. 'Show tenants with overdue rent')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-xs font-extrabold text-white shadow-md hover:bg-brand-700 transition-all"
          >
            <span>Ask</span>
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
