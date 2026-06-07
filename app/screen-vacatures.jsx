// screen-vacatures.jsx — Vacatures list + detail (overlays)

function VacatureRow({ v, onClick }) {
  return (
    <Card pad={16} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <ServiceIcon name={v.icon} size={48} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 16.5, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.15 }}>{v.titel}</div>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag tone="gold">{v.type}</Tag>
        </div>
      </div>
      <IcChevR size={18} style={{ color: 'var(--cream-faint)', flexShrink: 0 }} />
    </Card>
  );
}

function VacaturesScreen({ openVacature, onBack }) {
  return (
    <div>
      <OverlayHeader title="Vacatures" onBack={onBack} />
      <div style={{ position: 'relative', height: 200, margin: '0 0 18px' }}>
        <Photo id="vac-hero" fit="contain" radius={0} src="app/assets/werken-bij.png" placeholder="Werken bij Le Grand"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div className="lg-hero-scrim" />
        <div style={{ position: 'absolute', left: 20, right: 20, bottom: 16 }}>
          <div className="lg-eyebrow" style={{ marginBottom: 4 }}>Werken bij Le Grand</div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 28, color: '#fff', lineHeight: 1.05 }}>Kom ons team versterken</h1>
        </div>
      </div>
      <div style={{ padding: '0 20px' }}>
        <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--cream-dim)' }}>{VAC_INTRO}</p>
        <SectionHead title="Open vacatures" eyebrow={`${VACATURES.length} functies`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {VACATURES.map(v => <VacatureRow key={v.id} v={v} onClick={() => openVacature(v.id)} />)}
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

function VacatureDetail({ v, onBack }) {
  const mailto = `mailto:${VENUE.email}?subject=${encodeURIComponent('Sollicitatie: ' + v.titel)}`;
  return (
    <div>
      <OverlayHeader title="Vacature" onBack={onBack} />
      <div style={{ padding: '4px 20px 0' }}>
        <ServiceIcon name={v.icon} size={56} />
        <h1 style={{ margin: '14px 0 8px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 27, color: 'var(--cream)', lineHeight: 1.1 }}>{v.titel}</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <Tag tone="gold">{v.type}</Tag>
          <Tag tone="panel"><IcPin size={13} />Zundert</Tag>
        </div>
        <p style={{ margin: '16px 0 22px', fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--cream-dim)' }}>{v.kort}</p>

        <Card pad={18}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)', marginBottom: 12 }}>Wat wij bieden</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {v.taken.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.4, color: 'var(--cream-dim)' }}>
                <IcCheck size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />{t}
              </div>
            ))}
          </div>
        </Card>

        <div style={{ background: 'var(--panel-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--hair)', padding: 15, marginTop: 16, display: 'flex', gap: 11, alignItems: 'flex-start' }}>
          <IcInfo size={18} style={{ color: 'var(--cream-faint)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--cream-dim)' }}>
            Interesse? Solliciteer via e-mail of bel ons. We behandelen elke aanvraag vertrouwelijk.
          </p>
        </div>
      </div>

      <div className="lg-actionbar">
        <a href={VENUE.telHref} style={{ textDecoration: 'none' }}><Btn variant="dark" leftIcon={<IcPhone size={18} />}>Bel</Btn></a>
        <a href={mailto} style={{ textDecoration: 'none', flex: 1 }}><Btn variant="primary" full rightIcon={<IcArrowR size={18} />}>Solliciteer nu</Btn></a>
      </div>

      <div style={{ padding: '32px 0 16px', display: 'flex', justifyContent: 'center', opacity: 0.6 }}>
        <img src="app/assets/legrand-logo.webp" alt="Le Grand" style={{ width: 100 }} />
      </div>

      <div style={{ height: 96 }} />
    </div>
  );
}

Object.assign(window, { VacaturesScreen, VacatureDetail });
