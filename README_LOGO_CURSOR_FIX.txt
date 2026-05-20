HEIMDALL logo + cursor fix

Upload with replacement:
- components/HeimdallLogo.js
- components/HeimdallNav.js
- components/HeimdallPageShell.js
- public/heimdall-logo-horizontal.svg
- public/heimdall-logo-mark.svg

Then copy cursor-logo-fix.css content to the bottom of:
- styles/globals.css

Fixes:
- Native mouse cursor is hidden on desktop so only animated HEIMDALL cursor remains.
- Logo appears on new pages through HeimdallLogo component.
- Gold/black HEIMDALL logo assets restored in /public.
