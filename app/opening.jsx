// opening.jsx — launch reveal + 18+ age gate. 3 variations: photo / steam / minimal
function OpeningScreen({ variant = 'photo', onEnter }) {
  const { t } = useTranslation();
  const [denied, setDenied] = React.useState(false);
  const key = variant + (denied ? '-d' : '');

  return (
    <div className="lg-open" key={key} data-variant={variant} style={{ position: 'fixed', inset: 0, background: '#0a0a0a', zIndex: 999 }}>
      {/* ── Background per variant ── */}
      {variant === 'photo' && (
        <React.Fragment>
          <Photo id="open-bg" radius={0} src="app/assets/spa-photo.webp" placeholder="Sfeerbeeld"
            className="lg-kenburns" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }} />
          <div className="lg-open-scrim" style={{ background: 'linear-gradient(to top, #080705 10%, transparent 60%, rgba(0,0,0,0.4))' }} />
        </React.Fragment>
      )}
      {variant === 'steam' && (
        <div className="lg-open-steam">
          <div className="lg-steam-glow" />
          <div className="lg-steam s1" /><div className="lg-steam s2" /><div className="lg-steam s3" />
        </div>
      )}
      {variant === 'minimal' && (
        <div className="lg-open-min"><div className="lg-min-line" /></div>
      )}

      {/* ── Content ── */}
      <div className="lg-open-content" style={{ position: 'relative', zIndex: 1, padding: '24px 24px 48px', height: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>
        <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
          <LanguageSelector />
        </div>
        <div className="lg-open-top">
          <img src="app/assets/legrand-logo.webp" alt="Le Grand" className="lg-open-logo" style={{ width: 140, margin: '0 auto', display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }} />
          {!denied ? (
            <React.Fragment>
              <div className="lg-open-eyebrow">Saunaclub · Zundert</div>
              <h1 className="lg-open-tagline" style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 500, margin: '16px 0', letterSpacing: 0.5, lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                {t('welkom_title')}
              </h1>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2 className="lg-open-deny-title">Tot ziens</h2>
              <p className="lg-open-note" style={{ maxWidth: 280 }}>Je moet 18 jaar of ouder zijn om deze app te bekijken. Kom gerust terug wanneer dat zo is.</p>
            </React.Fragment>
          )}
        </div>

        {!denied ? (
          <div className="lg-open-gate">
            <div className="lg-open-divider"><span /><IcCrown size={20} /><span /></div>
            <p className="lg-open-note">Deze plek is uitsluitend voor volwassenen. Bevestig je leeftijd om verder te gaan.</p>
            <Btn variant="primary" size="lg" full onClick={onEnter}>Ik ben 18 jaar of ouder</Btn>
            <button className="lg-press lg-open-under" onClick={() => setDenied(true)}>Ik ben jonger dan 18</button>
          </div>
        ) : (
          <div className="lg-open-gate">
            <button className="lg-press lg-open-under" onClick={() => setDenied(false)}>Terug</button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { OpeningScreen });
