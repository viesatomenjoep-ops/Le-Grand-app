// data.jsx — Saunaclub Le Grand content (Dutch). Real venue facts + tasteful directory.

// ── Onze dames — respectful directory (photos are user-filled image-slots) ──
const DAMES = [
  { id: 'ada',      name: 'Ada',      land: 'Roemenië',  leeftijd: 30, talen: ['RO','EN','DE'], dagen: ['wo','do','vr'], nu: true,  img: 'app/assets/dame-ada.png', note: 'Warm, attent en een fijne gesprekspartner.' },
  { id: 'alina',    name: 'Alina',    land: 'Roemenië',  leeftijd: 32, talen: ['RO','EN'],      dagen: ['ma','di','wo'], nu: true,  img: 'app/assets/dame-alina.png', note: 'Rustig gezelschap met oog voor detail.' },
  { id: 'angela',   name: 'Angela',   land: 'Frankrijk', leeftijd: 25, talen: ['FR','EN','NL'], dagen: ['do','vr','za'], nu: true,  img: 'app/assets/dame-angela.png', note: 'Speels, charmant en altijd goedgehumeurd.' },
  { id: 'anna',     name: 'Anna',     land: 'Roemenië',  leeftijd: 34, talen: ['RO','EN'],      dagen: ['vr','za','zo'], nu: false, img: 'app/assets/dame-anna.png', note: 'Elegant en op haar gemak in elk gezelschap.' },
  { id: 'carol',    name: 'Carol',    land: 'Spanje',    leeftijd: 28, talen: ['ES','EN'],      dagen: ['wo','do','vr'], nu: true,  img: 'app/assets/dame-carol.png', note: 'Zonnig temperament uit het zuiden.' },
  { id: 'claudia',  name: 'Claudia',  land: 'Colombia',  leeftijd: 34, talen: ['ES','FR','EN'], dagen: ['do','vr','za'], nu: false, img: 'app/assets/dame-claudia.png', note: 'Wereldwijs en gemakkelijk in de omgang.' },
  { id: 'elena',    name: 'Elena',    land: 'Moldavië',  leeftijd: 28, talen: ['RO','EN'],      dagen: ['ma','di','wo'], nu: true,  img: 'app/assets/dame-elena.png', note: 'Zacht, geduldig en oprecht geïnteresseerd.' },
  { id: 'julia',    name: 'Julia',    land: 'Turkije',   leeftijd: 27, talen: ['TR','EN','NL'], dagen: ['vr','za'],      nu: false, img: 'app/assets/dame-julia.png', note: 'Levendig en vol verhalen.' },
  { id: 'luna',     name: 'Luna',     land: 'Spanje',    leeftijd: 32, talen: ['ES','EN'],      dagen: ['wo','do','za'], nu: true,  img: 'app/assets/dame-luna.png', note: 'Kalm, stijlvol en attent.' },
  { id: 'maya',     name: 'Maya',     land: 'Roemenië',  leeftijd: 21, talen: ['RO','EN'],      dagen: ['do','vr','za'], nu: true,  img: 'app/assets/dame-maya.png', note: 'Jong, spontaan en vol energie.' },
  { id: 'roberta',  name: 'Roberta',  land: 'Spanje',    leeftijd: 30, talen: ['ES','IT','EN'], dagen: ['ma','wo','vr'], nu: false, img: 'app/assets/dame-roberta.png', note: 'Hartelijk en ontspannen.' },
  { id: 'teddy',    name: 'Teddy',    land: 'Bulgarije', leeftijd: 22, talen: ['BG','EN'],      dagen: ['vr','za','zo'], nu: true,  img: 'app/assets/dame-teddy.png', note: 'Vrolijk gezelschap met een gouden lach.' },
];

// ── Faciliteiten ──
const FACILITEITEN = [
  { id: 'fins',   name: 'Finse Sauna',      meta: '90°C',  icon: 'fire',  desc: 'Knapperend hout, hete stenen en een rituele opgiet — het hart van de club.' },
  { id: 'stoom',  name: 'Stoombad',         meta: '48°C',  icon: 'steam', desc: 'Warme, aromatische damp met eucalyptus die de zinnen opent.' },
  { id: 'jacuzzi',name: 'Jacuzzi',          meta: '37°C',  icon: 'waves', desc: 'Bruisend warm water in een sfeervolle, schemerige setting.' },
  { id: 'zwembad',name: 'Verwarmd Zwembad', meta: '29°C',  icon: 'drop',  desc: 'Een rustgevend binnenbad met zacht onderwaterlicht.' },
  { id: 'lounge', name: 'Bar & Lounge',     meta: 'All-in',icon: 'spark', desc: 'Onbeperkt drankjes, fingerfood en een warme, intieme ambiance.' },
  { id: 'prive',  name: 'Privé Suites',     meta: '6 kamers',icon: 'gift', desc: 'Discrete, luxueuze suites met eigen jacuzzi en lounge.' },
];

// ── Tarieven (entree & faciliteiten — all-in concept) ──
const TARIEVEN = [
  { id: 'dag',   name: 'Dagentree',   sub: 'Hele dag · all-in', price: 70,  unit: 'p.p.',
    perks: ['Badjas, handdoek & slippers', 'Onbeperkt fris, bier, wijn & buffet', 'Alle sauna\u2019s, jacuzzi & zwembad'], accent: 'gold', featured: true },
  { id: 'happy', name: 'Happy Hours',  sub: 'Ma–do vanaf 11:00', price: 55,  unit: 'p.p.',
    perks: ['Volledige toegang faciliteiten', 'Badjas & handdoek inbegrepen', 'All-in drankjes'], accent: 'plain' },
  { id: 'prive', name: 'Privé Suite',  sub: 'Per 2 uur', price: 195, unit: 'per suite',
    perks: ['Eigen jacuzzi & lounge', 'Fles champagne', 'Volledig discreet'], accent: 'plain' },
];

// ── Events ──
const EVENTS_INTRO = 'Bij Saunaclub Le Grand organiseren we maandelijks verschillende events. Elke vrijdag en zaterdag is er een vaste avond met een live DJ en diverse dancers in de club.';
const EVENTS = [
  { id: 'strippers', titel: 'Strippers Night', wanneer: 'Elke vrijdag & zaterdag', datum: 'Wekelijks', tijd: '21:00 – 02:00', tag: 'Vaste avond', icon: 'music', terugkerend: true, img: 'app/assets/event-strippers.png',
    desc: 'Onze vaste weekendavond met een live DJ achter de draaitafels en diverse dancers in de club. Dé manier om het weekend in stijl te beleven — sfeervol, uitbundig en altijd verrassend.' },
  { id: 'bbq', titel: 'BBQ Time bij Le Grand', wanneer: 'Zomerseizoen', datum: 'Op aankondiging', tijd: 'Vanaf 15:00', tag: 'Buiten', icon: 'flame', img: 'app/assets/event-bbq.jpg',
    desc: 'Een heerlijke barbecue op ons verwarmde buitenterras, gecombineerd met alle wellnessfaciliteiten. Smakelijke hapjes, koele drankjes en een ontspannen zomerse sfeer.' },
  { id: 'orange', titel: 'Orange Summer Party', wanneer: 'Woensdag', datum: '29 mei', tijd: '20:00 – 01:00', tag: 'Thema-avond', icon: 'spark', img: 'app/assets/event-orange.jpg',
    desc: 'Een uitbundige zomereditie in oranje sferen. Feestelijke cocktails, dansende dames en muziek tot in de late uurtjes — een avond om niet te missen.' },
];

// ── Vacatures ──
const VAC_INTRO = 'Lijkt het je leuk om ons team te versterken? Saunaclub Le Grand zoekt regelmatig enthousiaste collega\u2019s. Wij bieden een fijne werkomgeving waar gastvrijheid en professionaliteit centraal staan.';
const VACATURES = [
  { id: 'kamers', titel: 'Kamers beschikbaar voor dames', type: 'Zelfstandige', icon: 'gift',
    kort: 'Werk als zelfstandige in een veilige, stijlvolle en professionele omgeving.',
    taken: ['Eigen werktijden & volledige vrijheid', 'Luxe, volledig verzorgde kamers', 'Discrete en veilige werkomgeving', 'Vaste, loyale klantenkring'] },
  { id: 'schoonmaak', titel: 'Schoonmaker (m/v)', type: 'Fulltime', icon: 'spark',
    kort: 'Zorg mee voor de onberispelijke uitstraling van de club.',
    taken: ['Dagelijks schoonhouden van faciliteiten', 'Oog voor detail en hygiëne', 'Flexibele inzet in dagdienst', 'Ervaring is een pré'] },
  { id: 'horeca', titel: 'Horeca Medewerker', type: 'Fulltime', icon: 'drop',
    kort: 'Verzorg onze gasten met drankjes, hapjes en gastvrije service.',
    taken: ['Bar- en bedieningswerk', 'Gastvrij en representatief', 'Werken in avond & weekend', 'Echte teamspeler'] },
];

// ── Webshop ──
const SHIP_NOTE = 'Je bestelling wordt altijd discreet bij je thuis afgeleverd in een neutrale, blanco doos. Snel, zorgvuldig en volledig vertrouwelijk.';
const PRODUCTS = [
  { id: 'badjas', naam: 'Le Grand Badjas', prijs: 55, cat: 'Textiel', slot: 'shop-badjas', img: 'app/assets/shop-badjas.png',
    maten: ['S/M', 'L/XL', 'XXL', 'XXXL'],
    kort: 'Zachte, luxe badjas met geborduurd logo.',
    desc: 'Onze comfortabele badjas van hoogwaardige badstof, geborduurd met het Le Grand-logo. Heerlijk zacht — perfect voor in de club of thuis.' },
  { id: 'slippers', naam: 'Badslippers', prijs: 25, cat: 'Textiel', slot: 'shop-slippers', img: 'app/assets/shop-slippers.png',
    maten: ['39', '40', '41', '42', '43', '44', '45', '46', '47', '48'],
    kort: 'Comfortabele slippers met antislipzool.',
    desc: 'Stevige, comfortabele badslippers met antislipzool. Ideaal voor in de spa en daarbuiten.' },
];

// ── Reviews (representative — vervang met echte Google Reviews) ──
const GOOGLE = { rating: 4.7, count: 280, url: 'https://www.google.com/maps/place/Saunaclub+Le+Grand' };
const REVIEWS = [
  { name: 'Mark', plaats: 'Breda', when: '2 weken geleden', stars: 5, text: 'Een werkelijk stijlvolle club. Smetteloze faciliteiten en een ontvangst die je je meteen welkom laat voelen.' },
  { name: 'Jeroen', plaats: 'Antwerpen', when: '1 maand geleden', stars: 5, text: 'De privé suite was fantastisch: discreet, luxe en tot in de puntjes verzorgd. Zeker voor herhaling vatbaar.' },
  { name: 'Robert', plaats: 'Rotterdam', when: '3 weken geleden', stars: 5, text: 'Warme sfeer, prachtige sauna en vriendelijk personeel. Precies de ontspanning die we zochten.' },
  { name: 'Patrick', plaats: 'Tilburg', when: '1 maand geleden', stars: 5, text: 'Alles ademt klasse, van de lounge tot de wellness. Het voelt echt als een avondje helemaal weg.' },
  { name: 'Dennis', plaats: 'Eindhoven', when: '2 maanden geleden', stars: 5, text: 'Heerlijk verwend met goede drankjes en een gezellige, ontspannen ambiance. Top georganiseerd.' },
  { name: 'Sander', plaats: 'Den Bosch', when: '3 weken geleden', stars: 5, text: 'Schone, moderne ruimtes en een gastvrij team. Je merkt dat ze hier echt om hun gasten geven.' },
  { name: 'Erik', plaats: 'Breda', when: '1 maand geleden', stars: 5, text: 'Een aanrader voor wie discreet en in stijl wil genieten. We komen zeker nog een keer terug.' },
  { name: 'Thomas', plaats: 'Roosendaal', when: '2 maanden geleden', stars: 5, text: 'De jacuzzi en sauna zijn van topkwaliteit. Een perfecte plek om volledig tot rust te komen.' },
  { name: 'Michel', plaats: 'Gent', when: '3 maanden geleden', stars: 4, text: 'Vriendelijk onthaal, mooie inrichting en een relaxte sfeer. Eigenlijk niets op aan te merken.' },
  { name: 'Bas', plaats: 'Breda', when: '1 week geleden', stars: 5, text: 'Professioneel, gastvrij en bijzonder verzorgd. Een avond die we niet snel zullen vergeten.' },
];

// ── Venue facts (real) ──
const VENUE = {
  naam: 'Saunaclub Le Grand',
  adres: 'Meirseweg 25, 4811 DH Zundert',
  tel: '+31 (0)76 7200211',
  telHref: 'tel:+31767200211',
  email: 'info@saunaclublegrand.nl',
  maps: 'https://maps.google.com/?q=Saunaclub+Le+Grand+Zundert',
  socials: { instagram: 'saunaclublegrand', facebook: 'saunaclublegrand', tiktok: 'legrandsaunaclub' },
};
const OPENING = [
  { dag: 'Maandag',   uren: '11:00 – 23:00' },
  { dag: 'Dinsdag',   uren: '11:00 – 23:00' },
  { dag: 'Woensdag',  uren: '11:00 – 23:00' },
  { dag: 'Donderdag', uren: '11:00 – 01:00' },
  { dag: 'Vrijdag',   uren: '11:00 – 02:00' },
  { dag: 'Zaterdag',  uren: '11:00 – 02:00' },
  { dag: 'Zondag',    uren: '11:00 – 23:00' },
];

const SLOT_TIMES = ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
const BUSY_SLOTS = ['20:00', '22:00'];
const FULL_SLOTS = ['18:00'];

const MONTHS_NL = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
const DAYS_NL = ['ma','di','wo','do','vr','za','zo'];
const DAYS_FULL_NL = ['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag','Zondag'];

Object.assign(window, {
  DAMES, FACILITEITEN, TARIEVEN, EVENTS, EVENTS_INTRO, VACATURES, VAC_INTRO,
  PRODUCTS, SHIP_NOTE, REVIEWS, GOOGLE, VENUE, OPENING,
  SLOT_TIMES, BUSY_SLOTS, FULL_SLOTS, MONTHS_NL, DAYS_NL, DAYS_FULL_NL,
});
