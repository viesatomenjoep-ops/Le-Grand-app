// screen-reserveren.jsx — booking flow: datum → tijd → arrangement → bevestigen

function Stepper({ step, labels }) {
  return (
    <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
      {labels.map((l, i) => (
        <React.Fragment key={l}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, opacity: i <= step ? 1 : 0.4 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 999, fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i < step ? 'var(--gold-grad)' : (i === step ? 'var(--gold-grad)' : 'transparent'),
              color: i <= step ? '#1c1505' : 'var(--cream-faint)',
              border: i <= step ? 'none' : '1px solid var(--hair-strong)',
            }}>{i < step ? '✓' : i + 1}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: i <= step ? 'var(--cream)' : 'var(--cream-faint)' }}>{l}</span>
          </div>
          {i < labels.length - 1 && <div style={{ flex: 1, height: 1, background: 'var(--hair)', minWidth: 8 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Calendar({ value, onPick }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [view, setView] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const y = view.getFullYear(), m = view.getMonth();
  const firstDow = (new Date(y, m, 1).getDay() + 6) % 7; // Mon=0
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(y, m, d));
  const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
  const navOk = new Date(y, m, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  return (
    <Card pad={16}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <button className="lg-press" disabled={!navOk} onClick={() => setView(new Date(y, m - 1, 1))} style={{ background: 'var(--panel-3)', border: '1px solid var(--hair)', borderRadius: 10, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', opacity: navOk ? 1 : 0.3, cursor: 'pointer' }}><IcChevL size={17} /></button>
        <span style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 600, color: 'var(--cream)', textTransform: 'capitalize' }}>{MONTHS_NL[m]} {y}</span>
        <button className="lg-press" onClick={() => setView(new Date(y, m + 1, 1))} style={{ background: 'var(--panel-3)', border: '1px solid var(--hair)', borderRadius: 10, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', cursor: 'pointer' }}><IcChevR size={17} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 6 }}>
        {DAYS_NL.map(d => <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--cream-faint)', textTransform: 'capitalize' }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
        {cells.map((c, i) => {
          if (!c) return <div key={i} />;
          const past = c < today;
          const sel = sameDay(c, value);
          const isToday = sameDay(c, today);
          return (
            <button key={i} className="lg-press" disabled={past} onClick={() => onPick(c)} style={{
              aspectRatio: '1', borderRadius: 11, cursor: past ? 'default' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: sel ? 700 : 500,
              background: sel ? 'var(--gold-grad)' : 'transparent',
              color: sel ? '#1c1505' : (past ? 'var(--cream-faint)' : 'var(--cream)'),
              border: isToday && !sel ? '1px solid var(--gold-line)' : '1px solid transparent',
              opacity: past ? 0.35 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{c.getDate()}</button>
          );
        })}
      </div>
    </Card>
  );
}

function StepperNum({ value, set, min = 1, max = 8 }) {
  const btn = (dis, on, ic) => (
    <button className="lg-press" disabled={dis} onClick={on} style={{
      width: 42, height: 42, borderRadius: 12, background: 'var(--panel-3)', border: '1px solid var(--hair-strong)',
      color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: dis ? 0.3 : 1, cursor: 'pointer',
    }}>{ic}</button>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {btn(value <= min, () => set(value - 1), <IcMinus size={18} />)}
      <span style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 600, color: 'var(--cream)' }}>{value} {value === 1 ? 'gast' : 'gasten'}</span>
      {btn(value >= max, () => set(value + 1), <IcPlus size={18} />)}
    </div>
  );
}

function ReserverenScreen({ go, topInset }) {
  const [step, setStep] = React.useState(0);
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [pers, setPers] = React.useState(2);
  const [arr, setArr] = React.useState(null);
  const [naam, setNaam] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [done, setDone] = React.useState(false);

  const labels = ['Datum', 'Tijd', 'Arrangement', 'Bevestig'];
  const arrangement = TARIEVEN.find(t => t.id === arr);
  const fmtDate = (d) => d ? `${d.getDate()} ${MONTHS_NL[d.getMonth()]}` : '';
  const canNext = [date, time, arr, naam && tel][step];

  if (done) {
    return (
      <div style={{ padding: (topInset + 30) + 'px 24px 0', textAlign: 'center', minHeight: 560, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="lg-check"><IcCheck size={40} /></div>
        <h1 style={{ margin: '24px 0 8px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 30, color: 'var(--cream)' }}>Aanvraag verzonden</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--cream-dim)', maxWidth: 300 }}>
          Bedankt, {naam.split(' ')[0] || 'gast'}. We bevestigen je reservering binnen 24 uur per telefoon.
        </p>
        <Card pad={18} style={{ width: '100%', maxWidth: 320, margin: '26px 0', textAlign: 'left' }}>
          <Row k="Reserveringsnr." v={'LG-' + Math.floor(1000 + Math.random() * 9000)} />
          <Sep />
          <Row k="Datum" v={`${fmtDate(date)} · ${time}`} />
          <Sep />
          <Row k="Gezelschap" v={`${pers} ${pers === 1 ? 'gast' : 'gasten'}`} />
          <Sep />
          <Row k="Arrangement" v={arrangement?.name} gold />
        </Card>
        <Btn variant="primary" full onClick={() => go('home')}>Terug naar home</Btn>
        <button className="lg-press" onClick={() => { setDone(false); setStep(0); setDate(null); setTime(null); setArr(null); setNaam(''); setTel(''); }} style={{ marginTop: 14, background: 'none', border: 'none', color: 'var(--cream-dim)', fontFamily: 'var(--font-body)', fontSize: 13.5, cursor: 'pointer' }}>Nieuwe reservering</button>
        <TabSpacer />
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: (topInset + 6) + 'px 20px 16px', position: 'sticky', top: 0, background: 'var(--bg-grad-top)', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <button className="lg-press" onClick={() => step === 0 ? go('home') : setStep(step - 1)} style={{ background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 12, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', cursor: 'pointer', flexShrink: 0 }}><IcChevL size={18} /></button>
          <div>
            <div className="lg-eyebrow" style={{ margin: 0 }}>Stap {step + 1} van 4 · {labels[step]}</div>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 26, color: 'var(--cream)' }}>Reserveren</h1>
          </div>
        </div>
        <Stepper step={step} labels={labels} />
      </div>

      <div style={{ padding: '6px 18px 0' }}>
        {step === 0 && (
          <div>
            <Calendar value={date} onPick={setDate} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--cream-dim)', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
              Reserveringen zijn mogelijk tot 2 uur voor sluiting.
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }}>
              {SLOT_TIMES.map(t => {
                const full = FULL_SLOTS.includes(t);
                const busy = BUSY_SLOTS.includes(t);
                const sel = time === t;
                return (
                  <button key={t} className="lg-press" disabled={full} onClick={() => setTime(t)} style={{
                    padding: '15px 12px', borderRadius: 14, cursor: full ? 'default' : 'pointer', textAlign: 'left',
                    background: sel ? 'var(--gold-glow)' : 'var(--panel)',
                    border: '1px solid ' + (sel ? 'var(--gold)' : 'var(--hair)'), opacity: full ? 0.45 : 1,
                  }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 19, fontWeight: 600, color: sel ? 'var(--gold)' : 'var(--cream)' }}>{t}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 600, marginTop: 3, color: full ? 'var(--cream-faint)' : busy ? '#D9A441' : '#7FC98E' }}>
                      {full ? 'Volgeboekt' : busy ? 'Bijna vol' : 'Beschikbaar'}
                    </div>
                  </button>
                );
              })}
            </div>
            <SectionHead title="Gezelschap" />
            <Card pad={16}><StepperNum value={pers} set={setPers} /></Card>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TARIEVEN.map(t => {
              const sel = arr === t.id;
              return (
                <button key={t.id} className="lg-press" onClick={() => setArr(t.id)} style={{
                  textAlign: 'left', cursor: 'pointer', borderRadius: 'var(--r-lg)', padding: 17,
                  background: sel ? 'var(--gold-glow)' : 'var(--panel)',
                  border: '1px solid ' + (sel ? 'var(--gold)' : 'var(--hair)'), position: 'relative',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {t.featured && <div style={{ marginBottom: 7 }}><Tag tone="solid">Meest gekozen</Tag></div>}
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
                </button>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div>
            <Card pad={18} style={{ marginBottom: 16 }}>
              <Row k="Datum" v={`${fmtDate(date)} · ${time}`} />
              <Sep />
              <Row k="Gezelschap" v={`${pers} ${pers === 1 ? 'gast' : 'gasten'}`} />
              <Sep />
              <Row k="Arrangement" v={arrangement?.name} gold />
              <Sep />
              <Row k="Totaal indicatie" v={`€${arrangement ? arrangement.price * (arrangement.unit === 'p.p.' ? pers : 1) : 0}`} big />
            </Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
              <Field label="Naam" value={naam} onChange={setNaam} placeholder="Voor- en achternaam" />
              <Field label="Telefoon" value={tel} onChange={setTel} placeholder="+31 6 ..." type="tel" />
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--cream-faint)', lineHeight: 1.5, marginTop: 4 }}>
              Door te bevestigen ga je akkoord met onze huisregels. Je gegevens worden vertrouwelijk behandeld.
            </p>
          </div>
        )}
      </div>

      <div className="lg-actionbar">
        <Btn variant="primary" full disabled={!canNext}
          onClick={() => step < 3 ? setStep(step + 1) : setDone(true)}
          rightIcon={step < 3 ? <IcArrowR size={18} /> : null}>
          {step < 3 ? 'Doorgaan' : 'Bevestig reservering'}
        </Btn>
      </div>
      <div style={{ height: 96 }} />
    </div>
  );
}

function Row({ k, v, gold, big }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--cream-dim)', flexShrink: 0 }}>{k}</span>
      <span style={{ fontFamily: 'var(--font-head)', fontSize: big ? 19 : 15, fontWeight: big ? 700 : 600, color: gold || big ? 'var(--gold)' : 'var(--cream)', textAlign: 'right', whiteSpace: 'nowrap' }}>{v}</span>
    </div>
  );
}
function Sep() { return <div style={{ height: 1, background: 'var(--hair)', margin: '11px 0' }} />; }
function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--cream-faint)' }}>{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="lg-input" />
    </label>
  );
}

Object.assign(window, { ReserverenScreen });
