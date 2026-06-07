// screen-dames.jsx — Onze dames roster + detail (respectful, non-explicit; photos are user-filled)

function DameCard({ dame, onClick }) {
  return (
    <button className="lg-press" onClick={onClick} style={{
      background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', width: '100%',
    }}>
      <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden' }}>
        <Photo id={`grid-dame-${dame.id}`} placeholder="Voeg foto toe" radius={18} src={dame.img}
          style={{ width: '100%', aspectRatio: '3 / 4', display: 'block' }} />
        <div className="lg-photo-fade" />
        {dame.nu && <div style={{ position: 'absolute', top: 9, left: 9 }}><Tag tone="live"><LiveDot />Aanwezig</Tag></div>}
        <div style={{ position: 'absolute', left: 11, right: 11, bottom: 9 }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 19, fontWeight: 600, color: '#fff', lineHeight: 1.1 }}>
            {dame.name}<span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>  ·  {dame.leeftijd}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.78)', marginTop: 2 }}>{dame.land}</div>
        </div>
      </div>
    </button>
  );
}

function DamesScreen({ openDame, topInset }) {
  const [filter, setFilter] = React.useState('alle');
  const list = filter === 'nu' ? DAMES.filter(d => d.nu) : DAMES;
  const Chip = ({ id, label, count }) => (
    <button className="lg-press" onClick={() => setFilter(id)} style={{
      padding: '8px 16px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
      fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap',
      border: '1px solid ' + (filter === id ? 'transparent' : 'var(--hair-strong)'),
      background: filter === id ? 'var(--gold-grad)' : 'transparent',
      color: filter === id ? '#1c1505' : 'var(--cream-dim)',
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>{label}{count != null && <span style={{ opacity: 0.7 }}>{count}</span>}</button>
  );
  return (
    <div>
      <div style={{ padding: (topInset + 8) + 'px 20px 4px' }}>
        <div className="lg-eyebrow">Saunaclub Le Grand</div>
        <h1 style={{ margin: '2px 0 4px', fontFamily: 'var(--font-head)', fontWeight: 500, fontSize: 34, color: 'var(--cream)', letterSpacing: 0.3 }}>Onze dames</h1>
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.5, color: 'var(--cream-dim)' }}>
          Een aantal van onze vaste dames. Om privacyredenen staan niet alle dames online — kom gerust langs om kennis te maken.
        </p>
        <div style={{ display: 'flex', gap: 9, marginBottom: 18 }}>
          <Chip id="alle" label="Alle dames" count={DAMES.length} />
          <Chip id="nu" label="Nu aanwezig" count={DAMES.filter(d => d.nu).length} />
        </div>
      </div>
      <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {list.map(d => <DameCard key={d.id} dame={d} onClick={() => openDame(d.id)} />)}
      </div>
      <TabSpacer />
    </div>
  );
}

function InfoBit({ label, value }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--cream-faint)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)', marginTop: 3 }}>{value}</div>
    </div>
  );
}

function DameDetail({ dame, onBack, reserve }) {
  const dagen = dame.dagen.map(d => d.charAt(0).toUpperCase() + d.slice(1));
  return (
    <div>
      {/* Hero photo */}
      <div style={{ position: 'relative', height: 520 }}>
        <Photo id={`detail-dame-${dame.id}`} radius={0} placeholder={`Foto van ${dame.name}`} src={dame.img}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div className="lg-hero-scrim" />
        {/* back */}
        <button className="lg-press lg-glassbtn" onClick={onBack} style={{ position: 'absolute', top: 58, left: 16 }}>
          <IcChevL size={20} />
        </button>
        <button className="lg-press lg-glassbtn" style={{ position: 'absolute', top: 58, right: 16 }}>
          <IcHeart size={19} />
        </button>
        <div style={{ position: 'absolute', left: 20, right: 20, bottom: 22 }}>
          {dame.nu && <div style={{ marginBottom: 10 }}><Tag tone="live"><LiveDot />Vandaag aanwezig</Tag></div>}
          <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 38, color: '#fff', letterSpacing: 0.3, lineHeight: 1.05 }}>
            {dame.name}<span style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.82)' }}>   {dame.leeftijd} jaar</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 6, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
            <IcPin size={16} style={{ color: 'var(--gold-light)' }} />{dame.land}
          </div>
        </div>
      </div>

      <div style={{ padding: '22px 20px 0' }}>
        <p style={{ margin: '0 0 22px', fontFamily: 'var(--font-head)', fontStyle: 'italic', fontWeight: 500, fontSize: 19, lineHeight: 1.45, color: 'var(--cream)' }}>
          “{dame.note}”
        </p>

        <Card pad={16} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
          <InfoBit label="Herkomst" value={dame.land} />
          <div style={{ width: 1, background: 'var(--hair)' }} />
          <InfoBit label="Leeftijd" value={`${dame.leeftijd} jr`} />
          <div style={{ width: 1, background: 'var(--hair)' }} />
          <div style={{ flex: 1.2, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: 5 }}>Talen</div>
            <LangChips talen={dame.talen} />
          </div>
        </Card>

        <Card pad={16} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <IcCal size={18} style={{ color: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--font-head)', fontSize: 15.5, fontWeight: 600, color: 'var(--cream)' }}>Vaste dagen aanwezig</span>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {DAYS_NL.map(d => {
              const on = dame.dagen.includes(d);
              return (
                <span key={d} style={{
                  width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 700, textTransform: 'capitalize',
                  background: on ? 'var(--gold-glow)' : 'transparent',
                  color: on ? 'var(--gold)' : 'var(--cream-faint)',
                  border: '1px solid ' + (on ? 'var(--gold-line)' : 'var(--hair)'),
                }}>{d}</span>
              );
            })}
          </div>
        </Card>

        <div style={{ background: 'var(--panel-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--hair)', padding: 14, display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 20 }}>
          <IcInfo size={18} style={{ color: 'var(--cream-faint)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--cream-dim)' }}>
            Aanwezigheid kan wijzigen. Bel of reserveer vooraf om zeker te zijn dat {dame.name} aanwezig is op je bezoek.
          </p>
        </div>
      </div>

      {/* sticky action bar */}
      <div className="lg-actionbar">
        <a href={VENUE.telHref} style={{ textDecoration: 'none' }}>
          <Btn variant="dark" leftIcon={<IcPhone size={18} />}>Bel</Btn>
        </a>
        <Btn variant="primary" full onClick={reserve} rightIcon={<IcArrowR size={18} />}>Reserveer een avond</Btn>
      </div>
      <div style={{ height: 96 }} />
    </div>
  );
}

Object.assign(window, { DamesScreen, DameDetail });
