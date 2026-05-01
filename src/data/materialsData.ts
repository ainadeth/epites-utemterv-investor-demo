/**
 * Material / procurement static data.
 * All content is demo/informational only — not real prices or real vendors.
 */

import { normalizeProjectKey } from '../data/budgetConstants'

// ── Material category card data ────────────────────────────────────────────

export interface MaterialCard {
  id: string
  category: string
  icon: string
  description: string
  phase: string
  timing: string
  priceSensitivity: 'Alacsony' | 'Közepes' | 'Közepes–magas' | 'Magas'
  tip: string
}

// ── Project-type distributions ─────────────────────────────────────────────

const MATERIALS_FELUJITAS: MaterialCard[] = [
  {
    id: 'f1', category: 'Festék / glett / alapozó', icon: '🎨',
    description: 'Beltéri és kültéri festékek, glettelőanyagok, alapozók és penészgátlók.',
    phase: 'Festés és befejező munkák', timing: '1–2 héttel a festés előtt',
    priceSensitivity: 'Közepes',
    tip: 'A falak állapota meghatározza, mennyi glett kell – mérje fel előre a kivitelező.',
  },
  {
    id: 'f2', category: 'Burkolat / fuga / ragasztó', icon: '⬜',
    description: 'Padló- és falburkolatok, csempék, ragasztók, fugázók.',
    phase: 'Burkolás', timing: '2–4 héttel a burkolás előtt',
    priceSensitivity: 'Közepes–magas',
    tip: 'Rendelje 10% többlettel a vágási veszteség fedezésére.',
  },
  {
    id: 'f3', category: 'Vízszigetelés', icon: '💧',
    description: 'Fürdőszobai és nedveshelyiségi vízszigetelő anyagok.',
    phase: 'Burkolás (előkészítés)', timing: '1–2 héttel a burkolás előtt',
    priceSensitivity: 'Közepes',
    tip: 'Ne hagyja ki – a vízszigetelés hiánya utólag sokszorosan drágább.',
  },
  {
    id: 'f4', category: 'Villanyszerelési anyagok', icon: '⚡',
    description: 'Kábelek, kapcsolók, aljzatok, elosztódobozok, FI-relé.',
    phase: 'Villanyhálózat korszerűsítése', timing: 'A villanyszerelés megkezdése előtt',
    priceSensitivity: 'Közepes',
    tip: 'Az anyaglistát mindig a villanyszerelővel egyeztesse.',
  },
  {
    id: 'f5', category: 'Gépészeti szerelvények', icon: '🚿',
    description: 'Vízvezetékek, csaptelepek, lefolyók, szifon, csatlakozók.',
    phase: 'Víz / gépészet', timing: '1–2 héttel a gépészet előtt',
    priceSensitivity: 'Közepes–magas',
    tip: 'A márkát és modellt rögzítse le a megrendelés előtt – visszavezetési problémák elkerülése végett.',
  },
  {
    id: 'f6', category: 'Beltéri ajtók / nyílászárók', icon: '🚪',
    description: 'Beltéri ajtók, tokok, párkányok, kilincsek.',
    phase: 'Nyílászárók / beltéri elemek', timing: '3–6 héttel előre (rendelési idő!)',
    priceSensitivity: 'Közepes–magas',
    tip: 'Egyedi méret esetén 4–8 hetes átfutással kell számolni.',
  },
  {
    id: 'f7', category: 'Sittes zsák / hulladékkezelés', icon: '♻️',
    description: 'Bontási hulladék elszállításához zsákok, konténer megrendelés.',
    phase: 'Bontás és sittkezelés', timing: 'A bontás előtt',
    priceSensitivity: 'Alacsony',
    tip: 'Konténert 2–3 nappal előre rendelje meg a parkolási engedéllyel együtt.',
  },
  {
    id: 'f8', category: 'Takarás / fólia / védőanyagok', icon: '🛡️',
    description: 'Padlófólia, sarokvédők, bútorvédő anyagok, maszkoló szalag.',
    phase: 'Tervezés / előkészítés', timing: 'A munkák megkezdése előtt',
    priceSensitivity: 'Alacsony',
    tip: 'A meglévő padló és bútor védelme megtakarítja a végső javítási költségeket.',
  },
]

const MATERIALS_HAZEPITES: MaterialCard[] = [
  {
    id: 'h1', category: 'Beton / vasalat', icon: '🏗️',
    description: 'Betonkeverékek, acélbetét, zsaluzó anyagok az alapozáshoz és a szerkezethez.',
    phase: 'Alapozás / Szerkezetépítés', timing: '1–2 héttel az alapozás előtt',
    priceSensitivity: 'Magas',
    tip: 'Az acélár folyamatosan változik – rögzítsen árat a rendeléskor.',
  },
  {
    id: 'h2', category: 'Falazóanyag', icon: '🧱',
    description: 'Tégla, blokk, ytong, porotherm vagy más falazóelem.',
    phase: 'Szerkezetépítés', timing: '2–3 héttel a falazás előtt',
    priceSensitivity: 'Közepes–magas',
    tip: 'Az anyagmennyiséget a statikai tervből vezesse le.',
  },
  {
    id: 'h3', category: 'Fodém / koszorú anyagok', icon: '⬆️',
    description: 'Előregyártott vagy helyszíni fődémgerendák, acél, beton, zsaluzat.',
    phase: 'Szerkezetépítés', timing: '3–4 héttel előre (szállítási idő)',
    priceSensitivity: 'Magas',
    tip: 'Az előregyártott fődémelemeknek jellemzően 3–6 hetes az átfutása.',
  },
  {
    id: 'h4', category: 'Tetőanyagok', icon: '🏠',
    description: 'Faanyag, tetőfólia, léc, cserép / lemedfedés, bádogos elemek.',
    phase: 'Tetőszerkezet / Tetőfedés', timing: '3–4 héttel a tetőszerkezet előtt',
    priceSensitivity: 'Magas',
    tip: 'A faanyag kezelési és száradási ideje fontos – ne hagyd az utolsó pillanatra.',
  },
  {
    id: 'h5', category: 'Nyílászárók', icon: '🪟',
    description: 'Külső ablakok, bejárati ajtók, erkélyajtók.',
    phase: 'Nyílászárók', timing: '4–8 héttel előre rendelve',
    priceSensitivity: 'Magas',
    tip: 'Energetikai osztály kiválasztása hatással van a hőtechnikára és a hatósági kövezelményekre.',
  },
  {
    id: 'h6', category: 'Szigetelés', icon: '🧯',
    description: 'Homlokzati, tető- és alapozásszigeteés anyagok.',
    phase: 'Gépészet / Belső munkák', timing: '2–3 héttel a munka előtt',
    priceSensitivity: 'Közepes–magas',
    tip: 'Minőség és vastagság meghatározó a hőtechnikai megfelelőséghez.',
  },
  {
    id: 'h7', category: 'Gépészet', icon: '🚿',
    description: 'Fűtési rendszer, víz- és csatornaszerelési anyagok, kazán, hőszivattyú.',
    phase: 'Gépészet', timing: '3–4 héttel a gépészet előtt',
    priceSensitivity: 'Magas',
    tip: 'A gépészeti rendszer kiválasztása hatással van az energetikai tanúsítványra.',
  },
  {
    id: 'h8', category: 'Villanyszerelési anyagok', icon: '⚡',
    description: 'Kábelek, elosztótábla, aljzatok, kapcsolók.',
    phase: 'Villanyszerelés', timing: 'A villanyszerelés megkezdése előtt',
    priceSensitivity: 'Közepes',
    tip: 'Tervezze meg előre az okosotthon-előkészítés igényét.',
  },
  {
    id: 'h9', category: 'Burkolatok', icon: '⬜',
    description: 'Padló, fal, terasz burkolólapok, ragasztó, fugázó.',
    phase: 'Belső munkák', timing: '2–3 héttel a burkolás előtt',
    priceSensitivity: 'Közepes–magas',
    tip: '+10% tartalékot mindig rendelje hozzá vágási veszteségre.',
  },
  {
    id: 'h10', category: 'Festékek és befejező anyagok', icon: '🎨',
    description: 'Beltéri és kültéri festékek, glett, alapozók.',
    phase: 'Belső munkák', timing: '1–2 héttel a festés előtt',
    priceSensitivity: 'Közepes',
    tip: 'A végső szín kiválasztását érdemes minta alapján elvégezni.',
  },
  {
    id: 'h11', category: 'Külső munkák anyagai', icon: '🌿',
    description: 'Térkő, szegélykő, kerítéselem, ágyazóhomok.',
    phase: 'Külső munkák', timing: 'Az utolsó belsős fázis után',
    priceSensitivity: 'Közepes',
    tip: 'A tereprendezés előtt érdemes a végleges kertképet is megtervezni.',
  },
]

const MATERIALS_BOVITES: MaterialCard[] = [
  {
    id: 'b1', category: 'Beton / szerkezeti anyagok', icon: '🏗️',
    description: 'Beton, vasalat, zsaluzat az új szerkezeti elemekhez.',
    phase: 'Szerkezeti munkák', timing: '2–3 héttel a munka előtt',
    priceSensitivity: 'Magas',
    tip: 'A csatlakozási pontokat statikussal ellenőriztesse betonozás előtt.',
  },
  {
    id: 'b2', category: 'Falazóanyag', icon: '🧱',
    description: 'Bővítés falazásához szükséges téglák, blokkok.',
    phase: 'Szerkezeti munkák', timing: '2 héttel a falazás előtt',
    priceSensitivity: 'Közepes–magas',
    tip: 'Egyezzen meg a statikussal a szükséges falazóelem típusáról.',
  },
  {
    id: 'b3', category: 'Nyílászárók', icon: '🪟',
    description: 'Új ablakok, ajtók a bővített területen.',
    phase: 'Nyílászárók', timing: '4–6 héttel előre rendelve',
    priceSensitivity: 'Magas',
    tip: 'Egyedi méret esetén hosszabb az átfutás.',
  },
  {
    id: 'b4', category: 'Gépészet', icon: '🚿',
    description: 'A bővítés gépészeti bevezetése, csatlakozás a meglévő rendszerhez.',
    phase: 'Gépészet', timing: '2–3 héttel a gépészet előtt',
    priceSensitivity: 'Magas',
    tip: 'A meglévő rendszer kapacitását vizsgáltassa meg a gépésszel.',
  },
  {
    id: 'b5', category: 'Villanyszerelés', icon: '⚡',
    description: 'Elektromos csatlakozások a bővített területen.',
    phase: 'Villanyszerelés', timing: 'A villanyszerelés előtt',
    priceSensitivity: 'Közepes',
    tip: 'Ellenőrizze az elosztótábla kapacitását.',
  },
  {
    id: 'b6', category: 'Szigetelés', icon: '🧯',
    description: 'Falak, tető és alap szigetelő anyagai.',
    phase: 'Belső befejező munkák', timing: '2 héttel a munka előtt',
    priceSensitivity: 'Közepes–magas',
    tip: 'A bővítés hőtechnikai egysége legyen összhangban a meglévő épülettel.',
  },
  {
    id: 'b7', category: 'Burkolatok', icon: '⬜',
    description: 'Padló és falburkolat az új területen.',
    phase: 'Belső befejező munkák', timing: '2 héttel a burkolás előtt',
    priceSensitivity: 'Közepes–magas',
    tip: 'Törekedjen a meglévő burkolattal való illeszkedésre.',
  },
  {
    id: 'b8', category: 'Festékek', icon: '🎨',
    description: 'Festékek, alapozók, glett a bővített területen.',
    phase: 'Belső befejező munkák', timing: '1 héttel a festés előtt',
    priceSensitivity: 'Közepes',
    tip: 'Egyeztesse a meglévő falfelületek árnyalatával.',
  },
]

// Generic fallback
const MATERIALS_GENERIC: MaterialCard[] = [
  {
    id: 'g1', category: 'Főbb burkolati anyagok', icon: '⬜',
    description: 'Padló- és falburkolatok, ragasztók, fugázók.',
    phase: 'Burkolás', timing: '2–3 héttel előre',
    priceSensitivity: 'Közepes–magas',
    tip: 'Rendelje 10% többlettel a vágási veszteség fedezésére.',
  },
  {
    id: 'g2', category: 'Festékek és befejező anyagok', icon: '🎨',
    description: 'Beltéri festékek, glett, alapozók.',
    phase: 'Festés', timing: '1 héttel előre',
    priceSensitivity: 'Közepes',
    tip: 'Ellenőrizze a fal állapotát – glettelés szükséges lehet.',
  },
  {
    id: 'g3', category: 'Gépészet / villany', icon: '⚡',
    description: 'Villanyszerelési és gépészeti anyagok.',
    phase: 'Gépészet és villany', timing: 'Szakemberrel egyeztetve',
    priceSensitivity: 'Közepes–magas',
    tip: 'Az anyaglistát mindig a szakemberrel egyeztesse.',
  },
  {
    id: 'g4', category: 'Tartalék / egyéb', icon: '🛡️',
    description: 'Kisebb kiegészítők, pótrendelések, takarás.',
    phase: 'Minden fázis', timing: 'Folyamatos',
    priceSensitivity: 'Alacsony',
    tip: 'Mindig tartson 5–10% tartalékkeret mellett pótrendelési lehetőséget.',
  },
]

/**
 * Get material cards for the given project key.
 */
export function getMaterialCards(projectKey: string | undefined): MaterialCard[] {
  const normalized = normalizeProjectKey(projectKey)
  if (normalized === 'felujitas') return MATERIALS_FELUJITAS
  if (normalized === 'bovites')   return MATERIALS_BOVITES
  if (normalized === 'hazepites') return MATERIALS_HAZEPITES
  return MATERIALS_GENERIC
}

// ── Timing strip data ──────────────────────────────────────────────────────

export const TIMING_STAGES = [
  {
    icon: '🗓️',
    title: 'Tervezéskor',
    text: 'Nagy döntések: nyílászárók, tetőanyag, gépészet, fő burkolati irányok.',
    color: '#4A7C59',
    bg:    '#E8F5EC',
  },
  {
    icon: '📦',
    title: 'Fázis előtt 2–4 héttel',
    text: 'Burkolat, festék, szerelvények, kiegészítők, rendelési idők ellenőrzése.',
    color: '#4A7090',
    bg:    '#E8F0F7',
  },
  {
    icon: '🔧',
    title: 'Kivitelezés közben',
    text: 'Pontosított mennyiségek, pótrendelések, szakember visszajelzések.',
    color: '#9A7A50',
    bg:    '#F5F0E8',
  },
  {
    icon: '🏁',
    title: 'Átadás előtt',
    text: 'Javítóanyagok, takarás, takarítás, kisebb hiánypótlások.',
    color: '#7A7860',
    bg:    '#F0EEE8',
  },
]

// ── Partner logic cards ────────────────────────────────────────────────────

export const PARTNER_CARDS = [
  { icon: '🏪', title: 'Tüzép ajánlások', text: 'Lokáció és projektfázis alapján releváns beszállítók.' },
  { icon: '🏷️', title: 'Márka / termékkategória', text: 'Festék, burkolat, szigetelés, tetőanyag, gépészet és más kategóriák.' },
  { icon: '🎁', title: 'Akciók és ajánlatok', text: 'Később partneri ajánlatok, szezonális kedvezmények és csomagajánlatok.' },
  { icon: '📋', title: 'Beszerzési lead', text: 'A projektből anyagigény keletkezik, amely később értékes lead lehet partnereknek.' },
]
