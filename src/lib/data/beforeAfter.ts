export interface BeforeAfterResult {
  val: string;
  label: string;
}

export interface BeforeAfterItem {
  title: string;
  surface: string;
  duration: string;
  category: string;
  desc: string;
  before: string;
  after: string;
  results: BeforeAfterResult[];
}

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    title: "Recepție clinică stomatologică",
    surface: "Perete lavabil",
    duration: "1 zi",
    category: "Medical / HoReCa",
    desc: "Transformare completă a recepției dintr-un spațiu neutru, depersonalizat, într-un mediu calm, profesional și memorabil. Pacienții simt diferența imediat — anxietatea scade, încrederea crește.",
    before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
    after: "linear-gradient(160deg, #0a2a1a 0%, #0d3520 50%, #0a2a1a 100%)",
    results: [
      { val: "1 zi",    label: "Timp execuție" },
      { val: "12 m²",   label: "Suprafață printată" },
      { val: "2880 DPI", label: "Rezoluție finală" },
    ],
  },
  {
    title: "Showroom auto premium",
    surface: "MDF lăcuit",
    duration: "6 ore",
    category: "Automotive / Retail",
    desc: "Accent vizual de brand pentru showroom — de la pereți neutri la o experiență imersivă care pune mașina în context. Clienții petrec mai mult timp în showroom și rata de conversie crește.",
    before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
    after: "linear-gradient(160deg, #1a1000 0%, #2a1c00 50%, #1a1000 100%)",
    results: [
      { val: "6h",    label: "Timp execuție" },
      { val: "18 m²", label: "Suprafață MDF" },
      { val: "0",     label: "Zile nefuncționale" },
    ],
  },
  {
    title: "Birou creativ — spațiu open-space",
    surface: "Perete gletuit",
    duration: "1 zi",
    category: "Office / Corporate",
    desc: "Spațiu de lucru transformat dintr-un birou generic într-un mediu care inspiră, motivează și definește cultura companiei. Angajații se identifică mai puternic cu brandul.",
    before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
    after: "linear-gradient(160deg, #00102a 0%, #001535 50%, #00102a 100%)",
    results: [
      { val: "1 zi",  label: "Timp execuție" },
      { val: "24 m²", label: "Suprafață acoperită" },
      { val: "CMYK",  label: "Sistem culori" },
    ],
  },
  {
    title: "Restaurant & bar — perete focal",
    surface: "Beton aparent",
    duration: "8 ore",
    category: "HoReCa",
    desc: "Peretele focal al restaurantului transformat în element de decor care definește atmosfera și creează Instagram moments. Clienții fotografiază și distribuie organic — marketing gratuit.",
    before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
    after: "linear-gradient(160deg, #1a0000 0%, #2a0500 50%, #1a0000 100%)",
    results: [
      { val: "8h",    label: "Timp execuție" },
      { val: "20 m²", label: "Beton aparent" },
      { val: "UV",    label: "Rezistent umiditate" },
    ],
  },
  {
    title: "Dormitor rezidențial — mural artistic",
    surface: "Perete tencuit",
    duration: "4 ore",
    category: "Rezidențial",
    desc: "Dormitor personalizat cu un mural care reflectă personalitatea proprietarilor. De la spațiu generic la cel mai frumos loc din casă — fără renovări majore, fără dezordine.",
    before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
    after: "linear-gradient(160deg, #0a001a 0%, #100025 50%, #0a001a 100%)",
    results: [
      { val: "4h",   label: "Timp execuție" },
      { val: "9 m²", label: "Suprafață mural" },
      { val: "0",    label: "Zile renovare" },
    ],
  },
  {
    title: "Sală de conferință corporate",
    surface: "Perete gletuit + MDF",
    duration: "2 zile",
    category: "Corporate",
    desc: "Sala de conferință transformată dintr-un spațiu neutru într-un ambasador al brandului. Fiecare meeting devine o oportunitate de a întări identitatea companiei față de parteneri și clienți.",
    before: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
    after: "linear-gradient(160deg, #001a0a 0%, #002510 50%, #001a0a 100%)",
    results: [
      { val: "2 zile", label: "Timp execuție" },
      { val: "40 m²",  label: "Suprafață totală" },
      { val: "3",      label: "Suprafețe diferite" },
    ],
  },
];
