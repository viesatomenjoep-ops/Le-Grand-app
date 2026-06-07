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
  const { t } = useTranslation();
  const todayIdx = (new Date().getDay() + 6) % 7;
  const th = OPENING[todayIdx];
  return (
    <div>
      <div style={{ padding: (topInset + 8) + 'px 20px 18px', textAlign: 'center' }}>
        <div className="lg-eyebrow" style={{ fontSize: 16, letterSpacing: 1.5 }}>Saunaclub Le Grand · Zundert</div>
      </div>

      {/* Reserveren highlight */}
      <div style={{ padding: '0 18px' }}>
        <div className="lg-press" onClick={reserve} style={{ position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', cursor: 'pointer', background: 'var(--gold-grad)', padding: 18, color: '#231a06', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcCal size={24} /></div>
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 19, fontWeight: 700 }}>{t('btn_reserve')}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, opacity: 0.8, marginTop: 1 }}>{t('subtitle_reserve')}</div>
          </div>
          <IcArrowR size={20} />
          <div className="lg-gold-sheen" />
        </div>
      </div>

      {/* Informatie */}
      <div style={{ padding: '26px 18px 0' }}>
        <SectionHead title={t('info_title')} />
        <Card pad={6}>
          <MeerRow icon={<IcWaves size={20} />} label={t('fac_wellness')} sub={t('fac_wellness_sub')} onClick={() => openInfo('fac')} />
          <MeerRow icon={<IcGift size={20} />} label={t('rates')} sub={t('rates_sub')} onClick={() => openInfo('tar')} />
          <MeerRow icon={<IcClock size={20} />} label={t('opening_hours')} sub={t('opening_hours_sub')} onClick={() => openInfo('open')} />
          <MeerRow icon={<IcBriefcase size={20} />} label={t('vacatures_title')} sub={t('vacatures_sub')} onClick={openVacatures} last />
        </Card>
      </div>

      <div style={{ padding: '16px 0 0', display: 'flex', justifyContent: 'center', opacity: 0.6 }}>
        <img src="app/assets/legrand-logo.webp" alt="Le Grand" style={{ width: 100 }} />
      </div>

      {/* Snel naar */}
      <div style={{ padding: '32px 18px 0' }}>
        <SectionHead title={t('fast_to')} />
        <Card pad={6}>
          <MeerRow icon={<IcHeart size={20} />} label={t('dames_title')} sub={t('dames_sub')} onClick={() => go('dames')} />
          <MeerRow icon={<IcStar size={20} />} label={t('events_title')} sub={t('events_sub')} onClick={() => go('events')} />
          <MeerRow icon={<IcBag size={20} />} label={t('shop_title')} sub={t('shop_sub')} onClick={() => go('shop')} last />
        </Card>
      </div>

      {/* Voorkeuren */}
      <div style={{ padding: '24px 18px 0' }}>
        <SectionHead title={t('preferences')} />
        <Card pad={16} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>{t('choose_lang')}</div>
          <LanguageSelector />
        </Card>
      </div>

      {/* Contact */}
      <div style={{ padding: '24px 18px 0' }}>
        <SectionHead title={t('contact_title')} />
        <Card pad={0} style={{ overflow: 'hidden', marginBottom: 16 }}>
          <a href={VENUE.maps} target="_blank" rel="noreferrer" className="lg-press" style={{ display: 'block', position: 'relative' }}>
            <img src="app/assets/spa-photo.webp" alt="Le Grand" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            <div className="lg-hero-scrim" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }} />
            <div style={{ position: 'absolute', bottom: 12, left: 16, display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 16 }}>
              <IcPin size={18} style={{ color: 'var(--gold)' }} />
              {t('route_maps')}
            </div>
          </a>
          <div style={{ padding: '8px 16px' }}>
            <MeerRow icon={<IcPin size={20} />} label={VENUE.adres} sub={VENUE.plaats} onClick={() => window.open(VENUE.mapHref, '_blank')} />
            <MeerRow icon={<IcPhone size={20} />} label={VENUE.tel} sub={t('call_us')} onClick={() => window.location.href = VENUE.telHref} last />
          </div>
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
        <img src="app/assets/legrand-logo.webp" alt="Le Grand" style={{ width: 100, opacity: 0.85, margin: '0 auto' }} />
        <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--cream-faint)', letterSpacing: 0.3 }}>{t('access_18')}</p>
      </div>
      <TabSpacer />
    </div>
  );
}

Object.assign(window, { MeerScreen });
