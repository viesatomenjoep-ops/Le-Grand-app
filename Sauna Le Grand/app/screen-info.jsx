// screen-info.jsx — Bezoek & info: faciliteiten, tarieven, openingstijden, contact
function InfoScreen({ onBack }) {
  const todayIdx = (new Date().getDay() + 6) % 7;
  return (
    <div>
      <OverlayHeader title="Bezoek & info" onBack={onBack} />

      {/* Faciliteiten */}
      <div style={{ padding: '6px 18px 0' }}>
        <SectionHead eyebrow="Onze wellness" title="Faciliteiten" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FACILITEITEN.map(f => (
            <Card key={f.id} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <ServiceIcon name={f.icon} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)' }}>{f.name}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: 0.3 }}>{f.meta}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', marginTop: 3, lineHeight: 1.45 }}>{f.desc}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tarieven */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow="All-in concept" title="Tarieven" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TARIEVEN.map(t => (
            <Card key={t.id} pad={17} style={t.featured ? { border: '1px solid var(--gold-line)', background: 'var(--gold-glow)' } : {}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {t.featured && <div style={{ marginBottom: 7 }}><Tag tone="solid">Aanrader</Tag></div>}
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 600, lineHeight: 1.1, color: 'var(--cream)' }}>{t.name}</h3>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', marginTop: 3 }}>{t.sub}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 25, fontWeight: 700, lineHeight: 1, color: 'var(--gold)' }}>€{t.price}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--cream-faint)', marginTop: 3 }}>{t.unit}</div>
                </div>
              </div>
              <div style={{ marginTop: 13, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {t.perks.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-dim)' }}>
                    <IcCheck size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />{p}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Openingstijden */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow="Geopend 7 dagen" title="Openingstijden" />
        <Card pad={6}>
          {OPENING.map((o, i) => {
            const on = i === todayIdx;
            return (
              <div key={o.dag} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 12px', borderBottom: i < 6 ? '1px solid var(--hair)' : 'none', background: on ? 'var(--gold-glow)' : 'transparent', borderRadius: on ? 10 : 0 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: on ? 700 : 500, color: on ? 'var(--gold)' : 'var(--cream)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {on && <LiveDot />}{o.dag}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: on ? 700 : 500, color: on ? 'var(--gold)' : 'var(--cream-dim)' }}>{o.uren}</span>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Locatie & contact */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow="Vind ons" title="Locatie &amp; contact" />
        <Card pad={0} style={{ overflow: 'hidden' }}>
          <a href={VENUE.maps} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="lg-map">
              <div className="lg-map-pin"><IcPin size={20} /></div>
              <span className="lg-glassbtn" style={{ position: 'absolute', right: 12, bottom: 12, width: 'auto', padding: '0 14px', height: 36, fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, gap: 6 }}>Open in Maps<IcArrowR size={15} /></span>
            </div>
          </a>
          <div style={{ padding: 16 }}>
            <ContactRow icon={<IcPin size={18} />} label={VENUE.adres} sub="Zundert, Noord-Brabant" href={VENUE.maps} />
            <Sep />
            <ContactRow icon={<IcPhone size={18} />} label={VENUE.tel} sub="Bel voor reserveringen" href={VENUE.telHref} />
            <Sep />
            <ContactRow icon={<IcBell size={18} />} label={VENUE.email} sub="Stuur ons een bericht" href={'mailto:' + VENUE.email} />
          </div>
        </Card>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <Social label="Instagram" handle={'@' + VENUE.socials.instagram} />
          <Social label="TikTok" handle={'@' + VENUE.socials.tiktok} />
        </div>
      </div>

      {/* Huisregels */}
      <div style={{ padding: '26px 18px 0' }}>
        <div style={{ background: 'var(--panel-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--hair)', padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <IcInfo size={19} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, color: 'var(--cream)' }}>Toegang vanaf 18 jaar</div>
            <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--cream-dim)' }}>
              Geldig legitimatiebewijs verplicht. Wij hechten veel waarde aan discretie, respect en een veilige sfeer voor iedereen.
            </p>
          </div>
        </div>
      </div>

      <TabSpacer />
    </div>
  );
}

function ContactRow({ icon, label, sub, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="lg-press" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 13, padding: '4px 0' }}>
      <ServiceIcon name="spark" size={40} tone="panel" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 600, color: 'var(--cream)' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-dim)', marginTop: 1 }}>{sub}</div>
      </div>
      <IcChevR size={17} style={{ color: 'var(--cream-faint)' }} />
    </a>
  );
}
function Social({ label, handle }) {
  return (
    <div className="lg-press" style={{ flex: 1, background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 'var(--r-md)', padding: '14px 16px', cursor: 'pointer' }}>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 14.5, fontWeight: 600, color: 'var(--cream)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gold)', marginTop: 2 }}>{handle}</div>
    </div>
  );
}
function Sep() { return <div style={{ height: 1, background: 'var(--hair)', margin: '10px 0' }} />; }

Object.assign(window, { InfoScreen });
