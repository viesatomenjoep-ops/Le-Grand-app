// icons.jsx — clean line-icon set for Le Grand. Stroke uses currentColor.
function Icon({ d, size = 24, sw = 1.75, fill = 'none', children, style, viewBox = '0 0 24 24' }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill={fill}
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={style}>
      {d ? <path d={d} /> : children}
    </svg>
  );
}

const IcHome   = (p) => <Icon {...p} d="M3 10.5L12 3l9 7.5M5.5 9v11h13V9" />;
const IcLeaf   = (p) => <Icon {...p}><path d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16Z"/><path d="M9 15c3-3 6-5 9-6"/></Icon>;
const IcCal    = (p) => <Icon {...p}><rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></Icon>;
const IcUser   = (p) => <Icon {...p}><circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></Icon>;
const IcClock  = (p) => <Icon {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></Icon>;
const IcChevR  = (p) => <Icon {...p} d="M9 5l7 7-7 7" />;
const IcChevL  = (p) => <Icon {...p} d="M15 5l-7 7 7 7" />;
const IcChevDown = (p) => <Icon {...p} d="M5 9l7 7 7-7" />;
const IcArrowR = (p) => <Icon {...p}><path d="M4 12h15M13 6l6 6-6 6"/></Icon>;
const IcStar   = (p) => <Icon {...p} fill="currentColor" sw={0}><path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z"/></Icon>;
const IcPin    = (p) => <Icon {...p}><path d="M12 21c4-4.5 7-7.8 7-11A7 7 0 0 0 5 10c0 3.2 3 6.5 7 11Z"/><circle cx="12" cy="10" r="2.6"/></Icon>;
const IcPlus   = (p) => <Icon {...p} d="M12 5v14M5 12h14" />;
const IcMinus  = (p) => <Icon {...p} d="M5 12h14" />;
const IcCheck  = (p) => <Icon {...p} d="M4 12.5l5 5L20 6" />;
const IcHeart  = (p) => <Icon {...p}><path d="M12 20S3.5 14.5 3.5 8.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.5 1.8C20.5 14.5 12 20 12 20Z"/></Icon>;
const IcFire   = (p) => <Icon {...p}><path d="M12 3c1 3.5 5 4.8 5 9a5 5 0 0 1-10 0c0-1.8.8-3 1.6-3.8C9 9.5 9 10.6 10 11c0-2.4 1-4 2-5.8.3-.7 0-1.5 0-2.2Z"/></Icon>;
const IcDrop   = (p) => <Icon {...p}><path d="M12 3.5c3 3.6 6 6.6 6 10a6 6 0 0 1-12 0c0-3.4 3-6.4 6-10Z"/></Icon>;
const IcSpark  = (p) => <Icon {...p}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="M18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z"/></Icon>;
const IcX      = (p) => <Icon {...p} d="M6 6l12 12M18 6L6 18" />;
const IcBell   = (p) => <Icon {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/></Icon>;
const IcPhone  = (p) => <Icon {...p}><path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></Icon>;
const IcWaves  = (p) => <Icon {...p}><path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></Icon>;
const IcUsers  = (p) => <Icon {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 6a3 3 0 0 1 0 6M17.5 14c2 .6 3.5 2.4 3.5 5"/></Icon>;
const IcGift   = (p) => <Icon {...p}><rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 13h16M12 9v11M12 9C12 6 13 4 15 4s2 3-3 5c-5-2-4-5-2-5s3 2 2 5Z"/></Icon>;
const IcMenu   = (p) => <Icon {...p} d="M4 7h16M4 12h16M4 17h16" />;
const IcSearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></Icon>;
const IcTherm  = (p) => <Icon {...p}><path d="M12 14V5a2 2 0 0 0-4 0v9a4 4 0 1 0 4 0Z"/></Icon>;
const IcInfo   = (p) => <Icon {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></Icon>;
const IcSteam  = (p) => <Icon {...p}><path d="M8 12c0-2 2-2 2-4s-2-2-2-4M12 12c0-2 2-2 2-4s-2-2-2-4M16 12c0-2 2-2 2-4s-2-2-2-4"/><path d="M5 15h14v2a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-2Z"/></Icon>;
const IcBag    = (p) => <Icon {...p}><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></Icon>;
const IcBriefcase = (p) => <Icon {...p}><rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12h18"/></Icon>;
const IcTruck  = (p) => <Icon {...p}><path d="M2 6h11v9H2zM13 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></Icon>;
const IcTrash  = (p) => <Icon {...p}><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></Icon>;
const IcMusic  = (p) => <Icon {...p}><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></Icon>;
const IcFlame  = (p) => <Icon {...p}><path d="M12 3c1 3.5 5 4.8 5 9a5 5 0 0 1-10 0c0-1.8.8-3 1.6-3.8C9 9.5 9 10.6 10 11c0-2.4 1-4 2-5.8.3-.7 0-1.5 0-2.2Z"/></Icon>;

Object.assign(window, {
  Icon, IcHome, IcLeaf, IcCal, IcUser, IcClock, IcChevR, IcChevL, IcChevDown, IcArrowR,
  IcStar, IcPin, IcPlus, IcMinus, IcCheck, IcHeart, IcFire, IcDrop, IcSpark, IcX,
  IcBell, IcPhone, IcWaves, IcUsers, IcGift, IcMenu, IcSearch, IcTherm, IcInfo, IcSteam,
  IcBag, IcBriefcase, IcTruck, IcTrash, IcMusic, IcFlame,
});
