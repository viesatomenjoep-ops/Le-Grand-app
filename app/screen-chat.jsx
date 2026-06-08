// screen-chat.jsx — Chatbot / Digitale Conciërge
const { useState, useEffect, useRef } = React;

function ChatbotScreen({ onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Welkom bij Le Grand! Ik ben uw Digitale Conciërge. Hoe kan ik u vandaag van dienst zijn?' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Simulate thinking and response
    setTimeout(() => {
      let reply = 'Ik zal een medewerker vragen om contact met u op te nemen hierover. Kunt u uw e-mailadres achterlaten?';
      const lower = userMsg.text.toLowerCase();
      
      if (lower.includes('reserveren') || lower.includes('boeken') || lower.includes('afspraak')) {
        reply = 'Uitstekend. U kunt direct een reservering maken via ons reserveringssysteem in de app (onder "Meer" of op de homepage). Zal ik u verder helpen?';
      } else if (lower.includes('tarieven') || lower.includes('kosten') || lower.includes('prijs')) {
        reply = 'Onze dagentree is €59 per persoon. U geniet dan van all-inclusive toegang (inclusief badjas, handdoek en alle faciliteiten).';
      } else if (lower.includes('openingstijden') || lower.includes('open') || lower.includes('tijden')) {
        reply = 'Wij zijn vandaag open tot middernacht. Voor het volledige overzicht kunt u kijken in de menubalk onder "Openingstijden".';
      } else if (lower.includes('klacht') || lower.includes('slecht') || lower.includes('probleem') || lower.includes('ontevreden')) {
        reply = 'Wat vervelend om te horen. Kwaliteit en discretie staan bij ons voorop. U kunt uw opmerking veilig sturen naar management@saunaclublegrand.nl, of als u nu in de club bent, direct melden bij de bar zodat we het direct kunnen oplossen.';
      } else if (lower.includes('dames') || lower.includes('vrouw')) {
        reply = 'U kunt het volledige overzicht van alle dames die momenteel aanwezig zijn bekijken onder het kopje "Dames" in de app.';
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)' }}>
      <OverlayHeader title="Le Grand Assistant" onBack={onBack} />
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%',
              padding: '12px 16px',
              borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.sender === 'user' ? 'var(--panel-2)' : 'var(--gold-glow)',
              border: m.sender === 'user' ? '1px solid var(--hair)' : '1px solid var(--gold-line)',
              color: m.sender === 'user' ? 'var(--cream)' : 'var(--gold)',
              fontFamily: 'var(--font-body)',
              fontSize: 14.5,
              lineHeight: 1.45,
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      
      <div style={{ padding: '12px 16px', background: 'var(--panel)', borderTop: '1px solid var(--hair)' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: 10 }}>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Typ uw bericht..."
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--hair-strong)',
              borderRadius: 'var(--r-md)',
              padding: '0 16px',
              color: 'var(--cream)',
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              height: 48,
              outline: 'none'
            }}
          />
          <button type="submit" disabled={!input.trim()} style={{
            background: input.trim() ? 'var(--gold-grad)' : 'var(--panel-3)',
            color: input.trim() ? '#1c1505' : 'var(--cream-dim)',
            border: 'none',
            borderRadius: 'var(--r-md)',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'default',
            transition: 'background 0.2s',
          }}>
            <IcSend size={20} sw={1.8} style={{ transform: 'translate(-1px, 1px)' }} />
          </button>
        </form>
      </div>
      <div style={{ height: 24, background: 'var(--panel)' }} />
    </div>
  );
}

Object.assign(window, { ChatbotScreen });
