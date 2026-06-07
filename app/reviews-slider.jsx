// reviews-slider.jsx — swipeable Google-reviews carousel for the home screen
function GoogleMark({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8Z"/>
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5H1.2v3.1C3.2 21.3 7.3 24 12 24Z"/>
      <path fill="#FBBC05" d="M5.2 14.3c-.3-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3V6.6H1.2C.4 8.2 0 10 0 12s.4 3.8 1.2 5.4l4-3.1Z"/>
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.1 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.6l4 3.1c1-2.9 3.7-4.9 6.8-4.9Z"/>
    </svg>
  );
}

function ReviewsSlider() {
  const ref = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const n = REVIEWS.length;

  const onScroll = () => {
    const el = ref.current; if (!el) return;
    setIdx(Math.max(0, Math.min(n - 1, Math.round(el.scrollLeft / el.clientWidth))));
  };
  const goTo = (i) => {
    const el = ref.current; if (!el) return;
    const t = Math.max(0, Math.min(n - 1, i));
    el.scrollTo({ left: t * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Aggregate header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <GoogleMark size={26} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--cream)' }}>{GOOGLE.rating.toFixed(1)}</span>
            <Stars n={5} size={14} />
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--cream-dim)', marginTop: 1 }}>Op basis van {GOOGLE.count}+ Google-reviews</div>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button className="lg-press" onClick={() => goTo(idx - 1)} style={navBtn}><IcChevL size={16} /></button>
          <button className="lg-press" onClick={() => goTo(idx + 1)} style={navBtn}><IcChevR size={16} /></button>
        </div>
      </div>

      {/* Track */}
      <div ref={ref} onScroll={onScroll} className="lg-revtrack">
        {REVIEWS.map((r, i) => (
          <div key={i} className="lg-revslide">
            <Card pad={18} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stars n={r.stars} size={15} />
                <GoogleMark size={15} />
              </div>
              <p style={{ margin: '13px 0 16px', fontFamily: 'var(--font-head)', fontStyle: 'italic', fontWeight: 500, fontSize: 16.5, lineHeight: 1.5, color: 'var(--cream)', flex: 1 }}>
                “{r.text}”
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 38, height: 38, borderRadius: 99, background: 'var(--gold-grad)', color: '#1c1505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 700, flexShrink: 0 }}>{r.name[0]}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, color: 'var(--cream)' }}>{r.name} · {r.plaats}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--cream-faint)' }}>{r.when}</div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        {REVIEWS.map((_, i) => (
          <button key={i} className="lg-press" onClick={() => goTo(i)} aria-label={`Review ${i + 1}`} style={{
            width: i === idx ? 18 : 6, height: 6, borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0,
            background: i === idx ? 'var(--gold)' : 'var(--hair-strong)', transition: 'width .2s ease, background .2s ease',
          }} />
        ))}
      </div>

      <a href={GOOGLE.url} target="_blank" rel="noreferrer" className="lg-press" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16, textDecoration: 'none', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>
        Lees alle reviews op Google<IcArrowR size={15} />
      </a>
    </div>
  );
}

const navBtn = { width: 34, height: 34, borderRadius: 10, background: 'var(--panel)', border: '1px solid var(--hair)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 };

Object.assign(window, { ReviewsSlider, GoogleMark });
