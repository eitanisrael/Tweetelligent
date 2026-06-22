import { useState, useMemo, useEffect, useLayoutEffect, useReducer, useRef, useCallback } from "react";
import {
  Search, User, Calendar, BarChart2, SlidersHorizontal, Globe,
  Settings, X, Check, Copy, RotateCcw, Download, Share2,
  Moon, Sun, Trash2, Plus, Keyboard, Menu,
  Heart, Repeat2, MessageCircle, ChevronDown, ChevronUp, Smartphone,
  Link, Zap, Info, Star, ToggleLeft, ToggleRight
} from "lucide-react";

function HedgehogIcon({size=16,color="currentColor"}){
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16 Q3 11 8 10 Q13 9 17 13 Q19 15 17 18 Q14 21 9 20 Q4 19 4 16Z"/>
      <circle cx="18" cy="13.5" r="2.5"/>
      <circle cx="19.2" cy="12.5" r="0.35" fill={color} stroke="none"/>
      <circle cx="20" cy="14.3" r="0.35" fill={color} stroke="none"/>
      <line x1="7" y1="10" x2="5" y2="6"/><line x1="9" y1="9.5" x2="8" y2="5"/>
      <line x1="11" y1="9" x2="11" y2="5"/><line x1="13" y1="9.5" x2="14" y2="5.5"/>
      <line x1="15" y1="10.5" x2="17" y2="7.5"/>
    </svg>
  );
}

const I18N={
  he:{
    search:"חיפוש",copy:"העתקה",clearAll:"ניקוי הכל",
    previewToggle:"תצוגה מקדימה",historyToggle:"חיפושים אחרונים",
    queryPreview:"תצוגה מקדימה",chars:"תווים",
    saveSearch:"שמירת חיפוש",googleSearch:"חיפוש דרך Google",
    recentSearches:"חיפושים אחרונים",clearHistory:"ניקוי",noHistory:"חיפושים יופיעו כאן",
    sKeywords:"מילים",sAccounts:"חשבונות",sDates:"תאריכים",
    sEngagement:"מעורבות",sContent:"תוכן",sLanguage:"שפה",sAdvanced:"מתקדם",
    allWords:"כל המילים",exactPhrase:"ביטוי מדויק",anyWords:"אחת מהמילים",
    excludeWords:"החרג מילים",hashtags:"האשטגים",
    fromUser:"מהמשתמש",toUser:"בתגובה ל",mentions:"אזכורים",
    fromDate:"מתאריך",toDate:"עד תאריך",
    minLikes:"לייקים מינימום",minRetweets:"ריטוויטים מינימום",minReplies:"תגובות מינימום",
    language:"שפה",containsUrl:"מכיל URL",
    withLinks:"עם קישורים",withMedia:"עם מדיה",imagesOnly:"תמונות בלבד",
    videosOnly:"וידאו בלבד",noRetweets:"ללא ריטוויטים",
    today:"היום",week:"שבוע",month:"חודש",threeMonths:"3 חודשים",sixMonths:"6 חודשים",year:"שנה",
    settingsTitle:"הגדרות",myAccount:"החשבון שלי",displayMode:"מצב תצוגה",
    darkMode:"מצב כהה",lightMode:"מצב בהיר",
    searchNamePh:"שם לחיפוש…",exportTitle:"ייצוא",exportBtn:"ייצוא היסטוריה כ-CSV",
    shortcutsTitle:"קיצורי מקלדת",showShortcuts:"הצגת קיצורים",
    addHome:"הוספה למסך הבית",installApp:"התקנה כאפליקציה",
    iosHint:"iOS: שתף ← הוסף למסך הבית",androidHint:"Android: תפריט ← הוסף למסך הבית",
    shareTitle:"שיתוף",shareBtn:"שיתוף הכלי",shareQuery:"שיתוף חיפוש נוכחי",
    historySection:"היסטוריה",clearHistoryBtn:"מחיקת כל ההיסטוריה",
    createdBy:"נוצר על ידי",uiLang:"שפת ממשק",
    queryCopied:"שאילתה הועתקה",allCleared:"הכל נוקה",
    searchSaved:"חיפוש נשמר",accountSaved:"חשבון נשמר",
    downloaded:"קובץ הורד",copiedClipboard:"הועתק ללוח",
    historyClearedToast:"היסטוריה נוקתה",addedAsFrom:"נוסף ל-from:",
    darkModeToast:"מצב כהה — הבחירה הנכונה",loaded:"נטען",
    ph_allWords:"קיפוד, כיפה, תות",ph_exactPhrase:"קיפוד עם כיפה",
    ph_anyWords:"קיפוד יודע לסרוג",ph_excludeWords:"אילון מאסק",
    ph_hashtags:"#פידתחבצ #פידחיילים #פידקיפודים",ph_fromUser:"user1, user2",ph_toUser:"username",
    ph_mentionUser:"username",ph_url:"github.com",
    templates:"תבניות",templateWeekly100:"100+ לייקים, שבוע אחרון",
    templateTop1000:"1000+ לייקים",templateTop100:"100+ לייקים",
    emptyState:"בנה את החיפוש שלך",emptyHint:"התחל עם מילים מהסקשן הראשון",
    searchSavedFirst:"החיפוש הראשון שמור!",shareLinkCopied:"קישור הועתק",
    showInTemplates:"הצגה כתבנית",saveAndPin:"שמירה",
    savedListTitle:"חיפושים שמורים",savedListEmpty:"אין חיפושים שמורים",
    toggleTemplateVis:"הצג/הסתר בתבניות",
    scoreTooWide:"רחבה מדי",scoreSomeWide:"קצת רחבה",
    scoreBalanced:"מאוזנת",scoreNarrow:"צרה",scoreTooNarrow:"צרה מדי",
    scoreConflict:"קונפליקט",
    close:"סגירה",deleteEntry:"מחיקת הפריט",
    collapseSection:"כיווץ הקטגוריה",expandSection:"הרחבת הקטגוריה",
    increaseValue:"הגדלת הערך",decreaseValue:"הקטנת הערך",
    confirmHandle:"שמירת שם המשתמש",myAccountFilterTitle:"סינון לפי החשבון שלי ב-from:",
    themeToggleTitle:"החלפת מצב כהה/בהיר",templatesToggleTitle:"תבניות שמורות ומובנות",
    hideBuiltinTitle:"הסתרת התבנית מהרשימה",deleteSavedTitle:"מחיקת החיפוש השמור",
    restoreBuiltinTitle:"שיקום התבנית לרשימה",shortcutsRowTitle:"הצגה/הסתרה של קיצורי המקלדת",
    shareToolTitle:"שיתוף הכלי עם אחרים",
  },
  en:{
    search:"Search",copy:"Copy",clearAll:"Clear all",
    previewToggle:"Query Preview",historyToggle:"Recent Searches",
    queryPreview:"Query Preview",chars:"chars",
    saveSearch:"Save search",googleSearch:"Search on Google",
    recentSearches:"Recent Searches",clearHistory:"Clear all",noHistory:"Searches will appear here",
    sKeywords:"Keywords",sAccounts:"Accounts",sDates:"Dates",
    sEngagement:"Engagement",sContent:"Content Filters",sLanguage:"Language",sAdvanced:"Advanced",
    allWords:"All words",exactPhrase:"Exact phrase",anyWords:"Any of these words",
    excludeWords:"Exclude words",hashtags:"Hashtags",
    fromUser:"From user",toUser:"In reply to",mentions:"Mentions",
    fromDate:"From date",toDate:"To date",
    minLikes:"Min likes",minRetweets:"Min retweets",minReplies:"Min replies",
    language:"Language",containsUrl:"Contains URL",
    withLinks:"With links",withMedia:"With media",imagesOnly:"Images only",
    videosOnly:"Videos only",noRetweets:"No retweets",
    today:"Today",week:"Week",month:"Month",threeMonths:"3 Months",sixMonths:"6 Months",year:"Year",
    settingsTitle:"Settings",myAccount:"My Account",displayMode:"Display Mode",
    darkMode:"Dark Mode",lightMode:"Light Mode",
    searchNamePh:"Search name…",exportTitle:"Export",exportBtn:"Export history as CSV",
    shortcutsTitle:"Keyboard Shortcuts",showShortcuts:"Show shortcuts",
    addHome:"Add to Home Screen",installApp:"Install as app",
    iosHint:'iOS: Share → "Add to Home Screen"',androidHint:'Android: Menu → "Add to Home Screen"',
    shareTitle:"Share",shareBtn:"Share this tool",shareQuery:"Share current search",
    historySection:"History",clearHistoryBtn:"Clear all history",
    createdBy:"Created by",uiLang:"Interface Language",
    queryCopied:"Query copied",allCleared:"All cleared",
    searchSaved:"Search saved",accountSaved:"Account saved",
    downloaded:"File downloaded",copiedClipboard:"Copied to clipboard",
    historyClearedToast:"History cleared",addedAsFrom:"Added to from:",
    darkModeToast:"Welcome to the dark side",loaded:"Loaded",
    ph_allWords:"hedgehog, hat, strawberry",ph_exactPhrase:"hedgehog with a hat",
    ph_anyWords:"hedgehog knows to knit",ph_excludeWords:"elon musk",
    ph_hashtags:"#hedgehog #knitting #hats",ph_fromUser:"user1, user2",ph_toUser:"user",
    ph_mentionUser:"openai anthropic",ph_url:"github.com",
    templates:"Templates",templateWeekly100:"100+ likes, last week",
    templateTop1000:"1000+ likes",templateTop100:"100+ likes",
    emptyState:"Build your search",emptyHint:"Start with keywords in the first section",
    searchSavedFirst:"First search saved!",shareLinkCopied:"Link copied",
    showInTemplates:"Show as template",saveAndPin:"Save",
    savedListTitle:"Saved searches",savedListEmpty:"No saved searches yet",
    toggleTemplateVis:"Toggle template visibility",
    scoreTooWide:"Too wide",scoreSomeWide:"Somewhat wide",
    scoreBalanced:"Balanced",scoreNarrow:"Narrow",scoreTooNarrow:"Too narrow",
    scoreConflict:"Conflict",
    close:"Close",deleteEntry:"Delete entry",
    collapseSection:"Collapse section",expandSection:"Expand section",
    increaseValue:"Increase value",decreaseValue:"Decrease value",
    confirmHandle:"Save username",myAccountFilterTitle:"Filter by my account in from:",
    themeToggleTitle:"Toggle dark/light mode",templatesToggleTitle:"Saved & built-in templates",
    hideBuiltinTitle:"Hide this template from the list",deleteSavedTitle:"Delete saved search",
    restoreBuiltinTitle:"Restore template to the list",shortcutsRowTitle:"Show/hide keyboard shortcuts",
    shareToolTitle:"Share this tool with others",
  },
};

const OPERATOR_TIPS={
  "AND":           {en:"All words must appear in the tweet",              he:"כל המילים חייבות להופיע בציוץ"},
  '"exact"':       {en:"Exact phrase — tweet must contain this sequence", he:"ביטוי מדויק — הציוץ חייב להכיל את הרצף הזה"},
  "OR":            {en:"At least one of these words must appear",         he:"לפחות אחת מהמילים חייבת להופיע"},
  "-word":         {en:"Exclude tweets containing this word",             he:"הסתר ציוצים שמכילים מילה זו"},
  "#tag":          {en:"Tweets containing this hashtag",                  he:"ציוצים שמכילים את ההאשטג הזה"},
  "from:":         {en:"Tweets from this user. Comma = multiple users.",  he:"ציוצים מהמשתמש. פסיק = מספר משתמשים."},
  "to:":           {en:"Tweets in reply to this user",                    he:"ציוצים שהם תגובה למשתמש זה"},
  "@":             {en:"Tweets mentioning this user",                     he:"ציוצים שמאזכרים משתמש זה"},
  "since:":        {en:"Tweets on or after this date",                    he:"ציוצים מתאריך זה ואילך"},
  "until:":        {en:"Tweets before this date",                         he:"ציוצים לפני תאריך זה"},
  "min_faves:":    {en:"Minimum number of likes",                         he:"מינימום לייקים"},
  "min_retweets:": {en:"Minimum retweet count",                           he:"מינימום ריטוויטים"},
  "min_replies:":  {en:"Minimum reply count",                             he:"מינימום תגובות"},
  "filter:links":  {en:"Only tweets with URLs",                           he:"רק ציוצים עם קישורים"},
  "filter:media":  {en:"Only tweets with any media",                      he:"רק ציוצים עם מדיה"},
  "filter:images": {en:"Only tweets with images",                         he:"רק ציוצים עם תמונות"},
  "filter:videos": {en:"Only tweets with videos",                         he:"רק ציוצים עם סרטונים"},
  "-filter:retweets":{en:"Exclude all retweets",                          he:"הסתר ריטוויטים"},
  "lang:":         {en:"Tweets written in this language",                 he:"ציוצים שנכתבו בשפה זו"},
  "url:":          {en:"Tweets containing a specific URL",                he:"ציוצים שמכילים כתובת URL"},
};


const BUILTIN_TEMPLATES={
  weekly100:{allWords:"",exactPhrase:"",anyWords:"",noneWords:"",hashtags:"",fromUser:"",toUser:"",mentionUser:"",sinceDate:"",untilDate:"",minFaves:"100",minRetweets:"",minReplies:"",filterLinks:false,filterMedia:false,filterImages:false,filterVideos:false,noRetweets:true,lang:"",url:""},
  top1000:{allWords:"",exactPhrase:"",anyWords:"",noneWords:"",hashtags:"",fromUser:"",toUser:"",mentionUser:"",sinceDate:"",untilDate:"",minFaves:"1000",minRetweets:"",minReplies:"",filterLinks:false,filterMedia:false,filterImages:false,filterVideos:false,noRetweets:true,lang:"",url:""},
  top100:{allWords:"",exactPhrase:"",anyWords:"",noneWords:"",hashtags:"",fromUser:"",toUser:"",mentionUser:"",sinceDate:"",untilDate:"",minFaves:"100",minRetweets:"",minReplies:"",filterLinks:false,filterMedia:false,filterImages:false,filterVideos:false,noRetweets:true,lang:"",url:""},
};

const T={
  dark:{bg:"#03030f",sectionBg:"#0d0d1a",inputBg:"#060612",headerBg:"#03030fee",drawerBg:"#080815",label:"#ddeaf8",placeholder:"#1e3450",text:"#f4f8ff",hint:"#4d7090",accent:"#00d4ff",border:"#1e3450",borderFocus:"#00d4ff66",sectionBorder:"#ffffff12",sectionBorderActive:"#00d4ff30",muted:"#7aaccc",dim:"#4a7090",vdim:"#1e3450",divider:"#ffffff0a",badgeBg:"#00d4ff",badgeFg:"#03030f",toastBg:"#0d1f33",toastBorder:"#00d4ff44",toastText:"#e8f4ff",pmBtn:"#0d1f33",pmBtnBorder:"#1e3450",dropBg:"#0d1f33",tooltipBg:"#0d1f33",tooltipBorder:"#00d4ff33"},
  light:{bg:"#f0f4f8",sectionBg:"#ffffff",inputBg:"#f8fafc",headerBg:"#ffffffee",drawerBg:"#f8fafc",label:"#1e293b",placeholder:"#94a3b8",text:"#0f172a",hint:"#94a3b8",accent:"#0369a1",border:"#e2e8f0",borderFocus:"#0369a155",sectionBorder:"#e2e8f0",sectionBorderActive:"#0369a133",muted:"#64748b",dim:"#94a3b8",vdim:"#cbd5e1",divider:"#f1f5f9",badgeBg:"#0369a1",badgeFg:"#ffffff",toastBg:"#1e293b",toastBorder:"#00d4ff33",toastText:"#f0f6ff",pmBtn:"#f1f5f9",pmBtnBorder:"#e2e8f0",dropBg:"#ffffff",tooltipBg:"#1e293b",tooltipBorder:"#0369a133"},
};

const LANGS_LIST=[
  ["","כל השפות | All"],["he","עברית"],["en","English"],["ar","العربية"],["fr","Français"],
  ["de","Deutsch"],["es","Español"],["pt","Português"],["ru","Русский"],["ja","日本語"],
  ["zh","中文"],["ko","한국어"],["tr","Türkçe"],["it","Italiano"],["nl","Nederlands"],
  ["pl","Polski"],["uk","Українська"],["hi","हिंदी"],
];

const CONTENT_FILTERS=[
  {key:"filterLinks",tKey:"withLinks",op:"filter:links"},
  {key:"filterMedia",tKey:"withMedia",op:"filter:media"},
  {key:"filterImages",tKey:"imagesOnly",op:"filter:images"},
  {key:"filterVideos",tKey:"videosOnly",op:"filter:videos"},
  {key:"noRetweets",tKey:"noRetweets",op:"-filter:retweets"},
];

const SHORTCUTS=[
  {key:"Ctrl + Enter",he:"חיפוש",en:"Search"},
  {key:"C",he:"העתקת שאילתה",en:"Copy query"},
  {key:"X",he:"ניקוי הכל",en:"Clear all"},
  {key:"S",he:"שמירת חיפוש",en:"Save search"},
  {key:"Ctrl + ,",he:"פתיחת הגדרות",en:"Open settings"},
  {key:"1 – 7",he:"מעבר לקטגוריית מסנן",en:"Jump to filter section"},
  {key:"Esc",he:"סגירת חלון/תפריט פתוח",en:"Close open panel/menu"},
  {key:"?",he:"הצגת קיצורים אלו",en:"Show this list"},
];

const SECTION_FIELDS={
  keywords:  ["allWords","exactPhrase","anyWords","noneWords","hashtags"],
  accounts:  ["fromUser","toUser","mentionUser"],
  dates:     ["sinceDate","untilDate"],
  engagement:["minFaves","minRetweets","minReplies"],
  content:   CONTENT_FILTERS.map(f=>f.key),
  location:  ["lang"],
  advanced:  ["url"],
};
const SECTION_ORDER=Object.keys(SECTION_FIELDS);

const INITIAL={
  allWords:"",exactPhrase:"",anyWords:"",noneWords:"",hashtags:"",
  fromUser:"",toUser:"",mentionUser:"",sinceDate:"",untilDate:"",
  minFaves:"",minRetweets:"",minReplies:"",
  filterLinks:false,filterMedia:false,filterImages:false,filterVideos:false,
  noRetweets:false,lang:"",url:"",
};

const ls=(k,fb)=>{try{const v=localStorage.getItem(k);return v!==null?JSON.parse(v):fb;}catch{return fb;}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
const detectLang=()=>{
  const langs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||"en"];
  return langs.some(l=>l.toLowerCase().startsWith("he"))?"he":"en";
};
const hasHebrew=s=>/[\u0590-\u05FF]/.test(s);

function dpDate(key){
  const fmt=d=>d.toISOString().split("T")[0];
  const d=new Date();
  if(key==="today"){d.setHours(0,0,0,0);return fmt(d);}
  if(key==="week")  d.setDate(d.getDate()-7);
  if(key==="month") d.setMonth(d.getMonth()-1);
  if(key==="3m")    d.setMonth(d.getMonth()-3);
  if(key==="6m")    d.setMonth(d.getMonth()-6);
  if(key==="year")  d.setFullYear(d.getFullYear()-1);
  return fmt(d);
}

function countActive(state,fields){
  return fields.filter(f=>{const v=state[f];return typeof v==="boolean"?v:v&&String(v).trim();}).length;
}

// Given a template/saved-search payload, returns only the keys it actually changed from
// INITIAL — used to cleanly "undo" a template on toggle-off without touching unrelated fields.
function diffFromInitial(payload){
  const out={};
  Object.keys(payload).forEach(k=>{if(payload[k]!==INITIAL[k])out[k]=INITIAL[k];});
  return out;
}

// Build query — multiple from: users use (from:a OR from:b) syntax which X supports
function buildQuery(s){
  const p=[];
  if(s.allWords.trim()) p.push(s.allWords.trim());
  if(s.exactPhrase.trim()) p.push(`"${s.exactPhrase.trim()}"`);
  if(s.anyWords.trim()){const w=s.anyWords.trim().split(/\s+/);p.push(w.length===1?w[0]:`(${w.join(" OR ")})`);}
  if(s.noneWords.trim()) s.noneWords.trim().split(/\s+/).forEach(w=>p.push(`-${w}`));
  if(s.hashtags.trim()) s.hashtags.trim().split(/[\s,]+/).forEach(h=>p.push(h.startsWith("#")?h:`#${h}`));
  if(s.fromUser.trim()){
    const users=s.fromUser.trim().split(/[\s,]+/).filter(Boolean).map(u=>u.replace(/^@/,""));
    if(users.length===1) p.push(`from:${users[0]}`);
    else if(users.length>1) p.push(`(${users.map(u=>`from:${u}`).join(" OR ")})`);
  }
  if(s.toUser.trim()) p.push(`to:${s.toUser.trim().replace(/^@/,"")}`);
  if(s.mentionUser.trim()) s.mentionUser.trim().split(/[\s,]+/).forEach(u=>p.push(u.startsWith("@")?u:`@${u}`));
  if(s.sinceDate) p.push(`since:${s.sinceDate}`);
  if(s.untilDate) p.push(`until:${s.untilDate}`);
  if(s.minFaves) p.push(`min_faves:${s.minFaves}`);
  if(s.minRetweets) p.push(`min_retweets:${s.minRetweets}`);
  if(s.minReplies) p.push(`min_replies:${s.minReplies}`);
  if(s.filterLinks) p.push("filter:links");
  if(s.filterMedia) p.push("filter:media");
  if(s.filterImages) p.push("filter:images");
  if(s.filterVideos) p.push("filter:videos");
  if(s.noRetweets) p.push("-filter:retweets");
  if(s.lang) p.push(`lang:${s.lang}`);
  if(s.url.trim()) p.push(`url:"${s.url.trim()}"`);
  return p.join(" ");
}

function encodeState(s){try{return btoa(encodeURIComponent(JSON.stringify(s)));}catch{return "";}}
function decodeState(s){try{return JSON.parse(decodeURIComponent(atob(s)));}catch{return null;}}
function formReducer(state,a){
  if(a.type==="SET")return{...state,[a.key]:a.value};
  if(a.type==="RESET")return INITIAL;
  if(a.type==="MERGE")return{...state,...a.payload};
  return state;
}

const APP_LOGO_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAkpElEQVR42t2debAkV3Xmf+fezFre1rt6Vbe6WztCkiWhBSEEWIstkMCDhYTBNsYYbE/YjO2YAEeMbSJsB/bEmJkxngGbGNvIBhuDBAMMmyWMrA20Swi11lYvUndL6u7Xr997teRyz/xxs6qyqrKW15KQwxWR8V5VZmVmfeec7yz33JvC6JcF0tabieUnnOWEK4BLQE5DWYvIJILp/pog/g+9ny/tpV3/6oDPu953Hai53Vp8vGrnSO09h7aP0e5zp6geVWUPovcK+p24Ef8zzM1mJwgy3HTYr5MR+0x2krCy/ITrEd4PXITYcvF5/elExriEjIf5oB2qYwhC8+LSwUIY5zjNC1NzQpLON53uUdEvpMSfojn3TLbDAG6pAmh/qbT8hGuM8odizJkq7YunXsVF/DlGAC/Hqv29QBR/rozW7jZII4TQD3D/8bljNDMNBTUg4j928yj/LYkO/gkQ9bLIKAFk4G+qVpaH/xORX/FX1jQ73GTAd6hmKPDHAvpShKF04VEE/JKFsBQq6tqvqKYKAQiq7m6Lvi+KDu/IKCkZJQADuInVm9enibnJiL1QNU0zwE2/mufBHwN4kWPEXEcIIm8No4WgBaAO9gcjraBPGJmIU5QAdFZFr0+bh79TJATpA39iyzpXkltEzOmqaYyYsAhAaTPPCOAHgC6Ft6AjXECBILT/fTclFQmhyDF3HzecioZaQW4/KYoFjZX0nWl05Gu9dCRdDnfTplJ5wX7PiD1fNU0QE/QDmY9uZGzghd7jxw1+tID+hwmigJIGCWEIzRybQ+6ygta5nP/FGuH0siSZvT0vBJPT/rS0YD+ZgR8fM/gifZbirSWzmMKwtGBH+2Pv62XINXJxQE8kJv3KkP8tMoALRAZbed+xxeYtfT5Vyoh8qVpduTELcExrpwXS0ootV1kxv6zqEkSKaUfGAD8PfBfo0r/l90v+AtIvGKEtCCkURM//Q4XQi5QMoUspPrZ9H4P3585pQRNE1saJ/k1mS60dwOmnl8Kj0VcQsyoXXnaJsk8bem9cJKe4vRop/co+COxeoRSeo8AiBoS8xUKQAjYsBG5wIDeKRvst3YAmYE6ytrrXufr9gDWAVvYtXCsmOAVVh4gZrSnFWtNFNb2cL0PohiG0NEQQxUIooKNBGj2KikZwy3DL6bm/Nh2pU/SPYcUywBlAVOVXe+OJfq4cB/weoPo0nS4tHr71nqtYsCJjCEEGBAAyFn0UACnF8hjoMyRnBTgw64LA/RKgJlyx6QwRLkCdIGL7DLNPO8YAXygOUdtUJQxi+y5KkAKN67Om8SxBigAepPgvC+UM/Mz42Ek+CJSMdcFPIzZEcqmyDDbXQjMr1LZuzu4FvQNwzzbsuF7ryl1zoCUwoiIy6reKLN0ZD5eBAUXEnGbtskuMr2rqEG6UMcK0AebXA2gxxRTRf+c4Mabn+zlrtiaz6kFUMYRmCoQ0LFGXpWn5KEH64pwx1xiE03LxanGuJAN4cQT4fVpcGPsP2VSh2QAbtM/XPleawuIiRI1ix1wYGY2INAc625f9lZ1dX29QPa7/qrIEzhsMPr1a2xvZDNtUISzhtp+GzM+BSzvnVQVraf7Rn5P8h59HFo+CydyXNYgNwJhi+hiLXhjhjAc57bEtJPu2bDOITI7WhCE3UmDyUsjFA5IyMR68NpUIWIvU5omvfAf1f7iJxkc/DhNT4BwEIWZxnvhD/5n0F68hufZ96NR0JiADtQXkyGFYnIck8d/pAVaGKJQsxfH2GUxxtCSDxbLM9I9kjVG0HBIZySDuHeScXYo06kgSd6xFAROQXvRmCAOSa9+NW7Me4tjvLFVwrzkbXnS449aj64/3lNRskP7k1US/9fskv/Rhmv/rC1CdaFvPUO0dF21ZkkRGfckGg29ERpsh48bX/XmEd0UOJqZwazcgc7PI7EEQi6qi1Sq6Zi00FKIYnZnxsmk2cVu2kZ50GjQFJsroitXI7qeRJCZ545Wk770Gjniv5jZtwTz6EAQTIGl/qVV6y68C0hrp0s4BIgVFwKUyf+scnYuaY4hjBwbPMgb47SKCtcjiAtHPvJfaP9xE7X9/EV21BtLEG0epDJUJSAWmSqSXXOH3xTHpaWfB8jLECQSgk5OQpmi5Qumzn0R2zUMzhcU0o6Asamr5BRt0h61LUvIRflKW5ovN0gaJRzmzYeQq3RFKtunaDT4eWLsat2EzEjc9UEgGmB/US886H52chjTBnXomrXTGlxOzKClqklz1LnT1NGCRes37gzCE+iLU6xBFyOFDkCaZ31laMiUvDfHC4cchgypDAC66sYExNwW+IXs7ewicgijRr/wOWq54YNVBEvs7jMAdvxU9bj2guK0nZaPS4iNq55BmA7flROKffS/UHJRBDuzz51fFnXom7vSz0Y2biT/8EXT1cd6niCwdRBmmnrIkqwiWJM1jTNEF8ZGOEU8JLR40BrPnaf9/LSY9/7XEb7uO0j/9DTo5BfVaNlKRwLIybuNmzO6nvdUkeAtJQaImNBskV18Hq6twsAlTZcyTP0IWF9DJKaLf/wS6dSty6Ah6xmrMjh2YvbvQ0rKcb+jh/Zcc6utQV4PST0HjW9ZS6uKKLBxFZg97rTMW1KGlEuapx2A+gcBCXYne/QHc6uM69GEyZ10C3bgFrU6gy1dmFmAgATl8EF2zluSKt0Od7Pxg7rsLggAW57H33glTAbpqNeyOkP17ISyNAFpeolWMS0GylPPLkqzDy8ISX/l2og/9Bm7TVmjWPUilCvbZXZjdz0DVQC1Bt60jueLtyNws5uDzfsQiiz7c2vXo5BRaqXrqsQL1OubAs6QXXIqesA4aKZQCOFjD/vA+iCLc2ReS/vTb4GgCJYd5+nFk5xNQrnj6exkBXeo5zGhqK4iTx05QBJIEnVlG46N/SvOjv03zN38XSTN+L4XI4gLB3bdBmI2nRkr8tuvQyWnMrqc7F1TQlWtgYhJC44ELvPbL3BHSt7wVjPqYv6rYh+/D7HwMXb+J6I8/ia5eBYlC2WC/eSNSX2wNh4yP5LF0dYzIM8wrVeVoD2IHATJ7CLvzcXg+Ib3o9dT+61/6IlsUoeUq4e03e8cZhFBX3ClbSc67CPvogx2uV9DJabRU9tdwDkIwu55EK1XScy+GhrQz6uDmr0F9gegjH0e3b4KjMUwEyDMvEHzrpiyicrzaL/NKnrwd79cWCG75OkwGMB+RXnYptT/5tL98GGKe+BH2h4/AROZwAyW54h2YnY8js3UIA0855XIn8slCCPvD+3AnnIhuXOXpp2qRvQex3/gSybUfIL3qcjiSeiFWheDzn0FePDAG//87EIBvYnTo5DThN29Cdh6AyRAORaRvOJ/6H/xZVopoEH7ji57TxUBDSC56MyQJZsfDUM4KuMYgjQbEqaePCOz938e99lwoZcKbEIIbPwvWEv2n/+IzaVWYsJgfPk1w02fR6Rlfuvg38DKv/CUUghA5/CLlv/0LKGch6eGE5Mo30fy1j4JLCW+7GfPEXpiw0EjRTWtwW7YT3PrtTrAcx8iRQ8jiPJQVefZFzI6HfWacAuUA2TdH+Pm/Iv61j6DHr4R66sNfA+Gf/xFmcREJSlkeKMfI66+QAAoNMt94NLba97xJE3RmOeH/+xL21rtgxnqCmk2J3vNuone8B7NnJ6Ubb4BSVusPIT3nIoJ/+QbMNiFMfb3ohQPIvr2w1hDc/FVk4Si64XhoOpi2hH/5CXRqmvi6X4CjWb1llSX4wj8i3/06UaVCtLhA1GyQRBGtzktj7NDyxMvEBy+TBRwjdao1VD7xB8jBo1DxjpWGo/mbHyE++3WEN96AeehxmCpBDOnpZ2H2PkP4tX+ClRb7yAMgQvidr2D/9UeEN94AK1Z5x7zaYO68n/Cf/pr4/R+GmRJECUwFuDsfxHzi96iu28CaDcez8aRT2LD9ZFau20ipUiVqNqjNz5FEkQ8O+gRR0GH3MoEllRVbNZ88tYchi8YBikoNkht0HPDd9s8JQmRulviya2j86X+HWuqpY5nF3nUfE7/6TtLzLqb2FzdAWbD3PEj1t98HM8uJ33g5wb/+MzRqHggHWJDFRZq/9QekP3E2lQ9/ANKU+t99C1YsQ1OlRMqlX/48W4yybPM2yuUyJghQ54ibEYvzcxza9yy7dzzM0w/cw8G9uzBBSFgu49JsfoUOaVks6gntOn7Avuy7Nqiu+FihAPJxb1GrXhHIA2pBbcE5BxOT2EcfAEqkl14ADQdNRU/aiByao/TNmyB2pFe+AbP7eUrf+jIYg334Xu+g21trXNhiHryb4OtfwRx8gfRNP4W75hq0CcYYrt+7k4uPW83Upi2UAosxpg2CDSyVyWlWbzierWeey6kXXMLKDZuYPfAccy8cICiV/L2Po/k6/INBuzMB9Gr5MQpg4P5cJVUVKhMEP7gVXbER97ozYDEBY3BbTia84xaCB+7CPL2f4P67kOf2oGEI5Wp2Kc3aHltlG+8zJLCkiws0Lrsavfh1hAsp1z3/DGfWjrCIQBp3+kxbNCOCqiNJIpKoibGWDdtP4ZQLLsG5lOcefxQRgzHyslBw8YhMrwCORctl2HjAgE62ICS87Z9xa7fhzjkVjsSwfjlmz7PYJ36E3fUkdt8en/mqgnOoOlyqqEvR7D2AsZZmrcbadet53bXvpVyd5tr9uzmtuUgjLBMawViv/cYIRgRp/RVBxCDGZ8Vxs4EYy4nnXMD06rU889A9qHNdljPIBAY21+sSBDDSD4xtBcVC8GfwoSnlCuGt30bLy3HnnQ0lEDNJcPPXiMtVmklMXK/jkhQxQhiWKFcqlKsTlMplAhugAs3aIivXrOX63/k9zly9irMOvshyUaIgJDSCNS3wTQZ4Yftr+3eoKs16nfUnnsqKdZt46t47O/uGTg5cqnVorhytBeUKZfRkOumUb7UFLpJzNNI5xs+fQoOwPSql5QrVT/4xwVM7qP/yh4jjCONSli9bxtpNr2Xtps2sWrue6RUrqExMEoYlxBhUIU0T4qjJ/OwsK49by6rj1lKPmgTlMtYYr/liOl3aGQU6VcQ5T2Wu5WcVFYMaRVUJwoD60TlOPO8iLrn+/fzLDZ+iVJkonqU5Nt5aEAUtP0GXwvUDo6He8d5B/ftBCaxtn0eMIYoi0tlDrDz9LE4670JOPn4z67ZuY2JqGmMt6hTnUlyaeqBaW8uMbYCgqHOEYYgxBmu9xltjENMZjdNMAM450jQliWOcU5I0wTklzT5vbXEUE1Yn+PZn/geP3fFdypNTueiIkVFOZx5f8b5goGIPtYxskLpIw1t/2sfkLtgGXzHGkiQx0WKTjVu3c+7P/zKnvuYsppctQ40hibxjbDva3CCG5H60c444SQiCgCAIEMHzfCYEa6wXQHYOdYqoa/cWVSYmSZIEVagtLuAajS6akuxeXnf1u9j7owdp1hYzfzEixMkJZ5itBAOBpeBvtr+LeXqpqOuYnBBs4MFXxVhDfXGBmRUrueLa93LWxW+kOjFJ1GzSjKPMORqCIOyrrrZi8JYVuMxBdvjdYLLIpfW5sQaT3ZOKoinYQNAk4btfvIFHfnA7y9du4NKfeQ/LVq2mXqu3cxtjDHEUsXztek69+M3c+7UvUp6aRl1+DvYSHbD2ZsIF3NQzs3PIWXRgxqh5oWbaKQK1+XlOO/d83v+7f8iFl1+FEUOzVkOAMNNka21bg9tb+73BWgsCzmm3Q5V890UW7WTHB9ZijIe2XK3ync99hq9+8vc598SNfPw/vptHvvUFFhYWsIHt5mljSKIm28+72IOfJi9bhcAMrf1oAdDDJjT3TnTLuE+D0NuRc0SNBm955/W869d/m5kVK2gsLmCMIQgz0I3FGJsJIAO9vfn3JvvfOdcVlUhvg0B7SpO0LQQgCALmZw/z8O23YMJlnHTKyVx2xRXMv/Ase554lHKlms1Voe2rkjhm+dqNHHfCicRRszOPRZcqiG7MzLA6R39drUgIvdrfc5yxPslSJY4j3vrzH+DN77iOuNnEpQlB5jTbjrMP8OLNGCFJ0kLd0czZ0nbY3rE65zIn7LBBiNgAW53gzz/1f9h08tncfe8DrFy5iiRJ2om7tvTQOWwYsHbbyWhXKVuH/tUR+Jqh7FI4TZMBdZECIUjW56kQNepcef37eN1bfora/NE2LfhKpOnabH7LaX7+cxHJopGWsXkTzEdJLgM7dY4kTUnS1Ec8cUx1coo3vfM9OJdSmz/C/md2cv7lV7P2hO1EjTrGWoKgE00ZY1BVlq/fhLEBfcuG6Nihf48TLnCgnegmHwT1HkPO4Wp2irzDBqzBBJba/DwXXXk1F1x+FbWFOYIgbFOCd5bS5UhNO37PhbDZr3SZSqbOA2szYDTbZ/JxfpYcastPSDZDS6G2MM/5V1zDirUb2fnwfazauJkTf+JCXJoixlBbWGRxsUYURV64ApVJqE7NvIxV4ywM7YoYCyIg1VZ23LuP/qin1VsJiA1o1uts3HYSb/qZ62jUFtt1d0/R3ZlpxxoyAbTid8lFQFmrocQtB+xBV6eoKE4UEZeNWnqFaZ1Hc4mYUyVeXGTr6Wex9YxziKOIZr3G3NxR9u3bT22xllFWS68Ue+QoasssX388R/bvISxXvEIwnt/sPy7vA4bQTPescoast5OnJIEs4rj07e+iVK6gmVZ2JmDTDX57M11+oRUBtWkqq910qMa1kyuXWYb/39NOmngKSjMa8kmWwynUFheZnz1Eo7bIiy8e5InHn2RhfiFL8CxB4P2NDQLP/cZywXt+jTXbTiVpNrJqabH26xjGYboxLJraT48QtEDS9C2GIcbQrNfZdvqZbHvNa2nUa76glW/Qbc0qbtVmeq1BTDsi8sB7AfmmOpM5Soe2Ac/AT10bZA960pXdpmlKmsusjQ2o1evs2rUHEfEhLrQduA1KOOdABGMDbFjizLdeR3lqJvNDMh7laFEilvMB3Ulvjm60VUrI01GPs80LQUBFUIUzLrwEMXbpo0n52am9kzpUsRlVpWmKEwPictm7omoy+uidIdlx0OqUNE0xxnDo4GHSNCUIgsyhewHYsMTB3U/wzD3/gktTtl94GSs3bae6bCXHnfQadt17G6XqJNrqwh4Y/RTTVNALtGb19t5CW78QNNc0pd01IYU0SZhZtZpNJ55C3Gx20vf2QhbSIS3V9uhRV63HKSmuc6S69j5jDGEQ0GxG3hpcLgSlkym3LSufsyo4df78WWgaRVFh8czagH077ufwnid99LRsJWtOOBVUKU/NFCvWiNxA+0oRbdUvqu2MsoR8pVPbNJLEEWs2HM/EzDLSOPIcmufHns1HLtquRnqTV0Q73Wv+c79PRKhUKhydX8hA7NCoZrfqMgF0FQdbyaE61EHqUtQYyuVyQWOf/x0nXng5NvSjYyec+0aSuElQrrDw4oEsIeut/QzR/h7nHHSXjfOBzZhCgHbU0446RFCXsvK4dRhriaMsUhm4OVR9soZzWYIiqOQtjS6nqw4qlTLGGNIkBdvSfR++qhFkkAAyK3Suk6RNz0xTPlgmiiKstVnoKahLqC5bwRlXXAuqJFGTsDLBod1P8sKTjxJkwcW4oafqwGJcd4g5thAA+sJUH29Xp6dzP3oQ8HSBjzGIcxn4ueVxtJtanHNYa5mYqDJ3dB6RoJ2Qiaif+J8LY3vdlstMphU9iQjrN6xj33P7ieM4N2gjpElCGsfYICSsTjC79xke+L9/j3OJt2w3IvQcQklBX2JFh4KGC4GucrOqtMds/X5fpWzF3CaXnbYnYLgWvTh/aiMZgK0cgEIBtIBThempKebnF4iTFGs6/klFECftcLdXC7szZh85BUHA+g3rmZubo7ZYI0390KdYiwBHX9zP/h0PsPu+O0ijCBuGfdqvw4YsC3KEgL5MbIQlUCSwHP9p9h31hTd1WZLUSpa88eMwYFzmPDuRimS0I9o7+ENXdNLyB8YIy2ZmOHj4MARBWwAuP/TYPSDWdY6WNalmDhllZmaG6sQEUbOJU4jjJrf/3ac49MzjpElMEJY9+OoGcvu4lBR0/G8e2JxT7hVCkcCUHkH4HzZ/6AXP1xlYGJftNhjnUAxOXFsAHrz8VmC1LQ7PaW+1WmFycoKF+UWCwPZl14XW31Mz0sy5t6whdSnGWkqlEnf/4+d4/olHKFUnMEHYaQjQUYnX4DXncnlAZq59I110lRU0i44kH3pCoSD8YJPl4LO7aTYamU/IAG/Fi1n5wg+UCKYrOzbZlGEpLnqp4shRkVOmp6ZIk5TFWo0gG28W6WkMy0PSRWWZANT5YcnEt8mYIOCuL3+OnffeSXliCufS4vXqBkU+xflsgRMuFAJ9DhfNkrU+a+hJdFxKEJQ49NweZg/sZ9WGjaRJ3IpR/FEiGPXRimnlH9KhoL42lgE0pDkQp6enUKC2WMuGE6VnTYvukbVuGlJcmuBUCctVGovz/OArf82uh+6lXK7goubAIcfhcf+A+lBHAL1dDSOEkGl4tzW0fENHEMYa6vNH2fnQPazZvIW40UBCwTm/ZpGI71gWJ52Ipyvyke5pxtpDHz1CaGnw5EQVY4TFxRpJnHT5gW48tC0El/koWyojTtnz6IM88K0vc+T55yhVq7h6bTDX6LC4f7Qb6M4D0AxrKeZ5ySORVRcHCELVEZRK7Ljze5xxyWWEpRJp6rLJLr6mo6oYMT01oE5XhgyYtKjtseEcheQ0ObAB01NTNBoNmlFEkiaFP6f1nVaEsu/Rh3jyntt47vFHEIRSdRLXrA+sjRWDP6h+VjwoY204/bFBM9rzzUqFLSZ93+kuR9ggYP7QC5Qnpzn+9LOI6nVfksj3u3aKBx3H2P6/X8s1V/lsR1ddVuBbWFrliiAIsnGG7vCzZUXOpZSqk9z/rZu4+6a/Y+HIYcKwjLEWl8TZ+hSjRr8YfYwOtIB+ivEfaXc/ZyEl9XynyyK84y1VJrj/m19hy2vOZtXGzSTNBjbImrIKop5W8jOwVT+3Mq4WCUnztOKFZUQyQbh2KUPVkcQJ5YlJnnv8ER6767uUp2c8xWYCJI6G8r4OHEcvUvhiCVhbmv4YRS2FvY1Wg6wBBq8MkpWN42ad53c9xYnnvR5rA9JsUoS29L8NIgMB7dXyfF2oHUK2IxnXBr+9L3UdoTglTRNsWGLhyCz/+vlPk0S+qKdZKYSoOXQV9ZdKPSMpqBdIGbrslHQWwmilrz6uzNr8QuZePMDh/c+y/ZwLQXx632n97o9sBgvCtZ2mj9s1VyV1HRrqcc55Z5skCTYIiZt1bv37T3Hk+X0EpXIH/GbDT3fNp+BDnS4jlrxnmACmPjac5wf4hVzrB+r85Os08RdMEq9Bxg/Kq3OEpQoH9+7i0L49nHDmuQSlMkkUZQ47A6wlhF5hoF187zU77wtcWxiu0FpcWxBpEhNWqtQX5vje33+aF/fs9D2fLdqJmgPA74n3h/D++DEQSDixTrt6aYYJoa//00DchFIZPeW16Jbtfo2HZhM58Kyf4XjkMFT8jHRjLY3FedZuO5k3vfdDrN50AlGj1h6O1FwZ2Ih0WUV+HR/Ne/F8/T+n7a2CW8tiWh0Upeokzz/zBHfc+FnmXzxAqTLhnbZLIYoG8HnfqugDjxuXejoCqK7VrmV6B/qCHkEYg0RN9Lj1uKuuRTdvRW2ApAlqfPGKQy9gb/4asuMhP8FCHcZYokad8uQU5171TrafexFJ6mg0GlmPpk/IgiCgUqkwMVFtj//mfb4AaeqyptpsnoB02kfaFpEBH5SrJFGDHXfcwg+/982sJ6mMSxM/az9JBsT644PfTU/j9ap4AXR1Rg8PNWlpfpLAzDLS93wI1qyD5/ZgHroHmT2IVifR089GTzwVkgR74w3IU4+2hSDGkkQNglKFN/zib1CaWo5L4q6m1xbgpVKJlatX+qFC5zsckjhhfn6BqNn0FUvtZNFBGFKpVgjDEEQIwhJJHPHsYw/zyK3f5uDeZyhVqn6yfRz7mTOtdeWWBH6/ILQw8x1RjOvu96HT499XYKPzwBoB0hj3hsthzXrkiUcwX/kczM8hNvDtKT+8F3f523EXXkr6pp8i2PtMZ+02dbgk4aS3XM7kqnU0F49mzU7do1GgNBsNjhw+wooVy3GZAz1yeJa01feTK7ipqm/wbdSZmp7GCOx84PvsvP/7vLD7aUSEcmUCjSOv+e1SsgxxoGOA38f+449/9zRmZRdsW0N/3R8Rn5wsX41uPxUW5zG3fB0W5mFyBtVs9cIkRr73TWTzVnTD8ejmbcjjj0Cl2gb46PP7vNaWKrgk7rS0ZA7fBCG2VKEyNYmtVLFAvFhDxSC4/v75jPPDUpnDzx/g7i//LQuHD2bjx6Ffbau+OLCgNjDUHAX+Enmf4jHh/gJbV20oT0tp7NfsmZ6B3U/Dwee9o03jlnmADaG+AM88BVtO9CtUPZaCeGcZlMs898i9AGw9/41MrlhNEIbte3BJTH3uMHse+gHRwhwza9ZRmV6GCQImV29g5rgNpEmES52PwrJe/sCGaJrw1F23sPjCfiqVCTRN0GZjcARzTM+ieeng5yiI3GA8hdZAq/2wJYVWj0+SdDpYNT8+nAmtFZpmJYhW5qUKJgjZ+9D32f/YQ8ysWUd1+SqCUpk09uDPv3iAqLbQjvFboeHE8pUcf9aFrNl6MtWZ5ZiwhLqUqLbI3P697H3oB8zu3UmpVMbFETqoSjng/bGBzzG9gr6OCAqsIVe/FxTEIEePQL3ml5acnPIUFJY8r0q2NFmawtr1nvuPHO4asGmdO6xUUeeYfW43h/fubN+OGOMnTFerfeDFtRpP3PoNnr7zZkoTk9hskCRu1IjrNcRYbKmctQ0WjZZocYF+kLMd+YyaY5eANcHEx2Tc0LOTvsHCUdiyDTad4EPSxx7uONk0hmYD96734y56C7L7Kcwdt/jISUz3tKf2pOkAG5SwQYgNQkzWnYbL96+4rNfTZJOoDWkcETfrpFETEGyphLS6GoqAH9JS/+MGv+0DNE8v0hvxaLcgWv5AU+T2m3Gbt6HnXASlMnLvHX7xjLCEnvt60p/7IJTKmHtvhxf3wfTyTuShxQMt43Uda3swvDPHt5WMuRFOdojW/5jBB5CgtEoHP4xhiEWIgWYdPeNc3FXvhGUroFH3azeXq1CtojMrIAyRZ3dhbv02csctfinhJYHNmIMcOvRxh0XtadqvBYPBH/XIxGN8WWMnfq/dzdQF8ShBZOsA7d+LPPVYttJV6BdJrS0iu57EfumzyFM70JNfA9tPgUYd2b3Tr2S4xIhh4ID3sBkmQx74OZ7WDwL/ZVurwElQWnkIZGU7bOl7AJsMLTf7elDkHe7EJJQqPrWvLWSXcLjXvxn96Z9FHrobc+MNfklidUuHf4ynrKLDPh8G/BiU8/KCD+i82HDFPSLmPHIPF+utjhZbRN4qpL0SenvwxthOhh1H6MbNyNysX4zV2pfhh4wB+jEB/2MBvxWGPGWAOztTHnsHXnsnXmhXFJkfSmzXU4ztlKg19XItlZDndmcr4Zpj+CHavynF99JdIm0P+oyv9ZobMu2a9fcyaj4ua27YYXDuq9lFTfHiE9p9H62f1AVAHhjXLSg/8OpzhDb4Y26q/edqg9G75b/WA3y+DbsL+AJHq/lx6pfP2Q543SZAyQbLHxQxp2b8YYbmATJo/fBxH9T5Eh5pPiRCGr7e3bHQzSsKPEBsjDnHAJGif5Uh43q1qd+0+7UpbxlapLWj6GToVvzVjpYXUEyftg/Q+CK6eeXBT0FUVb8fx7OPGEBcYv5GnTvQmuVZzLU6gJ76f2yXQHo60AbTSg/FdE201h7Ax7uPPhorAL6PblRfac1v0cCnwS+NbaFRl6A8K8g7skeXGxnR7TAWnbxSy0DqGPMPx30G/SsSXg51vgbc484d/U3A2exOrLrm/WIqFwtykn/qJ6b7+cGDfMIxcvsw4RxTlMTwhfNeXeDz9GPB/YJq9Dh+rWBfXPZ3tnKDtel9iKz1B2N7UrLRTwc6VoG85Ph/GOiD84Mf4ysGCcF9Jk2PfjDDNs2jZIE0CKbeoGpvBvGrW/c9Z2bYc3ZHPQvwpWM+jlD+DYHeBb6q3u3c8kthd5wlvtoLiwVSa6evBnMjflV/bzZDnn428DmLr4gV6IjIctC00VdtpfRM8/XRNI1/EmoHaD/mvIti2rcaqEaPGVP+Ppi3gUxkPqGzPK6MVnN5BfEfu/FJXzXQM4eLAwlU9S7n4rf2gl8kgNYXA9XmU2EYfNU5OU9ENmdw5gQxbvIlS2YkPVYuenU1vXXxbB1GyZ7PqH/l3NzPQXykF/xBAmgJwaZp9IJq87PWlmKQc0GqdLr1XWGtWn7MP/fVBzyfIubWVtaHQT6YpnN/liluH/jjkETuS8tOENFfN0beBbJlTO/IGE9CW4IpvPpPvBj+G7WpKncCf+3ckS94/sd2rOLYvKRkJ8l695atMEYvF+EKVc4TkeOBZUOs6d/ry4EugDyvyg7gNmvlO3F85OHeoGbYSf4/cB+XeD2kj6YAAAAASUVORK5CYII=";

function Toast({message,visible,theme}){
  const c=T[theme];
  const dir=hasHebrew(message)?"rtl":"ltr";
  return(<div style={{position:"fixed",bottom:80,left:"50%",transform:`translateX(-50%) translateY(${visible?0:12}px)`,opacity:visible?1:0,transition:"opacity 0.3s,transform 0.3s",background:c.toastBg,border:`1px solid ${c.toastBorder}`,borderRadius:10,padding:"10px 22px",color:c.toastText,fontSize:13,zIndex:9999,maxWidth:"90vw",textAlign:"center",pointerEvents:"none",boxShadow:"0 8px 32px #00000044",fontFamily:"'Space Mono','Assistant',monospace",direction:dir}}>{message}</div>);
}

function Confetti({active}){
  const p=useMemo(()=>Array.from({length:30},(_,i)=>({id:i,x:Math.random()*100,delay:Math.random()*0.5,color:["#00d4ff","#22c55e","#f59e0b","#ef4444","#a855f7"][Math.floor(Math.random()*5)],size:4+Math.random()*6})),[]);
  if(!active)return null;
  return(<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}}>{p.map(x=>(<div key={x.id} style={{position:"absolute",left:`${x.x}%`,top:"-10px",width:x.size,height:x.size,borderRadius:"50%",background:x.color,animation:`cfFall 1.2s ease-in ${x.delay}s forwards`}}/>))}<style>{`@keyframes cfFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style></div>);
}

function OpTooltip({hint,theme,lang}){
  const c=T[theme];
  const[pos,setPos]=useState(null);
  const iconRef=useRef(null);
  if(!hint)return null;
  const tipObj=OPERATOR_TIPS[hint];
  if(!tipObj)return null;
  const text=lang==="he"?tipObj.he:tipObj.en;
  const isHe=lang==="he";
  const TIP_W=200,MARGIN=10;
  const showTip=()=>{
    if(!iconRef.current)return;
    const r=iconRef.current.getBoundingClientRect();
    const centerX=r.left+r.width/2;
    let top=r.top-82; // above icon
    if(top<MARGIN)top=r.bottom+6; // flip below if no room
    let left=centerX-TIP_W/2;
    left=Math.max(MARGIN,Math.min(left,window.innerWidth-TIP_W-MARGIN));
    setPos({top,left});
  };
  return(
    <span ref={iconRef} style={{position:"relative",display:"inline-flex",alignItems:"center",verticalAlign:"middle"}}
      onMouseEnter={showTip} onMouseLeave={()=>setPos(null)}>
      <Info size={11} color={c.accent+"aa"} style={{cursor:"help",margin:"0 3px",flexShrink:0}}/>
      {pos&&(
        <div style={{
          position:"fixed",top:pos.top,left:pos.left,width:TIP_W,
          background:c.tooltipBg,border:"1px solid "+c.tooltipBorder,
          borderRadius:8,padding:"8px 12px",
          fontSize:11,color:c.label,lineHeight:1.6,
          fontFamily:"'Space Mono','Assistant',monospace",
          boxShadow:"0 6px 20px #00000055",
          whiteSpace:"normal",
          textAlign:isHe?"right":"left",direction:isHe?"rtl":"ltr",
          zIndex:99999,pointerEvents:"none",
        }}>
          {text}
        </div>
      )}
    </span>
  );
}


function ActiveBadge({count,theme,animate}){
  const c=T[theme];const[pop,setPop]=useState(false);
  useEffect(()=>{if(animate){setPop(true);setTimeout(()=>setPop(false),350);}},[animate]);
  if(!count)return null;
  return(<span style={{background:c.badgeBg,color:c.badgeFg,borderRadius:8,padding:"1px 7px",fontSize:9,fontWeight:700,marginRight:6,userSelect:"none",display:"inline-block",transform:pop?"scale(1.35)":"scale(1)",transition:"transform 0.2s cubic-bezier(.34,1.56,.64,1)"}}>{count}</span>);
}

function Section({id,label,Icon,children,open,onToggle,activeCount,theme,lang,onClear,shortcutNum,isDesktop,tr}){
  const c=T[theme];const dir=lang==="he"?"rtl":"ltr";
  const prevCount=useRef(activeCount);const[animate,setAnimate]=useState(false);const sectionRef=useRef(null);
  useEffect(()=>{if(activeCount>prevCount.current){setAnimate(true);setTimeout(()=>setAnimate(false),400);}prevCount.current=activeCount;},[activeCount]);
  const handleToggle=()=>{const opening=!open;onToggle();if(opening)setTimeout(()=>sectionRef.current?.scrollIntoView({behavior:"smooth",block:"nearest"}),50);};
  return(
    <div ref={sectionRef} style={{borderRadius:10,border:`1px solid ${activeCount?c.sectionBorderActive:c.sectionBorder}`,background:c.sectionBg,boxShadow:open?"0 2px 16px #00000022":"none"}}>
      <button onClick={handleToggle} title={open?tr.collapseSection:tr.expandSection} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:"none",border:"none",cursor:"pointer",padding:"12px 16px",direction:dir,userSelect:"none",WebkitUserSelect:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Icon size={14} color={activeCount?c.accent:c.muted}/>
          <span style={{fontFamily:"'Space Mono','Assistant',monospace",fontSize:12,letterSpacing:0.5,color:activeCount?c.label:c.muted}}>{label}</span>
          <ActiveBadge count={activeCount} theme={theme} animate={animate}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {isDesktop&&shortcutNum&&(
            <kbd style={{fontSize:9,color:c.dim,border:`1px solid ${c.border}`,borderRadius:4,padding:"1px 5px",fontFamily:"'JetBrains Mono','Assistant',monospace"}}>{shortcutNum}</kbd>
          )}
          {activeCount>0&&onClear&&(
            <span onClick={e=>{e.stopPropagation();onClear(id);}} style={{fontSize:9,color:c.dim,border:`1px solid ${c.border}`,borderRadius:4,padding:"1px 6px",cursor:"pointer",fontFamily:"'Space Mono','Assistant',monospace",lineHeight:"16px"}}
              onMouseEnter={e=>{e.currentTarget.style.color="#ef4444";e.currentTarget.style.borderColor="#ef4444";}}
              onMouseLeave={e=>{e.currentTarget.style.color=c.dim;e.currentTarget.style.borderColor=c.border;}}>
              {lang==="he"?"ניקוי":"clear"}
            </span>
          )}
          <ChevronDown size={13} color={c.dim} style={{transform:open?"rotate(180deg)":"rotate(0deg)",flexShrink:0,transition:"transform 0.22s"}}/>
        </div>
      </button>
      <div style={{overflow:"hidden",maxHeight:open?"2000px":"0px",opacity:open?1:0,transition:open?"max-height 0.35s cubic-bezier(0,1,0.5,1),opacity 0.25s":"max-height 0.25s ease,opacity 0.15s"}}>
        <div style={{padding:"4px 16px 4px",borderTop:`1px solid ${c.divider}`}}>{children}</div>
        <div style={{display:"flex",justifyContent:"center",padding:"8px 0",borderTop:`1px solid ${c.divider}`}}>
          <button onClick={onToggle} title={tr.collapseSection} style={{background:"none",border:`1px solid ${c.border}`,borderRadius:8,padding:"4px 28px",cursor:"pointer",color:c.dim,display:"flex",alignItems:"center",gap:4,userSelect:"none",WebkitUserSelect:"none"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=c.muted;e.currentTarget.style.color=c.muted;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border;e.currentTarget.style.color=c.dim;}}>
            <ChevronUp size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({label,hint,children,theme,lang,tipKey}){
  const c=T[theme];const dir=lang==="he"?"rtl":"ltr";
  return(<div style={{marginTop:12}}><label style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,color:c.label,marginBottom:5,fontFamily:"'Space Mono','Assistant',monospace",letterSpacing:0.5,direction:dir,userSelect:"none",WebkitUserSelect:"none"}}><span style={{display:"flex",alignItems:"center",gap:3}}>{label}{tipKey&&OPERATOR_TIPS[tipKey]&&<OpTooltip hint={tipKey} theme={theme} lang={lang}/>}</span>{hint&&<span style={{color:c.hint,fontSize:10,direction:"ltr",fontFamily:"'JetBrains Mono','Assistant',monospace",flexShrink:0,whiteSpace:"nowrap"}}>{hint}</span>}</label>{children}</div>);
}


function FieldInput({fieldKey,value,dispatch,placeholder,type="text",fieldHist,onHistSave,theme,lang,openDropKey,setOpenDropKey,style={}}){
  const c=T[theme];const inputRef=useRef(null);
  const opts=(fieldHist[fieldKey]||[]).slice(0,5);const isOpen=openDropKey===fieldKey&&opts.length>0;
  const inputDir=type==="text"&&lang==="he"?"rtl":"ltr";
  const openDrop=()=>{if(!opts.length)return;setOpenDropKey(fieldKey);};
  const base={width:"100%",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:"8px 10px",color:c.text,fontSize:13,fontFamily:"'JetBrains Mono','Assistant',monospace",outline:"none",boxSizing:"border-box",direction:inputDir,textAlign:inputDir==="rtl"?"right":"left",...style};
  return(
    <div style={{position:"relative"}}>
      <input ref={inputRef} type={type} value={value} placeholder={placeholder} style={base}
        onChange={e=>dispatch({type:"SET",key:fieldKey,value:e.target.value})}
        onFocus={e=>{e.target.style.borderColor=c.borderFocus;openDrop();}}
        onBlur={e=>{e.target.style.borderColor=c.border;if(e.target.value.trim())onHistSave(fieldKey,e.target.value.trim());}}
        onClick={openDrop}
      />
      {isOpen&&(
        <div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,background:c.dropBg,border:`1px solid ${c.borderFocus}`,borderRadius:6,boxShadow:"0 6px 20px #00000044",overflow:"hidden",zIndex:9000}}>
          {opts.map((v,i)=>(
            <div key={i} onMouseDown={e=>{e.preventDefault();dispatch({type:"SET",key:fieldKey,value:v});setOpenDropKey(null);}}
              style={{padding:"7px 10px",cursor:"pointer",fontSize:12,color:c.text,fontFamily:"'JetBrains Mono','Assistant',monospace",direction:"ltr",borderBottom:i<opts.length-1?`1px solid ${c.divider}`:"none"}}
              onMouseEnter={e=>e.currentTarget.style.background=c.accent+"18"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              {v}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Engagement stepper — tooltip uses React portal to escape ALL overflow/stacking contexts
function EngagementField({fieldKey,value,dispatch,label,Icon,theme,lang,step=1,fieldHist,onHistSave,openDropKey,setOpenDropKey,tipKey}){
  const c=T[theme];
  const inputRef=useRef(null);const timeoutRef=useRef(null);
  const didStartRef=useRef(false);const isLongRef=useRef(false);const pressDirRef=useRef(0);
  const speedRef=useRef(150);const valueRef=useRef(value);const lastTouchEnd=useRef(0);
  const[pressing,setPressing]=useState(false);const[tipPos,setTipPos]=useState({x:0,y:0});
  useEffect(()=>{valueRef.current=value;},[value]);
  useEffect(()=>()=>{clearTimeout(timeoutRef.current);},[]);
  const doStep=dir=>{const n=parseInt(valueRef.current)||0;const next=dir>0?n+step:Math.max(0,n-step);dispatch({type:"SET",key:fieldKey,value:next===0?"":String(next)});};
  const tick=dir=>{doStep(dir);speedRef.current=Math.max(40,speedRef.current-12);timeoutRef.current=setTimeout(()=>tick(dir),speedRef.current);};
  const startPress=dir=>{if(didStartRef.current)return;didStartRef.current=true;pressDirRef.current=dir;isLongRef.current=false;speedRef.current=150;if(inputRef.current){const r=inputRef.current.getBoundingClientRect();setTipPos({x:r.left+r.width/2,y:r.top});}setPressing(true);timeoutRef.current=setTimeout(()=>{isLongRef.current=true;tick(dir);},380);};
  const stopPress=()=>{if(!didStartRef.current)return;const wasLong=isLongRef.current;didStartRef.current=false;isLongRef.current=false;clearTimeout(timeoutRef.current);setPressing(false);if(!wasLong)doStep(pressDirRef.current);};
  const handleTouchStart=(e,dir)=>{e.preventDefault();startPress(dir);};
  const handleTouchEnd=()=>{lastTouchEnd.current=Date.now();stopPress();};
  const handleMouseDown=(dir)=>{if(Date.now()-lastTouchEnd.current<400)return;startPress(dir);};
  const opts=(fieldHist[fieldKey]||[]).slice(0,5);const isOpen=openDropKey===fieldKey&&opts.length>0;
  const openDrop=()=>{if(!opts.length)return;setOpenDropKey(fieldKey);};
  const pm={width:28,height:28,borderRadius:6,border:`1px solid ${c.pmBtnBorder}`,background:c.pmBtn,color:c.muted,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,userSelect:"none",WebkitUserSelect:"none",touchAction:"none"};
  const dir=lang==="he"?"rtl":"ltr";
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${c.divider}`,direction:dir}}>
      <Icon size={15} color={value?c.accent:c.dim} style={{flexShrink:0}}/>
      <span style={{flex:1,fontSize:11,color:c.label,fontFamily:"'Space Mono','Assistant',monospace",userSelect:"none",WebkitUserSelect:"none",display:"flex",alignItems:"center",gap:3}}>{label}{tipKey&&OPERATOR_TIPS[tipKey]&&<OpTooltip hint={tipKey} theme={theme} lang={lang}/>}</span>
      <div style={{display:"flex",alignItems:"center",gap:5}}>
        <button title={`${lang==="he"?"הקטנה":"Decrease"} (-${step})`} style={pm} onMouseDown={()=>handleMouseDown(-1)} onMouseUp={stopPress} onMouseLeave={e=>{stopPress();e.currentTarget.style.borderColor=c.pmBtnBorder;e.currentTarget.style.color=c.muted;}} onTouchStart={e=>handleTouchStart(e,-1)} onTouchEnd={handleTouchEnd} onMouseEnter={e=>{e.currentTarget.style.borderColor=c.accent;e.currentTarget.style.color=c.accent;}}>−</button>
        <div style={{position:"relative"}}>
          <input ref={inputRef} type="number" value={value} placeholder="—" style={{width:60,background:c.inputBg,border:`1px solid ${value?c.borderFocus:c.border}`,borderRadius:6,padding:"5px 6px",color:c.text,fontSize:12,fontFamily:"'JetBrains Mono','Assistant',monospace",outline:"none",direction:"ltr",textAlign:"center"}} onChange={e=>dispatch({type:"SET",key:fieldKey,value:e.target.value})} onFocus={e=>{e.target.style.borderColor=c.borderFocus;openDrop();}} onBlur={e=>{e.target.style.borderColor=value?c.borderFocus:c.border;if(e.target.value.trim())onHistSave(fieldKey,e.target.value.trim());}} onClick={openDrop}/>
          {isOpen&&(<div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,background:c.dropBg,border:`1px solid ${c.borderFocus}`,borderRadius:6,boxShadow:"0 6px 20px #00000044",overflow:"hidden",zIndex:9000}}>{opts.map((v,i)=>(<div key={i} onMouseDown={e=>{e.preventDefault();dispatch({type:"SET",key:fieldKey,value:v});setOpenDropKey(null);}} style={{padding:"6px 10px",cursor:"pointer",fontSize:11,color:c.text,fontFamily:"'JetBrains Mono','Assistant',monospace",direction:"ltr",borderBottom:i<opts.length-1?`1px solid ${c.divider}`:"none"}} onMouseEnter={e=>e.currentTarget.style.background=c.accent+"18"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{v}</div>))}</div>)}
        </div>
        <button title={`${lang==="he"?"הגדלה":"Increase"} (+${step})`} style={pm} onMouseDown={()=>handleMouseDown(1)} onMouseUp={stopPress} onMouseLeave={e=>{stopPress();e.currentTarget.style.borderColor=c.pmBtnBorder;e.currentTarget.style.color=c.muted;}} onTouchStart={e=>handleTouchStart(e,1)} onTouchEnd={handleTouchEnd} onMouseEnter={e=>{e.currentTarget.style.borderColor=c.accent;e.currentTarget.style.color=c.accent;}}>+</button>
      </div>
      {/* Tooltip fixed-positioned at viewport level — position:fixed escapes overflow:hidden */}
      {pressing&&(
        <div style={{position:"fixed",left:tipPos.x,top:tipPos.y-44,transform:"translateX(-50%)",background:c.accent,color:c.bg,borderRadius:6,padding:"3px 12px",fontSize:14,fontWeight:700,fontFamily:"'JetBrains Mono','Assistant',monospace",pointerEvents:"none",zIndex:99999,whiteSpace:"nowrap",boxShadow:"0 2px 10px #00000055",minWidth:40,textAlign:"center"}}>
          {value||"0"}
          <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:`5px solid ${c.accent}`}}/>
        </div>
      )}
    </div>
  );
}

// Toggle — entire row is clickable, not just the switch
function Toggle({fieldKey,checked,dispatch,label,operator,theme,lang}){
  const c=T[theme];const dir=lang==="he"?"rtl":"ltr";
  return(
    <div onClick={()=>dispatch({type:"SET",key:fieldKey,value:!checked})} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",padding:"7px 6px",borderRadius:6,direction:dir,userSelect:"none",WebkitUserSelect:"none"}}
      onMouseEnter={e=>e.currentTarget.style.background=c.inputBg+"88"}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:12,color:checked?c.label:c.muted,fontFamily:"'Space Mono','Assistant',monospace",lineHeight:1.3,display:"flex",alignItems:"center",gap:3}}>{label}{OPERATOR_TIPS[operator]&&<OpTooltip hint={operator} theme={theme} lang={lang}/>}</div>
        <div style={{fontSize:9,color:c.dim,fontFamily:"'JetBrains Mono','Assistant',monospace",direction:"ltr",marginTop:2}}>{operator}</div>
      </div>
      <div style={{width:36,height:20,borderRadius:10,flexShrink:0,background:checked?c.accent+"33":c.inputBg,border:`1px solid ${checked?c.accent:c.border}`,position:"relative",transition:"background 0.2s,border-color 0.2s",pointerEvents:"none"}}>
        <div style={{position:"absolute",top:2,left:checked?16:2,width:14,height:14,borderRadius:"50%",background:checked?c.accent:c.dim,transition:"left 0.2s,background 0.2s"}}/>
      </div>
    </div>
  );
}

// Template/preset button — active state = filled accent, same as username button
function TemplateBtn({label,active,onClick,theme}){
  const c=T[theme];
  return(<button onClick={onClick} style={{background:active?c.accent+"22":c.inputBg,border:`1px solid ${active?c.accent:c.border}`,borderRadius:6,padding:"4px 12px",color:active?c.accent:c.muted,fontSize:10,cursor:"pointer",fontFamily:"'Space Mono','Assistant',monospace",userSelect:"none",WebkitUserSelect:"none"}} onMouseEnter={e=>{if(!active){e.currentTarget.style.borderColor=c.muted;e.currentTarget.style.color=c.label;}}} onMouseLeave={e=>{if(!active){e.currentTarget.style.borderColor=c.border;e.currentTarget.style.color=c.muted;}}}>{label}</button>);
}

function HeaderBtn({onClick,disabled,title,theme,active,done,children,className}){
  const c=T[theme];const isOn=done||active;
  return(<button className={className} onClick={onClick} disabled={disabled} title={title} style={{display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,borderRadius:8,background:isOn?c.accent+"22":"none",border:`1px solid ${isOn?c.accent:disabled?c.vdim:c.border}`,color:isOn?c.accent:disabled?c.vdim:c.muted,cursor:disabled?"not-allowed":"pointer",userSelect:"none",WebkitUserSelect:"none"}} onMouseEnter={e=>{if(!disabled&&!isOn){e.currentTarget.style.borderColor=c.label;e.currentTarget.style.color=c.label;}}} onMouseLeave={e=>{e.currentTarget.style.borderColor=isOn?c.accent:disabled?c.vdim:c.border;e.currentTarget.style.color=isOn?c.accent:disabled?c.vdim:c.muted;}}>{children}</button>);
}

function SavePopover({theme,lang,tr,onSave,onClose,anchorRef}){
  const c=T[theme];const[name,setName]=useState("");const[pin,setPin]=useState(true);const[pos,setPos]=useState({top:0,left:0});const dir=lang==="he"?"rtl":"ltr";
  useEffect(()=>{if(anchorRef?.current){const r=anchorRef.current.getBoundingClientRect();setPos({top:r.bottom+6,left:Math.max(8,r.right-220)});}},[]);
  useEffect(()=>{const h=e=>{if(!e.target.closest("[data-save-pop]"))onClose();};setTimeout(()=>document.addEventListener("mousedown",h),0);return()=>document.removeEventListener("mousedown",h);},[onClose]);
  return(<div data-save-pop="true" style={{position:"fixed",top:pos.top,left:pos.left,width:220,background:c.drawerBg,border:`1px solid ${c.sectionBorderActive}`,borderRadius:10,padding:"12px",zIndex:9000,boxShadow:"0 8px 32px #00000055",direction:dir}}><div style={{fontSize:9,color:c.dim,fontFamily:"'Space Mono','Assistant',monospace",letterSpacing:1.5,marginBottom:8,textTransform:"uppercase"}}>{tr.saveSearch}</div><input autoFocus value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")onSave(name,pin);if(e.key==="Escape")onClose();}} placeholder={tr.searchNamePh} style={{width:"100%",background:c.inputBg,border:`1px solid ${c.borderFocus}`,borderRadius:6,padding:"7px 10px",color:c.text,fontSize:12,fontFamily:"'JetBrains Mono','Assistant',monospace",outline:"none",direction:dir,boxSizing:"border-box",marginBottom:10}}/><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:10,color:c.label,fontFamily:"'Space Mono','Assistant',monospace"}}>{tr.showInTemplates}</span><div onClick={()=>setPin(p=>!p)} style={{width:32,height:18,borderRadius:9,background:pin?c.accent+"33":c.inputBg,border:`1px solid ${pin?c.accent:c.border}`,position:"relative",cursor:"pointer",flexShrink:0}}><div style={{position:"absolute",top:1,left:pin?13:1,width:14,height:14,borderRadius:"50%",background:pin?c.accent:c.dim,transition:"left 0.2s,background 0.2s"}}/></div></div><div style={{display:"flex",gap:6}}><button onClick={()=>onSave(name,pin)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,background:c.accent+"22",border:`1px solid ${c.accent}`,borderRadius:6,padding:"7px",cursor:"pointer",color:c.accent,fontSize:11,fontFamily:"'Space Mono','Assistant',monospace",userSelect:"none"}}><Check size={12}/> {tr.saveAndPin}</button><button onClick={onClose} title={tr.close} style={{width:32,display:"flex",alignItems:"center",justifyContent:"center",background:"none",border:`1px solid ${c.border}`,borderRadius:6,cursor:"pointer",color:c.dim}}><X size={12}/></button></div></div>);
}

function PreviewPanel({query,isEmpty,history,theme,lang,tr,isRTL,isDesktop,top,onSearchHistory,onDeleteHistory,onClearHistory,form,onShowToast}){
  const c=T[theme];const[open,setOpen]=useState(false);const dir=lang==="he"?"rtl":"ltr";
  const short=query.length>55?query.slice(0,52)+"…":query;const showPreview=!isEmpty;
  const handleShareQuery=()=>{const encoded=encodeState(form);const url=`${window.location.origin}${window.location.pathname}?q=${encoded}`;navigator.clipboard.writeText(url);onShowToast(tr.shareLinkCopied);};
  const handleCopyQuery=()=>{if(isEmpty)return;navigator.clipboard.writeText(query);onShowToast(tr.queryCopied);};

  // Hide bar when scrolling down, reveal when scrolling up — mobile only; desktop bar is
  // always pinned in place since there's room for it to stay visible permanently.
  const [barVisible, setBarVisible] = useState(true);
  const lastY = useRef(0);
  useEffect(()=>{
    if(isDesktop)return;
    const h=()=>{
      if(open)return; // never hide while panel is expanded
      const y=window.scrollY;
      if(y<80){setBarVisible(true);} // always show near top
      else if(y>lastY.current+8){setBarVisible(false);} // scrolling down → hide
      else if(y<lastY.current-4){setBarVisible(true);}  // scrolling up → show
      lastY.current=y;
    };
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[open,isDesktop]);

  // Desktop history popover — closes on outside click or Escape
  const[historyOpen,setHistoryOpen]=useState(false);
  useEffect(()=>{
    if(!historyOpen)return;
    const onDown=e=>{if(!e.target.closest("[data-history-pop]"))setHistoryOpen(false);};
    const onKey=e=>{if(e.key==="Escape")setHistoryOpen(false);};
    document.addEventListener("mousedown",onDown);
    document.addEventListener("keydown",onKey);
    return()=>{document.removeEventListener("mousedown",onDown);document.removeEventListener("keydown",onKey);};
  },[historyOpen]);

  if(isDesktop){
    return(
      <div style={{position:"sticky",top,zIndex:89,background:c.headerBg,backdropFilter:"blur(12px)",borderBottom:`1px solid ${c.divider}`}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"10px 20px",display:"flex",alignItems:"center",gap:12,direction:"ltr"}}>
          <span style={{fontSize:10,color:c.dim,fontFamily:"'Space Mono','Assistant',monospace",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5,flexShrink:0}}><Link size={11}/> {tr.queryPreview}</span>
          <div onClick={handleCopyQuery} title={isEmpty?undefined:tr.copy} style={{flex:1,minWidth:0,background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:7,padding:"7px 12px",fontFamily:"'JetBrains Mono','Assistant',monospace",fontSize:12,color:isEmpty?c.vdim:c.accent,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:isEmpty?"default":"pointer"}}>
            {isEmpty?tr.emptyState:query}
          </div>
          <span style={{fontSize:9,color:c.dim,flexShrink:0}}>{query.length} {tr.chars}</span>
          <button onClick={handleShareQuery} disabled={isEmpty} title={tr.shareQuery} style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:7,background:"none",border:`1px solid ${isEmpty?c.vdim:c.border}`,color:isEmpty?c.vdim:c.muted,cursor:isEmpty?"not-allowed":"pointer",flexShrink:0}}
            onMouseEnter={e=>{if(!isEmpty){e.currentTarget.style.borderColor=c.accent;e.currentTarget.style.color=c.accent;}}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=isEmpty?c.vdim:c.border;e.currentTarget.style.color=isEmpty?c.vdim:c.muted;}}><Link size={13}/></button>
          <div data-history-pop="true" style={{position:"relative",flexShrink:0}}>
            <button onClick={()=>setHistoryOpen(o=>!o)} title={tr.historyToggle} style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:7,background:historyOpen?c.accent+"22":"none",border:`1px solid ${historyOpen?c.accent:c.border}`,color:historyOpen?c.accent:c.muted,cursor:"pointer"}}>
              <ChevronDown size={13} style={{transform:historyOpen?"rotate(180deg)":"none",transition:"transform .2s"}}/>
            </button>
            {historyOpen&&(
              <div style={{position:"absolute",top:"calc(100% + 8px)",[isRTL?"left":"right"]:0,width:320,background:c.dropBg,border:`1px solid ${c.borderFocus}`,borderRadius:10,padding:12,boxShadow:"0 10px 30px #00000055",zIndex:9000,direction:dir}}>
                <div style={{fontSize:10,color:c.dim,letterSpacing:1.5,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>{tr.recentSearches}</span>
                  {history.length>0&&(<button onClick={onClearHistory} style={{background:"none",border:`1px solid ${c.border}`,borderRadius:5,padding:"2px 8px",color:c.muted,cursor:"pointer",fontSize:9,fontFamily:"'Space Mono','Assistant',monospace",userSelect:"none"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#ef4444";e.currentTarget.style.color="#ef4444";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border;e.currentTarget.style.color=c.muted;}}>{tr.clearHistory}</button>)}
                </div>
                <div style={{maxHeight:240,overflowY:"auto"}}>
                  {history.length===0?<p style={{fontSize:11,color:c.vdim,fontFamily:"'JetBrains Mono','Assistant',monospace"}}>{tr.noHistory}</p>:history.map((h,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",borderRadius:6,marginBottom:3,background:c.inputBg,border:`1px solid ${c.border}`,minWidth:0}}>
                      <button onClick={()=>{onSearchHistory(h.query);setHistoryOpen(false);}} style={{flex:1,background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0,minWidth:0,overflow:"hidden",userSelect:"none"}}>
                        <div style={{fontSize:10,color:c.label,fontFamily:"'JetBrains Mono','Assistant',monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",direction:"ltr"}}>{h.query}</div>
                        <div style={{fontSize:9,color:c.dim,direction:"ltr"}}>{h.ts}</div>
                      </button>
                      <button onClick={()=>onDeleteHistory(i)} title={tr.deleteEntry} style={{background:"none",border:"none",color:c.vdim,cursor:"pointer",padding:"2px 3px",flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.color="#ef4444"} onMouseLeave={e=>e.currentTarget.style.color=c.vdim}><X size={11}/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{position:"sticky",top,zIndex:89,background:c.headerBg,backdropFilter:"blur(12px)",borderBottom:`1px solid ${c.divider}`,transform:barVisible?"translateY(0)":"translateY(-110%)",transition:"transform 0.25s cubic-bezier(.4,0,.2,1)"}}>
      <div style={{maxWidth:960,margin:"0 auto",padding:"0 20px"}}>
        <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"6px 0",background:"none",border:"none",cursor:"pointer",direction:"ltr",userSelect:"none",WebkitUserSelect:"none"}}>
          <span style={{order:isRTL?0:1,fontSize:10,color:c.dim,fontFamily:"'Space Mono','Assistant',monospace",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
            {isRTL&&<ChevronDown size={11} color={c.dim} style={{transform:open?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.22s"}}/>}
            {showPreview?tr.previewToggle:tr.historyToggle}
            {!isRTL&&<ChevronDown size={11} color={c.dim} style={{transform:open?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.22s"}}/>}
          </span>
          <span style={{order:isRTL?1:0,flex:1,direction:"ltr",textAlign:"left",fontFamily:"'JetBrains Mono','Assistant',monospace",fontSize:11,color:isEmpty?c.vdim:c.accent,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{showPreview?short:""}</span>
        </button>
      </div>
      <div style={{overflow:"hidden",maxHeight:open?"600px":"0px",opacity:open?1:0,transition:open?"max-height 0.35s cubic-bezier(0,1,0.5,1),opacity 0.25s":"max-height 0.25s ease,opacity 0.15s"}}>
        <div style={{maxWidth:960,margin:"0 auto",padding:"0 20px 16px"}}>
          {showPreview?(
            <div>
              <div style={{fontSize:10,color:c.dim,letterSpacing:1.5,marginBottom:8,display:"flex",justifyContent:"space-between",direction:dir}}><span>{tr.queryPreview}</span><span style={{color:c.accent+"88",direction:"ltr"}}>{query.length} {tr.chars}</span></div>
              <div style={{background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:8,padding:12,fontFamily:"'JetBrains Mono','Assistant',monospace",fontSize:12,color:c.accent,lineHeight:1.7,wordBreak:"break-all",whiteSpace:"pre-wrap",direction:"ltr",marginBottom:10}}>{query}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={handleShareQuery} style={{flex:1,minWidth:100,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"none",border:`1px solid ${c.border}`,borderRadius:6,padding:"7px",color:c.muted,fontSize:10,cursor:"pointer",fontFamily:"'Space Mono','Assistant',monospace",userSelect:"none"}}><Link size={11}/> {tr.shareQuery}</button>
                <button onClick={()=>window.open(`https://www.google.com/search?q=site:x.com+${encodeURIComponent(query)}`,"_blank")} style={{flex:1,minWidth:100,display:"flex",alignItems:"center",justifyContent:"center",background:"none",border:`1px solid ${c.border}`,borderRadius:6,padding:"7px",color:c.muted,fontSize:10,cursor:"pointer",fontFamily:"'Space Mono','Assistant',monospace",userSelect:"none"}}>{tr.googleSearch}</button>
              </div>
            </div>
          ):(
            <div>
              <div style={{fontSize:10,color:c.dim,letterSpacing:1.5,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",direction:dir}}>
                <span>{tr.recentSearches}</span>
                {history.length>0&&(<button onClick={onClearHistory} style={{background:"none",border:`1px solid ${c.border}`,borderRadius:5,padding:"2px 8px",color:c.muted,cursor:"pointer",fontSize:9,fontFamily:"'Space Mono','Assistant',monospace",userSelect:"none"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#ef4444";e.currentTarget.style.color="#ef4444";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border;e.currentTarget.style.color=c.muted;}}>{tr.clearHistory}</button>)}
              </div>
              <div style={{maxHeight:160,overflowY:"auto"}}>
                {history.length===0?<p style={{fontSize:11,color:c.vdim,fontFamily:"'JetBrains Mono','Assistant',monospace"}}>{tr.noHistory}</p>:history.map((h,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",borderRadius:6,marginBottom:3,background:c.inputBg,border:`1px solid ${c.border}`,minWidth:0}}>
                    <button onClick={()=>onSearchHistory(h.query)} style={{flex:1,background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0,minWidth:0,overflow:"hidden",userSelect:"none"}}>
                      <div style={{fontSize:10,color:c.label,fontFamily:"'JetBrains Mono','Assistant',monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",direction:"ltr"}}>{h.query}</div>
                      <div style={{fontSize:9,color:c.dim,direction:"ltr"}}>{h.ts}</div>
                    </button>
                    <button onClick={()=>onDeleteHistory(i)} title={tr.deleteEntry} style={{background:"none",border:"none",color:c.vdim,cursor:"pointer",padding:"2px 3px",flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.color="#ef4444"} onMouseLeave={e=>e.currentTarget.style.color=c.vdim}><X size={11}/></button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{display:"flex",justifyContent:"center",marginTop:12}}>
            <button onClick={()=>setOpen(false)} title={tr.close} style={{background:"none",border:`1px solid ${c.border}`,borderRadius:8,padding:"4px 28px",cursor:"pointer",color:c.dim,display:"flex",alignItems:"center",gap:4,userSelect:"none"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=c.muted;e.currentTarget.style.color=c.muted;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border;e.currentTarget.style.color=c.dim;}}><ChevronUp size={13}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({theme,onThemeChange,myUser,setMyUser,lang,setLang,savedSearches,hiddenBuiltins,onToggleBuiltin,onToggleSavedTemplate,onDeleteSaved,history,onClearHistory,onExport,installPrompt,installed,tr,onClose}){
  const c=T[theme];const dir=lang==="he"?"rtl":"ltr";
  const[myUserEdit,setMyUserEdit]=useState(myUser);
  const[showShortcuts,setShowShortcuts]=useState(false);
  const[savedOpen,setSavedOpen]=useState(false);
  const[confirm,setConfirm]=useState(null); // null | "all" | number (index)
  useEffect(()=>setMyUserEdit(myUser),[myUser]);

  const BUILTINS=[
    {key:"weekly100",label:tr.templateWeekly100},
    {key:"top1000",  label:tr.templateTop1000},
    {key:"top100",   label:tr.templateTop100},
  ];
  const totalTemplates=BUILTINS.length+savedSearches.filter(s=>s.showInTemplates).length;
  const divider=<div style={{height:1,background:c.divider,margin:"12px 0"}}/>;

  // Inline confirm row
  const ConfirmRow=({msg,onOk,onCancel})=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"7px 10px",background:"#ef444411",border:"1px solid #ef444433",borderRadius:7,marginTop:6}}>
      <span style={{fontSize:10,color:"#ef4444",fontFamily:"'Space Mono','Assistant',monospace"}}>{msg}</span>
      <div style={{display:"flex",gap:5}}>
        <button onMouseDown={e=>{e.preventDefault();onOk();}} style={{background:"#ef4444",border:"none",borderRadius:5,padding:"3px 10px",cursor:"pointer",color:"#fff",fontSize:10,fontFamily:"'Space Mono','Assistant',monospace"}}>{lang==="he"?"מחיקה":"Delete"}</button>
        <button onMouseDown={e=>{e.preventDefault();onCancel();}} style={{background:"none",border:`1px solid ${c.border}`,borderRadius:5,padding:"3px 8px",cursor:"pointer",color:c.muted,fontSize:10,fontFamily:"'Space Mono','Assistant',monospace"}}>{lang==="he"?"ביטול":"Cancel"}</button>
      </div>
    </div>
  );

  return(
    <div style={{fontFamily:"'Space Mono','Assistant',monospace",direction:dir}}>
      {onClose&&(<div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${c.divider}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,color:c.label,letterSpacing:1}}>{tr.settingsTitle}</span><button onClick={onClose} title={tr.close} style={{background:"none",border:"none",cursor:"pointer",color:c.muted}}><X size={16}/></button></div>)}
      <div style={{padding:"12px 16px"}}>

        {/* Language */}
        <DSection title={tr.uiLang} theme={theme}><div style={{display:"flex",gap:6}}>{["he","en"].map(l=>(<button key={l} onClick={()=>setLang(l)} style={{flex:1,padding:"8px",border:`1px solid ${lang===l?c.accent:c.border}`,borderRadius:7,background:lang===l?c.accent+"22":"none",color:lang===l?c.accent:c.muted,cursor:"pointer",fontSize:11,fontFamily:"'Space Mono','Assistant',monospace",userSelect:"none"}}>{l==="he"?"עברית":"English"}</button>))}</div></DSection>

        {/* My account */}
        <DSection title={tr.myAccount} theme={theme}><div style={{display:"flex",gap:6}}><input value={myUserEdit} onChange={e=>setMyUserEdit(e.target.value)} placeholder="@yourusername" style={{flex:1,background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:"7px 10px",color:c.text,fontSize:12,fontFamily:"'JetBrains Mono','Assistant',monospace",outline:"none",direction:"ltr"}}/><button onClick={()=>setMyUser(myUserEdit.trim())} title={tr.confirmHandle} style={dBtn(c)}><Check size={13}/></button></div></DSection>

        {divider}

        <div style={{marginBottom:8}}>
          <button onClick={()=>onThemeChange(theme==="dark"?"light":"dark")} title={tr.themeToggleTitle} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:8,padding:"10px 14px",cursor:"pointer",color:c.label,userSelect:"none"}}>
            <span style={{fontSize:12}}>{theme==="dark"?tr.darkMode:tr.lightMode}</span>
            {theme==="dark"?<Moon size={15} color={c.accent}/>:<Sun size={15} color="#f59e0b"/>}
          </button>
        </div>

        <div style={{marginBottom:8}}>
          <button onClick={()=>setSavedOpen(o=>!o)} title={tr.templatesToggleTitle} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:8,padding:"9px 12px",cursor:"pointer",color:c.label,fontSize:11,userSelect:"none",marginBottom:savedOpen?6:0}}>
            <span style={{display:"flex",alignItems:"center",gap:6}}>
              <Star size={12} color={savedOpen?c.accent:c.muted}/>
              <span>{lang==="he"?"תבניות":"Templates"}</span>
              <span style={{fontSize:9,color:c.dim,background:c.sectionBg,border:`1px solid ${c.border}`,borderRadius:4,padding:"1px 5px"}}>{totalTemplates}</span>
            </span>
            <ChevronDown size={12} color={c.dim} style={{transform:savedOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.22s"}}/>
          </button>
          <div style={{overflow:"hidden",maxHeight:savedOpen?"600px":"0px",opacity:savedOpen?1:0,transition:"max-height 0.3s ease,opacity 0.2s ease"}}>
            {/* Built-in templates — hidden ones not shown, can be restored via small link */}
            {BUILTINS.filter(b=>!hiddenBuiltins.includes(b.key)).map(b=>(
              <div key={b.key} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 4px",borderBottom:`1px solid ${c.divider}`}}>
                <div style={{flex:1,fontSize:11,color:c.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.label}</div>
                <span style={{fontSize:8,color:c.dim,border:`1px solid ${c.border}`,borderRadius:3,padding:"1px 5px",flexShrink:0,fontFamily:"'Space Mono','Assistant',monospace"}}>{lang==="he"?"מובנה":"built-in"}</span>
                <button onClick={()=>onToggleBuiltin(b.key)} title={tr.hideBuiltinTitle} style={{background:"none",border:`1px solid ${c.border}`,borderRadius:5,padding:"3px 5px",cursor:"pointer",color:c.dim,display:"flex",alignItems:"center",flexShrink:0}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#ef4444";e.currentTarget.style.color="#ef4444";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border;e.currentTarget.style.color=c.dim;}}>
                  <Trash2 size={11}/>
                </button>
              </div>
            ))}
            {/* Saved templates */}
            {savedSearches.length===0&&BUILTINS.filter(b=>!hiddenBuiltins.includes(b.key)).length===0
              ?<p style={{fontSize:11,color:c.dim,textAlign:"center",padding:"8px 0"}}>{tr.savedListEmpty}</p>
              :savedSearches.map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 4px",borderBottom:`1px solid ${c.divider}`}}>
                  <div style={{flex:1,minWidth:0}}><div style={{fontSize:11,color:c.label,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div></div>
                  <button onClick={()=>onToggleSavedTemplate(i)} title={tr.toggleTemplateVis} style={{background:"none",border:`1px solid ${s.showInTemplates?c.accent:c.border}`,borderRadius:5,padding:"3px 5px",cursor:"pointer",color:s.showInTemplates?c.accent:c.dim,display:"flex",alignItems:"center",flexShrink:0}} onMouseEnter={e=>{e.currentTarget.style.borderColor=c.accent;e.currentTarget.style.color=c.accent;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=s.showInTemplates?c.accent:c.border;e.currentTarget.style.color=s.showInTemplates?c.accent:c.dim;}}>{s.showInTemplates?<ToggleRight size={11}/>:<ToggleLeft size={11}/>}</button>
                  <button onClick={()=>setConfirm(i)} title={tr.deleteSavedTitle} style={{background:"none",border:`1px solid ${c.border}`,borderRadius:5,padding:"3px 5px",cursor:"pointer",color:c.dim,display:"flex",alignItems:"center",flexShrink:0}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#ef4444";e.currentTarget.style.color="#ef4444";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border;e.currentTarget.style.color=c.dim;}}><Trash2 size={11}/></button>
                  {confirm===i&&<ConfirmRow msg={lang==="he"?"למחוק?":"Delete?"} onOk={()=>{onDeleteSaved(i);setConfirm(null);}} onCancel={()=>setConfirm(null)}/>}
                </div>
              ))
            }
            {/* Restore hidden builtins */}
            {hiddenBuiltins.length>0&&(
              <div style={{paddingTop:8,display:"flex",flexWrap:"wrap",gap:6}}>
                {BUILTINS.filter(b=>hiddenBuiltins.includes(b.key)).map(b=>(
                  <button key={b.key} onClick={()=>onToggleBuiltin(b.key)} title={tr.restoreBuiltinTitle} style={{fontSize:9,color:c.dim,border:`1px solid ${c.border}`,borderRadius:4,padding:"2px 8px",background:"none",cursor:"pointer",fontFamily:"'Space Mono','Assistant',monospace"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#22c55e";e.currentTarget.style.color="#22c55e";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border;e.currentTarget.style.color=c.dim;}}>
                    + {b.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{marginBottom:8}}>
          <button onClick={onExport} title={tr.exportTitle} style={{width:"100%",display:"flex",alignItems:"center",gap:8,background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:"9px 12px",cursor:"pointer",color:c.label,fontSize:11,userSelect:"none"}}>
            <Download size={13}/> {tr.exportBtn}
          </button>
        </div>

        <div style={{marginBottom:8}}>
          <button onClick={()=>setShowShortcuts(s=>!s)} title={tr.shortcutsRowTitle} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:"9px 12px",cursor:"pointer",color:c.label,fontSize:11,userSelect:"none"}}>
            <span style={{display:"flex",alignItems:"center",gap:8}}><Keyboard size={13}/> {lang==="he"?"קיצורי מקלדת":"Keyboard Shortcuts"}</span>
            <ChevronDown size={12} color={c.dim} style={{transform:showShortcuts?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.22s"}}/>
          </button>
          <div style={{overflow:"hidden",maxHeight:showShortcuts?"200px":"0px",opacity:showShortcuts?1:0,transition:"max-height 0.25s ease,opacity 0.2s ease"}}>
            <div style={{marginTop:8}}>{SHORTCUTS.map((s,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 4px",borderBottom:`1px solid ${c.divider}`}}><span style={{fontSize:10,color:c.label}}>{lang==="he"?s.he:s.en}</span><code style={{fontSize:10,color:c.accent,direction:"ltr",background:c.inputBg,padding:"2px 6px",borderRadius:4}}>{s.key}</code></div>))}</div>
          </div>
        </div>

        {/* Install — smart: native prompt on Android/Chrome, instructions on iOS */}
        <div style={{marginBottom:8}}>
          {installed?(
            <div style={{display:"flex",alignItems:"center",gap:8,background:c.inputBg,border:`1px solid ${"#22c55e55"}`,borderRadius:8,padding:"10px 12px"}}>
              <Check size={13} color="#22c55e"/>
              <span style={{fontSize:11,color:"#22c55e",fontFamily:"'Space Mono','Assistant',monospace"}}>{lang==="he"?"האפליקציה מותקנת ✓":"App installed ✓"}</span>
            </div>
          ):installPrompt?(
            // Chrome / Android — native install prompt available
            <button onClick={()=>{installPrompt.prompt();installPrompt.userChoice.then(()=>{});}}
              style={{width:"100%",display:"flex",alignItems:"center",gap:8,background:c.accent+"22",border:`1px solid ${c.accent}`,borderRadius:8,padding:"10px 14px",cursor:"pointer",color:c.accent,fontSize:11,userSelect:"none",fontFamily:"'Space Mono','Assistant',monospace"}}>
              <Smartphone size={13}/> {lang==="he"?"התקנה כאפליקציה":"Install as app"}
            </button>
          ):(
            // iOS Safari — manual steps required
            <div style={{background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:8,padding:"10px 12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <Smartphone size={13} color={c.accent}/>
                <span style={{fontSize:11,color:c.label,fontFamily:"'Space Mono','Assistant',monospace"}}>{lang==="he"?"הוספה למסך הבית":"Add to Home Screen"}</span>
              </div>
              {lang==="he"?(
                <div style={{fontSize:10,color:c.muted,lineHeight:2,direction:"rtl"}}>
                  <div><strong style={{color:c.label}}>iOS:</strong> לחיצה על כפתור השיתוף ← <em>"הוספה למסך הבית"</em></div>
                  <div><strong style={{color:c.label}}>Android:</strong> תפריט ⋮ ← <em>"הוספה למסך הבית"</em></div>
                </div>
              ):(
                <div style={{fontSize:10,color:c.muted,lineHeight:2,direction:"ltr"}}>
                  <div><strong style={{color:c.label}}>iOS:</strong> Tap Share → <em>"Add to Home Screen"</em></div>
                  <div><strong style={{color:c.label}}>Android:</strong> Menu ⋮ → <em>"Add to Home Screen"</em></div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{marginBottom:8}}>
          <button onClick={()=>{if(navigator.share)navigator.share({title:"Twitter Search Builder",url:window.location.href});else navigator.clipboard.writeText(window.location.href);}} title={tr.shareToolTitle} style={{width:"100%",display:"flex",alignItems:"center",gap:8,background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:"9px 12px",cursor:"pointer",color:c.label,fontSize:11,userSelect:"none"}}>
            <Share2 size={13}/> {lang==="he"?"שיתוף":"Share"}
          </button>
        </div>

        {/* History — divider above, confirm before delete */}
        {history.length>0&&(<>
          {divider}
          <div style={{marginBottom:8}}>
            {confirm==="all"
              ?<ConfirmRow msg={lang==="he"?"למחוק את כל ההיסטוריה?":"Delete all history?"} onOk={()=>{onClearHistory();setConfirm(null);}} onCancel={()=>setConfirm(null)}/>
              :<button onClick={()=>setConfirm("all")} style={{width:"100%",display:"flex",alignItems:"center",gap:8,background:"#ef444411",border:"1px solid #ef444433",borderRadius:6,padding:"9px 12px",cursor:"pointer",color:"#ef4444",fontSize:11,userSelect:"none"}}>
                <Trash2 size={13}/> {tr.clearHistoryBtn}
              </button>
            }
          </div>
        </>)}

      </div>
      <div style={{padding:"14px 16px",borderTop:`1px solid ${c.divider}`,textAlign:"center"}}><p style={{fontSize:10,color:c.dim,marginBottom:6}}>{tr.createdBy}</p><span onClick={()=>window.open("https://twitter.com/eitanshimoni","_blank","noopener,noreferrer")} style={{color:c.accent,fontSize:12,cursor:"pointer",fontFamily:"'JetBrains Mono','Assistant',monospace",display:"inline-flex",alignItems:"center",gap:6}}><HedgehogIcon size={14} color={c.accent}/>Eitan Shimoni · @eitanshimoni</span></div>
    </div>
  );
}

function Drawer({open,onClose,isRTL,...rest}){
  const c=T[rest.theme];const side=isRTL?"right":"left";const closed=isRTL?"translateX(100%)":"translateX(-100%)";const bs=isRTL?{borderLeft:`1px solid ${c.sectionBorder}`}:{borderRight:`1px solid ${c.sectionBorder}`};
  return(<>{open&&<div onClick={onClose} style={{position:"fixed",inset:0,background:"#00000066",zIndex:150}}/>}<div style={{position:"fixed",top:0,[side]:0,height:"100vh",width:300,background:c.drawerBg,...bs,zIndex:200,overflowY:"auto",transform:open?"translateX(0)":closed,transition:"transform 0.3s cubic-bezier(.4,0,.2,1)"}}><SettingsPanel {...rest} isRTL={isRTL} onClose={onClose}/></div></>);
}

function ShortcutsOverlay({open,onClose,theme,lang,tr}){
  const c=T[theme];const dir=lang==="he"?"rtl":"ltr";
  if(!open)return null;
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"#00000077",zIndex:9500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:c.drawerBg,border:`1px solid ${c.sectionBorderActive}`,borderRadius:14,padding:"18px 20px",width:340,maxWidth:"100%",boxShadow:"0 20px 60px #00000066",direction:dir,fontFamily:"'Space Mono','Assistant',monospace"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <span style={{display:"flex",alignItems:"center",gap:8,color:c.label,fontSize:13}}><Keyboard size={15} color={c.accent}/> {tr.shortcutsTitle}</span>
          <button onClick={onClose} title={lang==="he"?"סגירה":"Close"} style={{background:"none",border:"none",cursor:"pointer",color:c.muted}}><X size={16}/></button>
        </div>
        {SHORTCUTS.map((s,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<SHORTCUTS.length-1?`1px solid ${c.divider}`:"none"}}>
            <span style={{fontSize:11,color:c.label}}>{lang==="he"?s.he:s.en}</span>
            <code style={{fontSize:10,color:c.accent,direction:"ltr",background:c.inputBg,padding:"3px 8px",borderRadius:5,border:`1px solid ${c.border}`}}>{s.key}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

function DSection({title,children,theme}){
  const c=T[theme];
  return(<div style={{marginBottom:16}}><p style={{fontSize:9,color:c.dim,letterSpacing:1.5,marginBottom:8,textTransform:"uppercase",userSelect:"none"}}>{title}</p>{children}</div>);
}

const dBtn=c=>({background:c.accent+"22",border:`1px solid ${c.accent+"55"}`,borderRadius:6,padding:"7px 10px",cursor:"pointer",color:c.accent,display:"flex",alignItems:"center",userSelect:"none",WebkitUserSelect:"none"});

function StickyBottomBar({isEmpty,onSearch,onCopy,theme,tr,copied}){
  const c=T[theme];
  return(<div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:120,background:c.headerBg,backdropFilter:"blur(12px)",borderTop:`1px solid ${c.divider}`,padding:"10px 16px",display:"flex",gap:8,alignItems:"center"}} className="mobile-only"><button onClick={onCopy} disabled={isEmpty} title={tr.copy} style={{width:40,height:40,borderRadius:8,background:"none",border:`1px solid ${copied?c.accent:isEmpty?c.vdim:c.border}`,color:copied?c.accent:isEmpty?c.vdim:c.muted,cursor:isEmpty?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{copied?<Check size={16}/>:<Copy size={16}/>}</button><button onClick={onSearch} disabled={isEmpty} style={{flex:1,height:40,display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:isEmpty?"none":c.accent+"22",border:`1px solid ${isEmpty?c.border:c.accent}`,borderRadius:8,color:isEmpty?c.dim:c.accent,cursor:isEmpty?"not-allowed":"pointer",fontFamily:"'Space Mono','Assistant',monospace",fontSize:12,fontWeight:700,userSelect:"none"}}><Search size={14}/> {tr.search}</button></div>);
}

export default function App(){
  const[form,dispatchRaw]=useReducer(formReducer,INITIAL);
  const[openSections,setOpenSections]=useState([]); // [] = all filters closed by default
  const[theme,setTheme]=useState(()=>ls("twsb_theme","dark"));
  const[lang,setLangState]=useState(()=>ls("twsb_lang",detectLang()));
  const[langFading,setLangFading]=useState(false);
  const[drawerOpen,setDrawerOpen]=useState(false);
  const[shortcutsOpen,setShortcutsOpen]=useState(false);
  const[toast,setToast]=useState({msg:"",visible:false});
  const[copied,setCopied]=useState(false);
  const[resetDone,setResetDone]=useState(false);
  const[activeTemplate,setActiveTemplate]=useState(null);
  const[savePopoverOpen,setSavePopoverOpen]=useState(false);
  const savePopoverAnchor=useRef(null);
  const[myUser,setMyUser]=useState(()=>ls("twsb_myUser",""));
  const[history,setHistory]=useState(()=>ls("twsb_history",[]));
  const[savedSearches,setSaved]=useState(()=>ls("twsb_saved",[]));
  const[hiddenBuiltins,setHiddenBuiltins]=useState(()=>ls("twsb_hidden_builtins",[]));
  const[fieldHist,setFieldHist]=useState(()=>ls("twsb_fieldHist",{}));
  const[openDropKey,setOpenDropKey]=useState(null);
  const[isDesktop,setIsDesktop]=useState(()=>window.innerWidth>=900);
  const[confetti,setConfetti]=useState(false);
  const[installPrompt,setInstallPrompt]=useState(null); // native install prompt (Android/Chrome)
  const[installed,setInstalled]=useState(false);
  const toastTimer=useRef(null);
  // Header height is measured live via ResizeObserver instead of a hardcoded pixel guess,
  // so the sticky PreviewPanel below it never drifts out of sync.
  const headerRef=useRef(null);
  const[headerH,setHeaderH]=useState(98);
  useLayoutEffect(()=>{
    const headerEl=headerRef.current;
    if(!headerEl)return;
    const ro=new ResizeObserver(entries=>{for(const entry of entries)setHeaderH(Math.round(entry.target.getBoundingClientRect().height));});
    ro.observe(headerEl);
    return()=>ro.disconnect();
  },[]);
  // Toolbar (Bar2) button squeeze — on narrow phones there isn't always room for every action
  // button. Instead of letting them overflow off-screen, drop the least important ones first:
  // search → copy → plus, never clear. Based on real measured widths (row minus the variable-
  // length "my account" zone), not CSS containment — a contained flex item with no explicit
  // size collapses to ~0, which is what caused everything to vanish before.
  const toolbarRowRef=useRef(null);
  const myUserZoneRef=useRef(null);
  const[toolbarFit,setToolbarFit]=useState(3); // how many of [plus,copy,search] currently fit
  useLayoutEffect(()=>{
    const rowEl=toolbarRowRef.current;
    if(!rowEl)return;
    const CLEAR_W=34,PLUS_W=34,COPY_W=34,SEARCH_W=100,GAP=6,ROW_GAP=8;
    const compute=()=>{
      const rowW=rowEl.clientWidth;
      const leftW=myUserZoneRef.current?myUserZoneRef.current.getBoundingClientRect().width:0;
      let avail=rowW-leftW-ROW_GAP-CLEAR_W;
      let fit=0;
      for(const w of[PLUS_W,COPY_W,SEARCH_W]){
        if(avail-GAP-w>=0){avail-=(GAP+w);fit++;}else break;
      }
      setToolbarFit(fit);
    };
    compute();
    const ro=new ResizeObserver(compute);
    ro.observe(rowEl);
    if(myUserZoneRef.current)ro.observe(myUserZoneRef.current);
    return()=>ro.disconnect();
  },[myUser,isDesktop]);
  // Section open/close — mobile stays single-accordion (only one open at a time, to save
  // vertical space); desktop allows several open at once since the 2-column layout has room.
  const toggleSection=useCallback((id)=>{
    setOpenSections(prev=>{
      const isOpen=prev.includes(id);
      if(isOpen)return prev.filter(x=>x!==id);
      return isDesktop?[...prev,id]:[id];
    });
  },[isDesktop]);
  const c=T[theme];const tr=I18N[lang];const isRTL=lang==="he";const dir=isRTL?"rtl":"ltr";
  const query=useMemo(()=>buildQuery(form),[form]);
  const isEmpty=!query.trim();
  const twitterUrl=`https://x.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=top`;
  const myUserHandle=myUser.replace(/^@/,"");
  // isMyUserActive: checks if myUser is IN the from: list (supports multiple users)
  const fromUserList=useMemo(()=>form.fromUser.trim().split(/[\s,]+/).filter(Boolean).map(u=>u.replace(/^@/,"").toLowerCase()),[form.fromUser]);
  const isMyUserActive=!!myUserHandle&&fromUserList.includes(myUserHandle.toLowerCase());

  const dispatch=useCallback((action)=>{if(action.type==="SET"||action.type==="RESET")setActiveTemplate(null);dispatchRaw(action);},[]);

  const DATE_PRESETS=[
    {label:tr.today,key:"today"},{label:tr.week,key:"week"},{label:tr.month,key:"month"},
    {label:tr.threeMonths,key:"3m"},{label:tr.sixMonths,key:"6m"},{label:tr.year,key:"year"},
  ];

  // Derive active date preset from form — no separate state (avoids stale bugs)
  const activeDatePreset=useMemo(()=>{
    if(!form.sinceDate||form.untilDate)return null;
    for(const p of DATE_PRESETS){if(form.sinceDate===dpDate(p.key))return p.key;}
    return null;
  },[form.sinceDate,form.untilDate]);

  useEffect(()=>{const params=new URLSearchParams(window.location.search);const q=params.get("q");if(q){const s=decodeState(q);if(s)dispatchRaw({type:"MERGE",payload:s});window.history.replaceState({},"",window.location.pathname);};},[]);
  useEffect(()=>lsSet("twsb_theme",theme),[theme]);
  useEffect(()=>{
    const r=document.documentElement.style;
    r.setProperty("--twsb-border",c.border);
    r.setProperty("--twsb-sectionBg",c.sectionBg);
    r.setProperty("--twsb-text",c.text);
    r.setProperty("--twsb-placeholder",c.placeholder);
    r.setProperty("--twsb-datepicker-filter",theme==="dark"?"invert(0.4)":"none");
    document.body.style.background=c.bg;
  },[theme]);
  useEffect(()=>lsSet("twsb_lang",lang),[lang]);
  useEffect(()=>lsSet("twsb_myUser",myUser),[myUser]);
  useEffect(()=>lsSet("twsb_history",history),[history]);
  useEffect(()=>lsSet("twsb_saved",savedSearches),[savedSearches]);
  useEffect(()=>lsSet("twsb_hidden_builtins",hiddenBuiltins),[hiddenBuiltins]);
  useEffect(()=>lsSet("twsb_fieldHist",fieldHist),[fieldHist]);
  // PWA install prompt — Chrome/Android fires beforeinstallprompt before showing native UI
  useEffect(()=>{
    const h=e=>{e.preventDefault();setInstallPrompt(e);};
    const done=()=>{setInstalled(true);setInstallPrompt(null);};
    window.addEventListener("beforeinstallprompt",h);
    window.addEventListener("appinstalled",done);
    return()=>{window.removeEventListener("beforeinstallprompt",h);window.removeEventListener("appinstalled",done);};
  },[]);
  useEffect(()=>{const h=()=>setIsDesktop(window.innerWidth>=900);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  useEffect(()=>{const h=e=>{if(!e.target.closest("[data-drop-anchor]"))setOpenDropKey(null);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  // Close dropdown on any scroll — position:fixed doesn't track scrolling inputs
  useEffect(()=>{const h=()=>setOpenDropKey(null);window.addEventListener("scroll",h,true);return()=>window.removeEventListener("scroll",h,true);},[]);
  useEffect(()=>{let sx=0;const ts=e=>{sx=e.touches[0].clientX;};const te=e=>{const dx=e.changedTouches[0].clientX-sx;if(isRTL){if(dx<-70&&sx>window.innerWidth*0.55)setDrawerOpen(true);if(dx>70&&drawerOpen)setDrawerOpen(false);}else{if(dx>70&&sx<window.innerWidth*0.25)setDrawerOpen(true);if(dx<-70&&drawerOpen)setDrawerOpen(false);}};window.addEventListener("touchstart",ts,{passive:true});window.addEventListener("touchend",te,{passive:true});return()=>{window.removeEventListener("touchstart",ts);window.removeEventListener("touchend",te);};},[drawerOpen,isRTL]);
  useEffect(()=>{
    const h=e=>{
      const mod=e.ctrlKey||e.metaKey;
      if(mod&&e.key==="Enter"){e.preventDefault();handleSearch();return;}
      if(mod&&e.key===","){e.preventDefault();setDrawerOpen(true);return;}
      if(e.key==="Escape"){setShortcutsOpen(false);setDrawerOpen(false);setSavePopoverOpen(false);setOpenDropKey(null);setOpenSections([]);return;}

      const tag=(e.target?.tagName||"").toLowerCase();
      if(tag==="input"||tag==="textarea"||tag==="select")return; // don't hijack typing
      if(mod)return; // the rest are bare-key only — never fire alongside Ctrl/Cmd (e.g. native Ctrl+C)

      if(e.code==="KeyC"){e.preventDefault();handleCopy();return;}
      if(e.code==="KeyX"){e.preventDefault();handleReset();return;}
      if(e.code==="KeyS"){e.preventDefault();if(!isEmpty)setSavePopoverOpen(true);return;}
      if(e.key==="?"||(e.shiftKey&&e.code==="Slash")){e.preventDefault();setShortcutsOpen(s=>!s);return;}
      if(e.code&&e.code.startsWith("Digit")){
        const n=Number(e.code.slice(5));
        if(n>=1&&n<=SECTION_ORDER.length){e.preventDefault();toggleSection(SECTION_ORDER[n-1]);}
      }
    };
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[query,isEmpty,toggleSection]);

  function showToast(msg,dur=3500){clearTimeout(toastTimer.current);setToast({msg,visible:true});toastTimer.current=setTimeout(()=>setToast(t=>({...t,visible:false})),dur);}
  function changeTheme(next){
    setTheme(next);
    showToast(next==="light"?"Come to the dark mode, we have cookies. 🍪":tr.darkModeToast);
  }
  function setLang(nl){setLangFading(true);setTimeout(()=>{setLangState(nl);requestAnimationFrame(()=>requestAnimationFrame(()=>setLangFading(false)));},180);}
  function handleCopy(){if(!query.trim())return;navigator.clipboard.writeText(query);setCopied(true);showToast(tr.queryCopied);setTimeout(()=>setCopied(false),2000);}
  function handleSearch(){if(!query.trim())return;const entry={query,ts:new Date().toLocaleTimeString(isRTL?"he-IL":"en-US",{hour:"2-digit",minute:"2-digit"})};setHistory(h=>[entry,...h.filter(x=>x.query!==query).slice(0,19)]);window.open(twitterUrl,"_blank");}
  function handleReset(){dispatchRaw({type:"RESET"});setActiveTemplate(null);setResetDone(true);showToast(tr.allCleared);setTimeout(()=>setResetDone(false),800);}
  function histSave(key,val){setFieldHist(fh=>{const prev=fh[key]||[];return{...fh,[key]:[val,...prev.filter(v=>v!==val)].slice(0,5)};});}

  // toggleMyUser — adds/removes myUser from the from: list without replacing others.
  // Uses dispatchRaw (not the wrapped dispatch) so this doesn't deactivate an active template —
  // the two are independent and shouldn't cancel each other out.
  function toggleMyUser(){
    if(!myUserHandle)return;
    const currentList=form.fromUser.trim().split(/[\s,]+/).filter(Boolean).map(u=>u.replace(/^@/,""));
    if(isMyUserActive){
      const newList=currentList.filter(u=>u.toLowerCase()!==myUserHandle.toLowerCase());
      dispatchRaw({type:"SET",key:"fromUser",value:newList.join(", ")});
    }else{
      const newList=[...currentList.filter(u=>u),myUserHandle];
      dispatchRaw({type:"SET",key:"fromUser",value:newList.join(", ")});
      showToast(`@${myUserHandle} ${tr.addedAsFrom}`);
    }
  }

  function saveSearch(name,pinToTemplates=true){
    const isFirst=savedSearches.length===0;
    const entry={name:name.trim()||query.slice(0,30),query,state:form,savedAt:new Date().toLocaleDateString(),showInTemplates:pinToTemplates};
    setSaved(prev=>[entry,...prev.slice(0,29)]);
    setSavePopoverOpen(false);
    if(isFirst){showToast(tr.searchSavedFirst,3000);setConfetti(true);setTimeout(()=>setConfetti(false),1500);}
    else showToast(tr.searchSaved);
  }

  function clearSection(id){const fields=SECTION_FIELDS[id]||[];fields.forEach(f=>dispatch({type:"SET",key:f,value:INITIAL[f]}));}

  // Templates and the "my account" toggle both touch fromUser, but shouldn't cancel each
  // other out: when applying a template while myUser is active, fold the handle into the
  // template's fromUser list instead of letting the template blank it out.
  function withMyUserPreserved(payload){
    if(!isMyUserActive)return payload;
    const list=(payload.fromUser||"").trim().split(/[\s,]+/).filter(Boolean).map(u=>u.replace(/^@/,""));
    if(!list.some(u=>u.toLowerCase()===myUserHandle.toLowerCase()))list.push(myUserHandle);
    return{...payload,fromUser:list.join(", ")};
  }

  // The 3 builtin templates are all "find my own high-performing tweets" filters by design,
  // so unlike saved templates they always target whatever username is set in settings.
  function withMyUserHandle(payload){
    return myUserHandle?{...payload,fromUser:myUserHandle}:payload;
  }

  // Template apply — clicking the active template again undoes exactly what it changed
  function applyBuiltinTemplate(key){
    let payload={...BUILTIN_TEMPLATES[key]};
    if(key==="weekly100")payload.sinceDate=dpDate("week"); // computed fresh, not baked into the static template
    payload=withMyUserHandle(payload);
    if(activeTemplate==="builtin:"+key){
      dispatchRaw({type:"MERGE",payload:diffFromInitial(payload)});
      setActiveTemplate(null);
      return;
    }
    dispatchRaw({type:"MERGE",payload});
    setActiveTemplate("builtin:"+key);
    showToast(tr["template"+key.charAt(0).toUpperCase()+key.slice(1)]+" ✓");
  }
  function applySavedTemplate(idx){
    if(activeTemplate==="saved:"+idx){
      const s=savedSearches[idx];
      if(s)dispatchRaw({type:"MERGE",payload:diffFromInitial(s.state)});
      setActiveTemplate(null);
      return;
    }
    const s=savedSearches[idx];if(!s)return;
    dispatchRaw({type:"MERGE",payload:withMyUserPreserved(s.state)});
    setActiveTemplate("saved:"+idx);
    showToast(`${tr.loaded}: ${s.name}`);
  }

  function exportHistory(){
    try{const csv="query,timestamp\n"+history.map(h=>`"${h.query.replace(/"/g,'""')}","${h.ts}"`).join("\n");const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="twitter-search-history.csv";document.body.appendChild(a);a.click();setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url);},100);showToast(tr.downloaded);}
    catch{navigator.clipboard.writeText(history.map(h=>h.query).join("\n"));showToast(tr.copiedClipboard);}
  }

  const ac=id=>countActive(form,SECTION_FIELDS[id]||[]);
  const ip={dispatch,fieldHist,onHistSave:histSave,theme,lang,openDropKey,setOpenDropKey};
  const pinnedSaved=savedSearches.map((s,i)=>({...s,idx:i})).filter(s=>s.showInTemplates);
  const settingsProps={theme,onThemeChange:changeTheme,myUser,setMyUser:u=>{setMyUser(u);showToast(tr.accountSaved);},lang,setLang,savedSearches,hiddenBuiltins,onToggleBuiltin:key=>setHiddenBuiltins(h=>h.includes(key)?h.filter(k=>k!==key):[...h,key]),onToggleSavedTemplate:i=>setSaved(s=>s.map((x,j)=>j===i?{...x,showInTemplates:!x.showInTemplates}:x)),onDeleteSaved:i=>setSaved(s=>s.filter((_,j)=>j!==i)),history,onClearHistory:()=>{setHistory([]);lsSet("twsb_history",[]);showToast(tr.historyClearedToast);setDrawerOpen(false);},onExport:exportHistory,installPrompt,installed,tr};

  const FormContent=(
    <div data-drop-anchor="true" style={{flex:1,minWidth:0,padding:"20px",opacity:langFading?0:1,transition:"opacity 0.18s ease"}}>
      {/* Templates row */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:9,color:c.dim,letterSpacing:1.5,marginBottom:8,textTransform:"uppercase",userSelect:"none",fontFamily:"'Space Mono','Assistant',monospace",display:"flex",alignItems:"center",gap:6}}><Zap size={10} color={c.dim}/> {tr.templates}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["weekly100","top1000","top100"].filter(k=>!hiddenBuiltins.includes(k)).map(k=>(<TemplateBtn key={k} label={tr["template"+k.charAt(0).toUpperCase()+k.slice(1)]} active={activeTemplate==="builtin:"+k} theme={theme} onClick={()=>applyBuiltinTemplate(k)}/>))}
          {pinnedSaved.map(s=>(<TemplateBtn key={"s"+s.idx} label={s.name} active={activeTemplate==="saved:"+s.idx} theme={theme} onClick={()=>applySavedTemplate(s.idx)}/>))}
        </div>
      </div>

      {(()=>{
        const sectionsArr=[
          <Section key="keywords" id="keywords" label={tr.sKeywords} Icon={Search} open={openSections.includes("keywords")} onToggle={()=>toggleSection("keywords")} shortcutNum={1} isDesktop={isDesktop} tr={tr} activeCount={ac("keywords")} theme={theme} lang={lang} onClear={clearSection}>
            <Field label={tr.allWords} hint="AND" theme={theme} lang={lang} tipKey="AND"><FieldInput fieldKey="allWords" value={form.allWords} placeholder={tr.ph_allWords} {...ip}/></Field>
            <Field label={tr.exactPhrase} hint={`"exact"`} theme={theme} lang={lang} tipKey='"exact"'><FieldInput fieldKey="exactPhrase" value={form.exactPhrase} placeholder={tr.ph_exactPhrase} {...ip}/></Field>
            <Field label={tr.anyWords} hint="OR" theme={theme} lang={lang} tipKey="OR"><FieldInput fieldKey="anyWords" value={form.anyWords} placeholder={tr.ph_anyWords} {...ip}/></Field>
            <Field label={tr.excludeWords} hint="-word" theme={theme} lang={lang} tipKey="-word"><FieldInput fieldKey="noneWords" value={form.noneWords} placeholder={tr.ph_excludeWords} {...ip}/></Field>
            <Field label={tr.hashtags} hint="#tag" theme={theme} lang={lang} tipKey="#tag"><FieldInput fieldKey="hashtags" value={form.hashtags} placeholder={tr.ph_hashtags} {...ip}/></Field>
          </Section>,

          <Section key="accounts" id="accounts" label={tr.sAccounts} Icon={User} open={openSections.includes("accounts")} onToggle={()=>toggleSection("accounts")} shortcutNum={2} isDesktop={isDesktop} tr={tr} activeCount={ac("accounts")} theme={theme} lang={lang} onClear={clearSection}>
            <Field label={tr.fromUser} hint="from:" theme={theme} lang={lang} tipKey="from:"><FieldInput fieldKey="fromUser" value={form.fromUser} placeholder={tr.ph_fromUser} {...ip}/></Field>
            <Field label={tr.toUser} hint="to:" theme={theme} lang={lang} tipKey="to:"><FieldInput fieldKey="toUser" value={form.toUser} placeholder={tr.ph_toUser} {...ip}/></Field>
            <Field label={tr.mentions} hint="@" theme={theme} lang={lang} tipKey="@"><FieldInput fieldKey="mentionUser" value={form.mentionUser} placeholder={tr.ph_mentionUser} {...ip}/></Field>
          </Section>,

          <Section key="dates" id="dates" label={tr.sDates} Icon={Calendar} open={openSections.includes("dates")} onToggle={()=>toggleSection("dates")} shortcutNum={3} isDesktop={isDesktop} tr={tr} activeCount={ac("dates")} theme={theme} lang={lang} onClear={clearSection}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:12}}>
              {DATE_PRESETS.map(p=>(
                <TemplateBtn key={p.key} label={p.label} theme={theme} active={activeDatePreset===p.key}
                  onClick={()=>{
                    if(activeDatePreset===p.key){dispatch({type:"SET",key:"sinceDate",value:""});}
                    else{dispatch({type:"SET",key:"sinceDate",value:dpDate(p.key)});dispatch({type:"SET",key:"untilDate",value:""});}
                  }}
                />
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <Field label={tr.fromDate} hint="since:" theme={theme} lang={lang} tipKey="since:"><FieldInput fieldKey="sinceDate" value={form.sinceDate} type="date" {...ip}/></Field>
              <Field label={tr.toDate} hint="until:" theme={theme} lang={lang} tipKey="until:"><FieldInput fieldKey="untilDate" value={form.untilDate} type="date" {...ip}/></Field>
            </div>
          </Section>,

          <Section key="engagement" id="engagement" label={tr.sEngagement} Icon={BarChart2} open={openSections.includes("engagement")} onToggle={()=>toggleSection("engagement")} shortcutNum={4} isDesktop={isDesktop} tr={tr} activeCount={ac("engagement")} theme={theme} lang={lang} onClear={clearSection}>
            <div style={{marginTop:8}}>
              <EngagementField fieldKey="minFaves"    value={form.minFaves}    label={tr.minLikes}    Icon={Heart}         step={10} tipKey="min_faves:" {...ip}/>
              <EngagementField fieldKey="minRetweets" value={form.minRetweets} label={tr.minRetweets} Icon={Repeat2}       step={2}  tipKey="min_retweets:" {...ip}/>
              <EngagementField fieldKey="minReplies"  value={form.minReplies}  label={tr.minReplies}  Icon={MessageCircle} step={2}  tipKey="min_replies:" {...ip}/>
            </div>
          </Section>,

          <Section key="content" id="content" label={tr.sContent} Icon={SlidersHorizontal} open={openSections.includes("content")} onToggle={()=>toggleSection("content")} shortcutNum={5} isDesktop={isDesktop} tr={tr} activeCount={ac("content")} theme={theme} lang={lang} onClear={clearSection}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginTop:6}}>
              {CONTENT_FILTERS.map(f=>(<Toggle key={f.key} fieldKey={f.key} checked={form[f.key]} dispatch={dispatch} label={tr[f.tKey]} operator={f.op} theme={theme} lang={lang}/>))}
            </div>
          </Section>,

          <Section key="location" id="location" label={tr.sLanguage} Icon={Globe} open={openSections.includes("location")} onToggle={()=>toggleSection("location")} shortcutNum={6} isDesktop={isDesktop} tr={tr} activeCount={ac("location")} theme={theme} lang={lang} onClear={clearSection}>
            <Field label={tr.language} hint="lang:" theme={theme} lang={lang} tipKey="lang:">
              <select value={form.lang} onChange={e=>dispatch({type:"SET",key:"lang",value:e.target.value})} style={{width:"100%",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:"8px 10px",color:c.text,fontSize:13,fontFamily:"'JetBrains Mono','Assistant',monospace",outline:"none"}}>
                {LANGS_LIST.map(([code,label])=><option key={code} value={code}>{label}</option>)}
              </select>
            </Field>
          </Section>,

          <Section key="advanced" id="advanced" label={tr.sAdvanced} Icon={Settings} open={openSections.includes("advanced")} onToggle={()=>toggleSection("advanced")} shortcutNum={7} isDesktop={isDesktop} tr={tr} activeCount={ac("advanced")} theme={theme} lang={lang} onClear={clearSection}>
            <Field label={tr.containsUrl} hint="url:" theme={theme} lang={lang} tipKey="url:"><FieldInput fieldKey="url" value={form.url} placeholder={tr.ph_url} {...ip}/></Field>
          </Section>,
        ];

        // Desktop: split into two independently-flowing columns (no row-height coupling
        // like a real CSS grid would cause once sections expand to different heights).
        // Mobile: single column, original order.
        return isDesktop?(
          <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
            <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:14}}>{sectionsArr.filter((_,i)=>i%2===0)}</div>
            <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:14}}>{sectionsArr.filter((_,i)=>i%2===1)}</div>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>{sectionsArr}</div>
        );
      })()}

      <div style={{height:70}} className="mobile-spacer"/>
    </div>
  );

  return(
    <div dir={dir} style={{minHeight:"100vh",background:c.bg,fontFamily:"'Space Mono','Assistant',monospace",color:c.text,display:"flex",flexDirection:"column"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;500&family=Assistant:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body,#root{min-height:100vh;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:var(--twsb-border);border-radius:2px;}
        select option{background:var(--twsb-sectionBg);color:var(--twsb-text);}
        input::placeholder{color:var(--twsb-placeholder)!important;}
        input[type=date]::-webkit-calendar-picker-indicator{filter:var(--twsb-datepicker-filter);}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}
        @media(max-width:899px){.mobile-only{display:flex!important;}.mobile-spacer{display:block!important;}}
        @media(min-width:900px){.mobile-only{display:none!important;}.mobile-spacer{display:none!important;}}
      `}</style>

      {/* Sticky header — single wrapper ensures both bars never move on scroll */}
      <div ref={headerRef} dir="ltr" style={{position:"sticky",top:0,zIndex:103}}>
        {/* Bar 1 — brand */}
        <div style={{background:c.headerBg,backdropFilter:"blur(12px)",borderBottom:`1px solid ${c.divider}`,padding:"9px 20px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",maxWidth:isDesktop?1200:960,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <img src={APP_LOGO_SRC} alt="" width={32} height={32} style={{borderRadius:8,display:"block",flexShrink:0}}/>
              <div><div style={{fontSize:12,fontWeight:700,letterSpacing:1,color:c.label,userSelect:"none"}}>SEARCH BUILDER</div><div style={{fontSize:8,color:c.dim,letterSpacing:2,userSelect:"none"}}>ADVANCED TWITTER SEARCH</div></div>
            </div>
            <button onClick={()=>setDrawerOpen(true)} title={tr.settingsTitle} style={{display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,borderRadius:8,background:"none",border:`1px solid ${c.border}`,color:c.muted,cursor:"pointer",userSelect:"none"}}><Menu size={14}/></button>
          </div>
        </div>
        {/* Bar 2 — actions */}
        <div style={{background:c.bg,borderBottom:`1px solid ${c.sectionBorder}`,padding:"7px 20px"}}>
          <div ref={toolbarRowRef} style={{display:"flex",alignItems:"center",justifyContent:"space-between",maxWidth:isDesktop?1200:960,margin:"0 auto",gap:8}}>
            <div ref={myUserZoneRef} style={{display:"flex",alignItems:"center",gap:8,minWidth:0}}>
              {myUser&&(
                <button onClick={toggleMyUser} title={tr.myAccountFilterTitle} style={{background:isMyUserActive?c.accent+"22":"none",border:`1px solid ${isMyUserActive?c.accent:c.border}`,borderRadius:7,padding:"5px 12px",color:isMyUserActive?c.accent:c.muted,fontSize:11,cursor:"pointer",fontFamily:"'JetBrains Mono','Assistant',monospace",whiteSpace:"nowrap",userSelect:"none"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=isMyUserActive?c.accent:c.muted;e.currentTarget.style.color=isMyUserActive?c.accent:c.label;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=isMyUserActive?c.accent:c.border;e.currentTarget.style.color=isMyUserActive?c.accent:c.muted;}}>
                  @{myUserHandle} {isMyUserActive?"✓":"→"}
                </button>
              )}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,minWidth:0}}>
              {toolbarFit>=1&&(
                <div ref={savePopoverAnchor} style={{position:"relative"}}>
                  <HeaderBtn onClick={()=>{if(!isEmpty)setSavePopoverOpen(o=>!o);}} disabled={isEmpty} title={tr.saveSearch} theme={theme} active={savePopoverOpen}><Plus size={14}/></HeaderBtn>
                  {savePopoverOpen&&(<SavePopover theme={theme} lang={lang} tr={tr} onSave={saveSearch} onClose={()=>setSavePopoverOpen(false)} anchorRef={savePopoverAnchor}/>)}
                </div>
              )}
              {toolbarFit>=2&&(<HeaderBtn onClick={handleCopy} disabled={isEmpty} title={tr.copy} theme={theme} active={copied}>{copied?<Check size={14}/>:<Copy size={14}/>}</HeaderBtn>)}
              <HeaderBtn onClick={handleReset} disabled={isEmpty} title={tr.clearAll} theme={theme} done={resetDone}>{resetDone?<Check size={14}/>:<RotateCcw size={14}/>}</HeaderBtn>
              {isDesktop&&(<HeaderBtn onClick={()=>setShortcutsOpen(o=>!o)} title={tr.shortcutsTitle} theme={theme} active={shortcutsOpen}><Keyboard size={14}/></HeaderBtn>)}
              {toolbarFit>=3&&(
                <button onClick={handleSearch} disabled={isEmpty}
                  style={{display:"flex",alignItems:"center",gap:6,background:isEmpty?"none":c.accent+"22",border:`1px solid ${isEmpty?c.border:c.accent}`,borderRadius:8,padding:"6px 16px",color:isEmpty?c.dim:c.accent,cursor:isEmpty?"not-allowed":"pointer",fontFamily:"'Space Mono','Assistant',monospace",fontSize:11,fontWeight:700,userSelect:"none",flexShrink:0}}
                  onMouseEnter={e=>{if(!isEmpty)e.currentTarget.style.background=c.accent+"33";}}
                  onMouseLeave={e=>{if(!isEmpty)e.currentTarget.style.background=c.accent+"22";}}>
                  <Search size={13}/>{tr.search}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview / history panel */}
      <PreviewPanel query={query} isEmpty={isEmpty} history={history} theme={theme} lang={lang} tr={tr} isRTL={isRTL} isDesktop={isDesktop} top={headerH}
        form={form} onShowToast={showToast}
        onSearchHistory={q=>window.open(`https://x.com/search?q=${encodeURIComponent(q)}`,"_blank")}
        onDeleteHistory={i=>setHistory(h=>{const n=h.filter((_,j)=>j!==i);lsSet("twsb_history",n);return n;})}
        onClearHistory={()=>{setHistory([]);lsSet("twsb_history",[]);showToast(tr.historyClearedToast);}}
      />

      <div style={{display:"flex",flex:1,maxWidth:isDesktop?1200:960,margin:"0 auto",width:"100%"}}>
        {FormContent}
      </div>

      <StickyBottomBar isEmpty={isEmpty} onSearch={handleSearch} onCopy={handleCopy} theme={theme} tr={tr} copied={copied}/>
      <Drawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} isRTL={isRTL} {...settingsProps}/>
      <ShortcutsOverlay open={shortcutsOpen} onClose={()=>setShortcutsOpen(false)} theme={theme} lang={lang} tr={tr}/>
      <Toast message={toast.msg} visible={toast.visible} theme={theme}/>
      <Confetti active={confetti}/>
    </div>
  );
}