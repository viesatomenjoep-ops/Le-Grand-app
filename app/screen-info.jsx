// screen-info.jsx — Bezoek & info: faciliteiten, tarieven, openingstijden, contact
function InfoScreen({ onBack }) {
  const { t } = useTranslation();
  const todayIdx = (new Date().getDay() + 6) % 7;

  const facNameMap = { 'Finse Sauna': 'finnish_sauna', 'Stoombad': 'steam_bath', 'Jacuzzi': 'jacuzzi', 'Verwarmd Zwembad': 'heated_pool', 'Bar & Lounge': 'bar_lounge', 'Privé Suites': 'priv_suites' };
  const facDescMap = { 'Finse Sauna': 'finnish_sauna_desc', 'Stoombad': 'steam_bath_desc', 'Jacuzzi': 'jacuzzi_desc', 'Verwarmd Zwembad': 'heated_pool_desc', 'Bar & Lounge': 'bar_lounge_desc', 'Privé Suites': 'priv_suites_desc' };
  const tarNameMap = { 'Dagentree': 'day_entry', 'Happy Hours': 'happy_hours', 'Privé Suite': 'priv_suites' };
  const tarSubMap = { 'Hele dag · all-in': 'all_day', 'Ma–do vanaf 11:00': 'mo_th_from', 'Per 2 uur': 'per_2_hours' };
  const tarUnitMap = { 'p.p.': 'pp', 'per suite': 'per_suite' };

  return (
    <div>
      <OverlayHeader title={t('info_title')} onBack={onBack} />

      {/* Faciliteiten */}
      <div style={{ padding: '6px 18px 0' }}>
        <SectionHead eyebrow={t('our_wellness')} title={t('facilities')} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FACILITEITEN.map(f => (
            <Card key={f.id} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <ServiceIcon name={f.icon} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)' }}>{t(facNameMap[f.name] || f.name)}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: 0.3 }}>{f.meta === '6 kamers' ? t('six_rooms') : f.meta}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', marginTop: 3, lineHeight: 1.45 }}>{t(facDescMap[f.name] || f.desc)}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tarieven */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow={t('all_in_concept')} title={t('rates')} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TARIEVEN.map(tData => {
            const pkMap = {
              'Badjas, handdoek & slippers': 'inc_bathrobe', 'Onbeperkt fris, bier, wijn & buffet': 'inc_drinks', 'Alle sauna’s, jacuzzi & zwembad': 'inc_saunas',
              'Volledige toegang faciliteiten': 'full_access', 'Badjas & handdoek inbegrepen': 'inc_bathrobe_only', 'All-in drankjes': 'all_in_drinks',
              'Eigen jacuzzi & lounge': 'own_jacuzzi', 'Fles champagne': 'bottle_champagne', 'Volledig discreet': 'fully_discreet'
            };
            return (
            <Card key={tData.id} pad={17} style={tData.featured ? { border: '1px solid var(--gold-line)', background: 'var(--gold-glow)' } : {}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {tData.featured && <div style={{ marginBottom: 7 }}><Tag tone="solid">{t('recommended')}</Tag></div>}
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 600, lineHeight: 1.1, color: 'var(--cream)' }}>{t(tarNameMap[tData.name] || tData.name)}</h3>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', marginTop: 3 }}>{t(tarSubMap[tData.sub] || tData.sub)}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 25, fontWeight: 700, lineHeight: 1, color: 'var(--gold)' }}>€{tData.price}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--cream-faint)', marginTop: 3 }}>{t(tarUnitMap[tData.unit] || tData.unit)}</div>
                </div>
              </div>
              <div style={{ marginTop: 13, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {tData.perks.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-dim)' }}>
                    <IcCheck size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />{t(pkMap[p] || p)}
                  </div>
                ))}
              </div>
            </Card>
            );
          })}
        </div>
      </div>

      {/* Openingstijden */}
      <div style={{ padding: '30px 18px 0' }}>
        <SectionHead eyebrow={t('open_7_days')} title={t('opening_hours')} />
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
        <SectionHead eyebrow={t('find_us')} title={t('loc_contact')} />
        <Card pad={0} style={{ overflow: 'hidden' }}>
          <a href={VENUE.maps} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="lg-map" style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
              <img src="app/assets/spa-photo.webp" alt="Locatie" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div className="lg-map-pin" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}><IcPin size={20} /></div>
              <span className="lg-glassbtn" style={{ position: 'absolute', right: 12, bottom: 12, width: 'auto', padding: '0 14px', height: 36, fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, gap: 6, zIndex: 1 }}>{t('open_maps')}<IcArrowR size={15} /></span>
            </div>
          </a>
          <div style={{ padding: 16 }}>
            <ContactRow icon={<IcPin size={18} />} label={VENUE.adres} sub="Zundert, Noord-Brabant" href={VENUE.maps} />
            <Sep />
            <ContactRow icon={<IcPhone size={18} />} label={VENUE.tel} sub={t('call_res')} href={VENUE.telHref} />
            <Sep />
            <ContactRow icon={<IcBell size={18} />} label={VENUE.email} sub={t('send_msg')} href={'mailto:' + VENUE.email} />
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
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, color: 'var(--cream)' }}>{t('access_18_short')}</div>
            <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--cream-dim)' }}>
              {t('id_required')}
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
