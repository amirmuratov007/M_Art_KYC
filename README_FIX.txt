HEIMDALL pricelist + cursor fix

Upload files with replacement:
- pages/index.js
- pages/pricing.js
- pages/pricing-en.js
- pages/_app.js
- components/HeimdallServices.js
- components/AnimatedCursor.js

Then copy the content of styles-globals-cursor-addition.css to the bottom of:
- styles/globals.css

Fixes:
- RU homepage says "Прайс-лист", not "Прайс".
- RU homepage pricing cards are Russian.
- RU /pricing page is fully Russian.
- EN /pricing-en remains English.
- Animated cursor restored globally and hidden on mobile/touch devices.
