// app.jsx — Le Grand app shell: 5-tab nav, overlay stack, cart, opening, tweaks, scaling
const { useState, useEffect, useRef } = React;

const OPEN_MAP = { 'Foto': 'photo', 'Stoom': 'steam', 'Minimaal': 'minimal' };
const PAL = "'Palatino Linotype', Palatino, 'Book Antiqua', 'URW Palladio L', P052, Georgia, serif";
const FONT_MAP = {
  'Palatino': PAL,
  'Georgia': "Georgia, 'Times New Roman', serif",
  'Times': "'Times New Roman', Times, serif",
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "openingStyle": "Foto",
  "gold": "#C9A24C",
  "font": "Palatino"
}/*EDITMODE-END*/;

const TABS = [
  ['home', 'Home', IcHome],
  ['dames', 'Dames', IcHeart],
  ['events', 'Events', IcStar],
  ['shop', 'Shop', IcBag],
  ['meer', 'Meer', IcMenu],
];

function TabBar({ tab, setTab, cartCount }) {
  return (
    <nav className="lg-tabbar">
      {TABS.map(([id, label, Ic]) => {
        const on = tab === id;
        return (
          <button key={id} className="lg-press" onClick={() => setTab(id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: on ? 'var(--gold)' : 'var(--cream-faint)',
          }}>
            <span style={{ position: 'relative' }}>
              <Ic size={23} sw={on ? 2 : 1.7} />
              {id === 'shop' && cartCount > 0 && <span className="lg-cartbadge">{cartCount}</span>}
            </span>
            <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: on ? 700 : 500, letterSpacing: 0.2 }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}



function App() {
  const t = TWEAK_DEFAULTS;
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState('home');
  const [overlay, setOverlay] = useState([]);     // stack of route objects
  const [cart, setCart] = useState([]);
  const mainRef = useRef(null);
  const overlayRef = useRef(null);

  const openVariant = OPEN_MAP[t.openingStyle] || 'photo';
  const TI = 24;

  // ── navigation ──
  const go = (tb) => { setOverlay([]); setTab(tb); };
  const push = (route) => setOverlay((o) => [...o, route]);
  const pop = () => setOverlay((o) => o.slice(0, -1));
  const top = overlay[overlay.length - 1];

  // ── cart ──
  const addToCart = (id, qty = 1, size = null) => setCart((c) => {
    const ex = c.find((i) => i.id === id && i.size === size);
    if (ex) return c.map((i) => (i.id === id && i.size === size) ? { ...i, qty: i.qty + qty } : i);
    return [...c, { id, qty, size }];
  });
  const setQty = (id, size, qty) => setCart((c) => qty <= 0 ? c.filter((i) => !(i.id === id && i.size === size)) : c.map((i) => (i.id === id && i.size === size) ? { ...i, qty } : i));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => { if (mainRef.current) mainRef.current.scrollTop = 0; }, [tab]);
  useEffect(() => { if (overlayRef.current) overlayRef.current.scrollTop = 0; }, [overlay.length, top && top.t, top && top.id]);

  const showTabBar = overlay.length === 0;
  const rootStyle = { '--gold': t.gold, '--font-head': FONT_MAP[t.font] || PAL, '--font-body': FONT_MAP[t.font] || PAL };

  // ── overlay content ──
  function renderOverlay() {
    if (!top) return null;
    switch (top.t) {
      case 'dame': {
        const d = DAMES.find((x) => x.id === top.id);
        return <DameDetail dame={d} onBack={pop} reserve={() => push({ t: 'reserveren' })} />;
      }
      case 'reserveren':
        return <ReserverenScreen go={go} topInset={TI} />;
      case 'event': {
        const ev = EVENTS.find((x) => x.id === top.id);
        return <EventDetail ev={ev} onBack={pop} go={() => push({ t: 'reserveren' })} />;
      }
      case 'product': {
        const p = PRODUCTS.find((x) => x.id === top.id);
        return <ProductDetail product={p} onBack={pop} addToCart={addToCart} openCart={() => push({ t: 'cart' })} cartCount={cartCount} />;
      }
      case 'cart':
        return <CartScreen cart={cart} setQty={setQty} onBack={pop} openCheckout={() => push({ t: 'checkout' })} openShop={() => go('shop')} />;
      case 'checkout':
        return <CheckoutScreen cart={cart} onBack={pop} onDone={(f, total) => { setCart([]); setOverlay([{ t: 'ordersuccess', naam: f.naam, total }]); }} />;
      case 'ordersuccess':
        return <OrderSuccess naam={top.naam} total={top.total} onHome={() => go('home')} onShop={() => go('shop')} />;
      case 'vacatures':
        return <VacaturesScreen onBack={pop} openVacature={(id) => push({ t: 'vacature', id })} />;
      case 'vacature': {
        const v = VACATURES.find((x) => x.id === top.id);
        return <VacatureDetail v={v} onBack={pop} />;
      }
      case 'info':
        return <InfoScreen onBack={pop} />;
      default:
        return null;
    }
  }

  return (
    <div style={{ ...rootStyle, height: '100dvh', width: '100vw' }}>
      <div className="lg-app">
        <main ref={mainRef} className="lg-main">
          {tab === 'home' && <HomeScreen go={go} openDame={(id) => push({ t: 'dame', id })} reserve={() => push({ t: 'reserveren' })} openEvent={(id) => push({ t: 'event', id })} openProduct={(id) => push({ t: 'product', id })} />}
          {tab === 'dames' && <DamesScreen openDame={(id) => push({ t: 'dame', id })} topInset={TI} />}
          {tab === 'events' && <EventsScreen openEvent={(id) => push({ t: 'event', id })} topInset={TI} />}
          {tab === 'shop' && <ShopScreen openProduct={(id) => push({ t: 'product', id })} openCart={() => push({ t: 'cart' })} addToCart={addToCart} cartCount={cartCount} topInset={TI} />}
          {tab === 'meer' && <MeerScreen go={go} openInfo={() => push({ t: 'info' })} openVacatures={() => push({ t: 'vacatures' })} topInset={TI} />}
        </main>

        {showTabBar && <TabBar tab={tab} setTab={go} cartCount={cartCount} />}

        {top && (
          <div ref={overlayRef} className="lg-overlay">
            {renderOverlay()}
          </div>
        )}

        {!entered && (
          <div className="lg-open-wrap">
            <OpeningScreen variant={openVariant} onEnter={() => setEntered(true)} />
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
