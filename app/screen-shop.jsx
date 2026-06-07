// screen-shop.jsx — Webshop: grid (tab) + product detail + cart + checkout (overlays)

function priceFmt(n) { return '€ ' + n.toFixed(2).replace('.', ',').replace(',00', ',00'); }

function CartIconButton({ count, onClick }) {
  return (
    <button className="lg-press" onClick={onClick} style={{ position: 'relative', background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', cursor: 'pointer' }}>
      <IcBag size={20} />
      {count > 0 && <span className="lg-cartbadge">{count}</span>}
    </button>
  );
}

function ProductGridCard({ p, onClick, onAdd }) {
  return (
    <div className="lg-card lg-press" onClick={onClick} style={{ background: 'var(--panel)', borderRadius: 'var(--r-lg)', border: '1px solid var(--hair)', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <Photo id={`grid-${p.slot}`} fit="contain" placeholder={p.naam} radius={0} src={p.img}
          style={{ width: '100%', aspectRatio: '1 / 1', display: 'block' }} />
        {p.deal && <div style={{ position: 'absolute', top: 9, left: 9 }}><Tag tone="solid">Deal</Tag></div>}
      </div>
      <div style={{ padding: 13, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 15.5, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.15 }}>{p.naam}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 6 }}>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>€{p.prijs}</span>
          {p.van && <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-faint)', textDecoration: 'line-through' }}>€{p.van}</span>}
        </div>
        <div style={{ flex: 1 }} />
        <button className="lg-press" onClick={(e) => { e.stopPropagation(); onAdd(); }} style={{
          marginTop: 11, height: 38, borderRadius: 'var(--r-pill)', background: 'var(--gold-grad)', color: '#1c1505',
          border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        }}><IcPlus size={16} />In winkelmand</button>
      </div>
    </div>
  );
}

function ShopScreen({ openProduct, openCart, addToCart, cartCount, topInset }) {
  return (
    <div>
      <div style={{ padding: (topInset + 8) + 'px 20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="lg-eyebrow">Webshop</div>
          <h1 style={{ margin: '2px 0 0', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 34, color: 'var(--cream)', letterSpacing: 0.3 }}>Winkel</h1>
        </div>
        <div style={{ marginTop: 8 }}><CartIconButton count={cartCount} onClick={openCart} /></div>
      </div>
      <p style={{ margin: '6px 20px 18px', fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--cream-dim)' }}>
        Alles voor jouw bezoek aan de club — discreet thuisbezorgd.
      </p>

      <div className="lg-grid-dames" style={{ padding: '0 18px' }}>
        {PRODUCTS.map(p => (
          <ProductGridCard key={p.id} p={p} onClick={() => openProduct(p.id)} onAdd={() => addToCart(p.id, 1, p.maten ? p.maten[0] : null)} />
        ))}
      </div>

      <div style={{ padding: '26px 18px 0' }}>
        <Card pad={16} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
          <ServiceIcon name="bag" size={44} tone="panel" />
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 15.5, fontWeight: 600, color: 'var(--cream)' }}>Discrete verzending</div>
            <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--cream-dim)' }}>{SHIP_NOTE}</p>
          </div>
        </Card>
      </div>
      <TabSpacer />
    </div>
  );
}

function QtyStepper({ qty, set, min = 1 }) {
  const btn = (dis, on, ic) => (
    <button className="lg-press" disabled={dis} onClick={on} style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--panel-3)', border: '1px solid var(--hair-strong)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: dis ? 0.3 : 1, cursor: 'pointer' }}>{ic}</button>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {btn(qty <= min, () => set(qty - 1), <IcMinus size={16} />)}
      <span style={{ fontFamily: 'var(--font-head)', fontSize: 19, fontWeight: 700, color: 'var(--cream)', minWidth: 22, textAlign: 'center' }}>{qty}</span>
      {btn(qty >= 9, () => set(qty + 1), <IcPlus size={16} />)}
    </div>
  );
}

function ProductDetail({ product, onBack, addToCart, openCart, cartCount }) {
  const p = product;
  const [qty, setQty] = React.useState(1);
  const [size, setSize] = React.useState(p.maten ? p.maten[0] : null);
  const [added, setAdded] = React.useState(false);
  return (
    <div>
      <div style={{ position: 'relative', height: 380 }}>
        <Photo id={`hero-${p.slot}`} radius={0} placeholder={p.naam} src={p.img}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div className="lg-hero-scrim" style={{ background: 'linear-gradient(to bottom, rgba(8,7,5,0.5), rgba(8,7,5,0.1) 40%, rgba(8,7,5,0.85))' }} />
        <button className="lg-press lg-glassbtn" onClick={onBack} style={{ position: 'absolute', top: 58, left: 16 }}><IcChevL size={20} /></button>
        <div style={{ position: 'absolute', top: 58, right: 16 }}><CartIconButton count={cartCount} onClick={openCart} /></div>
        {p.deal && <div style={{ position: 'absolute', left: 20, bottom: 18 }}><Tag tone="solid">Voordeel</Tag></div>}
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gold)' }}>{p.cat}</div>
        <h1 style={{ margin: '6px 0 0', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 28, color: 'var(--cream)', lineHeight: 1.1 }}>{p.naam}</h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 10 }}>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 30, fontWeight: 700, color: 'var(--gold)' }}>€{p.prijs}</span>
          {p.van && <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--cream-faint)', textDecoration: 'line-through' }}>€{p.van}</span>}
        </div>
        <p style={{ margin: '14px 0 22px', fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--cream-dim)' }}>{p.desc}</p>

        {p.maten && (
          <div style={{ marginBottom: 20 }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)', marginBottom: 10 }}>Kies een maat</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.maten.map(m => (
                <button key={m} className="lg-press" onClick={() => setSize(m)} style={{
                  padding: '8px 16px', borderRadius: 'var(--r-pill)', background: size === m ? 'var(--gold-grad)' : 'transparent',
                  color: size === m ? '#1c1505' : 'var(--cream-dim)', border: '1px solid ' + (size === m ? 'transparent' : 'var(--hair-strong)'),
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, cursor: 'pointer'
                }}>{m}</button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, color: 'var(--cream)' }}>Aantal</span>
          <QtyStepper qty={qty} set={setQty} />
        </div>

        <Card pad={14} style={{ display: 'flex', gap: 11, alignItems: 'center', marginBottom: 8 }}>
          <IcTruck size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.45, color: 'var(--cream-dim)' }}>Discreet thuisbezorgd in een neutrale, blanco doos.</span>
        </Card>
      </div>

      <div className="lg-actionbar">
        {added
          ? <Btn variant="cream" full onClick={openCart} leftIcon={<IcBag size={18} />}>Bekijk winkelmand</Btn>
          : <Btn variant="primary" full onClick={() => { addToCart(p.id, qty, size); setAdded(true); }} leftIcon={<IcPlus size={18} />}>In winkelmand · €{p.prijs * qty}</Btn>}
      </div>
      <div style={{ height: 96 }} />
    </div>
  );
}

function CartScreen({ cart, setQty, onBack, openCheckout, openShop }) {
  const items = cart.map(c => ({ ...PRODUCTS.find(p => p.id === c.id), qty: c.qty, size: c.size }));
  const sub = items.reduce((s, i) => s + i.prijs * i.qty, 0);
  const shipping = sub > 0 ? 4.95 : 0;
  const total = sub + shipping;
  return (
    <div>
      <OverlayHeader title="Winkelmand" onBack={onBack} />
      {items.length === 0 ? (
        <div style={{ padding: '40px 30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 99, background: 'var(--panel)', border: '1px solid var(--hair)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream-faint)' }}><IcBag size={30} /></div>
          <h2 style={{ margin: '18px 0 6px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 22, color: 'var(--cream)' }}>Je winkelmand is leeg</h2>
          <p style={{ margin: '0 0 22px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--cream-dim)' }}>Ontdek onze producten in de winkel.</p>
          <Btn variant="primary" onClick={openShop} rightIcon={<IcArrowR size={18} />}>Naar de winkel</Btn>
        </div>
      ) : (
        <React.Fragment>
          <div style={{ padding: '4px 18px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((i, idx) => (
              <Card key={`${i.id}-${i.size}-${idx}`} pad={12} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Photo id={`cart-${i.slot}`} placeholder="" radius={12} src={i.img} style={{ width: 64, height: 64, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.15 }}>
                    {i.naam} {i.size && <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400, color: 'var(--cream-dim)' }}> (Maat {i.size})</span>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--gold)', marginTop: 3 }}>€{i.prijs}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <button className="lg-press" onClick={() => setQty(i.id, i.size, i.qty - 1)} style={qbtn}>{i.qty === 1 ? <IcTrash size={15} /> : <IcMinus size={15} />}</button>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--cream)', minWidth: 16, textAlign: 'center' }}>{i.qty}</span>
                  <button className="lg-press" onClick={() => setQty(i.id, i.size, i.qty + 1)} style={qbtn}><IcPlus size={15} /></button>
                </div>
              </Card>
            ))}
          </div>
          <div style={{ padding: '20px 18px 0' }}>
            <Card pad={16}>
              <SumRow k="Subtotaal" v={priceFmt(sub)} />
              <div style={{ height: 9 }} />
              <SumRow k="Verzending (discreet)" v={priceFmt(shipping)} />
              <div style={{ height: 11, borderBottom: '1px solid var(--hair)' }} />
              <div style={{ height: 11 }} />
              <SumRow k="Totaal" v={priceFmt(total)} big />
            </Card>
          </div>
          <div className="lg-actionbar">
            <Btn variant="primary" full onClick={openCheckout} rightIcon={<IcArrowR size={18} />}>Afrekenen · {priceFmt(total)}</Btn>
          </div>
          <div style={{ height: 96 }} />
        </React.Fragment>
      )}
    </div>
  );
}
const qbtn = { width: 32, height: 32, borderRadius: 9, background: 'var(--panel-3)', border: '1px solid var(--hair-strong)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' };

function SumRow({ k, v, big }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: big ? 15 : 13.5, fontWeight: big ? 600 : 400, color: big ? 'var(--cream)' : 'var(--cream-dim)' }}>{k}</span>
      <span style={{ fontFamily: 'var(--font-head)', fontSize: big ? 22 : 15, fontWeight: 700, color: big ? 'var(--gold)' : 'var(--cream)' }}>{v}</span>
    </div>
  );
}

function CheckoutScreen({ cart, onBack, onDone }) {
  const items = cart.map(c => ({ ...PRODUCTS.find(p => p.id === c.id), qty: c.qty }));
  const sub = items.reduce((s, i) => s + i.prijs * i.qty, 0);
  const total = sub + (sub > 0 ? 4.95 : 0);
  const [f, setF] = React.useState({ naam: '', email: '', adres: '', plaats: '' });
  const ok = f.naam && f.email && f.adres && f.plaats;
  return (
    <div>
      <OverlayHeader title="Afrekenen" onBack={onBack} />
      <div style={{ padding: '6px 20px 0' }}>
        <SectionHead title="Bezorggegevens" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CField label="Naam" value={f.naam} onChange={v => setF({ ...f, naam: v })} placeholder="Voor- en achternaam" />
          <CField label="E-mail" value={f.email} onChange={v => setF({ ...f, email: v })} placeholder="naam@email.nl" type="email" />
          <CField label="Adres" value={f.adres} onChange={v => setF({ ...f, adres: v })} placeholder="Straat en huisnummer" />
          <CField label="Postcode & plaats" value={f.plaats} onChange={v => setF({ ...f, plaats: v })} placeholder="0000 AA Plaats" />
        </div>

        <div style={{ marginTop: 22 }}>
          <Card pad={16}>
            <SumRow k="Subtotaal" v={priceFmt(sub)} />
            <div style={{ height: 9 }} />
            <SumRow k="Verzending" v={priceFmt(4.95)} />
            <div style={{ height: 11, borderBottom: '1px solid var(--hair)' }} />
            <div style={{ height: 11 }} />
            <SumRow k="Totaal" v={priceFmt(total)} big />
          </Card>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '16px 2px 0', color: 'var(--cream-dim)' }}>
          <IcTruck size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.45 }}>{SHIP_NOTE}</span>
        </div>
      </div>
      <div className="lg-actionbar">
        <Btn variant="primary" full disabled={!ok} onClick={() => onDone(f, total)}>Bestelling plaatsen · {priceFmt(total)}</Btn>
      </div>
      <div style={{ height: 96 }} />
    </div>
  );
}

function OrderSuccess({ naam, total, onHome, onShop }) {
  return (
    <div style={{ padding: '0 24px', minHeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="lg-check"><IcCheck size={40} /></div>
      <h1 style={{ margin: '24px 0 8px', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 30, color: 'var(--cream)' }}>Bedankt voor je bestelling</h1>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--cream-dim)', maxWidth: 300 }}>
        {naam ? naam.split(' ')[0] + ', je' : 'Je'} bestelling van {priceFmt(total)} is ontvangen. Je krijgt een bevestiging per e-mail — discreet bezorgd binnen 2–4 werkdagen.
      </p>
      <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
        <Btn variant="dark" onClick={onShop}>Verder winkelen</Btn>
        <Btn variant="primary" onClick={onHome}>Naar home</Btn>
      </div>
    </div>
  );
}

function CField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--cream-faint)' }}>{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="lg-input" />
    </label>
  );
}

Object.assign(window, { ShopScreen, ProductDetail, CartScreen, CheckoutScreen, OrderSuccess, CartIconButton });
