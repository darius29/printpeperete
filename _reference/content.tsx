/**
 * content.tsx
 *
 * Prompts pentru generarea imaginilor de portofoliu SDG PRINT & Design.
 * Fiecare intrare corespunde unui proiect din src/lib/data/projects.ts
 *
 * Utilizare recomandata: Midjourney, DALL-E 3, Stable Diffusion XL, Firefly
 *
 * Conventie fisiere output:
 *   public/assets/portofoliu/[slug].png
 *   Dimensiune recomandata: 1200x900px (4:3) sau 900x1200px (3:4) pentru carduri masonry
 */

export interface PortofoliuPrompt {
  id: number;
  slug: string;
  title: string;
  category: "residential" | "commercial" | "textile" | "custom";
  service: string;
  outputPath: string;
  aspectRatio: "4:3" | "3:4" | "1:1" | "16:9";
  prompt: string;
  negativePrompt: string;
  notes?: string;
}

export const PORTOFOLIU_PROMPTS: PortofoliuPrompt[] = [
  // ─── RESIDENTIAL ──────────────────────────────────────────────────────────────

  {
    id: 1,
    slug: "mural-geometric-dormitor",
    title: "Mural geometric dormitor",
    category: "residential",
    service: "Wall Print UV",
    outputPath: "/assets/portofoliu/mural-geometric-dormitor-wall-print-uv.png",
    aspectRatio: "4:3",
    prompt: `Interior bedroom wall with large-scale UV-printed geometric mural, deep purple and violet tones (#A78BFA), sharp angular patterns with hexagons and triangles, photorealistic print quality, high-resolution detail, modern minimalist bedroom context, dark charcoal walls surrounding the mural panel, warm bedside lamp light, cinematic interior photography, Canon 24mm, f/2.8, soft bokeh on bed in foreground, ultra-realistic wall print texture visible up close, 2024 interior design, professional architectural photography --ar 4:3 --v 6 --style raw`,
    negativePrompt: `cartoon, illustration, low quality, blurry, painting on canvas, framed art, wallpaper seams, wrinkles, bad lighting, overexposed`,
    notes: `Accent color: #A78BFA. Mural ocupa peretele principal din spatele patului. Dimensiune referinta: 14 m².`,
  },

  {
    id: 2,
    slug: "mural-floral-living",
    title: "Mural floral living",
    category: "residential",
    service: "Wall Print UV",
    outputPath: "/assets/portofoliu/mural-floral-living-wall-print-uv.png",
    aspectRatio: "4:3",
    prompt: `Elegant living room with full-wall UV-printed floral botanical mural, lush green tropical leaves and white flowers on dark background, photorealistic large format wall print, 22 square meter accent wall, modern Scandinavian living room furniture, warm ambient lighting, soft natural light from left window, high-end interior photography, shot with Sony A7R IV 35mm f/2, ultra-sharp print details visible on wall, subtle ink texture, vibrant greens (#22C55E) and deep forest tones, contemporary residential interior Romania, 2024`,
    negativePrompt: `painted mural, hand painted, cartoon flowers, wallpaper rolls, visible seams, tiling patterns, poor resolution, washed out colors`,
    notes: `Accent color: #22C55E. Living room setting, full accent wall 22 m².`,
  },

  {
    id: 3,
    slug: "accent-perete-dormitor-copii",
    title: "Accent perete dormitor copii",
    category: "residential",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-perete-camera-copii-mural-colorat.png",
    aspectRatio: "3:4",
    prompt: `Children's bedroom with vibrant UV-printed wall mural accent panel, playful colorful animals and forest scene with foxes, owls, and trees, saturated blues and yellows on white background (#3B82F6 accents), photorealistic UV print on flat wall, 9 square meters, modern kids room with wooden furniture, white bed frame, scattered toys on floor, bright natural lighting from window, interior design photography, sharp print detail, visible UV ink texture on wall surface, contemporary Romanian residential interior`,
    negativePrompt: `dark themes, scary elements, poor print quality, faded colors, painted wall, stencil look, peeling, blurry`,
    notes: `Accent color: #3B82F6. Camera copii, perete accent 9 m². Exista deja imagine pentru acesta proiect.`,
  },

  {
    id: 4,
    slug: "gresie-baie-personalizata",
    title: "Gresie baie personalizata",
    category: "residential",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-pe-gresie-decorativa-model-floral-teracota.png",
    aspectRatio: "4:3",
    prompt: `Luxury bathroom wall with UV-printed decorative ceramic tiles, terracotta and gold floral botanical pattern printed directly onto glazed tiles, Moroccan-inspired motifs with warm amber tones (#F59E0B), photorealistic tile print quality, 6 square meter bathroom wall, modern spa-like bathroom with marble countertop, brushed brass fittings, soft vanity lighting, interior photography, sharp tile detail showing UV ink on glazed surface, water droplets on adjacent shower tiles, warm ambient glow`,
    negativePrompt: `hand-painted tiles, decals, stickers, poor quality print, faded, peeling, digital composite, unrealistic proportions`,
    notes: `Accent color: #F59E0B. Print UV pe gresie glazurata, model floral terracota. Exista deja imagine.`,
  },

  // ─── COMMERCIAL ───────────────────────────────────────────────────────────────

  {
    id: 5,
    slug: "receptie-clinica-stomatologica",
    title: "Receptie clinica stomatologica",
    category: "commercial",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-receptie-clinica-stomatologica-timisoara.png",
    aspectRatio: "16:9",
    prompt: `Modern dental clinic reception area with large UV-printed wall mural behind reception desk, clean abstract organic shapes in mint green and white tones (#22C55E), calming professional medical environment, 18 square meter feature wall, minimalist white reception counter with backlit logo, warm recessed lighting, immaculate floor, professional interior commercial photography, photorealistic UV wall print with sharp crisp edges, no seams visible, upscale healthcare interior Romania 2024, Canon 16-35mm wide angle`,
    negativePrompt: `dirty, messy, unprofessional, cheap looking, cartoon characters, childish design, old equipment, dark gloomy lighting`,
    notes: `Accent color: #22C55E. Receptie clinica stomatologica, cadru comercial. 18 m².`,
  },

  {
    id: 6,
    slug: "showroom-auto-premium",
    title: "Showroom auto premium",
    category: "commercial",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-perete-showroom-auto-premium-arad.png",
    aspectRatio: "16:9",
    prompt: `Luxury automotive showroom with dramatic UV-printed feature wall, large-scale high-speed car photography print in deep black and orange tones (#F97316), blurred motion lines, 30 square meter wall installation, premium car dealership interior with polished concrete floor, new sports car in foreground slightly blurred, dramatic spotlighting from ceiling tracks, dark atmosphere with controlled accent lighting, photorealistic UV print on smooth wall surface, high-end commercial interior photography, shot wide-angle`,
    negativePrompt: `cheap dealership, low quality print, tiled image, pixelated, poor lighting, cluttered, outdated decor`,
    notes: `Accent color: #F97316. Showroom auto premium, 30 m², atmosfera luxury automotive.`,
  },

  {
    id: 7,
    slug: "restaurant-birou-focal",
    title: "Restaurant birou focal",
    category: "commercial",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-pe-perete-restaurant-design-premium-albastru-auriu.png",
    aspectRatio: "4:3",
    prompt: `Upscale restaurant interior with stunning UV-printed focal wall behind main dining area, dramatic deep blue and gold abstract architecture print (#EF4444 warm tones), large format 20 square meter mural, restaurant tables set with white linen and candles in foreground, warm Edison bulb lighting, exposed brick on side walls, rich atmospheric interior photography, photorealistic UV print detail, ink texture visible on smooth plaster wall, premium dining ambience Romania, editorial food photography style lighting`,
    negativePrompt: `fast food, cheap restaurant, neon signs, pixelated print, visible seams, faded colors, bad food`,
    notes: `Accent color: #EF4444. Restaurant HoReCa premium, 20 m². Exista deja imagine.`,
  },

  {
    id: 8,
    slug: "sala-conferinta-corporate",
    title: "Sala conferinta corporate",
    category: "commercial",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-perete-sala-conferinte-branding-office.png",
    aspectRatio: "16:9",
    prompt: `Modern corporate conference room with full UV-printed branded wall behind main presentation table, deep navy and silver abstract geometric corporate branding mural (#3B82F6 blue tones), company logo area integrated in design, 40 square meter feature wall, long conference table with 10 leather chairs, recessed ceiling lighting, glass partition wall on right, professional interior photography, photorealistic UV wall print with sharp corporate branding elements, Romanian corporate office 2024, architectural interior photography`,
    negativePrompt: `messy office, cheap furniture, cluttered, bad lighting, wallpaper, hand painted, pixelated logo`,
    notes: `Accent color: #3B82F6. Sala de conferinte, 40 m², branding corporatist. Exista deja imagine.`,
  },

  {
    id: 9,
    slug: "birou-creativ-open-space",
    title: "Birou creativ open-space",
    category: "commercial",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-perete-birou-creativ-open-space-timisoara.png",
    aspectRatio: "16:9",
    prompt: `Creative open-space office with inspiring UV-printed motivational mural wall, purple and violet tones with abstract fluid art and subtle typography (#A78BFA), energetic creative agency atmosphere, 35 square meter wall, standing desks with MacBooks in foreground, hanging plants, pendant lights, exposed concrete ceiling, young creative professionals working blurred in midground, photorealistic UV print crisp detail, modern startup office interior Romania, wide architectural interior photography, Leica Q2 style`,
    negativePrompt: `boring corporate office, cubicles, old furniture, cluttered desk, poor lighting, dark depressing atmosphere`,
    notes: `Accent color: #A78BFA. Birou creativ, 35 m², atmosfera startup/creativ.`,
  },

  {
    id: 10,
    slug: "cafenea-specialty-coffee",
    title: "Cafenea specialty coffee",
    category: "commercial",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-perete-cafenea-specialty-coffee-oradea.png",
    aspectRatio: "4:3",
    prompt: `Artisan specialty coffee shop with UV-printed illustrated wall mural, detailed coffee origin map artwork and botanical coffee plant illustrations in warm amber and brown tones (#D97706), 16 square meter focal wall behind espresso bar, La Marzocco espresso machine on counter in foreground, barista slightly blurred, warm Edison bulb lighting, reclaimed wood shelving, coffee bags on display, cozy intimate atmosphere, interior lifestyle photography, photorealistic UV print on white-plastered wall, Romanian cafe culture 2024`,
    negativePrompt: `chain cafe, fast food, Starbucks branding, poor lighting, generic stock photo feel, wallpaper, low quality`,
    notes: `Accent color: #D97706. Cafenea specialty, 16 m², HoReCa artizanal.`,
  },

  {
    id: 19,
    slug: "atelier-decor-botanic",
    title: "Atelier decor botanic",
    category: "commercial",
    service: "Wall Print UV",
    outputPath:
      "/assets/portofoliu/print-uv-pe-perete-atelier-decor-botanic.png",
    aspectRatio: "4:3",
    prompt: `Botanical decoration atelier showroom with large UV-printed tropical jungle wall mural, hyper-detailed monstera leaves, ferns, and tropical plants in deep emerald and lime green (#4ADE80), 12 square meter accent wall, flower arrangements and terracotta pots in foreground on wooden shelving, afternoon natural light streaming through large windows, lush organic atmosphere, interior design showroom photography, photorealistic UV print with fine leaf vein details visible, green living wall adjacent on left`,
    negativePrompt: `dry plants, dead leaves, dark depressing room, artificial plastic plants, poor lighting, faded print`,
    notes: `Accent color: #4ADE80. Atelier decor botanic, 12 m². Exista deja imagine.`,
  },

  // ─── TEXTILE ──────────────────────────────────────────────────────────────────

  {
    id: 11,
    slug: "tricouri-echipa-startup",
    title: "Tricouri echipa startup",
    category: "textile",
    service: "Print Textile",
    outputPath:
      "/assets/portofoliu/tricouri-personalizate-logo-companie-techstart.png",
    aspectRatio: "4:3",
    prompt: `60 custom printed t-shirts for tech startup company, flat lay product photography, white and dark grey cotton t-shirts with vibrant full-color logo print on chest, modern minimalist tech company branding (#F97316 orange accents), arranged in neat grid on white studio surface, sharp DTG direct-to-garment print detail visible, clean print edges, no bleeding, professional product photography studio lighting, commercial textile print quality showcase, overhead flat lay composition, Canon 50mm f/1.8`,
    negativePrompt: `wrinkled shirts, bad print quality, faded colors, iron-on transfer visible, screen print vintage look, blurry, cluttered background`,
    notes: `Accent color: #F97316. 60 bucati, tricouri echipa startup, DTG/UV textile print.`,
  },

  {
    id: 12,
    slug: "hanorace-festival-muzica",
    title: "Hanorace festival muzica",
    category: "textile",
    service: "Print Textile",
    outputPath:
      "/assets/portofoliu/hanorace-festival-muzica-personalizate-cluj.png",
    aspectRatio: "4:3",
    prompt: `200 custom printed festival hoodies product showcase, dark navy and black hoodies with bold graphic print on back and small logo on chest, electric blue and white design (#3B82F6), stacked and folded presentation on dark wooden surface, professional textile product photography, crisp sharp print quality visible on fabric weave, lifestyle context with music festival wristbands nearby, dramatic side lighting to show print texture on fabric, moody editorial photography style, commercial print quality demonstration`,
    negativePrompt: `cheap hoodies, poor print, cracked ink, peeling transfer, faded, amateur photography, cluttered background, bad lighting`,
    notes: `Accent color: #3B82F6. 200 bucati, festival muzica, print textile bold.`,
  },

  {
    id: 13,
    slug: "uniforme-echipa-hospitality",
    title: "Uniforme echipa hospitality",
    category: "textile",
    service: "Print Textile",
    outputPath:
      "/assets/portofoliu/tricouri-polo-personalizate-logo-hotel-resort.png",
    aspectRatio: "4:3",
    prompt: `35 custom embroidered and printed polo shirts for hotel hospitality team, clean white and navy polo shirts with embroidered hotel logo on left chest, professional uniforms flat lay arrangement, crisp clean presentation on white marble surface, sharp embroidery detail visible, premium hospitality brand aesthetic (#22C55E green accent in logo), studio product photography with soft diffused lighting, commercial uniform printing quality showcase, professional hotel staff clothing`,
    negativePrompt: `wrinkled, stained, cheap fabric, bad print quality, pixelated logo, unprofessional, dark moody lighting`,
    notes: `Accent color: #22C55E. 35 bucati, uniforme hospitality, polo personalizate. Exista deja imagine.`,
  },

  {
    id: 14,
    slug: "sepci-personalizate-brand",
    title: "Sepci personalizate brand",
    category: "textile",
    service: "Print Textile",
    outputPath:
      "/assets/portofoliu/sepci-personalizate-logo-broderie-branding-corporate.png",
    aspectRatio: "4:3",
    prompt: `150 custom embroidered branded caps, mixed black and white snapback caps with embroidered company logo on front panel, premium brand merchandise, neat product photography arrangement on dark slate surface, close-up detail shot showing embroidery thread quality and sharp stitch detail, multiple caps stacked and fanned out, corporate branding pink and white tones (#EC4899 accent), commercial product photography soft box lighting, luxury brand merch aesthetic, clean background`,
    negativePrompt: `cheap caps, iron-on logo, pixelated print, faded embroidery, damaged caps, amateur photography`,
    notes: `Accent color: #EC4899. 150 bucati, sepci cu broderie corporatista. Exista deja imagine.`,
  },

  // ─── CUSTOM / LASER ───────────────────────────────────────────────────────────

  {
    id: 15,
    slug: "trofee-corporate-gravate",
    title: "Trofee corporate gravate",
    category: "custom",
    service: "Gravare Laser CO2",
    outputPath:
      "/assets/portofoliu/trofee-corporate-lemn-gravate-laser-personalizate.png",
    aspectRatio: "4:3",
    prompt: `50 premium corporate laser-engraved wooden trophies product photography, natural walnut and maple wood award trophies with deep precision laser-engraved company logos, names, and dates, warm wood grain visible around engraving, elegant corporate design (#F59E0B amber accents), arranged on dark velvet display surface, dramatic side lighting to show depth of laser engraving, close-up macro detail of engraving precision and wood texture, smoke effect visible in engraved channels, luxury corporate gifting photography, sharp macro detail`,
    negativePrompt: `cheap plastic trophies, stickers, inkjet print on wood, blurry, dark image, generic trophies, poor laser quality`,
    notes: `Accent color: #F59E0B. 50 bucati, trofee lemn gravate laser CO2. Exista deja imagine.`,
  },

  {
    id: 16,
    slug: "cutii-cadou-lemn-personalizate",
    title: "Cutii cadou lemn personalizate",
    category: "custom",
    service: "Gravare Laser CO2",
    outputPath:
      "/assets/portofoliu/gravare-laser-cutii-lemn-personalizate-corporate.png",
    aspectRatio: "4:3",
    prompt: `30 custom laser-engraved wooden gift boxes, premium light oak and birch wood boxes with intricate laser-engraved floral and geometric patterns on lid, personalized names and logos deeply engraved, lime green accent ribbon ties (#84CC16), some boxes open revealing interior packaging, elegant gifting presentation on white marble surface, professional product photography with controlled studio lighting, close-up showing precision of CO2 laser engraving, wood grain contrast with engraved channels, luxury corporate gifting aesthetic`,
    negativePrompt: `cheap cardboard boxes, stickers on wood, poor engraving, shallow marks, dark photography, generic packaging`,
    notes: `Accent color: #84CC16. 30 bucati, cutii lemn gravate laser, gifting corporate. Exista deja imagine.`,
  },

  {
    id: 17,
    slug: "signalistica-acril-firma",
    title: "Signalistica acril firma",
    category: "custom",
    service: "Gravare Laser CO2",
    outputPath:
      "/assets/portofoliu/placa-firma-acril-luminoasa-gravare-logo-northwood.png",
    aspectRatio: "16:9",
    prompt: `12 custom laser-engraved and cut acrylic office signage pieces, premium frosted and transparent acrylic plaques with precision laser-engraved company logos and room names, cyan and white tones (#22D3EE), some pieces backlit showing light diffusion through frosted acrylic, installed on modern office wall in architectural context, professional office environment, sharp laser cut edges visible, brushed aluminum standoffs mounting hardware, contemporary corporate signage photography, architectural detail shot`,
    negativePrompt: `cheap plastic signs, ink printed on acrylic, bubbles in acrylic, poor edges, amateur installation, dark corridor`,
    notes: `Accent color: #22D3EE. 12 bucati, semnalistica acril gravata laser. Exista deja imagine.`,
  },

  {
    id: 18,
    slug: "cani-ceramica-foto-brand",
    title: "Cani ceramica foto brand",
    category: "custom",
    service: "Obiecte Custom",
    outputPath:
      "/assets/portofoliu/cani-personalizate-logo-print-full-color.png",
    aspectRatio: "4:3",
    prompt: `100 custom UV-printed ceramic mugs with full-color company branding, white ceramic mugs with vibrant photorealistic brand logo and gradient color print wrapping around mug body, purple and lavender tones (#C084FC), 6 mugs arranged in hero product shot on white marble surface with coffee beans scattered around, steam rising from one hot mug, professional product photography with soft box lighting, sharp UV print detail on curved ceramic surface, color vibrancy and photo quality print visible, corporate gifting presentation`,
    negativePrompt: `faded print, cracked mugs, decal peeling, sublimation seams visible, cheap quality, blurry, dark image`,
    notes: `Accent color: #C084FC. 100 bucati, cani ceramica cu print UV full color. Exista deja imagine.`,
  },

  {
    id: 20,
    slug: "print-uv-acril-geometric",
    title: "Print UV pe acril geometric",
    category: "custom",
    service: "Obiecte Custom",
    outputPath:
      "/assets/portofoliu/print-uv-pe-acril-model-geometric-albastru-auriu.png",
    aspectRatio: "1:1",
    prompt: `4 premium UV-printed acrylic decorative panels with geometric blue and gold abstract design, deep navy background with geometric crystal formations and gold foil effect (#38BDF8 sky blue), photorealistic UV print on 5mm clear acrylic, light passes through showing translucent ink layers, panels displayed against white wall with dramatic spotlighting, sharp right-angle laser-cut edges, professional product photography, luxury interior decor objects, close-up detail showing UV ink texture on acrylic surface, depth and layering effect`,
    negativePrompt: `scratched acrylic, cheap print, bubbles, poor cut quality, dark muddy colors, blurry, flat lighting`,
    notes: `Accent color: #38BDF8. 4 bucati, print UV pe acril 5mm, model geometric albastru-auriu. Exista deja imagine.`,
  },

  {
    id: 21,
    slug: "print-uv-lemn-geometric",
    title: "Print UV pe lemn geometric",
    category: "custom",
    service: "Obiecte Custom",
    outputPath:
      "/assets/portofoliu/print-uv-pe-lemn-design-geometric-modern.png",
    aspectRatio: "4:3",
    prompt: `6 custom UV-printed natural wood panels with modern geometric design, birch plywood base with vibrant orange and white geometric triangular pattern (#FB923C), wood grain visible through semi-transparent ink areas creating organic hybrid texture, panels arranged as wall art installation, bright studio photography showing contrast between natural wood texture and crisp printed geometry, close-up macro detail of UV ink on wood grain, interior decor objects for modern home, Scandinavian design aesthetic, white wall background`,
    negativePrompt: `painted wood, stickers on wood, faded print, cracked surface, dark background, poor UV adhesion, blurry`,
    notes: `Accent color: #FB923C. 6 bucati, print UV pe lemn, model geometric modern. Exista deja imagine.`,
  },

  {
    id: 22,
    slug: "obiecte-personalizate-lemn-acril",
    title: "Obiecte personalizate lemn & acril",
    category: "custom",
    service: "Gravare Laser CO2",
    outputPath:
      "/assets/portofoliu/gravare-laser-obiecte-personalizate-lemn-acril.png",
    aspectRatio: "4:3",
    prompt: `25 mixed laser-engraved custom objects combining wood and acrylic materials, keychains, nameplates, coasters and small decorative items, natural walnut wood with precision CO2 laser engraving and clear acrylic pieces with cut and engraved logos, lime green and natural wood tone palette (#A3E635), flat lay arrangement on dark slate surface, dramatic raking light to show engraving depth and material texture contrast, professional product photography, macro detail showing fine laser engraving lines at 0.1mm precision, mixed material corporate gifting collection`,
    negativePrompt: `cheap items, stickers, ink printed, poor engraving quality, scratched, dark blurry image, cluttered arrangement`,
    notes: `Accent color: #A3E635. 25 bucati mixte lemn+acril gravate laser. Exista deja imagine.`,
  },
];

// ─── WALL PRINT BUSINESS PROMO ────────────────────────────────────────────────
//
// 20 prompts promotionale pentru Wall Print UV in spatii de business.
// Fiecare imagine arata un print tematic specific domeniului de activitate,
// fotografiat in contextul real al spatiului respectiv.

export interface WallPrintBusinessPrompt {
  id: string;
  slug: string;
  businessType: string;
  location: string;
  printTheme: string;
  outputPath: string;
  aspectRatio: "4:3" | "16:9" | "3:4";
  prompt: string;
  negativePrompt: string;
  colorPalette: string;
}

export const WALL_PRINT_BUSINESS_PROMPTS: WallPrintBusinessPrompt[] = [

  {
    id: "biz-01",
    slug: "wall-print-sala-fitness-gantere",
    businessType: "Sala de fitness",
    location: "Timișoara",
    printTheme: "Silueta atletica si gantere — motivational",
    outputPath: "/assets/portofoliu/wall-print-uv-sala-fitness-gantere-motivational.png",
    aspectRatio: "16:9",
    prompt: `Modern gym interior with massive UV-printed wall mural behind free weights area, photorealistic large-scale print featuring muscular athlete silhouette mid-deadlift with heavy barbell, dramatic black and orange tones (#F97316), oversized dumbbells illustration in background, bold motivational typography "NO LIMITS" integrated in design, 12-meter wide wall, dramatic low-angle gym photography, rubber floor with barbells in foreground slightly blurred, industrial ceiling with exposed ducts and track lighting, cinematic sports photography atmosphere, photorealistic UV wall print with crisp sharp edges`,
    negativePrompt: `cheap gym, faded print, pixelated, cartoon style, bright pastel colors, messy cluttered space, amateur photography`,
    colorPalette: `Negru profund + portocaliu (#F97316) + alb. Atmosfera dark athletic.`,
  },

  {
    id: "biz-02",
    slug: "wall-print-clinica-stomatologica-dinte",
    businessType: "Clinica stomatologica",
    location: "Arad",
    printTheme: "Anatomie dinte — stiintific si elegant",
    outputPath: "/assets/portofoliu/wall-print-uv-clinica-stomatologica-anatomie-dinte.png",
    aspectRatio: "4:3",
    prompt: `Upscale dental clinic treatment room with elegant UV-printed wall mural, large-format anatomical illustration of a perfect tooth cross-section rendered in soft teal and white tones (#22C55E), medical-grade infographic aesthetic with labeled anatomical parts, clean sans-serif typography, minimalist medical art style on white wall surface, photorealistic UV print quality, dental chair in foreground slightly blurred, LED examination light above, sterile yet welcoming atmosphere, professional medical interior photography, sharp print detail`,
    negativePrompt: `scary teeth, blood, ugly dental imagery, dirty clinic, low quality print, faded colors, childish cartoon`,
    colorPalette: `Alb curat + teal (#22C55E) + accente gri deschis. Calm, profesional, medical.`,
  },

  {
    id: "biz-03",
    slug: "wall-print-salon-beauty-floral-elegant",
    businessType: "Salon de infrumusetare",
    location: "Cluj-Napoca",
    printTheme: "Silueta feminina eleganta cu flori botanice",
    outputPath: "/assets/portofoliu/wall-print-uv-salon-beauty-silueta-feminina-floral.png",
    aspectRatio: "3:4",
    prompt: `Luxury beauty salon interior with floor-to-ceiling UV-printed wall mural, elegant feminine silhouette surrounded by oversized peony and rose botanical illustration, blush pink and gold foil tones on dark charcoal background, Art Deco inspired line art style with modern UV print quality, 8 square meter accent wall, salon styling chairs in foreground with mirrors reflecting the mural, warm vanity lighting, luxurious atmosphere, high-end beauty interior photography, photorealistic UV print detail on smooth wall`,
    negativePrompt: `cheap salon, dark gloomy, masculine design, cluttered, poor print quality, faded, blurry`,
    colorPalette: `Charcoal + blush pink + auriu. Feminitate si lux.`,
  },

  {
    id: "biz-04",
    slug: "wall-print-pizzerie-artizanala-foc",
    businessType: "Pizzerie artizanala",
    location: "Timișoara",
    printTheme: "Pizza napolitana cu cuptor pe lemne si foc",
    outputPath: "/assets/portofoliu/wall-print-uv-pizzerie-artizanala-cuptor-foc-napoli.png",
    aspectRatio: "4:3",
    prompt: `Artisan Neapolitan pizzeria with dramatic UV-printed wall mural behind open kitchen area, photorealistic large-format print of a perfect margherita pizza with melted mozzarella and fresh basil, wood-fired oven with orange flames in background of the mural, Italian countryside landscape subtly visible, warm terracotta and orange tones (#F97316), rustic yet modern restaurant interior, exposed brick walls surrounding the UV print panel, pizza paddles hanging on sides, warm Edison bulb lighting, restaurant interior food photography style`,
    negativePrompt: `fast food, frozen pizza imagery, cheap looking, neon signs, modern corporate restaurant, faded print`,
    colorPalette: `Terracotta + portocaliu (#F97316) + verde bazilico. Italian autentic.`,
  },

  {
    id: "biz-05",
    slug: "wall-print-cabinet-veterinar-laba",
    businessType: "Cabinet veterinar",
    location: "Oradea",
    printTheme: "Amprente de labe si portrete animale de companie",
    outputPath: "/assets/portofoliu/wall-print-uv-cabinet-veterinar-animale-labe-portrete.png",
    aspectRatio: "4:3",
    prompt: `Friendly veterinary clinic waiting room with cheerful UV-printed wall mural, large-format photorealistic portraits of dogs and cats in painterly style with warm amber tones, oversized paw prints pattern integrated in background (#F59E0B amber), golden retriever, labrador and tabby cat portraits rendered with fine fur detail, warm welcoming atmosphere, pet clinic reception area with comfortable seating in foreground slightly blurred, natural wood accents, warm lighting, professional interior photography, photorealistic UV print quality on smooth wall`,
    negativePrompt: `scary animals, aggressive dogs, dark atmosphere, poor print, cartoon flat style, faded colors, blurry`,
    colorPalette: `Warm amber (#F59E0B) + maro natural + crem. Primitor, cald, prietenos.`,
  },

  {
    id: "biz-06",
    slug: "wall-print-gradinita-padurea-animalutelor",
    businessType: "Gradinita",
    location: "Cluj-Napoca",
    printTheme: "Padurea magica cu animale prietenoase",
    outputPath: "/assets/portofoliu/wall-print-uv-gradinita-padurea-magica-animale.png",
    aspectRatio: "16:9",
    prompt: `Bright and joyful kindergarten classroom with vibrant UV-printed wall mural spanning full wall, enchanted forest scene with friendly cartoon-realistic animals: owl in top hat, fox reading a book, bear with honey jar, rabbit with flowers, rich emerald greens and warm yellows (#84CC16 lime, warm amber), hand-illustrated style rendered at ultra-high UV print resolution, small wooden chairs and colorful toys in foreground, large windows with natural light, cheerful children's learning environment, interior design photography, sharp print detail on white wall surface`,
    negativePrompt: `scary animals, dark forest, adult themes, dull colors, corporate design, faded print, messy classroom`,
    colorPalette: `Lime green (#84CC16) + galben cald + albastru cer. Veseli, colorati, copilarie.`,
  },

  {
    id: "biz-07",
    slug: "wall-print-studio-yoga-lotus-zen",
    businessType: "Studio yoga si wellness",
    location: "Timișoara",
    printTheme: "Floare de lotus si peisaj zen minimalist",
    outputPath: "/assets/portofoliu/wall-print-uv-studio-yoga-lotus-zen-meditatie.png",
    aspectRatio: "16:9",
    prompt: `Serene yoga studio with full-wall UV-printed mural, minimalist meditation landscape with giant lotus flower in bloom over still water, soft lavender and white gradient background with subtle mandala geometry, gentle morning mist effect, Japanese ink painting meets modern UV print quality, 10-meter wide calming wall, yoga mats rolled out on natural wood floor in foreground, soft diffused natural lighting through sheer curtains, high-end wellness interior photography, photorealistic print with delicate gradient transitions on smooth wall surface`,
    negativePrompt: `busy cluttered design, loud colors, commercial fitness gym, poor print with banding, sharp harsh lighting`,
    colorPalette: `Lavanda (#A78BFA) + alb + subtle rose gold. Calm, spiritual, rafinat.`,
  },

  {
    id: "biz-08",
    slug: "wall-print-librarie-litere-portret",
    businessType: "Librarie independenta",
    location: "Cluj-Napoca",
    printTheme: "Tipografie artistica si portrete clasice scriitori",
    outputPath: "/assets/portofoliu/wall-print-uv-librarie-tipografie-portrete-scriitori.png",
    aspectRatio: "3:4",
    prompt: `Independent bookshop with stunning UV-printed typographic mural wall, large-format print featuring overlapping literary quotes in elegant serif and display fonts, subtle portrait silhouettes of classic authors (Eminescu, Dostoevsky, Woolf) integrated in negative space, deep midnight navy and warm cream tones, editorial literary aesthetic, 6 square meter accent wall, bookshelves flanking both sides packed with colorful book spines, reading armchair in foreground, warm reading lamp light, cozy intellectual atmosphere, interior lifestyle photography, crisp UV print detail on smooth plaster`,
    negativePrompt: `generic sans-serif fonts, cheap bookstore, bright fluorescent lighting, empty shelves, modern tech aesthetic, faded print`,
    colorPalette: `Navy noapte + crem ivoire + auriu subtil. Literar, intellectual, cald.`,
  },

  {
    id: "biz-09",
    slug: "wall-print-studio-muzica-vinyl-microfon",
    businessType: "Studio de inregistrari muzicale",
    location: "Timișoara",
    printTheme: "Microfon vintage, note muzicale si sunete vizualizate",
    outputPath: "/assets/portofoliu/wall-print-uv-studio-muzica-microfon-vintage-note.png",
    aspectRatio: "4:3",
    prompt: `Professional music recording studio with dramatic UV-printed wall mural in live recording room, large-format print of vintage Neumann U47 microphone rendered with photorealistic detail, sound wave visualization emanating from mic in orange and electric blue tones (#3B82F6), vinyl record cross-section in background, musical notes floating in abstract composition, dark moody studio atmosphere, acoustic foam panels on surrounding walls, microphone stand in foreground, red "ON AIR" light glowing, cinematic recording studio photography, ultra-sharp UV print contrast against dark room`,
    negativePrompt: `cheap home studio, consumer equipment, bright white room, pixelated, flat design, faded colors`,
    colorPalette: `Negru studio + portocaliu (#F97316) + albastru electric (#3B82F6). Energie muzicala.`,
  },

  {
    id: "biz-10",
    slug: "wall-print-sala-box-arte-martiale",
    businessType: "Sala de box si arte martiale",
    location: "Arad",
    printTheme: "Boxer in actiune cu ring si lumini dramatice",
    outputPath: "/assets/portofoliu/wall-print-uv-sala-box-boxer-ring-dramatic.png",
    aspectRatio: "16:9",
    prompt: `Boxing and martial arts gym with powerful UV-printed mural on main training wall, large-format print of boxer in dynamic punch stance with dramatic Rembrandt lighting, sweat droplets frozen in air by high-speed photography composition, red and black gloves with orange highlight (#F97316), blurred ring ropes in printed background, sense of explosive power and motion, dark gritty gym atmosphere, hanging heavy bags in foreground slightly out of focus, dramatic overhead spotlighting creating shadows, cinematic sports photography UV print, photorealistic detail`,
    negativePrompt: `cartoon boxer, friendly yoga studio feel, bright pastel colors, amateur gym, low quality print, faded`,
    colorPalette: `Negru profund + rosu (ring) + portocaliu (#F97316). Putere, adrenalina.`,
  },

  {
    id: "biz-11",
    slug: "wall-print-clinica-fizioterapie-anatomie",
    businessType: "Clinica de fizioterapie",
    location: "Timișoara",
    printTheme: "Anatomia corpului uman in miscare — stiintific artistic",
    outputPath: "/assets/portofoliu/wall-print-uv-fizioterapie-anatomie-muschi-miscare.png",
    aspectRatio: "4:3",
    prompt: `Modern physiotherapy clinic with UV-printed anatomical wall mural in main treatment area, large-format print of human muscular system in motion rendered as elegant medical art, runner in mid-stride with muscles highlighted in teal and white (#22D3EE cyan), Da Vinci style anatomical beauty meets modern medical infographic, dark navy background making the anatomical figure glow, 8 square meter wall, treatment tables and exercise balls in foreground, professional medical lighting, physiotherapy clinic interior photography, photorealistic sharp UV print detail`,
    negativePrompt: `graphic gore, scary medical imagery, dark depressing clinic, faded print, amateur photography, bright childish colors`,
    colorPalette: `Navy + cyan (#22D3EE) + alb. Medical modern, precis, inspirational.`,
  },

  {
    id: "biz-12",
    slug: "wall-print-agentie-turism-harta-lume",
    businessType: "Agentie de turism",
    location: "Oradea",
    printTheme: "Harta lumii artistica cu destinatii iconice ilustrate",
    outputPath: "/assets/portofoliu/wall-print-uv-agentie-turism-harta-lume-artistica.png",
    aspectRatio: "16:9",
    prompt: `Travel agency office with stunning UV-printed world map mural as feature wall, large-format illustrated vintage-modern map with photorealistic landmark icons: Eiffel Tower, Colosseum, Taj Mahal, New York skyline, each destination rendered in warm travel poster style, golden amber and deep ocean blue tones (#3B82F6), compass rose in center, flight route lines connecting cities, 6-meter wide wall, standing desks with travel brochures in foreground, warm accent lighting, inspirational travel agency interior, photorealistic UV print quality`,
    negativePrompt: `generic pixel map, flat digital map, boring office, faded print, clipart icons, corporate bland`,
    colorPalette: `Ocean blue (#3B82F6) + amber calatorii + crem hartie vintage. Aventura si descoperire.`,
  },

  {
    id: "biz-13",
    slug: "wall-print-spa-bambus-pietre-zen",
    businessType: "Centru SPA si masaj",
    location: "Cluj-Napoca",
    printTheme: "Bambus, pietre spa si cascada — relaxare totala",
    outputPath: "/assets/portofoliu/wall-print-uv-spa-bambus-cascada-pietre-zen.png",
    aspectRatio: "3:4",
    prompt: `Luxury spa and massage center with serene UV-printed wall mural in treatment corridor, large-format print of misty bamboo forest with cascading waterfall and smooth river stones in foreground, soft morning light filtering through bamboo leaves, deep emerald and sage green tones with soft morning mist whites, photorealistic nature photography print quality, 4 meters tall floor-to-ceiling, plush white towels on shelf in foreground, subtle warm accent lighting, premium spa interior photography, immersive nature-in-spa atmosphere, sharp UV print detail`,
    negativePrompt: `cheap spa, bright fluorescent lighting, plastic decor, busy pattern, dark depressing corridor, faded print`,
    colorPalette: `Emerald + sage + alb ceata. Natura, liniste, regenerare.`,
  },

  {
    id: "biz-14",
    slug: "wall-print-restaurant-romanesc-ie-motive",
    businessType: "Restaurant traditional romanesc",
    location: "Timișoara",
    printTheme: "Motive traditionale romanesti din ie — identitate culturala",
    outputPath: "/assets/portofoliu/wall-print-uv-restaurant-romanesc-motive-ie-traditionala.png",
    aspectRatio: "16:9",
    prompt: `Traditional Romanian restaurant with proud UV-printed cultural wall mural, large-format print featuring intricate geometric patterns from Romanian folk embroidery (ie), deep red and black motifs on cream white background (#EF4444 red), symmetrical traditional ornaments scaled up dramatically, photorealistic thread-like fine detail in UV print, rustic wooden tables with traditional ceramic plates in foreground, warm oil lamp style lighting, exposed stone walls on sides, authentic cultural dining atmosphere, interior photography editorial quality, fine UV print detail on smooth plaster`,
    negativePrompt: `generic restaurant, modern minimal design, fast food, poor print, faded, blurry, culturally inaccurate motifs`,
    colorPalette: `Rosu traditional (#EF4444) + negru + crem ivoire. Mandrie, cultura, autenticitate.`,
  },

  {
    id: "biz-15",
    slug: "wall-print-studio-dans-siluete",
    businessType: "Studio de dans",
    location: "Cluj-Napoca",
    printTheme: "Siluete dansatori in miscare — ballet si dans modern",
    outputPath: "/assets/portofoliu/wall-print-uv-studio-dans-siluete-balet-miscare.png",
    aspectRatio: "4:3",
    prompt: `Elegant dance studio with floor-to-ceiling UV-printed wall mural on mirror-adjacent wall, large-format print of dynamic ballet and contemporary dancer silhouettes mid-movement, long exposure motion blur effect in the print design, warm gold and deep charcoal tones (#D97706 amber), multiple silhouettes at different heights suggesting movement through time, dramatic artistic photography treatment, wooden ballet barre in foreground, sprung wood floor reflecting light, large mirrors on adjacent wall, artistic dance studio interior photography, UV print with fine edge definition on silhouettes`,
    negativePrompt: `static posed dancers, amateur photography feel, garish colors, cluttered studio, poor print quality, flat illustration`,
    colorPalette: `Charcoal + auriu (#D97706) + crem. Eleganta, miscare, arta.`,
  },

  {
    id: "biz-16",
    slug: "wall-print-farmacie-plante-botanice",
    businessType: "Farmacie naturista",
    location: "Arad",
    printTheme: "Ilustratii botanice stiintifice — plante medicinale",
    outputPath: "/assets/portofoliu/wall-print-uv-farmacie-naturista-plante-medicinale-botanice.png",
    aspectRatio: "4:3",
    prompt: `Natural pharmacy with UV-printed botanical illustration wall mural, large-format print styled after 18th century scientific botanical drawings rendered with modern UV print clarity, medicinal herbs: chamomile, lavender, echinacea, ginger root, St. John's wort, each with Latin names in elegant serif typography, sage green and ivory tones on white background, photorealistic print quality showing fine line engraving style, wooden apothecary drawers in foreground, warm lighting, clean professional natural health store interior, sharp UV print detail`,
    negativePrompt: `modern pharma corporate branding, pill imagery, dark clinical look, faded print, digital clipart style, amateur`,
    colorPalette: `Sage green (#22C55E subtil) + ivoire + sepie ink. Natura, sanatate, traditional.`,
  },

  {
    id: "biz-17",
    slug: "wall-print-clinica-oftalmologie-ochi",
    businessType: "Clinica de oftalmologie",
    location: "Timișoara",
    printTheme: "Ochiul uman — iris detaliat macro, stiintific si artistic",
    outputPath: "/assets/portofoliu/wall-print-uv-clinica-oftalmologie-iris-ochi-macro.png",
    aspectRatio: "4:3",
    prompt: `Modern ophthalmology clinic with dramatic UV-printed wall mural in examination corridor, giant macro photography print of a human iris in extraordinary detail, deep ocean blue iris with gold and amber flecks (#38BDF8 blue, #F59E0B amber), crystalline lens texture visible, every fiber of the iris rendered at photorealistic UV print resolution, white sclera transitioning to skin at edges, clinical yet artistic medical photography aesthetic, eye examination equipment in foreground slightly blurred, clean white clinical interior, soft directional lighting, sharp UV print quality`,
    negativePrompt: `scary eye imagery, bloodshot eye, clinical gore, faded print, flat cartoon eye, dark oppressive space`,
    colorPalette: `Albastru ocean (#38BDF8) + amber (#F59E0B) + alb. Fascinant, precis, medical premium.`,
  },

  {
    id: "biz-18",
    slug: "wall-print-agentie-arhitectura-plan-geometric",
    businessType: "Birou de arhitectura si design interior",
    location: "Cluj-Napoca",
    printTheme: "Planuri arhitecturale si geometrie — schite tehnice artistice",
    outputPath: "/assets/portofoliu/wall-print-uv-arhitectura-planuri-geometrie-tehnica.png",
    aspectRatio: "16:9",
    prompt: `Contemporary architecture and interior design studio with UV-printed feature wall in main workspace, large-format print of overlapping architectural floor plans, axonometric drawings and geometric construction lines as fine white lines on dark navy background, blueprint aesthetic elevated to art, subtle orange (#F97316) accent lines highlighting key structural elements, 6-meter wide wall in open-plan office, architect desks with drawing tools in foreground, task lighting, modern professional creative workspace, architectural interior photography, crisp fine line UV print detail`,
    negativePrompt: `messy blueprints, cheap reproduction, faded print, generic office, cluttered desk, bright white background`,
    colorPalette: `Navy fond + alb linii + orange accent (#F97316). Tehnic, precis, creativ.`,
  },

  {
    id: "biz-19",
    slug: "wall-print-centru-copii-spatiu-cosmos",
    businessType: "Centru educational pentru copii",
    location: "Timișoara",
    printTheme: "Cosmos si planete — aventura stiintifica pentru copii",
    outputPath: "/assets/portofoliu/wall-print-uv-centru-copii-cosmos-planete-stiinta.png",
    aspectRatio: "16:9",
    prompt: `Children's educational center with awe-inspiring UV-printed cosmic wall mural in main learning hall, large-format print of photorealistic solar system with Saturn rings, glowing nebulae in purple and orange (#A78BFA violet, #F97316 orange), milky way galaxy in background, astronaut illustration for child scale reference, stars and constellation lines, vibrant cosmic colors on deep space black, 8-meter wide wall floor to ceiling, small desks with science kits in foreground, wonder-inducing atmosphere, educational interior photography, sharp UV print nebula detail`,
    negativePrompt: `scary aliens, dark horror space, violent imagery, faded print, cheap poster quality, fluorescent lighting`,
    colorPalette: `Negru cosmos + violet (#A78BFA) + portocaliu nebula (#F97316). Uimire, curiozitate, stiinta.`,
  },

  {
    id: "biz-20",
    slug: "wall-print-salon-coafura-siluete-par",
    businessType: "Salon de coafura premium",
    location: "Arad",
    printTheme: "Siluete hairstyle iconice si texturi de par — arta si stil",
    outputPath: "/assets/portofoliu/wall-print-uv-salon-coafura-siluete-hairstyle-premium.png",
    aspectRatio: "3:4",
    prompt: `Premium hair salon with sophisticated UV-printed mural on feature wall, large-format print featuring bold graphic silhouettes of iconic hairstyles (afro, updo, waves, sleek bob) arranged in artistic composition, high-fashion editorial photography style within the print, rich black and electric pink tones (#EC4899 pink accent) on dark charcoal background, Art Deco geometry framing the silhouettes, gold line details, floor-to-ceiling 4-meter wall, salon chairs with mirrors reflecting the print, warm vanity lighting, upscale hair salon interior photography, sharp UV print detail`,
    negativePrompt: `cheap salon decor, flat clipart hairstyles, faded colors, dark gloomy lighting, amateur photography, generic barber shop`,
    colorPalette: `Charcoal + roz electric (#EC4899) + auriu. Fashion, stil, premium.`,
  },
];

// ─── COMPONENT DE REFERINTA ────────────────────────────────────────────────────

export default function ContentPrompts() {
  const categories = [
    "residential",
    "commercial",
    "textile",
    "custom",
  ] as const;
  const categoryLabels = {
    residential: "Residential",
    commercial: "Commercial",
    textile: "Textile",
    custom: "Custom / Laser",
  };

  return (
    <div
      style={{
        fontFamily: "monospace",
        padding: "40px",
        background: "#0C0C0C",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: 28,
          marginBottom: 8,
          color: "#F97316",
        }}
      >
        SDG PRINT — Prompts Portofoliu
      </h1>
      <p style={{ color: "#6B7280", marginBottom: 40, fontSize: 14 }}>
        {PORTOFOLIU_PROMPTS.length} prompts · Recomandat: Midjourney v6, DALL-E
        3, Stable Diffusion XL
      </p>

      {categories.map((cat) => {
        const items = PORTOFOLIU_PROMPTS.filter((p) => p.category === cat);
        return (
          <div key={cat} style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "sans-serif", fontSize: 18, color: "#9CA3AF", marginBottom: 20, borderBottom: "1px solid #2A2A2A", paddingBottom: 8 }}>
              {categoryLabels[cat]} ({items.length})
            </h2>
            {items.map((p) => (
              <div key={p.id} style={{ background: "#141414", border: "1px solid #2A2A2A", borderRadius: 10, padding: "20px 24px", marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <span style={{ color: "#F97316", fontSize: 11, fontFamily: "sans-serif", fontWeight: 600 }}>#{p.id} — {p.service}</span>
                    <h3 style={{ fontFamily: "sans-serif", fontSize: 16, margin: "4px 0 2px", color: "#fff" }}>{p.title}</h3>
                    <span style={{ fontSize: 11, color: "#6B7280" }}>{p.outputPath}</span>
                  </div>
                  <span style={{ fontSize: 11, background: "#1E1E1E", border: "1px solid #2A2A2A", borderRadius: 5, padding: "4px 10px", color: "#9CA3AF", whiteSpace: "nowrap" }}>
                    {p.aspectRatio}
                  </span>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: "#4B5563", display: "block", marginBottom: 4 }}>PROMPT</span>
                  <p style={{ fontSize: 12, color: "#D1D5DB", lineHeight: 1.7, background: "#0C0C0C", borderRadius: 6, padding: "12px 14px", border: "1px solid #1E1E1E" }}>
                    {p.prompt}
                  </p>
                </div>
                <div style={{ marginBottom: p.notes ? 10 : 0 }}>
                  <span style={{ fontSize: 10, color: "#4B5563", display: "block", marginBottom: 4 }}>NEGATIVE PROMPT</span>
                  <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{p.negativePrompt}</p>
                </div>
                {p.notes && (
                  <div style={{ marginTop: 8, fontSize: 11, color: "#F97316", background: "rgba(249,115,22,.06)", borderRadius: 5, padding: "6px 10px", border: "1px solid rgba(249,115,22,.15)" }}>
                    Note: {p.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}

      {/* ── WALL PRINT BUSINESS PROMO ── */}
      <div style={{ marginTop: 64 }}>
        <h2 style={{ fontFamily: "sans-serif", fontSize: 22, color: "#F97316", marginBottom: 6 }}>
          Wall Print UV — Promovare pe Tipuri de Business
        </h2>
        <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 32 }}>
          {WALL_PRINT_BUSINESS_PROMPTS.length} prompts · Print tematic specific domeniului de activitate, fotografiat in contextul real al spatiului
        </p>
        {WALL_PRINT_BUSINESS_PROMPTS.map((p) => (
          <div key={p.id} style={{ background: "#141414", border: "1px solid rgba(249,115,22,.2)", borderRadius: 10, padding: "20px 24px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <span style={{ color: "#F97316", fontSize: 11, fontFamily: "sans-serif", fontWeight: 600 }}>{p.id} — {p.businessType} · {p.location}</span>
                <h3 style={{ fontFamily: "sans-serif", fontSize: 16, margin: "4px 0 2px", color: "#fff" }}>{p.printTheme}</h3>
                <span style={{ fontSize: 11, color: "#6B7280" }}>{p.outputPath}</span>
              </div>
              <span style={{ fontSize: 11, background: "#1E1E1E", border: "1px solid #2A2A2A", borderRadius: 5, padding: "4px 10px", color: "#9CA3AF", whiteSpace: "nowrap" }}>
                {p.aspectRatio}
              </span>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 10, color: "#4B5563", display: "block", marginBottom: 4 }}>PROMPT</span>
              <p style={{ fontSize: 12, color: "#D1D5DB", lineHeight: 1.7, background: "#0C0C0C", borderRadius: 6, padding: "12px 14px", border: "1px solid #1E1E1E" }}>
                {p.prompt}
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 10, color: "#4B5563", display: "block", marginBottom: 4 }}>NEGATIVE PROMPT</span>
              <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{p.negativePrompt}</p>
            </div>
            <div style={{ fontSize: 11, color: "#9CA3AF", background: "rgba(249,115,22,.04)", borderRadius: 5, padding: "6px 10px", border: "1px solid rgba(249,115,22,.1)" }}>
              Paleta: {p.colorPalette}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
