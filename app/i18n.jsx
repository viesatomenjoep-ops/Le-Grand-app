// i18n.jsx — Language context, hooks, and LanguageSelector component

const LANGUAGES = [
  { code: 'nl', name: 'NL', flag: '🇳🇱' },
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'de', name: 'DE', flag: '🇩🇪' },
  { code: 'fr', name: 'FR', flag: '🇫🇷' },
  { code: 'es', name: 'ES', flag: '🇪🇸' },
  { code: 'pt', name: 'PT', flag: '🇵🇹' },
  { code: 'it', name: 'IT', flag: '🇮🇹' },
  { code: 'da', name: 'DA', flag: '🇩🇰' },
  { code: 'sv', name: 'SV', flag: '🇸🇪' },
  { code: 'fi', name: 'FI', flag: '🇫🇮' },
  { code: 'pl', name: 'PL', flag: '🇵🇱' },
  { code: 'hu', name: 'HU', flag: '🇭🇺' },
  { code: 'bg', name: 'BG', flag: '🇧🇬' },
  { code: 'cs', name: 'CS', flag: '🇨🇿' },
  { code: 'hr', name: 'HR', flag: '🇭🇷' },
  { code: 'el', name: 'EL', flag: '🇬🇷' },
  { code: 'et', name: 'ET', flag: '🇪🇪' },
  { code: 'lt', name: 'LT', flag: '🇱🇹' },
  { code: 'no', name: 'NO', flag: '🇳🇴' },
];

const LanguageContext = React.createContext({
  lang: 'nl',
  setLang: () => {},
  t: (key) => key,
});

function LanguageProvider({ children }) {
  const [lang, setLangState] = React.useState(() => {
    return localStorage.getItem('lg-lang') || 'nl';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('lg-lang', newLang);
  };

  const t = React.useCallback((key, replacements = {}) => {
    // TRANSLATIONS should be provided via window.TRANSLATIONS from translations.js
    const dict = window.TRANSLATIONS && window.TRANSLATIONS[lang] ? window.TRANSLATIONS[lang] : (window.TRANSLATIONS?.['nl'] || {});
    let text = dict[key];
    if (text === undefined) {
      // Fallback to NL if missing in current language
      const fallback = window.TRANSLATIONS?.['nl']?.[key];
      text = fallback !== undefined ? fallback : key;
    }
    
    // Simple interpolation: {name}
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(new RegExp(`{${k}}`, 'g'), v);
    }
    return text;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useTranslation() {
  return React.useContext(LanguageContext);
}

function LanguageSelector({ style }) {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function clickOut(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', clickOut);
    return () => document.removeEventListener('pointerdown', clickOut);
  }, []);

  const cur = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <button className="lg-press" onClick={() => setOpen(!open)} style={{
        background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 'var(--r-md)',
        padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        color: 'var(--cream)', fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600
      }}>
        <span style={{ fontSize: 18 }}>{cur.flag}</span>
        {cur.name}
        <IcChevDown size={14} style={{ color: 'var(--cream-faint)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
          background: 'var(--panel-2)', border: '1px solid var(--hair)', borderRadius: 'var(--r-md)',
          padding: '6px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 100, minWidth: 200, maxHeight: 300, overflowY: 'auto'
        }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }} style={{
              background: l.code === lang ? 'var(--gold-grad)' : 'transparent',
              color: l.code === lang ? '#1c1505' : 'var(--cream)',
              border: 'none', borderRadius: '4px', padding: '8px 12px', textAlign: 'left', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600
            }}>
              <span style={{ fontSize: 16 }}>{l.flag}</span> {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LanguageProvider, useTranslation, LanguageSelector, LANGUAGES });
