export interface Project {
  id: number;
  cat: "residential" | "commercial" | "textile" | "custom";
  title: string;
  location: string;
  area: string;
  duration: string;
  service: string;
  tags: string[];
  color: string;
  accent: string;
  h: number;
}

export interface Filter {
  id: string;
  label: string;
  icon: string;
}

export const PROJECTS: Project[] = [
  // Residential
  { id:1,  cat:"residential", title:"Mural geometric dormitor",    location:"Timișoara",    area:"14 m²",  duration:"6h",     service:"Wall Print UV",      tags:["Rezidențial","Geometric","Abstract"],     color:"linear-gradient(135deg,#1a0a2a,#2d1045,#1a0a2a)", accent:"#A78BFA", h:280 },
  { id:2,  cat:"residential", title:"Mural floral living",         location:"Arad",         area:"22 m²",  duration:"1 zi",   service:"Wall Print UV",      tags:["Rezidențial","Floral","Colorat"],         color:"linear-gradient(135deg,#0a1a0a,#143020,#0a1a0a)", accent:"#22C55E", h:360 },
  { id:3,  cat:"residential", title:"Accent perete dormitor copii",location:"Cluj-Napoca",  area:"9 m²",   duration:"4h",     service:"Wall Print UV",      tags:["Rezidențial","Copii","Colorat"],          color:"linear-gradient(135deg,#001a2a,#002535,#001a2a)", accent:"#3B82F6", h:240 },
  { id:4,  cat:"residential", title:"Gresie baie personalizată",   location:"Timișoara",    area:"6 m²",   duration:"3h",     service:"Wall Print UV",      tags:["Rezidențial","Baie","Modern"],            color:"linear-gradient(135deg,#1a1008,#2a1c00,#1a1008)", accent:"#F59E0B", h:300 },
  // Commercial
  { id:5,  cat:"commercial",  title:"Recepție clinică stomatologică", location:"Timișoara", area:"18 m²",  duration:"1 zi",   service:"Wall Print UV",      tags:["Medical","Recepție","Corporate"],         color:"linear-gradient(135deg,#0a1a10,#0d2518,#0a1a10)", accent:"#22C55E", h:320 },
  { id:6,  cat:"commercial",  title:"Showroom auto premium",          location:"Arad",      area:"30 m²",  duration:"1.5 zi", service:"Wall Print UV",      tags:["Automotive","Showroom","Premium"],        color:"linear-gradient(135deg,#1a0800,#2a1000,#1a0800)", accent:"#F97316", h:260 },
  { id:7,  cat:"commercial",  title:"Restaurant birou focal",         location:"Timișoara", area:"20 m²",  duration:"8h",     service:"Wall Print UV",      tags:["HoReCa","Restaurant","Ambient"],          color:"linear-gradient(135deg,#1a0000,#280400,#1a0000)", accent:"#EF4444", h:380 },
  { id:8,  cat:"commercial",  title:"Sală conferință corporate",      location:"Cluj-Napoca",area:"40 m²", duration:"2 zi",   service:"Wall Print UV",      tags:["Corporate","Office","Branding"],          color:"linear-gradient(135deg,#001020,#001828,#001020)", accent:"#3B82F6", h:290 },
  { id:9,  cat:"commercial",  title:"Birou creativ open-space",       location:"Timișoara", area:"35 m²",  duration:"2 zi",   service:"Wall Print UV",      tags:["Office","Creative","Motivational"],       color:"linear-gradient(135deg,#0a001a,#120025,#0a001a)", accent:"#A78BFA", h:340 },
  { id:10, cat:"commercial",  title:"Cafenea specialty coffee",       location:"Oradea",    area:"16 m²",  duration:"1 zi",   service:"Wall Print UV",      tags:["HoReCa","Cafenea","Artisanal"],           color:"linear-gradient(135deg,#100800,#1a1000,#100800)", accent:"#D97706", h:270 },
  // Textile
  { id:11, cat:"textile",     title:"Tricouri echipă startup",        location:"Timișoara", area:"60 buc", duration:"48h",    service:"Print Textile",      tags:["Corporate","Tricouri","Merch"],           color:"linear-gradient(135deg,#1a0a00,#2a1400,#1a0a00)", accent:"#F97316", h:260 },
  { id:12, cat:"textile",     title:"Hanorace festival muzică",       location:"Cluj-Napoca",area:"200 buc",duration:"5 zi", service:"Print Textile",      tags:["Evenimente","Hanorace","Festival"],       color:"linear-gradient(135deg,#00101a,#001525,#00101a)", accent:"#3B82F6", h:310 },
  { id:13, cat:"textile",     title:"Uniforme echipă hospitality",    location:"Timișoara", area:"35 buc", duration:"3 zi",   service:"Print Textile",      tags:["HoReCa","Uniforme","Profesional"],        color:"linear-gradient(135deg,#001a00,#002500,#001a00)", accent:"#22C55E", h:280 },
  { id:14, cat:"textile",     title:"Șepci personalizate brand",      location:"București", area:"150 buc",duration:"4 zi",   service:"Print Textile",      tags:["Branding","Șepci","Corporate"],           color:"linear-gradient(135deg,#1a0018,#250020,#1a0018)", accent:"#EC4899", h:240 },
  // Custom
  { id:15, cat:"custom",      title:"Trofee corporate gravate",       location:"Timișoara", area:"50 buc", duration:"2 zi",   service:"Gravare Laser CO₂",  tags:["Corporate","Trofee","Premium"],           color:"linear-gradient(135deg,#181000,#221800,#181000)", accent:"#F59E0B", h:290 },
  { id:16, cat:"custom",      title:"Cutii cadou lemn personalizate", location:"Arad",      area:"30 buc", duration:"1 zi",   service:"Gravare Laser CO₂",  tags:["Gifting","Lemn","Premium"],               color:"linear-gradient(135deg,#0a1500,#102000,#0a1500)", accent:"#84CC16", h:260 },
  { id:17, cat:"custom",      title:"Signalistică acril firmă",       location:"Timișoara", area:"12 buc", duration:"1 zi",   service:"Gravare Laser CO₂",  tags:["Semnalistică","Acril","Office"],          color:"linear-gradient(135deg,#001020,#001830,#001020)", accent:"#22D3EE", h:320 },
  { id:18, cat:"custom",      title:"Căni ceramică foto brand",       location:"Cluj-Napoca",area:"100 buc",duration:"3 zi", service:"Obiecte Custom",     tags:["Gifting","Căni","Corporate"],             color:"linear-gradient(135deg,#100010,#1a001a,#100010)", accent:"#C084FC", h:270 },
];

export const FILTERS: Filter[] = [
  { id:"all",         label:"Toate",          icon:"◉" },
  { id:"commercial",  label:"Commercial",     icon:"🏢" },
  { id:"residential", label:"Residential",    icon:"🏠" },
  { id:"textile",     label:"Textile",        icon:"👕" },
  { id:"custom",      label:"Custom / Laser", icon:"⚡" },
];
