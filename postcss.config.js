@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: #05070B;
  color: #EDF2F7;
  font-family: Inter, system-ui, sans-serif;
}
::selection { background: rgba(122,167,255,.35); color: white; }
.noise:before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .045;
  z-index: 50;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
}
.glass {
  background: linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.045));
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 18px 70px rgba(0,0,0,.30);
  backdrop-filter: blur(18px);
}
.text-balance { text-wrap: balance; }
.cursor-glow {
  position: fixed;
  left: 50%;
  top: 40%;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle, rgba(59,130,246,.11), transparent 64%);
  animation: cursorFloat 12s ease-in-out infinite alternate;
}
@keyframes cursorFloat {
  from { transform: translate(-35%, -45%); }
  to { transform: translate(15%, -15%); }
}
.scan-shell::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 2rem;
  background: radial-gradient(circle at 50% 20%, rgba(122,167,255,.24), transparent 36%);
  pointer-events: none;
}
.scan-grid {
  position: absolute;
  inset: 0;
  opacity: .28;
  background:
    linear-gradient(rgba(122,167,255,.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(122,167,255,.16) 1px, transparent 1px);
  background-size: 42px 42px;
  animation: gridMove 18s linear infinite;
}
@keyframes gridMove {
  from { background-position: 0 0; }
  to { background-position: 84px 84px; }
}
.scan-beam {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 0 42%, rgba(96,165,250,.16) 48%, rgba(255,255,255,.15) 50%, transparent 56% 100%);
  transform: translateX(-80%);
  animation: scanBeam 5.8s ease-in-out infinite;
}
@keyframes scanBeam {
  0%, 12% { transform: translateX(-85%); opacity: 0; }
  25%, 65% { opacity: 1; }
  100% { transform: translateX(85%); opacity: 0; }
}
.radar-sweep {
  position: absolute;
  left: 50%;
  top: 48%;
  width: 430px;
  height: 430px;
  margin-left: -215px;
  margin-top: -215px;
  border-radius: 50%;
  border: 1px solid rgba(122,167,255,.15);
  background: conic-gradient(from 0deg, rgba(122,167,255,.28), transparent 24%, transparent 100%);
  filter: blur(.2px);
  animation: radar 9s linear infinite;
}
@keyframes radar { to { transform: rotate(360deg); } }
.scan-orb {
  position: relative;
  width: 330px;
  height: 330px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: radial-gradient(circle, rgba(122,167,255,.14), rgba(255,255,255,.025) 45%, transparent 70%);
  box-shadow: inset 0 0 70px rgba(122,167,255,.10), 0 0 120px rgba(37,99,235,.18);
}
.scan-core {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  width: 92px;
  height: 92px;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(5,7,11,.72);
  backdrop-filter: blur(18px);
}
.scan-label {
  position: absolute;
  z-index: 3;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(5,7,11,.68);
  padding: 8px 12px;
  color: rgba(220,227,234,.78);
  font-size: 11px;
  letter-spacing: .14em;
  text-transform: uppercase;
  backdrop-filter: blur(14px);
  animation: labelFloat 4s ease-in-out infinite alternate;
}
.scan-label-0 { left: 8%; top: 18%; }
.scan-label-1 { right: 2%; top: 26%; animation-delay: .6s; }
.scan-label-2 { left: -5%; top: 56%; animation-delay: .9s; }
.scan-label-3 { right: 8%; bottom: 15%; animation-delay: 1.1s; }
.scan-label-4 { left: 36%; top: 0; animation-delay: 1.4s; }
.scan-label-5 { left: 34%; bottom: 0; animation-delay: 1.8s; }
@keyframes labelFloat {
  from { transform: translateY(0); opacity: .72; }
  to { transform: translateY(-8px); opacity: 1; }
}
.ticker-wrap { overflow: hidden; white-space: nowrap; }
.ticker { display: inline-flex; gap: 0; animation: ticker 28s linear infinite; }
.ticker span { padding-right: 2rem; }
@keyframes ticker { to { transform: translateX(-50%); } }
.service-card { position: relative; overflow: hidden; }
.service-card:before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x, 50%) var(--y, 20%), rgba(122,167,255,.18), transparent 36%);
  opacity: 0;
  transition: opacity .35s ease;
}
.service-card:hover:before { opacity: 1; }
.watermark {
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -50%) rotate(-18deg);
  font-size: clamp(3.2rem, 8vw, 6.5rem);
  font-weight: 900;
  letter-spacing: .08em;
  color: rgba(5,7,11,.055);
  pointer-events: none;
  white-space: nowrap;
}
.light-reflection {
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 0 35%, rgba(255,255,255,.50) 46%, transparent 56% 100%);
  transform: translateX(-120%);
  animation: lightReflection 7s ease-in-out infinite;
  pointer-events: none;
}
@keyframes lightReflection {
  0%, 45% { transform: translateX(-120%); opacity: 0; }
  55% { opacity: .5; }
  100% { transform: translateX(120%); opacity: 0; }
}
.report-glow { box-shadow: 0 30px 120px rgba(37,99,235,.16), 0 30px 120px rgba(0,0,0,.45); }
@media (max-width: 640px) {
  .scan-orb { width: 260px; height: 260px; }
  .radar-sweep { width: 330px; height: 330px; margin-left: -165px; margin-top: -165px; }
  .scan-label { font-size: 9px; padding: 7px 9px; }
}
