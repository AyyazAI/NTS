export const NAT_CATEGORIES = [
  { id: 'NAT-IE',   label: 'Engineering',      short: 'Engineering' },
  { id: 'NAT-IM',   label: 'Medical',          short: 'Medical' },
  { id: 'NAT-ICS',  label: 'Computer Science', short: 'CS'      },
  { id: 'NAT-ICOM', label: 'Commerce',         short: 'Commerce'},
  { id: 'NAT-IGS',  label: 'General Sciences', short: 'Gen Sci' },
  { id: 'NAT-IA',   label: 'Arts',             short: 'Arts'    },
]

// Subject subtopics with demo progress percentages for static UI
// Verified against official NTS documentation (SC-03, SC-04)
export const SUBJECT_SUBTOPICS = {
  'NAT-IE':   [{ name:'Physics',pct:55 },{ name:'Chemistry',pct:42 },{ name:'FSc Mathematics',pct:70 }],
  'NAT-IM':   [{ name:'Physics',pct:55 },{ name:'Chemistry',pct:48 },{ name:'Biology',pct:60 }],
  'NAT-ICS':  [{ name:'Physics',pct:50 },{ name:'FSc Mathematics',pct:75 },{ name:'Computer Science',pct:62 }],
  'NAT-ICOM': [{ name:'Accounting',pct:58 },{ name:'Commerce',pct:65 },{ name:'Economics',pct:44 }],
  'NAT-IGS':  [{ name:'Mathematics',pct:72 },{ name:'Statistics',pct:60 },{ name:'Economics',pct:48 }],
  'NAT-IA':   [{ name:'Islamiyat / Ethics',pct:68 },{ name:'Pakistan Studies',pct:62 },{ name:'General Knowledge',pct:55 }],
}

export function getNatCategory() {
  try { return localStorage.getItem('nat_category') || null } catch { return null }
}

export function setNatCategory(cat) {
  try { localStorage.setItem('nat_category', cat) } catch {}
}

// "Engineering (NAT-IE)"
export function getCategoryLabel(catId) {
  const cat = NAT_CATEGORIES.find(c => c.id === catId)
  return cat ? `${cat.label} (${catId})` : 'Subject'
}

// "Engineering"
export function getCategoryName(catId) {
  const cat = NAT_CATEGORIES.find(c => c.id === catId)
  return cat ? cat.label : 'Subject'
}

// "Engg" — for tight UI like section tabs
export function getCategoryShort(catId) {
  const cat = NAT_CATEGORIES.find(c => c.id === catId)
  return cat ? cat.short : 'Subj'
}
