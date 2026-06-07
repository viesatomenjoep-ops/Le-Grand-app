// screen-events.jsx — Events list (tab) + Event detail (overlay)

function EventCard({ ev, onClick }) {
  return (
    <button className="lg-press" onClick={onClick} style={{
      width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
    }}>
      <div style={{ position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <Photo id={`event-${ev.id}`} fit="contain" placeholder={ev.titel} radius={20} src={ev.img}
          style={{ width: '100%', height: 196, display: 'block' }} />
        <div className="lg-photo-fade" />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8 }}>
          <Tag tone="solid">{ev.tag}</Tag>
          {ev.terugkerend && <Tag tone="glass"><LiveDot color="#E6C079" />Wekelijks</Tag>}
        </div>
        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 12 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 600, color: '#fff', lineHeight: 1.05 }}>{ev.titel}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', fontSize: 12.5 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><IcCal size={14} style={{ color: 'var(--gold-light)' }} />{ev.datum}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><IcClock size={14} style={{ color: 'var(--gold-light)' }} />{ev.tijd}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function EventsScreen({ openEvent, topInset }) {
  return (
    <div>
      <div style={{ padding: (topInset + 8) + 'px 20px 4px' }}>
        <div className="lg-eyebrow">Saunaclub Le Grand</div>
        <h1 style={{ margin: '2px 0 12px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 34, color: 'var(--cream)', letterSpacing: 0.3 }}>Events</h1>
        <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--cream-dim)' }}>{EVENTS_INTRO}</p>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {EVENTS.map(ev => <EventCard key={ev.id} ev={ev} onClick={() => openEvent(ev.id)} />)}
      </div>

      <div style={{ padding: '26px 18px 0' }}>
        <div style={{ background: 'var(--panel-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--hair)', padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <IcMusic size={20} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--cream-dim)' }}>
            Naast onze events ben je tijdens alle reguliere openingstijden van harte welkom. Reserveren is aanbevolen op drukke avonden.
          </p>
        </div>
      </div>
      <TabSpacer />
    </div>
  );
}

function EventDetail({ ev, onBack, go }) {
  return (
    <div>
      <div style={{ position: 'relative', height: 360 }}>
        <Photo id={`event-hero-${ev.id}`} fit="contain" radius={0} placeholder={ev.titel} src={ev.img}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div className="lg-hero-scrim" />
        <button className="lg-press lg-glassbtn" onClick={onBack} style={{ position: 'absolute', top: 58, left: 16 }}><IcChevL size={20} /></button>
        <div style={{ position: 'absolute', left: 20, right: 20, bottom: 20 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <Tag tone="solid">{ev.tag}</Tag>
            {ev.terugkerend && <Tag tone="glass"><LiveDot color="#E6C079" />Elke vr & za</Tag>}
          </div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 34, color: '#fff', lineHeight: 1.05 }}>{ev.titel}</h1>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <Card pad={16} style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <Bit icon={<IcCal size={17} />} label="Wanneer" value={ev.wanneer} />
          <div style={{ width: 1, background: 'var(--hair)' }} />
          <Bit icon={<IcClock size={17} />} label="Tijd" value={ev.tijd} />
          <div style={{ width: 1, background: 'var(--hair)' }} />
          <Bit icon={<IcPin size={17} />} label="Locatie" value="Zundert" />
        </Card>
        <p style={{ margin: '0 0 22px', fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--cream-dim)' }}>{ev.desc}</p>
      </div>

      <div className="lg-actionbar">
        <Btn variant="primary" full onClick={() => go('reserveren')} rightIcon={<IcArrowR size={18} />}>Reserveer voor deze avond</Btn>
      </div>
      <div style={{ height: 96 }} />
    </div>
  );
}

function Bit({ icon, label, value }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: 'var(--gold)', marginBottom: 6 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--cream-faint)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, color: 'var(--cream)', marginTop: 2, lineHeight: 1.2 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { EventsScreen, EventDetail });
