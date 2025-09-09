import React, { useEffect, useState } from "react";
import axios from "axios";

type Msg = { sender: "user" | "bot"; text: string };

const FloatingChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // 🎯 פלטת ירוק תואמת לאתר + רקעים כהים
    const palette = {
        accent: "#00C875",
        accentHover: "#00A864",
        panel: "#0A0D11",
        header: "#0D1014",
        body: "#090C10",
        bubbleBot: "#1A2026",
        inputBg: "#0C0F13",
        text: "#E7FFF1",
        muted: "#A7D9C0",
        border: "#1E2A26",
    };

    // דואג להודעת פתיחה
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    sender: "bot",
                    text:
                        "היי! אני הבוט של 💪 BodyTune\nשמח שקפצתם לבקר! איך אני יכול לעזור לכם להתחיל את המסע לגרסה החזקה ביותר שלכם?",
                },
            ]);
        }
    }, [isOpen]); // eslint-disable-line

    // נועל את גלילת העמוד כשחלון הצ'אט פתוח
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = isOpen ? "hidden" : prev || "";
        return () => { document.body.style.overflow = prev || ""; };
    }, [isOpen]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        const pending = [...messages, { sender: "user" as const, text: trimmed }];
        setMessages(pending);
        setInput("");
        setLoading(true);

        try {
          const BASE_URL = 'https://bodytoneserver-env.eba-hv22wytr.us-east-1.elasticbeanstalk.com' || "http://localhost:5000";

          const res = await axios.post(`${BASE_URL}/chat`, { message: trimmed });
          
            const botReply = res.data?.response;
            setMessages([
                ...pending,
                { sender: "bot", text: botReply || "🤖 לא הצלחתי להבין… נסי לנסח אחרת 🟢" },
            ]);
        } catch {
            setMessages([...pending, { sender: "bot", text: "⚠️ שגיאה בשרת. נסי שוב בעוד רגע." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div dir="rtl">
            {/* כפתור צף */}
            <button className="bt-fab" onClick={() => setIsOpen(v => !v)} aria-label="open chat">
                <img src="/images/ai-technology (2).png" alt="chat icon" />
            </button>

            {/* שכבת דימר שמעמעמת את כל העמוד (קליק יסגור את הצ'אט) */}
            {isOpen && <div className="bt-dim" onClick={() => setIsOpen(false)} aria-hidden />}

            {/* חלון צ'אט */}
            {isOpen && (
                <div className="bt-wrap" role="dialog" aria-modal="true" aria-label="AI BodyTune chat">
                    {/* כותרת */}
                    <div className="bt-header">
                        <span className="bt-title">
                            <img src="/images/ai-technology (3).png" alt="icon" />
                            AI BodyTune
                        </span>
                        <button className="bt-close" onClick={() => setIsOpen(false)} aria-label="close">✖</button>
                    </div>

                    {/* הודעות */}
                    <div className="bt-body">
                        {messages.map((m, i) => (
                            <div key={i} className={`bt-row ${m.sender === "user" ? "me" : "bot"}`}>
                                <img
                                    className="bt-avatar"
                                    src={m.sender === "user" ? "/images/users.png" : "/images/bot (1).png"}
                                    alt={m.sender === "user" ? "user" : "bot"}
                                />
                                <div className={`bt-bubble ${m.sender}`}>{m.text}</div>
                            </div>
                        ))}
                        {loading && <div className="bt-typing">הבוט כותב…</div>}
                    </div>

                    {/* קלט */}
                    <div className="bt-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="כתבי כאן את השאלה…"
                        />
                        <button onClick={sendMessage} disabled={loading}>➤</button>
                    </div>
                </div>
            )}

            {/* ===== CSS ===== */}
            <style>{`
        :root{
          --bt-accent: ${palette.accent};
          --bt-accent-hover: ${palette.accentHover};
          --bt-panel: ${palette.panel};
          --bt-header: ${palette.header};
          --bt-body: ${palette.body};
          --bt-bubble-bot: ${palette.bubbleBot};
          --bt-input-bg: ${palette.inputBg};
          --bt-text: ${palette.text};
          --bt-muted: ${palette.muted};
          --bt-border: ${palette.border};
        }

        /* דימר לעמעום הרקע */
        .bt-dim{
          position: fixed; inset: 0;
          background: rgba(0,0,0,.55);         /* עמעום */
          backdrop-filter: blur(2px);           /* טיפה בלר ל-AI וייב */
          z-index: 9998;                        /* מתחת לחלון, מעל העמוד */
          opacity: 0; animation: btFade .15s ease forwards;
        }
        @keyframes btFade { from {opacity:0} to {opacity:1} }

        /* כפתור צף */
        .bt-fab{
          position: fixed; bottom: 22px; right: 22px;
          width: 62px; height: 62px; border-radius: 50%;
          background: var(--bt-accent); border:none; cursor:pointer;
          display:grid; place-items:center;
          box-shadow:
            0 12px 28px rgba(0,0,0,.45),
            0 0 0 2px var(--bt-accent),
            0 0 22px rgba(0,255,170,.45);
          z-index: 9999; transition: transform .15s, background .2s;
        }
        .bt-fab:hover{ background: var(--bt-accent-hover); transform: translateY(-1px); }
        .bt-fab img{ width: 36px; height: 36px; object-fit: contain; }

        /* חלון */
        .bt-wrap{
          position: fixed; bottom: 96px; right: 22px;
          width: 404px; max-height: 620px; overflow: hidden;
          border-radius: 14px;
          background: var(--bt-panel);
          border: 2px solid var(--bt-accent);
          box-shadow:
            0 12px 28px rgba(0,0,0,.45),
            0 0 22px rgba(0,255,170,.35);
          display:flex; flex-direction:column; z-index:10000;
          font-family: "Rubik","Assistant",Arial,sans-serif; color: var(--bt-text);
          opacity: 0; transform: translateY(6px);
          animation: btIn .18s ease forwards;
        }
        @keyframes btIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* כותרת */
        .bt-header{
          display:flex; align-items:center; justify-content:space-between;
          background: var(--bt-header);
          padding: 12px 14px; border-bottom: 1px solid var(--bt-border);
          position: sticky;
top: 0;
z-index: 2;

        }
        .bt-title{ display:flex; align-items:center; gap:8px; font-weight:700; font-size:16px; }
        .bt-title img{ width:26px; height:26px; object-fit:contain; }
        .bt-close{ background:transparent; border:none; color:#CFECDD; font-size:20px; cursor:pointer; }
        .bt-close:hover{ color:#fff; }

        /* גוף ההודעות */
        .bt-body {
            padding: 12px 12px 8px;
            background: var(--bt-body);
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
          
            max-height: 380px;
            overflow-y: auto;
          }
          

        .bt-row{ display:flex; gap:10px; align-items:flex-end; }
        .bt-row.me{ flex-direction: row-reverse; }

        /* אייקונים – בלי עיגול */
        .bt-avatar{
          width:30px; height:30px;
          object-fit: contain;
          border-radius: 0;
          background: none;
          border: none;
        }

        /* בועות */
        .bt-bubble{
          max-width:75%; padding: 10px 13px; border-radius: 16px;
          white-space: pre-wrap; word-break: break-word;
          box-shadow: 0 6px 16px rgba(0,0,0,.35); font-size:14px; line-height:1.35;
        }
        .bt-bubble.bot{
          background: var(--bt-bubble-bot); color: var(--bt-text);
          border: 1px solid var(--bt-border);
        }
        .bt-bubble.user{
          background: var(--bt-accent); color:#fff;
        }

        .bt-typing{ font-style: italic; color: var(--bt-muted); padding: 0 42px; }

        /* קלט */
        .bt-input{
          display:flex; gap:8px; align-items:center;
          background: var(--bt-header);
          border-top: 1px solid var(--bt-border);
          padding: 10px;
        }
        .bt-input input{
          flex:1; padding: 11px 14px; border-radius: 22px;
          border:1px solid var(--bt-border);
          background: var(--bt-input-bg); color: var(--bt-text);
          outline:none; font-size:14px;
        }
        .bt-input input::placeholder{ color: var(--bt-muted); }
        .bt-input button{
          min-width:52px; padding:10px 14px; border-radius:22px; border:none; cursor:pointer;
          background: var(--bt-accent); color:#fff; font-weight:700; font-size:18px;
          transition: background .2s, transform .1s;
        }
        .bt-input button:hover{ background: var(--bt-accent-hover); }
        .bt-input button:active{ transform: translateY(1px); }

        /* מובייל */
        @media (max-width: 520px){
          .bt-wrap{ right:12px; bottom:88px; width: calc(100vw - 24px); }
          .bt-fab{ right:12px; bottom:16px; }
        }
      `}</style>
        </div>
    );
};

export default FloatingChatBot;
