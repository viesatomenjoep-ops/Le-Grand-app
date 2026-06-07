// screen-meer.jsx — "Meer" hub: reserveren, info, vacatures, contact, socials

function MeerRow({ icon, label, sub, onClick, last }) {
  return (
    <button className="lg-press" onClick={onClick} style={{
      width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 14, padding: '13px 4px',
      borderBottom: last ? 'none' : '1px solid var(--hair)',
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--panel-3)', border: '1px solid var(--hair)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)' }}>{label}</div>
        {sub && <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', marginTop: 1 }}>{sub}</div>}
      </div>
      <IcChevR size={18} style={{ color: 'var(--cream-faint)', flexShrink: 0 }} />
    </button>
  );
}

function MeerScreen({ go, reserve, openInfo, openVacatures, topInset }) {
  const todayIdx = (new Date().getDay() + 6) % 7;
  const th = OPENING[todayIdx];
  return (
    <div>
      <div style={{ padding: (topInset + 8) + 'px 20px 4px' }}>
        <div className="lg-eyebrow">Saunaclub Le Grand · Zundert</div>
        <h1 style={{ margin: '2px 0 18px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 34, color: 'var(--cream)', letterSpacing: 0.3 }}>Meer</h1>
      </div>

      {/* Reserveren highlight */}
      <div style={{ padding: '0 18px' }}>
        <div className="lg-press" onClick={reserve} style={{ position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', cursor: 'pointer', background: 'var(--gold-grad)', padding: 18, color: '#231a06', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcCal size={24} /></div>
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 19, fontWeight: 700 }}>Reserveer een avond</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, opacity: 0.8, marginTop: 1 }}>Kies datum, tijd & arrangement</div>
          </div>
          <IcArrowR size={20} />
          <div className="lg-gold-sheen" />
        </div>
      </div>

      {/* Informatie */}
      <div style={{ padding: '26px 18px 0' }}>
        <SectionHead title="Informatie" />
        <Card pad={6}>
          <MeerRow icon={<IcWaves size={20} />} label="Faciliteiten & wellness" sub="Sauna, jacuzzi, zwembad, suites" onClick={() => openInfo('fac')} />
          <MeerRow icon={<IcGift size={20} />} label="Tarieven" sub="All-in entree & arrangementen" onClick={() => openInfo('tar')} />
          <MeerRow icon={<IcClock size={20} />} label="Openingstijden" sub={`Vandaag · ${th.uren}`} onClick={() => openInfo('open')} />
          <MeerRow icon={<IcBriefcase size={20} />} label="Vacatures" sub="Kom ons team versterken" onClick={openVacatures} last />
        </Card>
      </div>

      {/* Snel naar */}
      <div style={{ padding: '24px 18px 0', marginTop: '20vh' }}>
        <SectionHead title="Snel naar" />
        <Card pad={6}>
          <MeerRow icon={<IcHeart size={20} />} label="Onze dames" sub="Bekijk wie aanwezig is" onClick={() => go('dames')} />
          <MeerRow icon={<IcStar size={20} />} label="Events" sub="Strippers Night, thema-avonden" onClick={() => go('events')} />
          <MeerRow icon={<IcBag size={20} />} label="Webshop" sub="Badjas, slippers & meer" onClick={() => go('shop')} last />
        </Card>
      </div>

      {/* Contact */}
      <div style={{ padding: '24px 18px 0' }}>
        <SectionHead title="Contact" />
        <Card pad={16}>
          <a href={VENUE.maps} target="_blank" rel="noreferrer" className="lg-press" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
            <IcPin size={19} style={{ color: 'var(--gold)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>{VENUE.adres}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-dim)' }}>Open in Maps</div>
            </div>
            <IcChevR size={16} style={{ color: 'var(--cream-faint)' }} />
          </a>
          <div style={{ height: 1, background: 'var(--hair)', margin: '11px 0' }} />
          <a href={VENUE.telHref} className="lg-press" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
            <IcPhone size={19} style={{ color: 'var(--gold)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>{VENUE.tel}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-dim)' }}>Bel ons</div>
            </div>
            <IcChevR size={16} style={{ color: 'var(--cream-faint)' }} />
          </a>
        </Card>
        <div style={{ display: 'flex', gap: 9, marginTop: 12 }}>
          {[['Instagram', VENUE.socials.instagram, 'https://instagram.com/'], ['TikTok', VENUE.socials.tiktok, 'https://tiktok.com/@'], ['Facebook', VENUE.socials.facebook, 'https://facebook.com/']].map(([n, h, url]) => (
            <a href={`${url}${h}`} target="_blank" rel="noreferrer" key={n} className="lg-press" style={{ flex: 1, background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 'var(--r-md)', padding: '11px 8px', textAlign: 'center', cursor: 'pointer', textDecoration: 'none' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 13.5, fontWeight: 600, color: 'var(--cream)' }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, color: 'var(--gold)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>@{h}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '32px 18px 0', textAlign: 'center' }}>
        <img src="app/assets/legrand-logo.webp" alt="Le Grand" style={{ width: 92, opacity: 0.85, margin: '0 auto' }} />
        <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--cream-faint)', letterSpacing: 0.3 }}>Toegang vanaf 18 jaar · Saunaclub Le Grand · Zundert</p>
      </div>
      <TabSpacer />
    </div>
  );
}

Object.assign(window, { MeerScreen });
