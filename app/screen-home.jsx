// screen-home.jsx — Le Grand home
function todayHours() {
  const d = new Date().getDay(); // 0 Sun..6 Sat
  const idx = (d + 6) % 7; // 0 Mon..6 Sun
  return OPENING[idx];
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button className="lg-press" onClick={onClick} style={{
      flex: 1, minWidth: 0, background: 'var(--panel)', border: '1px solid var(--hair)',
      borderRadius: 'var(--r-md)', padding: '14px 8px 12px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--cream)'
    }}>
      <span style={{ color: 'var(--gold)' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, letterSpacing: 0.2 }}>{label}</span>
    </button>);

}

function DameMini({ dame, onClick }) {
  return (
    <button className="lg-press" onClick={onClick} style={{
      width: '100%', flexShrink: 0, background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer'
    }}>
      <div style={{ position: 'relative' }}>
        <Photo id={`home-dame-${dame.id}`} placeholder="Voeg foto toe" radius={16}
        style={{ width: '100%', height: 168, display: 'block' }} />
        {dame.nu &&
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
            <Tag tone="live"><LiveDot />Aanwezig</Tag>
          </div>
        }
        <div className="lg-photo-fade" />
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.1 }}>
          {dame.name}<span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--cream-faint)' }}>  ·  {dame.leeftijd}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-dim)', marginTop: 1 }}>{dame.land}</div>
      </div>
    </button>);
}

function FacRow({ f }) {
  return (
    <Card pad={13} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
      <ServiceIcon name={f.icon} size={44} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)' }}>{f.name}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: 0.3 }}>{f.meta}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', marginTop: 3, lineHeight: 1.45 }}>{f.desc}</div>
      </div>
    </Card>);

}

function GenericSlider({ items, renderItem, itemsPerSlide = 1 }) {
  const ref = React.useRef(null);
  const slides = [];
  for (let i = 0; i < items.length; i += itemsPerSlide) {
    slides.push(items.slice(i, i + itemsPerSlide));
  }
  const [idx, setIdx] = React.useState(0);
  const n = slides.length;

  const onScroll = () => {
    const el = ref.current; if (!el) return;
    setIdx(Math.max(0, Math.min(n - 1, Math.round(el.scrollLeft / el.clientWidth))));
  };
  const goTo = (i) => {
    const el = ref.current; if (!el) return;
    const t = Math.max(0, Math.min(n - 1, i));
    el.scrollTo({ left: t * el.clientWidth, behavior: 'smooth' });
  };

  const navBtn = { width: 34, height: 34, borderRadius: 10, background: 'var(--panel)', border: '1px solid var(--hair)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 };

  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} onScroll={onScroll} className="lg-hscroll" style={{ display: 'flex', scrollSnapType: 'x mandatory', marginLeft: -18, marginRight: -18, padding: '0 18px', scrollBehavior: 'smooth' }}>
        {slides.map((slideItems, i) => (
          <div key={i} style={{ flex: '0 0 100%', scrollSnapAlign: 'center', display: 'flex', gap: 14, boxSizing: 'border-box' }}>
            {slideItems.map((item, j) => renderItem(item, i * itemsPerSlide + j))}
          </div>
        ))}
      </div>
      {n > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16, alignItems: 'center' }}>
          <button className="lg-press" onClick={() => goTo(idx - 1)} style={navBtn}><IcChevL size={16} /></button>
          <button className="lg-press" onClick={() => goTo(idx + 1)} style={navBtn}><IcChevR size={16} /></button>
        </div>
      )}
    </div>
  );
}

function HomeScreen({ go, openDame, reserve, openEvent, openProduct }) {
  const th = todayHours();
  const featured = TARIEVEN.find((t) => t.featured) || TARIEVEN[0];
  const aanwezig = DAMES.filter((d) => d.nu);
  return (
    <div>
      {/* Hero */}
      <div style={{ position: 'relative', height: 430 }}>
        <Photo id="home-hero" radius={0} src="app/assets/spa-photo.webp" placeholder="Sfeerbeeld"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div className="lg-hero-scrim" />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 20px 26px' }}>
          <img src="app/assets/legrand-logo.webp" alt="Le Grand" style={{ width: 116, marginBottom: 'auto', marginTop: 60, filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.6))' }} />
          <div style={{ marginBottom: 12 }}>
            <Tag tone="live"><LiveDot />Nu geopend · tot {th.uren.split('–')[1].trim()}</Tag>
          </div>
          <h1 style={{ margin: 0, fontWeight: 500, fontSize: 38, lineHeight: 1.05, color: 'var(--cream)', letterSpacing: 0.3, fontFamily: 'var(--font-head)' }}>
            Een avond van<br /><span style={{ fontStyle: 'italic', color: 'var(--gold-light)', fontFamily: 'var(--font-head)' }}>pure verwennerij</span>
          </h1>
          <p style={{ margin: '12px 0 18px', fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.5, color: 'var(--cream-dim)', maxWidth: 320 }}>
            Exclusieve saunaclub in Zundert. Stijlvolle faciliteiten, charmant gezelschap en totale discretie.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="primary" onClick={reserve} rightIcon={<IcArrowR size={18} />}>Reserveren</Btn>
            <Btn variant="glass" onClick={() => go('dames')}>Onze dames</Btn>
          </div>
        </div>
      </div>

      <div style={{ padding: '22px 18px 0' }}>
        {/* Quick actions */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <QuickAction icon={<IcUsers size={23} />} label="Dames" onClick={() => go('dames')} />
          <QuickAction icon={<IcCal size={23} />} label="Reserveren" onClick={reserve} />
          <QuickAction icon={<IcMusic size={23} />} label="Events" onClick={() => go('events')} />
          <QuickAction icon={<IcBag size={23} />} label="Shop" onClick={() => go('shop')} />
        </div>

        {/* Aanwezig vandaag */}
        <SectionHead eyebrow="Vandaag in de club" title="Wie is er aanwezig" action="Alle dames" onAction={() => go('dames')} />
      </div>
      <div style={{ padding: '0 18px 4px' }}>
        <GenericSlider 
          items={[...aanwezig, { isMore: true }]} 
          itemsPerSlide={2} 
          renderItem={(d) => {
            if (d.isMore) {
              return (
                <button key="more" className="lg-press" onClick={() => go('dames')} style={{
                  flex: 1, height: 168, marginTop: 0,
                  background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 16,
                  color: 'var(--gold)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer'
                }}>
                  <IcArrowR size={22} /><span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600 }}>Bekijk alle</span>
                </button>
              );
            }
            return (
              <div key={d.id} style={{ flex: 1, minWidth: 0 }}>
                 <DameMini dame={d} onClick={() => openDame(d.id)} />
              </div>
            );
          }}
        />
      </div>

      <div style={{ padding: '30px 18px 0' }}>
        {/* Faciliteiten */}
        <SectionHead eyebrow="Onze wellness" title="Faciliteiten" action="Meer" onAction={() => go('meer')} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FACILITEITEN.slice(0, 3).map((f) => <FacRow key={f.id} f={f} />)}
        </div>
      </div>

      {/* Featured tarief */}
      <div style={{ padding: '30px 18px 0' }}>
        <div className="lg-press" onClick={reserve} style={{
          position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', cursor: 'pointer',
          background: 'var(--gold-grad)', padding: 20, color: '#231a06'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.7 }}>Meest gekozen</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 26 }}>{featured.name}</h3>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, marginTop: 2, opacity: 0.8 }}>{featured.sub}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 34 }}>€{featured.price}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, opacity: 0.75 }}>{featured.unit}</span>
              </div>
              <span className="lg-goldcta">Reserveer<IcArrowR size={17} /></span>
            </div>
          </div>
          <div className="lg-gold-sheen" />
        </div>
      </div>

      {/* Events */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow="Binnenkort" title="Events" action="Alle events" onAction={() => go('events')} />
        <GenericSlider
          items={EVENTS}
          itemsPerSlide={1}
          renderItem={(e) => (
            <Card key={e.id} pad={16} onClick={() => openEvent(e.id)} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Tag tone="gold">{e.tag}</Tag>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-faint)' }}>{e.datum}</span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 20, color: 'var(--cream)' }}>{e.titel}</h3>
              <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.5, color: 'var(--cream-dim)' }}>{e.desc.slice(0, 92)}…</p>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 7, color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600 }}>
                <IcClock size={15} />{e.tijd}
              </div>
            </Card>
          )}
        />
      </div>

      {/* Webshop teaser */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow="Webshop" title="Mee naar huis" action="Naar winkel" onAction={() => go('shop')} />
        <GenericSlider
          items={PRODUCTS}
          itemsPerSlide={2}
          renderItem={(p) => (
            <button key={p.id} className="lg-press" onClick={() => openProduct(p.id)} style={{ flex: 1, minWidth: 0, background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 'var(--r-lg)', overflow: 'hidden', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
              <Photo id={`home-prod-${p.slot}`} placeholder={p.naam} radius={0} style={{ width: '100%', height: 120, display: 'block' }} />
              <div style={{ padding: 12 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.naam}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--gold)', marginTop: 4 }}>€{p.prijs}</div>
              </div>
            </button>
          )}
        />
      </div>

      {/* Reviews */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow="Gastervaringen" title="Wat gasten zeggen" />
        <ReviewsSlider />
      </div>

      {/* Locatie mini */}
      <div style={{ padding: '24px 18px 0' }}>
        <Card pad={16} onClick={() => go('meer')} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <ServiceIcon name="gift" size={44} tone="panel" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 15.5, fontWeight: 600, color: 'var(--cream)' }}>{VENUE.adres}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', marginTop: 2 }}>Vandaag · {th.dag} {th.uren}</div>
          </div>
          <IcChevR size={18} style={{ color: 'var(--cream-faint)' }} />
        </Card>
      </div>

      <TabSpacer />
    </div>);

}

Object.assign(window, { HomeScreen });