import { useState, useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, RotateCcw, Mic, Sparkles, PenTool, Code2 } from "lucide-react";

const C = {
  cream: "#E3E1DE", paleGreen: "#D6E9B4", teal: "#2C695B", tealDeep: "#214F44",
  olive: "#6D7945", oliveLt: "#9AAB62", rust: "#6C3016", rustDeep: "#4A2410",
  forest: "#16291F", white: "#FFFFFF", gold: "#C98B3A",
  floor: "#D9D5CD", table: "#F3EFE8", chair: "#BFB7AB",
  sand: "#E9E4D8", sage: "#E1E7D7", mist: "#DCE4E0", menu: "#EDEBE6",
  fg1: "#23302A", fg2: "#4A554E", fg3: "#828A80", line: "#CFCCC7", lineStrong: "#B6B2AB",
  onDark: "#F4F2EE", onDark2: "#BFCDB8", lineOnDark: "rgba(255,255,255,0.16)",
};
const SER = "'Spectral',Georgia,serif";
const SAN = "'GT Walsheim','Hanken Grotesk','Helvetica Neue',Arial,sans-serif";
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";
const rng = (s) => { const x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
html{scroll-behavior:smooth}
@keyframes riseIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes travel{0%{left:0%}100%{left:100%}}
@keyframes brickFloat{0%,100%{transform:rotate(var(--r)) translateY(0);opacity:var(--op)}50%{transform:rotate(calc(var(--r) - 6deg)) translateY(-9px);opacity:calc(var(--op) * 0.5)}}
@keyframes bounceDown{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
@keyframes spinSlow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes driftCascade{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
@keyframes drawLoop{from{stroke-dashoffset:760}to{stroke-dashoffset:0}}
.eyebrow{font-family:${SAN};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.16em}
.lift{transition:transform .35s ease-out,box-shadow .35s ease-out,border-color .35s ease-out}
.lift:hover{transform:translateY(-4px);box-shadow:0 16px 44px rgba(22,41,31,.14)}
.sat:hover{box-shadow:0 16px 40px rgba(22,41,31,.2)!important}
.tableBtn:hover{box-shadow:0 16px 34px rgba(22,41,31,.24)!important}
input[type=range]{accent-color:${C.teal};width:100%}
.tab{transition:all .25s ease-out;cursor:pointer}
.bloom{animation:riseIn .5s ease-out both}
.arange{accent-color:${C.oliveLt}}
.clink:hover{text-decoration:underline}
.menuItem{border:1.5px solid ${C.line};background:${C.white};transition:transform .25s ease-out,box-shadow .25s ease-out,border-color .25s ease-out}
.menuItem:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(22,41,31,.14);border-color:var(--ac)}
`;

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold: 0.12 });
    o.observe(el); return () => o.disconnect(); }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `opacity .8s ease-out ${delay}s, transform .8s ease-out ${delay}s`, ...style }}>{children}</div>;
}
function useMobile() {
  const [mob, setMob] = useState(typeof window !== "undefined" && window.innerWidth < 780);
  useEffect(() => { const f = () => setMob(window.innerWidth < 780); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, []);
  return mob;
}
function Scribble({ w = 220, color = C.rust, style }) {
  return (
    <svg width={w} height="14" viewBox="0 0 220 14" fill="none" style={style}>
      <path d="M3 9 C 28 2, 46 13, 72 7 S 120 1, 150 8 S 196 12, 217 5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
function CircleScribble({ color = C.rust, style }) {
  return (
    <svg viewBox="0 0 300 120" fill="none" preserveAspectRatio="none" style={{ overflow: "visible", ...style }}>
      <path d="M214 18 C150 4, 66 6, 36 28 C8 48, 16 80, 64 96 C128 116, 240 104, 272 76 C294 56, 282 24, 226 14 C166 3, 78 7, 42 26"
        stroke={color} strokeWidth="2.6" strokeLinecap="round" fill="none"
        strokeDasharray="760" style={{ animation: "drawLoop 1.1s ease-out .3s both" }} />
    </svg>
  );
}
function Grain({ blend = "multiply", op = 0.05 }) {
  return <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: op, mixBlendMode: blend, pointerEvents: "none" }} />;
}
function SectionTag({ num, text, accent, onDark = false }) {
  const chipBg = onDark ? C.paleGreen : accent;
  const chipFg = onDark ? C.forest : C.onDark;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 6, background: chipBg, color: chipFg, fontFamily: SER, fontSize: 18, transform: "rotate(-3deg)", flexShrink: 0, boxShadow: "0 4px 12px rgba(22,41,31,.12)" }}>{num}</span>
      <span className="eyebrow" style={{ color: onDark ? C.paleGreen : accent }}>{text}</span>
    </div>
  );
}
function ScoreGauge({ value, color }) {
  const R = 78, CIRC = 2 * Math.PI * R, off = CIRC * (1 - value / 100);
  return (
    <div style={{ position: "relative", width: 190, height: 190, flexShrink: 0 }}>
      <svg width="190" height="190" viewBox="0 0 190 190" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="95" cy="95" r={R} fill="none" stroke={C.lineOnDark} strokeWidth="13" />
        <circle cx="95" cy="95" r={R} fill="none" stroke={color} strokeWidth="13" strokeLinecap="round"
          strokeDasharray={CIRC} strokeDashoffset={off} style={{ transition: "stroke-dashoffset .55s ease-out, stroke .4s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: SER, fontSize: 72, fontWeight: 500, lineHeight: 0.78, color, transition: "color .4s" }}>{value}</span>
        <span className="eyebrow" style={{ color: C.onDark2, fontSize: 10, marginTop: 7 }}>out of 100</span>
      </div>
    </div>
  );
}

/* ----- Brand illustrations ----- */
function SynthesisTree({ w = 340 }) {
  const pal = [C.rust, C.olive, C.teal, C.oliveLt, C.tealDeep];
  const clusters = [{ cx: 72, cy: 72 }, { cx: 180, cy: 50 }, { cx: 290, cy: 80 }, { cx: 62, cy: 168 }, { cx: 300, cy: 170 }];
  const conv = { x: 180, y: 232 };
  const spokes = [0, 51, 102, 154, 205, 256, 308];
  const cascade = [];
  for (let i = 0; i < 60; i++) {
    const t = i / 60, y = 268 + t * 178, spread = 16 + t * 150;
    cascade.push({ x: 180 + (rng(i + 3) * 2 - 1) * spread, y, s: 5 + rng(i + 9) * 4, rot: rng(i) * 60 - 30, c: pal[i % pal.length], d: rng(i + 1) * 1.5 });
  }
  return (
    <svg viewBox="0 0 360 470" width={w} style={{ display: "block", maxWidth: "100%" }}>
      {clusters.map((cl, i) => <path key={"c" + i} d={`M ${cl.cx} ${cl.cy} Q ${(cl.cx + conv.x) / 2} ${cl.cy + 70}, ${conv.x} ${conv.y - 6}`} fill="none" stroke={C.lineStrong} strokeWidth="1.3" strokeDasharray="2 5" opacity="0.7" />)}
      {clusters.map((cl, i) => (
        <g key={i}>
          <ellipse cx={cl.cx} cy={cl.cy} rx="44" ry="38" fill={C.paleGreen} opacity="0.3" />
          {spokes.map((a, j) => {
            const rad = (a * Math.PI) / 180, len = 25 + (j % 2) * 6;
            const ex = cl.cx + Math.cos(rad) * len, ey = cl.cy + Math.sin(rad) * len;
            return <g key={j}>
              <line x1={cl.cx} y1={cl.cy} x2={ex} y2={ey} stroke={C.fg3} strokeWidth="1" strokeDasharray="1.5 2.5" />
              <rect x={ex - 3} y={ey - 3} width="6" height="6" fill={pal[(i + j) % pal.length]} transform={`rotate(${a} ${ex} ${ey})`} />
            </g>;
          })}
          <rect x={cl.cx - 9} y={cl.cy - 9} width="18" height="18" rx="2" fill={pal[i % pal.length]} transform={`rotate(${i % 2 ? 8 : -8} ${cl.cx} ${cl.cy})`} />
        </g>
      ))}
      {[0, 1, 2].map((k) => <rect key={k} x={conv.x - 36} y={conv.y - 2 + k * 9} width="72" height="6" rx="1" fill={C.forest} transform={`rotate(-2 ${conv.x} ${conv.y})`} />)}
      {cascade.map((c, i) => <rect key={i} x={c.x} y={c.y} width={c.s} height={c.s} fill={c.c} transform={`rotate(${c.rot} ${c.x} ${c.y})`} opacity={Math.max(0.4, 0.92 - i / 120)} style={{ animation: `driftCascade ${3 + (i % 4)}s ease-in-out ${c.d}s infinite` }} />)}
    </svg>
  );
}
function OrbitBurst({ w = 380 }) {
  const pal = [C.teal, C.olive, C.rust, C.oliveLt, C.tealDeep, C.paleGreen];
  const cx = 215, cy = 165, tiles = [];
  for (let i = 0; i < 78; i++) {
    const a = 1.2 + i * 0.31, r = 56 + i * 2.5;
    if (r > 235) break;
    tiles.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.72, size: Math.max(4, 17 - i * 0.16), rot: (a * 57) % 360, c: pal[i % pal.length], tri: i > 48 });
  }
  return (
    <svg viewBox="0 0 460 330" width={w} style={{ display: "block", maxWidth: "100%" }}>
      <rect x="40" y="118" width="64" height="64" rx="3" fill={C.olive} opacity="0.55" transform="rotate(-6 72 150)" />
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: "spinSlow 90s linear infinite" }}>
        <circle cx={cx} cy={cy} r="44" fill={C.gold} />
        {tiles.map((t, i) => t.tri
          ? <polygon key={i} points={`${t.x},${t.y - t.size / 2} ${t.x + t.size / 2},${t.y + t.size / 2} ${t.x - t.size / 2},${t.y + t.size / 2}`} fill={t.c} transform={`rotate(${t.rot} ${t.x} ${t.y})`} />
          : <rect key={i} x={t.x - t.size / 2} y={t.y - t.size / 2} width={t.size} height={t.size} rx="1.5" fill={t.c} transform={`rotate(${t.rot} ${t.x} ${t.y})`} />)}
      </g>
      <rect x="150" y="262" width="150" height="13" rx="2" fill={C.tealDeep} transform="rotate(-3 225 268)" />
    </svg>
  );
}

/* ----- Co-host logos ----- */
function IdeoLogo({ h = 46, color = C.fg1 }) {
  return (
    <svg viewBox="142 192 339 256" height={h} fill="currentColor" style={{ color, display: "block", overflow: "visible" }}>
      <path d="M230.83 281.174H142V192.344H230.83V281.174ZM147.618 275.562H225.218V197.961H147.618V275.562Z" />
      <path d="M190.447 255.453V218.067H213.057V210.082H159.701V218.067H182.469V255.453H159.78V263.438H213.13V255.453H190.447Z" />
      <path d="M314.048 364.391H225.218V275.561H314.048V364.391ZM230.829 358.774H308.43V281.173H230.829V358.774Z" />
      <path d="M269.669 293.298H242.955V346.653H269.706C284.404 346.611 296.305 334.686 296.305 319.975C296.305 305.265 284.38 293.322 269.663 293.298H269.669ZM269.633 338.669H250.94V301.276H269.633C279.961 301.276 287.764 309.648 287.764 319.969C287.764 330.291 279.961 338.663 269.633 338.663V338.669Z" />
      <path d="M397.267 447.602H308.437V358.772H397.267V447.602ZM314.048 441.991H391.649V364.39H314.048V441.991Z" />
      <path d="M379.524 384.495V376.511H326.186H326.174V429.867H379.524V421.882H334.165V407.178H369.862V399.199H334.165V384.495H379.524Z" />
      <path d="M480.48 364.386H391.649V275.556H480.48V364.386ZM397.267 358.775H474.868V281.174H397.267V358.775Z" />
      <path d="M436.065 349.671C419.478 349.671 405.984 336.395 405.984 319.972C405.984 303.548 419.478 290.273 436.065 290.273C452.651 290.273 466.139 303.548 466.139 319.972C466.139 336.395 452.645 349.671 436.065 349.671ZM436.065 299.166C424.442 299.166 415.01 308.446 415.01 319.972C415.01 331.498 424.448 340.778 436.065 340.778C447.681 340.778 457.119 331.498 457.119 319.972C457.119 308.446 447.681 299.166 436.065 299.166Z" />
    </svg>
  );
}
function RtgLogo({ h = 50, color = C.fg1 }) {
  return (
    <svg viewBox="146 176 332 273" height={h} fill="currentColor" style={{ color, display: "block", overflow: "visible" }}>
      <path d="M207.724 181.181C207.724 180.431 208.338 179.749 209.157 179.749H230.647C239.653 179.749 247.021 186.98 247.021 195.918C247.021 202.808 242.45 208.471 235.9 211.131L246.202 230.234C246.748 231.189 246.202 232.417 244.906 232.417H236.992C236.31 232.417 235.969 232.075 235.764 231.734L225.735 211.813H217.412V230.984C217.412 231.734 216.73 232.417 215.979 232.417H209.089C208.27 232.417 207.656 231.734 207.656 230.984V181.181H207.724ZM229.829 203.763C233.786 203.763 237.265 200.284 237.265 196.122C237.265 192.165 233.786 188.822 229.829 188.822H217.549V203.763H229.829Z" />
      <path d="M270.969 181.181C270.969 180.431 271.651 179.749 272.401 179.749H279.428C280.179 179.749 280.861 180.431 280.861 181.181V230.984C280.861 231.734 280.179 232.417 279.428 232.417H272.401C271.651 232.417 270.969 231.734 270.969 230.984V181.181Z" />
      <path d="M331.206 179C338.779 179 344.305 181.388 349.422 186.027C350.104 186.641 350.104 187.528 349.49 188.142L344.919 192.849C344.373 193.463 343.623 193.463 343.009 192.849C339.871 190.052 335.641 188.415 331.411 188.415C321.792 188.415 314.628 196.465 314.628 205.948C314.628 215.431 321.86 223.345 331.479 223.345C335.982 223.345 339.802 221.639 343.009 219.047C343.623 218.501 344.441 218.569 344.919 219.047L349.558 223.89C350.172 224.436 350.036 225.391 349.49 225.937C344.373 230.917 337.892 233.237 331.206 233.237C316.129 233.237 304.054 221.298 304.054 206.221C304.054 191.144 316.197 179.068 331.206 179.068V179Z" />
      <path d="M372.414 181.181C372.414 180.431 373.096 179.749 373.847 179.749H380.874C381.692 179.749 382.306 180.431 382.306 181.181V201.102H406.866V181.181C406.866 180.431 407.48 179.749 408.299 179.749H415.19C415.94 179.749 416.622 180.431 416.622 181.181V230.984C416.622 231.734 415.94 232.417 415.19 232.417H408.299C407.48 232.417 406.866 231.734 406.866 230.984V210.244H382.306V230.984C382.306 231.734 381.692 232.417 380.874 232.417H373.847C373.096 232.417 372.414 231.734 372.414 230.984V181.181Z" />
      <path d="M160.787 294.643H149.258C148.439 294.643 147.825 293.96 147.825 293.21V287.07C147.825 286.319 148.439 285.637 149.258 285.637H182.141C182.96 285.637 183.574 286.319 183.574 287.07V293.21C183.574 293.96 182.96 294.643 182.141 294.643H170.612V336.872C170.612 337.623 169.929 338.305 169.179 338.305H162.152C161.401 338.305 160.719 337.623 160.719 336.872V294.643H160.787Z" />
      <path d="M195.923 336.389L219.324 285.768C219.528 285.29 219.938 284.949 220.62 284.949H221.37C222.121 284.949 222.394 285.29 222.666 285.768L245.862 336.389C246.34 337.344 245.726 338.368 244.566 338.368H238.017C236.857 338.368 236.379 337.89 235.833 336.867L232.149 328.748H209.636L205.952 336.867C205.679 337.617 204.997 338.368 203.769 338.368H197.219C196.06 338.368 195.514 337.412 195.923 336.389ZM228.397 320.357L220.893 303.779H220.688L213.32 320.357H228.465H228.397Z" />
      <path d="M265.987 287.07C265.987 286.319 266.601 285.637 267.42 285.637H274.31C275.061 285.637 275.743 286.319 275.743 287.07V329.3H294.914C295.732 329.3 296.346 329.982 296.346 330.732V336.872C296.346 337.623 295.732 338.305 294.914 338.305H267.352C266.533 338.305 265.919 337.623 265.919 336.872V287.07H265.987Z" />
      <path d="M317.495 287.07C317.495 286.319 318.109 285.637 318.928 285.637H349.56C350.378 285.637 350.992 286.319 350.992 287.07V293.21C350.992 293.96 350.378 294.643 349.56 294.643H327.319V306.991H345.944C346.694 306.991 347.377 307.673 347.377 308.424V314.7C347.377 315.519 346.694 316.133 345.944 316.133H327.319V329.3H349.56C350.378 329.3 350.992 329.982 350.992 330.732V336.872C350.992 337.623 350.378 338.305 349.56 338.305H318.928C318.109 338.305 317.495 337.623 317.495 336.872V287.07Z" />
      <path d="M374.323 286.248C374.323 285.498 375.005 284.884 375.756 284.884H376.916C377.461 284.884 377.803 285.02 378.212 285.43L408.912 318.176H409.049V287.135C409.049 286.385 409.663 285.702 410.481 285.702H417.372C418.122 285.702 418.804 286.385 418.804 287.135V337.756C418.804 338.507 418.122 339.121 417.372 339.121H416.348C415.803 339.121 415.461 338.984 415.052 338.575L384.216 304.6H384.079V336.938C384.079 337.688 383.465 338.37 382.646 338.37H375.824C375.074 338.37 374.391 337.688 374.391 336.938V286.316L374.323 286.248Z" />
      <path d="M453.599 294.643H442.069C441.251 294.643 440.637 293.96 440.637 293.21V287.07C440.637 286.319 441.251 285.637 442.069 285.637H474.953C475.771 285.637 476.385 286.319 476.385 287.07V293.21C476.385 293.96 475.771 294.643 474.953 294.643H463.423V336.872C463.423 337.623 462.741 338.305 461.99 338.305H454.963C454.213 338.305 453.531 337.623 453.531 336.872V294.643H453.599Z" />
      <path d="M184.254 390.765C191.008 390.765 197.49 393.426 202.606 397.792C203.22 398.406 203.289 399.293 202.675 399.907L198.035 404.819C197.421 405.433 196.739 405.433 196.057 404.819C192.85 401.954 188.825 400.453 184.732 400.453C175.317 400.453 167.881 408.503 167.881 417.918C167.881 427.333 175.317 435.178 184.8 435.178C189.03 435.178 192.236 433.882 193.737 433.268V426.855H187.734C186.915 426.855 186.301 426.241 186.301 425.49V419.555C186.301 418.736 186.915 418.122 187.734 418.122H202.197C202.947 418.122 203.561 418.805 203.561 419.555V438.794C203.561 439.408 203.22 439.749 202.947 439.954C202.947 439.954 195.17 444.866 184.254 444.866C169.314 444.866 157.238 432.995 157.238 417.918C157.238 402.841 169.314 390.765 184.254 390.765Z" />
      <path d="M227.85 392.947C227.85 392.196 228.464 391.514 229.283 391.514H250.773C259.779 391.514 267.147 398.745 267.147 407.683C267.147 414.573 262.576 420.236 256.026 422.896L266.328 441.999C266.874 442.954 266.328 444.182 265.032 444.182H257.118C256.436 444.182 256.095 443.841 255.89 443.5L245.861 423.578H237.538V442.749C237.538 443.499 236.856 444.182 236.105 444.182H229.215C228.396 444.182 227.782 443.499 227.782 442.749V392.947H227.85ZM249.955 415.528C253.911 415.528 257.391 412.049 257.391 407.887C257.391 403.93 253.911 400.587 249.955 400.587H237.674V415.528H249.955Z" />
      <path d="M314.97 390.765C330.047 390.765 342.055 402.909 342.055 417.918C342.055 432.927 330.047 444.934 314.97 444.934C299.893 444.934 287.954 432.995 287.954 417.918C287.954 402.841 299.893 390.765 314.97 390.765ZM314.97 435.178C324.453 435.178 332.299 427.401 332.299 417.918C332.299 408.435 324.453 400.521 314.97 400.521C305.487 400.521 297.71 408.435 297.71 417.918C297.71 427.401 305.487 435.178 314.97 435.178Z" />
      <path d="M364.774 392.947C364.774 392.196 365.457 391.514 366.207 391.514H373.37C374.189 391.514 374.803 392.196 374.803 392.947V424.329C374.803 430.742 379.169 435.176 385.719 435.176C392.268 435.176 396.703 430.742 396.703 424.397V392.947C396.703 392.196 397.317 391.514 398.135 391.514H405.299C406.049 391.514 406.731 392.196 406.731 392.947V424.875C406.731 436.336 397.658 445 385.719 445C373.78 445 364.774 436.336 364.774 424.875V392.947Z" />
      <path d="M432.449 392.947C432.449 392.196 433.063 391.514 433.882 391.514H451.552C460.83 391.514 468.403 399.018 468.403 408.16C468.403 417.302 460.83 425.079 451.62 425.079H442.205V442.749C442.205 443.499 441.523 444.182 440.772 444.182H433.882C433.063 444.182 432.449 443.499 432.449 442.749V392.947ZM451.279 415.869C455.508 415.869 458.715 412.458 458.715 408.024C458.715 403.862 455.508 400.724 451.279 400.724H442.273V415.869H451.279Z" />
    </svg>
  );
}
function SyLogo({ h = 26, color = C.fg1 }) {
  return <span style={{ fontFamily: SAN, fontWeight: 700, fontSize: h, lineHeight: 1, letterSpacing: "-.015em", color, whiteSpace: "nowrap" }}>SYPartners</span>;
}
function FirmLogo({ id, h = 52, color = C.fg1 }) {
  if (id === "IDEO") return <IdeoLogo h={h} color={color} />;
  if (id === "RTG") return <RtgLogo h={h} color={color} />;
  return <SyLogo h={Math.round(h * 0.52)} color={color} />;
}

const BRICKS = (() => {
  const pal = [C.teal, C.olive, C.rust, C.oliveLt, C.tealDeep, C.paleGreen, "transparent", "transparent", C.olive, C.teal, "transparent"];
  const cols = 7, rows = 8, cell = 54, arr = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const k = r * cols + c;
    arr.push({ x: c * cell, y: r * cell, color: pal[(k * 5 + (r % 2 ? 3 : 0)) % pal.length], rot: ((r + c) % 3 - 1) * 6, op: Math.max(0.22, 0.92 - r * 0.05) });
  }
  return { arr, cell, cols, rows };
})();

function BrickField() {
  const slots = BRICKS.arr;
  const [order, setOrder] = useState(() => slots.map((_, i) => i));
  useEffect(() => {
    const id = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        for (let s = 0; s < 5; s++) {
          const a = Math.floor(Math.random() * next.length);
          const b = Math.floor(Math.random() * next.length);
          [next[a], next[b]] = [next[b], next[a]];
        }
        return next;
      });
    }, 560);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {slots.map((b, i) => {
        const target = slots[order[i]];
        return (
          <div key={i} style={{
            position: "absolute", left: target.x, top: target.y,
            width: BRICKS.cell - 7, height: BRICKS.cell - 7,
            background: b.color, opacity: b.op, borderRadius: 4,
            "--r": `${b.rot}deg`, "--op": b.op, transform: `rotate(${b.rot}deg)`,
            transition: "left .85s cubic-bezier(.5,0,.2,1), top .85s cubic-bezier(.5,0,.2,1)",
            animation: `brickFloat ${2.6 + (i % 4) * 0.5}s ease-in-out ${(i % 7) * 0.1}s infinite`,
          }} />
        );
      })}
    </>
  );
}

function Chip({ active, onClick, accent, children }) {
  return (
    <button onClick={onClick} className="tab" style={{
      padding: "8px 15px", borderRadius: 22, fontSize: 13, fontWeight: 600, fontFamily: SAN,
      border: `1.5px solid ${active ? (accent || C.forest) : C.line}`,
      background: active ? (accent || C.forest) : C.white,
      color: active ? C.onDark : C.fg1,
      boxShadow: active ? "0 6px 16px rgba(22,41,31,.14)" : "none",
    }}>{children}</button>
  );
}

function RoomView({ activeTable, onSelect, promptColors, mob }) {
  const tables = [{ n: 1, x: 27, y: 27 }, { n: 2, x: 73, y: 27 }, { n: 3, x: 27, y: 73 }, { n: 4, x: 73, y: 73 }];
  const dia = 28, chairR = 18, chairAngles = [20, 80, 140, 200, 260, 320];
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", maxWidth: mob ? 360 : 520, margin: mob ? "0 auto" : 0, background: C.floor, borderRadius: 18, overflow: "hidden", border: `1px solid ${C.lineStrong}`, boxShadow: "inset 0 2px 14px rgba(22,41,31,.10)" }}>
      {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i + 1) * 10}%`, width: 1, background: "rgba(22,41,31,0.04)" }} />)}
      <Grain op={0.06} />
      <button onClick={() => onSelect(null)} className="tab" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "16%", height: "16%", borderRadius: "50%", cursor: "pointer", border: `2px dashed ${activeTable === null ? C.forest : C.lineStrong}`, background: activeTable === null ? C.paleGreen : "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
        <span style={{ fontFamily: SER, fontSize: mob ? 9 : 11, lineHeight: 1.05, color: C.forest, textAlign: "center" }}>the room<br />overall</span>
      </button>
      {tables.map((t) => {
        const on = activeTable === t.n;
        const dim = activeTable !== null && !on;
        return (
          <div key={t.n}>
            {chairAngles.map((a, ci) => {
              const rad = (a * Math.PI) / 180, cx = t.x + Math.cos(rad) * chairR, cy = t.y + Math.sin(rad) * chairR;
              return <div key={ci} style={{ position: "absolute", left: `${cx}%`, top: `${cy}%`, width: "5.5%", height: "5.5%", transform: `translate(-50%,-50%) rotate(${a + 90}deg)`, background: C.chair, borderRadius: "42% 42% 30% 30%", opacity: dim ? 0.35 : 0.8, transition: "opacity .3s", zIndex: 1 }} />;
            })}
            <button onClick={() => onSelect(t.n)} className="tableBtn" style={{ position: "absolute", left: `${t.x}%`, top: `${t.y}%`, width: `${dia}%`, height: `${dia}%`, transform: `translate(-50%,-50%) scale(${on ? 1.07 : 1})`, borderRadius: "50%", cursor: "pointer", border: `2px solid ${on ? C.forest : C.line}`, background: C.table, boxShadow: on ? "0 14px 32px rgba(22,41,31,.24)" : "0 6px 16px rgba(22,41,31,.12)", opacity: dim ? 0.5 : 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "all .35s ease-out", zIndex: on ? 4 : 2 }}>
              <span className="eyebrow" style={{ fontSize: mob ? 8 : 9, color: C.fg3 }}>Table</span>
              <span style={{ fontFamily: SER, fontSize: mob ? 26 : 36, fontWeight: 500, lineHeight: 0.85, color: on ? C.forest : C.fg1 }}>{t.n}</span>
              <div style={{ display: "flex", gap: mob ? 4 : 6, marginTop: mob ? 5 : 8 }}>
                {promptColors.map((pc, pi) => <span key={pi} style={{ width: mob ? 8 : 10, height: mob ? 8 : 10, borderRadius: 2, background: pc, transform: `rotate(${(pi - 1) * 8}deg)`, opacity: on ? 1 : 0.85 }} />)}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ---- DATA ----
const TOC = [
  { id: "panel", label: "The Fireside Chat", color: C.rust },
  { id: "tables", label: "The Listening Room", color: C.olive },
  { id: "assess", label: "The Assessment", color: C.teal },
];

const PANEL = [
  { n: "01", lbl: "Efficiency is the mechanism", t: "Efficiency is the mechanism, not the destination.", ins: "AI creates capacity, but capacity only becomes advantage when leaders intentionally direct it toward higher-value work.", take: "The question shifts from “How do we do the same work faster?” to “What better work should we now have time to do?”" },
  { n: "02", lbl: "Reinvest the dividend", t: "The AI Dividend needs to be reinvested.", ins: "Saved time should be treated as a strategic asset — allocated with the same discipline as capital, talent, or budget.", take: "The AI Dividend is only valuable if leaders protect it and reinvest it." },
  { n: "03", lbl: "Redesign, don't bolt on", t: "AI exposes the limits of old operating models.", ins: "AI will not transform organizations that simply plug new tools into old workflows.", take: "The opportunity is to redesign the system around the work humans are best positioned to do." },
  { n: "04", lbl: "The creative frontier", t: "The creative frontier becomes the competitive frontier.", ins: "When more organizations can move fast, distinction comes from stronger ideas, sharper choices, and more meaningful human judgment.", take: "When everything is easier to make, knowing what is worth making becomes the advantage." },
  { n: "05", lbl: "Adaptive beats efficient", t: "Adaptive organizations will outperform efficient ones.", ins: "The strongest organizations will use AI to increase learning velocity, not just output volume.", take: "The winners will use AI to become more adaptive, not simply more automated." },
  { n: "06", lbl: "Conditions over control", t: "Leadership becomes less about control, more about conditions.", ins: "AI makes command-and-control less effective. Leaders shape the environment where people apply judgment with confidence.", take: "The leader’s role shifts from directing activity to designing the conditions for better work." },
];

const COMPANIES = [
  { id: "RTG", firm: "Rich Talent Group", accent: C.rust,
    desc: "Rich Talent Group recruits extraordinary leaders for companies that want to make an impact and need a firm that goes beyond the traditional playbook. Combining deep expertise with creative sourcing and expansive networks, RTG builds leadership teams and boards for some of the world’s most influential companies.",
    linkText: null, linkUrl: null, reachUrl: "#",
    prompt: "In a world where AI increasingly democratizes expertise and execution, what human qualities will become the strongest predictors of executive leadership success?",
    overall: "The human edge converges on judgment, taste, and the humility to keep learning." },
  { id: "SY", firm: "SYPartners", accent: C.olive,
    desc: "SYPartners is a consultancy that partners with clients at their critical turning points — designing new possibilities for impact, creating paths to long-term value, and building cultures of competitive advantage. For more than 30 years they’ve transformed some of the world’s most iconic organizations by fusing strategy and design. Their perspective on AI recently inspired their Zero Gravity Leadership piece.",
    linkText: "Read Zero Gravity Leadership", linkUrl: "#", reachUrl: "#",
    prompt: "What leadership capabilities will distinguish businesses that merely deploy AI from those that use AI to spark new value?",
    overall: "Value comes from sharper questions, faster learning, protected attention, and meaning that motivates." },
  { id: "IDEO", firm: "IDEO", accent: C.teal,
    desc: "IDEO is an iconic design and innovation company, enabling the world’s most influential leaders to create breakthrough, human-centered products, services, and organizations with purpose and impact. In partnership with Tim Brown, they recently released their latest thought piece, The AI Dividend.",
    linkText: "Read The AI Dividend", linkUrl: "#", reachUrl: "#",
    prompt: "What does your organization need to fully take advantage of an AI Dividend? What might stand in the way?",
    overall: "The dividend is realized when time is made visible, trusted, woven into the rhythm, and the work redesigned." },
];

const INSIGHTS = [
  { co: "RTG", table: 1, t: "Judgment and accountability stay human.", ins: "As expertise gets democratized, leaders are differentiated less by what they know and more by how they decide under uncertainty. AI can inform the call, but it can’t own the consequences.", tag: "Judgment · integrity", frags: ["everyone can know things now", "it’s how you decide that’s rare", "the model can’t own the call", "you still own the outcome", "verify before you trust", "the buck stays with you"] },
  { co: "RTG", table: 2, t: "Taste and courage create distinction.", ins: "When the average answer gets better, sameness becomes the risk. Leaders need the taste to recognize quality before it’s obvious — and the courage to move past safe, optimized, familiar work.", tag: "Taste · courage", frags: ["spotting good before it’s proven", "you can’t prompt taste", "the average answer just got better", "safe is the new risky", "convergence is the trap", "dare to be distinctive"] },
  { co: "RTG", table: 3, t: "Empathy and learning agility set the pace.", ins: "Transformation is experienced by people, so emotional context and trust matter more in fast change. And as knowledge ages quickly, the edge is updating your mental model faster than the world shifts.", tag: "Empathy · learning agility", frags: ["people feel the change, not the system", "trust moves people, not tools", "you have to read the room", "unlearn faster than the world changes", "update the mental model, fast", "stay a student"] },
  { co: "RTG", table: 4, t: "Self-awareness and the humility to be wrong.", ins: "The leaders who thrive treat their own conviction as a hypothesis — confident enough to act, humble enough to update when AI or a colleague surfaces a better read.", tag: "Self-awareness · humility", frags: ["strong opinions, loosely held", "be the first to say I was wrong", "ego is the real bottleneck", "confidence without certainty", "ask who you’re not hearing", "humble enough to change course"] },
  { co: "SY", table: 1, t: "Lead with better questions and sharper discernment.", ins: "Value-creating leaders use AI to challenge assumptions and reframe problems — not just answer them. And amid ten plausible options, they know when output is useful, generic, or missing human context. That judgment is taste.", tag: "Curiosity · framing · taste", frags: ["we ask it to answer, never to question", "the reframe is the whole game", "it gives me ten options, all fine", "but fine isn’t the bar", "you can smell the AI on it", "context is the whole thing"] },
  { co: "SY", table: 2, t: "Design for experimentation, not just execution.", ins: "AI’s real value is faster learning, not only faster output. The capability is turning many small, fast experiments into a system that compounds into learning.", tag: "Experiment design · learning", frags: ["we test a lot, learn little", "learning speed beats doing speed", "make the experiment a system", "fail small, fast, on purpose", "kill it fast if it’s dead", "testing isn’t learning"] },
  { co: "SY", table: 3, t: "Protect attention and build confidence through change.", ins: "AI can free attention or flood it — leaders decide what deserves human focus. And they build belief, not compliance, helping people learn and apply judgment with confidence.", tag: "Focus · coaching · trust", frags: ["more inputs, not more focus", "what actually deserves a human?", "I’m drowning in drafts", "protect the deep work", "compliance isn’t adoption", "make it safe to try"] },
  { co: "SY", table: 4, t: "Make meaning, not just decisions.", ins: "As AI handles more of the “what,” leaders earn their keep on the “why” — connecting the work to purpose so people stay motivated when the machine could do the task.", tag: "Meaning · narrative", frags: ["AI can decide, it can’t inspire", "people need a why, not a workflow", "tell the story, not the spec", "motivation is a leadership job", "meaning beats mandates", "connect work to something bigger"] },
  { co: "IDEO", table: 1, t: "Make the time visible, then reinvest it on purpose.", ins: "You can’t reinvest what you can’t see. Map work into what AI can absorb, accelerate, protect, or stop — then name the intended return on the hours you free: strategy, customer understanding, creative exploration, coaching.", x: "Most companies measure output far more clearly than time; old habits and short-term cost pressure quietly refill freed hours with more tasks.", frags: ["where does the time actually go?", "we save the hours, then just fill them", "we measure output, not attention", "map it before you automate it", "more capacity just became more meetings", "be deliberate, or it evaporates"] },
  { co: "IDEO", table: 2, t: "Build AI into the operating rhythm.", ins: "AI creates value when it’s woven into how teams plan, decide, create, and review — not when it lives in isolated pilots. The harder shift is habits and shared standards, not tool access.", x: "Fragmented pilots, inconsistent use, and no shared sense of what good AI-enabled work actually looks like.", frags: ["we’re piloting it, not living it", "everyone’s using it differently", "what does ‘good’ even look like here?", "the tools are fine — the habits aren’t", "we have champions, not a standard", "make it the rhythm, not the exception"] },
  { co: "IDEO", table: 3, t: "Trust is the precondition for the dividend.", ins: "People need to believe AI is being used to unlock better work, not to extract more labor. Without transparency about what changes, the gain reads as a threat.", x: "Fear of job loss, mixed leadership signals, and a lack of honesty about what AI actually changes.", frags: ["people think it’s code for layoffs", "is this to help me or replace me?", "say the quiet part — what’s it for?", "trust has to come before the tools", "give us autonomy, not surveillance", "no one will say it out loud"] },
  { co: "IDEO", table: 4, t: "Redesign the work, don’t just speed it up.", ins: "Bolting AI onto yesterday’s process only makes a flawed system faster. The dividend shows up when teams rebuild the workflow around what humans and AI each do best.", x: "Sunk-cost attachment to existing processes, and the effort of redesign feeling riskier than incremental tweaks.", frags: ["faster bad process is still bad", "we paved the cowpath", "redesign beats retrofit", "what would we build from scratch?", "automate the task, rethink the job", "don’t bolt it on"] },
];

const ASSESS = [
  { dim: "Reinvestment", q: "We’ve decided where our reclaimed time should go.", tip: "Name the return you want on saved time — strategy, customer insight, creativity, coaching — before it’s absorbed." },
  { dim: "Operating rhythm", q: "AI is built into how we plan, decide, create, and review — not isolated pilots.", tip: "Move AI out of side projects and into the team’s everyday operating rhythm." },
  { dim: "Time visibility", q: "We can see where time goes, and what AI should absorb, accelerate, or leave to humans.", tip: "Map work into four buckets: what AI can absorb, accelerate, what humans protect, and what to stop doing." },
  { dim: "Trust", q: "Our people trust AI is used to unlock better work, not to extract more labor.", tip: "Make it explicit that the dividend is meant to create room, not raise the quota." },
  { dim: "Discernment", q: "Our leaders can tell signal from noise in AI output.", tip: "Build the muscle to judge when AI output is useful, generic, or missing human context." },
  { dim: "Learning velocity", q: "We turn AI experiments into learning, quickly.", tip: "Design experiments as learning systems, not one-off tests." },
];
const BANDS = [
  { min: 0, name: "Extracting", color: C.rust, note: "The dividend is being absorbed as more output and higher expectations — the squeeze that erodes trust. Start by deciding where the time should go." },
  { min: 36, name: "Drifting", color: C.olive, note: "You’re creating capacity, but it’s leaking away. The gain needs an owner and a plan before it disappears into more work." },
  { min: 61, name: "Reinvesting", color: C.teal, note: "You’re directing reclaimed time toward better work. Protect it — and keep sharpening where it lands." },
  { min: 83, name: "Compounding", color: C.oliveLt, note: "The dividend is visible, intentional, and protected. Now press the advantage — distinctiveness over sameness." },
];
const PIPE = [
  { Icon: Mic, t: "Record & transcribe", d: "The evening was captured and transcribed automatically with AI.", tool: "AI transcription", color: C.teal },
  { Icon: Sparkles, t: "Synthesize", d: "Transcripts distilled into the themes and insights you’ve just explored.", tool: "ChatGPT", color: C.olive },
  { Icon: PenTool, t: "Design", d: "The visual system and layouts were composed and refined.", tool: "Figma", color: C.rust },
  { Icon: Code2, t: "Build", d: "This interactive experience was designed and developed.", tool: "Claude Design & Code", color: C.tealDeep },
];

export default function App() {
  const mob = useMobile();
  const [node, setNode] = useState(null);
  const [activeTable, setActiveTable] = useState(null);
  const [activePrompt, setActivePrompt] = useState("RTG");
  const [scores, setScores] = useState(ASSESS.map(() => 50));

  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const band = [...BANDS].reverse().find((b) => avg >= b.min);
  const weakest = scores.indexOf(Math.min(...scores));
  const TILES = 24, filled = Math.round((avg / 100) * TILES);

  const sections = ["intro", "panel", "tables", "assess", "built"];
  const [active, setActive] = useState("intro");
  useEffect(() => { const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { threshold: 0.4 });
    sections.forEach((s) => { const el = document.getElementById(s); if (el) o.observe(el); }); return () => o.disconnect(); }, []);
  const eyebrow = (txt, color) => <div className="eyebrow" style={{ color: color || C.fg3, marginBottom: 20 }}>{txt}</div>;

  const POS = [{ x: 50, y: 11 }, { x: 81, y: 31 }, { x: 81, y: 69 }, { x: 50, y: 89 }, { x: 19, y: 69 }, { x: 19, y: 31 }];
  const satColors = [C.teal, C.olive, C.rust, C.tealDeep, C.oliveLt, C.olive];
  const sel = node != null ? PANEL[node] : null;
  const coOf = (id) => COMPANIES.find((c) => c.id === id);
  const promptColors = COMPANIES.map((c) => c.accent);
  const activeCo = coOf(activePrompt);
  const activeInsight = activeTable != null ? INSIGHTS.find((x) => x.co === activePrompt && x.table === activeTable) : null;

  const CoHostCards = (
    <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: mob ? 24 : 32 }}>
      {COMPANIES.map((c) => (
        <div key={c.id} style={{ borderTop: `2px solid ${c.accent}`, paddingTop: 16 }}>
          <div style={{ height: 40, display: "flex", alignItems: "center" }}>
            <FirmLogo id={c.id} h={c.id === "RTG" ? 36 : 34} color={C.fg1} />
          </div>
          <p style={{ color: C.fg2, fontSize: 13.5, lineHeight: 1.55, margin: "12px 0 12px" }}>{c.desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            {c.linkUrl && <a className="clink" href={c.linkUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: c.accent, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>{c.linkText} <ArrowRight size={14} /></a>}
            <a className="clink" href={c.reachUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.fg2, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>Reach out <ArrowRight size={14} /></a>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ background: C.cream, color: C.fg1, fontFamily: SAN, minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <style>{CSS}</style>

      <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 60, display: "flex", flexDirection: "column", gap: 13 }}>
        {sections.map((s) => <a key={s} href={`#${s}`} title={s} style={{ width: 9, height: 9, borderRadius: 2, background: active === s ? C.teal : C.lineStrong, transition: "all .3s ease-out", transform: active === s ? "scale(1.3) rotate(45deg)" : "rotate(0)" }} />)}
      </div>

      {/* 1 · INTRO */}
      <section id="intro" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "7vh 7vw 6vh", overflow: "hidden" }}>
        {!mob && <div style={{ position: "absolute", top: -60, right: -55, width: BRICKS.cols * BRICKS.cell, height: BRICKS.rows * BRICKS.cell, transform: "rotate(-8deg) scale(1.12)", opacity: 0.7, WebkitMaskImage: "linear-gradient(120deg,transparent 0%,#000 45%)", maskImage: "linear-gradient(120deg,transparent 0%,#000 45%)", pointerEvents: "none" }}>
          <BrickField />
        </div>}
        <Grain />
        <div style={{ position: "relative", maxWidth: 660, zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", animation: "riseIn .8s ease-out both" }}>
            <span style={{ display: "inline-block", background: C.paleGreen, color: C.forest, fontFamily: SER, fontSize: "clamp(16px,2vw,22px)", padding: "5px 16px" }}>
              kyu <span style={{ fontWeight: 600, letterSpacing: ".04em" }}>HOUSE</span>
            </span>
            <span className="eyebrow" style={{ color: C.fg2 }}>a gathering on leadership &amp; AI</span>
          </div>

          <div style={{ display: "inline-block", marginTop: 26, animation: "riseIn .9s ease-out .1s both" }}>
            <div style={{ background: C.tealDeep, padding: "16px 42px 22px 28px", boxShadow: "0 18px 44px rgba(22,41,31,.18)" }}>
              <h1 style={{ fontFamily: SER, fontSize: "clamp(46px,8.4vw,108px)", lineHeight: 0.9, fontWeight: 500, margin: 0, color: C.onDark, letterSpacing: -1 }}>
                The AI<br />Dividend
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24, flexWrap: "wrap", animation: "riseIn .9s ease-out .18s both" }}>
            <span className="eyebrow" style={{ color: C.fg1 }}>June 8, 2026</span>
            <span style={{ width: 30, height: 1, background: C.lineStrong }} />
            <span className="eyebrow" style={{ color: C.fg3 }}>co-hosted by</span>
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(18px,3vw,30px)", flexWrap: "wrap" }}>
              <IdeoLogo h={28} />
              <SyLogo h={17} />
              <RtgLogo h={32} />
            </div>
          </div>

          <div style={{ marginTop: 36, animation: "riseIn .9s ease-out .28s both" }}>
            <div style={{ fontFamily: SER, fontSize: "clamp(20px,3.3vw,31px)", color: C.fg3, textDecoration: "line-through", fontStyle: "italic", lineHeight: 1.25 }}>How do we do the same work faster?</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 12 }}>
              <ArrowRight size={26} color={C.rust} style={{ flexShrink: 0, marginTop: 6 }} />
              <span style={{ position: "relative", fontFamily: SER, fontSize: "clamp(20px,3.3vw,31px)", color: C.rust, fontStyle: "italic", lineHeight: 1.25 }}>
                What better work will we do with the time we free up?
              </span>
            </div>
          </div>

          <a href="#panel" style={{ display: "inline-flex", alignItems: "center", gap: 13, marginTop: 44, color: C.fg1, textDecoration: "none", fontSize: 13, letterSpacing: ".05em", fontWeight: 600, animation: "riseIn .9s ease-out .4s both" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 4, border: `1px solid ${C.lineStrong}`, background: C.white, animation: "bounceDown 1.8s ease-in-out infinite" }}><ArrowDown size={18} color={C.teal} /></span>
            Enter the room
          </a>
        </div>
      </section>

      {/* CONTENTS MENU */}
      <nav style={{ position: "relative", padding: mob ? "34px 7vw" : "44px 7vw", background: C.menu, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="eyebrow" style={{ color: C.fg3, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "flex", gap: 4 }}>
            {[C.rust, C.olive, C.teal].map((cc, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: 2, background: cc, transform: `rotate(${(i - 1) * 8}deg)` }} />)}
          </span>
          Contents · the evening in three parts
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: 14 }}>
          {TOC.map((t, i) => (
            <a key={t.id} href={`#${t.id}`} className="menuItem" style={{ "--ac": t.color, display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", borderRadius: 10, textDecoration: "none", color: C.fg1 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 6, background: t.color, color: C.onDark, fontFamily: SER, fontSize: 19, transform: "rotate(-3deg)", flexShrink: 0 }}>0{i + 1}</span>
              <span style={{ fontFamily: SER, fontSize: "clamp(18px,2.2vw,23px)", lineHeight: 1.1 }}>{t.label}</span>
              <ArrowRight size={17} color={t.color} style={{ marginLeft: "auto", flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </nav>

      {/* 2 · PANEL */}
      <section id="panel" style={{ padding: "12vh 7vw", background: C.sand, position: "relative", overflow: "hidden" }}>
        <Grain />
        {!mob && <div style={{ position: "absolute", bottom: -50, left: -40, opacity: 0.2, transform: "rotate(8deg) scale(0.85)", WebkitMaskImage: "linear-gradient(320deg,transparent,#000 70%)", maskImage: "linear-gradient(320deg,transparent,#000 70%)", pointerEvents: "none" }}>
          <SynthesisTree w={300} />
        </div>}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <SectionTag num="01" text="the fireside chat" accent={C.rust} />
            <h2 style={{ fontFamily: SER, fontSize: "clamp(32px,5vw,56px)", fontWeight: 500, margin: 0, lineHeight: 1.08, maxWidth: 860, color: C.rust }}>
              Tim Brown, Joe Gerber &amp; Mike Peng on the{" "}
              <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                AI Dividend
                <CircleScribble color={C.rust} style={{ position: "absolute", left: "-7%", top: "-26%", width: "114%", height: "158%", pointerEvents: "none" }} />
              </span>
            </h2>
            <p style={{ color: C.fg2, marginTop: 22, fontSize: 17, lineHeight: 1.5, maxWidth: 620 }}>Six insights wove through the conversation. {mob ? "Tap" : "Select"} a tile to bring it to the center.</p>
          </Reveal>

          {mob ? (
            <div style={{ marginTop: 36 }}>
              {PANEL.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.05}>
                  <div onClick={() => setNode(node === i ? null : i)} style={{ borderTop: `1px solid ${C.line}`, padding: "20px 0", cursor: "pointer" }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                      <span style={{ fontFamily: SER, color: node === i ? C.teal : C.lineStrong, fontSize: 20 }}>{p.n}</span>
                      <h3 style={{ fontFamily: SER, fontWeight: 500, fontSize: 22, margin: 0, color: node === i ? C.teal : C.fg1 }}>{p.t}</h3>
                    </div>
                    <div style={{ maxHeight: node === i ? 320 : 0, overflow: "hidden", transition: "max-height .5s ease-out" }}>
                      <p style={{ color: C.fg2, fontSize: 16, lineHeight: 1.55, margin: "14px 0 0", paddingLeft: 36 }}>{p.ins}</p>
                      <p style={{ fontFamily: SER, fontStyle: "italic", color: C.teal, fontSize: 19, lineHeight: 1.4, margin: "14px 0 0", paddingLeft: 36, borderLeft: `2px solid ${C.teal}`, marginLeft: 36 }}>{p.take}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal style={{ marginTop: 24 }}>
              <div style={{ position: "relative", height: 600, maxWidth: 980, margin: "0 auto" }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  {POS.map((p, i) => <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke={node === i ? C.teal : C.line} strokeWidth="0.15" vectorEffect="non-scaling-stroke" />)}
                </svg>
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 330, height: 300, borderRadius: 8, background: sel ? C.white : "transparent", border: `1px solid ${sel ? C.line : "transparent"}`, boxShadow: sel ? "0 16px 44px rgba(22,41,31,.12)" : "none", display: "flex", flexDirection: "column", justifyContent: "center", padding: 40, textAlign: "center", transition: "all .4s ease-out", zIndex: 5 }}>
                  {sel ? (<>
                    <span className="eyebrow" style={{ color: C.teal, fontSize: 11 }}>{sel.n} · insight</span>
                    <p style={{ color: C.fg2, fontSize: 14.5, lineHeight: 1.5, margin: "12px 0 14px" }}>{sel.ins}</p>
                    <p style={{ fontFamily: SER, fontStyle: "italic", color: C.fg1, fontSize: 18, lineHeight: 1.35, margin: 0 }}>{sel.take}</p>
                  </>) : (<>
                    <span className="eyebrow" style={{ color: C.teal, fontSize: 11 }}>the thesis</span>
                    <p style={{ fontFamily: SER, fontSize: 20, lineHeight: 1.4, color: C.fg1, margin: "12px 0 0", fontStyle: "italic" }}>AI’s greater potential is the human capacity it unlocks.</p>
                    <p style={{ color: C.fg3, fontSize: 13, marginTop: 14 }}>Select a tile</p>
                  </>)}
                </div>
                {PANEL.map((p, i) => {
                  const on = node === i; const tilt = ((i % 3) - 1) * 5;
                  return (
                    <div key={p.n} className="sat" onClick={() => setNode(on ? null : i)}
                      style={{ position: "absolute", left: `${POS[i].x}%`, top: `${POS[i].y}%`, transform: `translate(-50%,-50%) rotate(${tilt}deg)`, width: 150, height: 130, borderRadius: 8, cursor: "pointer", zIndex: 6,
                        background: on ? satColors[i] : C.white, color: on ? C.onDark : C.fg1, border: `1px solid ${on ? satColors[i] : C.line}`, boxShadow: "0 6px 18px rgba(22,41,31,.08)", transition: "background .35s ease-out,color .35s ease-out",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 18 }}>
                      <span style={{ fontFamily: SER, fontSize: 15, opacity: 0.55 }}>{p.n}</span>
                      <span style={{ fontFamily: SER, fontSize: 17, lineHeight: 1.15, marginTop: 4 }}>{p.lbl}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* 3 · THE LISTENING ROOM */}
      <section id="tables" style={{ padding: "12vh 7vw", background: C.sage, borderTop: `1px solid ${C.line}`, position: "relative", overflow: "hidden" }}>
        <Grain />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <SectionTag num="02" text="the roundtables · we were listening" accent={C.olive} />
            <h2 style={{ fontFamily: SER, fontSize: "clamp(32px,5vw,56px)", fontWeight: 500, margin: 0, lineHeight: 1.02, color: C.rust }}>The Listening Room</h2>
            <Scribble w={230} color={C.olive} style={{ marginTop: 8 }} />
            <p style={{ color: C.fg2, marginTop: 14, fontSize: 17, lineHeight: 1.5, maxWidth: 660 }}>Four tables, each working through all three prompts. Tap a table to explore what was said there — or the center of the room for the overall themes.</p>
          </Reveal>

          <Reveal style={{ marginTop: 36 }}>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "0.85fr 1.15fr", gap: mob ? 30 : 44, alignItems: "start" }}>
              <div>
                <RoomView activeTable={activeTable} onSelect={(v) => setActiveTable(v)} promptColors={promptColors} mob={mob} />
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
                  <span className="eyebrow" style={{ color: C.fg3, fontSize: 10 }}>prompts at every table</span>
                  {COMPANIES.map((c) => (
                    <span key={c.id} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: C.fg2 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: c.accent }} /> {c.firm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bloom" key={activeTable ?? "overall"} style={{ minHeight: mob ? "auto" : 420 }}>
                {activeTable == null ? (
                  <>
                    <span className="eyebrow" style={{ color: C.olive }}>the room overall</span>
                    <h3 style={{ fontFamily: SER, fontWeight: 500, fontSize: "clamp(24px,3.2vw,32px)", lineHeight: 1.15, margin: "10px 0 0" }}>Three themes, one per prompt</h3>
                    <p style={{ color: C.fg2, fontSize: 15, lineHeight: 1.55, margin: "10px 0 26px", maxWidth: 540 }}>Across all four tables, each co-host’s prompt drew out a distinct theme. Tap a table in the room to read its specific insights and the voices behind them.</p>
                    <div style={{ display: "grid", gap: 14 }}>
                      {COMPANIES.map((c) => (
                        <div key={c.id} style={{ borderLeft: `3px solid ${c.accent}`, paddingLeft: 18 }}>
                          <span className="eyebrow" style={{ color: c.accent, fontSize: 10 }}>prompt from {c.firm}</span>
                          <p style={{ fontFamily: SER, fontStyle: "italic", fontSize: 14.5, color: C.fg3, margin: "6px 0 8px", maxWidth: 560 }}>“{c.prompt}”</p>
                          <p style={{ fontFamily: SER, fontSize: "clamp(17px,2vw,20px)", lineHeight: 1.3, color: C.fg1, margin: 0, maxWidth: 560 }}>{c.overall}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={() => setActiveTable(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.fg3, fontWeight: 600, fontSize: 13, fontFamily: SAN, padding: 0 }}>← The room overall</button>
                    <h3 style={{ fontFamily: SER, fontWeight: 500, fontSize: "clamp(26px,3.6vw,36px)", lineHeight: 1.1, margin: "12px 0 4px" }}>Table {activeTable}</h3>
                    <p style={{ color: C.fg3, fontSize: 13.5, margin: "0 0 18px" }}>Choose a prompt to read what this table said.</p>
                    <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 22 }}>
                      {COMPANIES.map((c) => <Chip key={c.id} active={activePrompt === c.id} accent={c.accent} onClick={() => setActivePrompt(c.id)}>{c.firm}</Chip>)}
                    </div>
                    {activeInsight && (
                      <div key={activePrompt} className="bloom" style={{ background: C.white, border: `1px solid ${C.line}`, borderTop: `3px solid ${activeCo.accent}`, borderRadius: 12, padding: 24 }}>
                        <span className="eyebrow" style={{ color: activeCo.accent, fontSize: 10 }}>prompt from {activeCo.firm}</span>
                        <p style={{ fontFamily: SER, fontStyle: "italic", fontSize: 14.5, color: C.fg3, margin: "6px 0 14px" }}>“{activeCo.prompt}”</p>
                        <h4 style={{ fontFamily: SER, fontWeight: 500, fontSize: 22, lineHeight: 1.2, margin: 0 }}>{activeInsight.t}</h4>
                        <p style={{ color: C.fg2, fontSize: 15, lineHeight: 1.55, margin: "10px 0 14px" }}>{activeInsight.ins}</p>
                        {activeInsight.tag && <span style={{ display: "inline-block", border: `1px solid ${activeCo.accent}`, color: activeCo.accent, borderRadius: 4, padding: "5px 12px", fontSize: 12, fontWeight: 600 }}>{activeInsight.tag}</span>}
                        {activeInsight.x && <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 14, paddingTop: 12 }}><span className="eyebrow" style={{ color: C.rust, fontSize: 10 }}>what stands in the way</span><p style={{ color: C.fg3, fontSize: 13.5, lineHeight: 1.5, margin: "6px 0 0" }}>{activeInsight.x}</p></div>}
                        <div style={{ marginTop: 16 }}>
                          <span className="eyebrow" style={{ color: C.fg3, fontSize: 10 }}>voices from the table</span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                            {activeInsight.frags.slice(0, 4).map((f, i) => <span key={i} style={{ fontFamily: SER, fontStyle: "italic", fontSize: 13, color: C.fg2, background: C.cream, border: `1px solid ${C.line}`, borderRadius: 4, padding: "6px 11px" }}>“{f}”</span>)}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </Reveal>

          <p style={{ color: C.fg3, fontSize: 12, marginTop: 22, fontStyle: "italic" }}>Quotes are illustrative — representative of the discussion rather than verbatim.</p>
        </div>
      </section>

      {/* 4 · ASSESSMENT */}
      <section id="assess" style={{ padding: "11vh 7vw", background: C.forest, color: C.onDark, position: "relative", overflow: "hidden" }}>
        <Grain blend="overlay" />
        <div style={{ position: "relative" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1.1fr 0.9fr", gap: 30, alignItems: "center" }}>
              <div>
                <SectionTag num="03" text="the AI dividend assessment" accent={C.teal} onDark />
                <h2 style={{ fontFamily: SER, fontSize: "clamp(30px,4.6vw,46px)", fontWeight: 500, margin: 0, lineHeight: 1.04, maxWidth: 560, color: C.onDark }}>How well are you using your dividend?</h2>
                <p style={{ color: C.onDark2, marginTop: 12, fontSize: 16, lineHeight: 1.5, maxWidth: 500 }}>Six honest reads. Drag each toward how true it is for your organization today.</p>
              </div>
              {!mob && <div style={{ display: "flex", justifyContent: "center", opacity: 0.96 }}><OrbitBurst w={380} /></div>}
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: mob ? 18 : "22px 30px", marginTop: 30 }}>
            {ASSESS.map((a, i) => (
              <div key={i} style={{ borderTop: `1px solid ${C.lineOnDark}`, paddingTop: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <span className="eyebrow" style={{ color: i === weakest ? "#E0A07E" : C.paleGreen, fontSize: 10 }}>{a.dim}</span>
                  <span style={{ fontFamily: SER, fontSize: 18, color: C.onDark2 }}>{scores[i]}</span>
                </div>
                <p style={{ fontFamily: SER, fontSize: 14.5, lineHeight: 1.3, margin: "6px 0 10px", minHeight: mob ? "auto" : 56 }}>{a.q}</p>
                <input className="arange" type="range" min={0} max={100} value={scores[i]} onChange={(e) => setScores((p) => p.map((x, j) => j === i ? +e.target.value : x))} />
              </div>
            ))}
          </div>

          {/* RESULT */}
          <div style={{ marginTop: 36, border: `1px solid ${C.lineOnDark}`, borderRadius: 16, padding: mob ? 22 : 32, background: "rgba(255,255,255,0.035)" }}>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "auto 1fr", gap: mob ? 22 : 40, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, justifySelf: mob ? "center" : "start" }}>
                <ScoreGauge value={avg} color={band.color} />
                <span style={{ display: "inline-block", fontFamily: SER, fontSize: 27, color: C.forest, background: band.color, padding: "3px 18px", borderRadius: 4, transition: "background .4s" }}>{band.name}</span>
              </div>
              <div>
                <p style={{ color: C.onDark, fontSize: 15.5, lineHeight: 1.55, margin: 0, maxWidth: 540 }}>{band.note}</p>
                <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.lineOnDark}`, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ flex: "1 1 250px" }}>
                    <span className="eyebrow" style={{ color: "#E0A07E", fontSize: 10 }}>biggest opportunity · {ASSESS[weakest].dim}</span>
                    <p style={{ color: C.onDark2, fontSize: 14, lineHeight: 1.5, margin: "8px 0 0" }}>{ASSESS[weakest].tip}</p>
                  </div>
                  <button onClick={() => setScores(ASSESS.map(() => 50))} style={{ flexShrink: 0, height: 38, padding: "0 16px", borderRadius: 6, border: `1px solid ${C.lineOnDark}`, background: "transparent", color: C.onDark, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontFamily: SAN }}><RotateCcw size={14} /> Reset</button>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: `repeat(${TILES}, 1fr)`, gap: 4 }}>
              {Array.from({ length: TILES }).map((_, i) => (
                <div key={i} style={{ height: 18, borderRadius: 2, background: i < filled ? band.color : C.lineOnDark, transform: `rotate(${((i % 3) - 1) * 4}deg)`, transition: "background .4s ease-out" }} />
              ))}
            </div>
          </div>

          <p style={{ marginTop: 44, fontFamily: SER, fontSize: "clamp(22px,3.6vw,34px)", fontStyle: "italic", lineHeight: 1.25, maxWidth: 800 }}>
            Don’t let the AI Dividend disappear into more work. <span style={{ color: C.paleGreen }}>Make it visible, intentional, and protected.</span>
          </p>
        </div>
      </section>

      {/* CO-HOSTS BAND */}
      <section style={{ padding: mob ? "9vh 7vw" : "11vh 7vw", background: C.mist, borderTop: `1px solid ${C.line}`, position: "relative", overflow: "hidden" }}>
        <Grain />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <SectionTag num="✳" text="about the co-hosts" accent={C.teal} />
            <h2 style={{ fontFamily: SER, fontSize: "clamp(28px,4.4vw,44px)", fontWeight: 500, margin: 0, lineHeight: 1.05, color: C.rust }}>Meet the co-hosts</h2>
            <Scribble w={190} color={C.teal} style={{ marginTop: 8, marginBottom: 30 }} />
          </Reveal>
          <Reveal delay={0.05}>{CoHostCards}</Reveal>
        </div>
      </section>

      {/* 5 · HOW IT WAS BUILT */}
      <section id="built" style={{ padding: "12vh 7vw 11vh", borderTop: `1px solid ${C.line}` }}>
        <Reveal>
          {eyebrow("behind the experience")}
          <h2 style={{ fontFamily: SER, fontSize: "clamp(30px,4.6vw,48px)", fontWeight: 500, margin: 0, lineHeight: 1.05, maxWidth: 760, color: C.rust }}>How this was made — an AI-assisted pipeline</h2>
          <p style={{ color: C.fg2, marginTop: 16, fontSize: 16, lineHeight: 1.5, maxWidth: 560 }}>From a recorded conversation to the page you’re reading, four steps.</p>
        </Reveal>
        <div style={{ position: "relative", marginTop: 56 }}>
          {!mob && <div style={{ position: "absolute", top: 40, left: "11%", right: "11%", height: 1, background: C.line }}>
            <div style={{ position: "absolute", top: -3, width: 6, height: 6, borderRadius: 2, background: C.teal, animation: "travel 6s linear infinite" }} />
          </div>}
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(4,1fr)", gap: mob ? 18 : 24 }}>
            {PIPE.map((s, i) => {
              const Ic = s.Icon;
              return (
                <Reveal key={i} delay={i * 0.12}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: mob ? "flex-start" : "center", textAlign: mob ? "left" : "center" }}>
                    <div style={{ width: 80, height: 80, borderRadius: 8, background: C.white, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(22,41,31,.07)", position: "relative", zIndex: 2, transform: `rotate(${((i % 2) ? 1 : -1) * 3}deg)` }}>
                      <Ic size={27} color={s.color} strokeWidth={1.75} />
                    </div>
                    <span className="eyebrow" style={{ color: C.fg3, marginTop: 18, fontSize: 11 }}>step 0{i + 1}</span>
                    <h3 style={{ fontFamily: SER, fontWeight: 500, fontSize: 23, margin: "6px 0 0" }}>{s.t}</h3>
                    <p style={{ color: C.fg2, fontSize: 14.5, lineHeight: 1.5, margin: "10px 0 12px", maxWidth: 230 }}>{s.d}</p>
                    <span style={{ border: `1px solid ${s.color}`, color: s.color, borderRadius: 4, padding: "6px 14px", fontSize: 13, fontWeight: 600 }}>{s.tool}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Reveal delay={0.2}>
          <div style={{ marginTop: 80, paddingTop: 28, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <span style={{ display: "inline-block", background: C.paleGreen, color: C.forest, fontFamily: SER, fontSize: 17, padding: "4px 12px", transform: "rotate(-2deg)" }}>kyu <span style={{ letterSpacing: ".04em" }}>HOUSE</span></span>
            <span className="eyebrow" style={{ color: C.fg3 }}>the AI dividend · June 8, 2026</span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
