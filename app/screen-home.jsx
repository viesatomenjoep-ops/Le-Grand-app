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
      <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, letterSpacing: 0.2 }}>{label}</span>
    </button>);

}

function DameMini({ dame, onClick, height = 168 }) {
  const { t } = useTranslation();
  const cMap = { 'Roemenië': 'c_ro', 'Frankrijk': 'c_fr', 'Spanje': 'c_es', 'Colombia': 'c_co', 'Moldavië': 'c_md', 'Turkije': 'c_tr', 'Bulgarije': 'c_bg' };
  const landStr = cMap[dame.land] ? t(cMap[dame.land]) : dame.land;
  return (
    <div className="lg-press" onClick={onClick} style={{
      width: '100%', flexShrink: 0, background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer'
    }}>
      <div style={{ position: 'relative' }}>
        <Photo id={`home-dame-${dame.id}`} placeholder="Voeg foto toe" radius={16} src={dame.img}
        style={{ width: '100%', height, display: 'block' }} />
        {dame.nu &&
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
            <Tag tone="live"><LiveDot />{t('present')}</Tag>
          </div>
        }
        <div className="lg-photo-fade" />
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.1 }}>
          {dame.name}<span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--cream-faint)' }}>  ·  {dame.leeftijd}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-dim)', marginTop: 1 }}>{landStr}</div>
      </div>
    </div>);
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

function GenericSlider({ items, renderItem }) {
  const ref = React.useRef(null);
  
  const scrollL = () => {
    if (ref.current) ref.current.scrollBy({ left: -(ref.current.clientWidth + 16), behavior: 'smooth' });
  };
  const scrollR = () => {
    if (ref.current) ref.current.scrollBy({ left: ref.current.clientWidth + 16, behavior: 'smooth' });
  };

  const navBtn = { width: 34, height: 34, borderRadius: 10, background: 'var(--panel)', border: '1px solid var(--hair)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 };

  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} className="lg-hscroll" style={{ display: 'flex', scrollSnapType: 'x mandatory', gap: 16 }}>
        {items.map((item, i) => (
          <div key={i} style={{ scrollSnapAlign: 'start', flex: '0 0 100%', boxSizing: 'border-box' }}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16, alignItems: 'center' }}>
          <button className="lg-press" onClick={scrollL} style={navBtn}><IcChevL size={16} /></button>
          <button className="lg-press" onClick={scrollR} style={navBtn}><IcChevR size={16} /></button>
        </div>
      )}
    </div>
  );
}

function CrowdMeter() {
  const { t } = useTranslation();
  // We simulate a crowd level (could be dynamic)
  const fill = 65; 
  return (
    <Card pad={16} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LiveDot />
            <span style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)' }}>{t('crowd_title')}</span>
         </div>
         <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--gold)' }}>{t('crowd_moderate')}</span>
      </div>
      <div style={{ height: 8, background: 'var(--panel-3)', borderRadius: 4, overflow: 'hidden' }}>
         <div style={{ height: '100%', width: `${fill}%`, background: 'var(--gold-grad)', borderRadius: 4 }} />
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)' }}>
         {t('crowd_moderate_desc')}
      </div>
    </Card>
  );
}

function HomeScreen({ go, openDame, reserve, openEvent, openProduct }) {
  const { t } = useTranslation();
  const th = todayHours();
  const featured = TARIEVEN.find((t) => t.featured) || TARIEVEN[0];
  const aanwezig = DAMES.filter((d) => d.nu);

  const facNameMap = { 'Finse Sauna': 'finnish_sauna', 'Stoombad': 'steam_bath', 'Jacuzzi': 'jacuzzi', 'Verwarmd Zwembad': 'heated_pool', 'Bar & Lounge': 'bar_lounge', 'Privé Suites': 'priv_suites' };
  const facDescMap = { 'Finse Sauna': 'finnish_sauna_desc', 'Stoombad': 'steam_bath_desc', 'Jacuzzi': 'jacuzzi_desc', 'Verwarmd Zwembad': 'heated_pool_desc', 'Bar & Lounge': 'bar_lounge_desc', 'Privé Suites': 'priv_suites_desc' };
  const tarNameMap = { 'Dagentree': 'day_entry', 'Happy Hours': 'happy_hours', 'Privé Suite': 'priv_suites' };
  const tarSubMap = { 'Hele dag · all-in': 'all_day', 'Ma–do vanaf 11:00': 'mo_th_from', 'Per 2 uur': 'per_2_hours' };
  const tarUnitMap = { 'p.p.': 'pp', 'per suite': 'per_suite' };
  const evTagMap = { 'Vaste avond': 'regular_night', 'Buiten': 'outside', 'Thema-avond': 'theme_night' };
  const evTitleMap = { 'Strippers Night': 'strippers_night', 'BBQ Time bij Le Grand': 'bbq_time', 'Orange Summer Party': 'orange_party' };
  const evDescMap = { 'Strippers Night': 'strippers_night_desc', 'BBQ Time bij Le Grand': 'bbq_time_desc', 'Orange Summer Party': 'orange_party_desc' };
  const evDatumMap = { 'Wekelijks': 'weekly', 'Op aankondiging': 'on_announcement' };
  const prodNameMap = { 'Le Grand Badjas': 'bathrobe', 'Badslippers': 'slippers' };

  return (
    <div>
      {/* Full-screen Hero + Quick Actions */}
      <div style={{ position: 'relative', minHeight: 420, display: 'flex', flexDirection: 'column', marginBottom: 0 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Photo id="home-hero" radius={0} src="app/assets/spa-photo.webp" placeholder="Sfeerbeeld"
          style={{ width: '100%', height: '100%', objectPosition: 'top' }} />
          <div className="lg-hero-scrim" />
        </div>
        
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 20px 0' }}>
          <img src="app/assets/legrand-logo.webp" alt="Le Grand" style={{ width: 95, marginBottom: 10, filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.6))' }} />
          <div style={{ marginBottom: 10 }}>
            <Tag tone="live"><LiveDot />{t('now_open')} · {t('until')} {th.uren.split('–')[1].trim()}</Tag>
          </div>
          <div style={{
            background: 'rgba(15, 12, 8, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '16px 20px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            maxWidth: 340,
            marginTop: 6
          }}>
            <h1 style={{ margin: 0, fontWeight: 500, fontSize: 30, lineHeight: 1.1, color: 'var(--cream)', letterSpacing: 0.3, fontFamily: 'var(--font-head)' }}>
              {t('home_title1')}<br /><span style={{ fontStyle: 'italic', color: 'var(--gold-light)', fontFamily: 'var(--font-head)' }}>{t('home_title2')}</span>
            </h1>
            <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.4, color: 'var(--cream-dim)' }}>
              {t('home_subtitle')}
            </p>
          </div>

          <div style={{ marginTop: 24, marginBottom: 14, display: 'flex', gap: 10, width: '100%' }}>
            <Btn variant="primary" onClick={reserve} size="lg" style={{ flex: 1, fontSize: 15 }} rightIcon={<IcArrowR size={18} />}>{t('btn_reserve')}</Btn>
            <Btn variant="glass" onClick={() => go('dames')} size="lg" style={{ flex: 1, fontSize: 15 }}>{t('dames_title')}</Btn>
          </div>

          <div style={{ paddingBottom: '24px', display: 'flex', gap: 8, width: '100%' }}>
            <QuickAction icon={<IcHeart size={21} />} label={t('nav_dames')} onClick={() => go('dames')} />
            <QuickAction icon={<IcCal size={21} />} label={t('btn_reserve')} onClick={reserve} />
            <QuickAction icon={<IcStar size={21} />} label={t('nav_events')} onClick={() => go('events')} />
            <QuickAction icon={<IcBag size={21} />} label={t('nav_shop')} onClick={() => go('shop')} />
          </div>
        </div>
      </div>
      <div style={{ padding: '0 18px 4px' }}>
        {/* Crowd Meter */}
        <CrowdMeter />
        
        {/* Aanwezig vandaag */}
        <div style={{ marginTop: 24 }} />
        <SectionHead eyebrow={t('today_in_club')} title={t('who_is_present')} action={t('all_ladies')} onAction={() => go('dames')} />
        <GenericSlider 
          items={[...aanwezig, { isMore: true }]} 
          renderItem={(d) => {
            if (d.isMore) {
              return (
                <button key="more" className="lg-press" onClick={() => go('dames')} style={{
                  width: '100%', height: 380, marginTop: 0,
                  background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 16,
                  color: 'var(--gold)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer'
                }}>
                  <IcArrowR size={22} /><span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600 }}>{t('view_all')}</span>
                </button>
              );
            }
            return (
              <div key={d.id} style={{ width: '100%' }}>
                 <DameMini dame={d} onClick={() => openDame(d.id)} height={380} />
              </div>
            );
          }}
        />
      </div>

      <div style={{ padding: '30px 18px 0' }}>
        {/* Faciliteiten */}
        <SectionHead eyebrow={t('our_wellness')} title={t('facilities')} action={t('nav_meer')} onAction={() => go('meer')} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FACILITEITEN.slice(0, 3).map((f) => <FacRow key={f.id} f={{...f, name: t(facNameMap[f.name] || f.name), desc: t(facDescMap[f.name] || f.desc)}} />)}
        </div>
      </div>

      {/* Featured tarief */}
      <div style={{ padding: '30px 18px 0' }}>
        <div className="lg-press" onClick={reserve} style={{
          position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', cursor: 'pointer',
          background: 'var(--gold-grad)', padding: 20, color: '#231a06'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.7 }}>{t('most_chosen')}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 26 }}>{t(tarNameMap[featured.name] || featured.name)}</h3>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, marginTop: 2, opacity: 0.8 }}>{t(tarSubMap[featured.sub] || featured.sub)}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 34 }}>€{featured.price}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, opacity: 0.75 }}>{t(tarUnitMap[featured.unit] || featured.unit)}</span>
              </div>
              <span className="lg-goldcta">{t('btn_reserve').split(' ')[0]}<IcArrowR size={17} /></span>
            </div>
          </div>
          <div className="lg-gold-sheen" />
        </div>
      </div>

      {/* Events */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow={t('soon')} title={t('events_title')} action={t('all_events')} onAction={() => go('events')} />
        <GenericSlider
          items={EVENTS}
          renderItem={(e) => (
            <button key={e.id} className="lg-press" onClick={() => openEvent(e.id)} style={{ width: '100%', background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 'var(--r-lg)', overflow: 'hidden', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
              <div style={{ position: 'relative', height: 160, width: '100%' }}>
                {e.img ? (
                  <img src={e.img} alt={e.titel} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(150deg, #211b12, #14110b)' }} />
                )}
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <Tag tone="gold">{t(evTagMap[e.tag] || e.tag)}</Tag>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-faint)' }}>{t(evDatumMap[e.datum] || e.datum)}</span>
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 20, color: 'var(--cream)' }}>{t(evTitleMap[e.titel] || e.titel)}</h3>
                <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.5, color: 'var(--cream-dim)' }}>{t(evDescMap[e.titel] || e.desc).slice(0, 92)}…</p>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 7, color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600 }}>
                  <IcClock size={15} />{e.tijd}
                </div>
              </div>
            </button>
          )}
        />
      </div>

      {/* Webshop teaser */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow={t('webshop')} title={t('take_home')} action={t('to_shop')} onAction={() => go('shop')} />
        <GenericSlider
          items={PRODUCTS}
          renderItem={(p) => (
            <button key={p.id} className="lg-press" onClick={() => openProduct(p.id)} style={{ width: '100%', background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 'var(--r-lg)', overflow: 'hidden', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
              <div style={{ padding: 12 }}>
                <Photo id={`home-prod-${p.slot}`} fit="contain" placeholder={t(prodNameMap[p.naam] || p.naam)} radius={12} src={p.img} style={{ width: '100%', height: 240, display: 'block' }} />
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t(prodNameMap[p.naam] || p.naam)}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--gold)', marginTop: 4 }}>€{p.prijs}</div>
              </div>
            </button>
          )}
        />
      </div>

      {/* Reviews */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow={t('guest_exp')} title={t('what_guests_say')} />
        <ReviewsSlider />
      </div>

      {/* Locatie mini */}
      <div style={{ padding: '24px 18px 0' }}>
        <Card pad={16} onClick={() => go('meer')} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <ServiceIcon name="gift" size={44} tone="panel" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 15.5, fontWeight: 600, color: 'var(--cream)' }}>{VENUE.adres}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', marginTop: 2 }}>{t('today')} · {th.dag} {th.uren}</div>
          </div>
          <IcChevR size={18} style={{ color: 'var(--cream-faint)' }} />
        </Card>
        <div style={{ textAlign: 'center', marginTop: 32, opacity: 0.6 }}>
          <img src="app/assets/legrand-logo.webp" alt="Le Grand" style={{ width: 100 }} />
        </div>
      </div>

      <TabSpacer />
    </div>
  );
}

Object.assign(window, { HomeScreen });