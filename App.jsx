import { useState, useMemo, useEffect, useReducer, useRef } from "react";
import {
  Search, User, Calendar, BarChart2, SlidersHorizontal, Globe,
  Settings, X, Check, Copy, RotateCcw, Download, Share2,
  Moon, Sun, Trash2, Plus, Star, ChevronDown, ChevronUp, Link
} from "lucide-react";

const I18N = {
  he: {
    search:"חפש", copy:"העתק", clearAll:"נקה הכל",
    queryPreview:"תצוגה מקדימה", chars:"תווים",
    recentSearches:"חיפושים אחרונים", clearHistory:"נקה", noHistory:"חיפושים יופיעו כאן",
    sKeywords:"מילים", sAccounts:"חשבונות", sDates:"תאריכים",
    sEngagement:"מעורבות", sContent:"תוכן", sLocation:"שפה ומיקום",
    allWords:"כל המילים", exactPhrase:"ביטוי מדויק", anyWords:"אחת מהמילים",
    excludeWords:"החרג מילים", hashtags:"האשטגים",
    fromUser:"מהמשתמש", toUser:"בתגובה ל", mentions:"אזכורים",
    fromDate:"מתאריך", toDate:"עד תאריך",
    minLikes:"לייקים מינימום", minRetweets:"ריטוויטים מינימום", minReplies:"תגובות מינימום",
    language:"שפה", withLinks:"עם קישורים", withMedia:"עם מדיה",
    today:"היום", week:"שבוע", month:"חודש",
    darkMode:"מצב כהה", lightMode:"מצב בהיר",
    saveSearch:"שמור חיפוש", noSaved:"אין חיפושים שמורים",
    queryCopied:"שאילתה הועתקה", allCleared:"הכל נוקה",
    searchSaved:"חיפוש נשמר ✓\", darkModeToast:"כל הכבוד ✓\",
  },
  en: {
    search:"Search", copy:"Copy", clearAll:"Clear all",
    queryPreview:"Query Preview", chars:"chars",
    recentSearches:"Recent Searches", clearHistory:"Clear all", noHistory:"Searches will appear here",
    sKeywords:"Keywords", sAccounts:"Accounts", sDates:"Dates",
    sEngagement:"Engagement", sContent:"Content Filters", sLocation:"Language & Location",
    allWords:"All words", exactPhrase:"Exact phrase", anyWords:"Any of these words",
    excludeWords:"Exclude words", hashtags:"Hashtags",
    fromUser:"From user", toUser:"In reply to", mentions:"Mentions",
    fromDate:"From date", toDate:"To date",
    minLikes:"Min likes", minRetweets:"Min retweets", minReplies:"Min replies",
    language:"Language", withLinks:"With links", withMedia:"With media",
    today:"Today", week:"Week", month:"Month",
    darkMode:"Dark Mode", lightMode:"Light Mode",
    saveSearch:"Save search", noSaved:"No saved searches",
    queryCopied:"Query copied", allCleared:"All cleared",
    searchSaved:"Search saved ✓", darkModeToast:"Welcome back ✓",
  },
};

const T = {
  dark:{ bg:"#03030f", sectionBg:"#0d0d1a", inputBg:"#060612", label:"#ddeaf8", text:"#f4f8ff", hint:"#4d7090", accent:"#00d4ff", border:"#1e3450", muted:"#7aaccc", dim:"#4a7090", divider:"#ffffff0a" },
  light:{ bg:"#f0f4f8", sectionBg:"#ffffff", inputBg:"#f8fafc", label:"#1e293b", text:"#0f172a", hint:"#94a3b8", accent:"#0369a1", border:"#e2e8f0", muted:"#64748b", dim:"#94a3b8", divider:"#f1f5f9" },
};

const LANGS_LIST=[["","All | הכל"],[\"he\",\"עברית\"],[\"en\",\"English\"]];

const INITIAL={ allWords:\"\",exactPhrase:\"\",anyWords:\"\",noneWords:\"\",hashtags:\"\",fromUser:\"\",toUser:\"\",mentionUser:\"\",sinceDate:\"\",untilDate:\"\",minFaves:\"\",minRetweets:\"\",minReplies:\"\",filterLinks:false,filterMedia:false,lang:\"\",url:\"\" };

const ls=(k,fb)=>{try{return JSON.parse(localStorage.getItem(k));}catch{return fb;}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};

function buildQuery(s){
  const p=[];
  if(s.allWords.trim())p.push(s.allWords.trim());
  if(s.exactPhrase.trim())p.push(`\"${s.exactPhrase.trim()}\"`);
  if(s.anyWords.trim())p.push(`(${s.anyWords.trim().split(/\\s+/).join(\" OR \")})`);
  if(s.noneWords.trim())s.noneWords.trim().split(/\\s+/).forEach(w=>p.push(`-${w}`));
  if(s.hashtags.trim())s.hashtags.trim().split(/[\\s,]+/).forEach(h=>p.push(h.startsWith(\"#\")?h:`#${h}`));
  if(s.fromUser.trim())p.push(`from:${s.fromUser.trim()}`);
  if(s.toUser.trim())p.push(`to:${s.toUser.trim()}`);
  if(s.mentionUser.trim())p.push(`@${s.mentionUser.trim()}`);
  if(s.sinceDate)p.push(`since:${s.sinceDate}`);
  if(s.untilDate)p.push(`until:${s.untilDate}`);
  if(s.minFaves)p.push(`min_faves:${s.minFaves}`);
  if(s.minRetweets)p.push(`min_retweets:${s.minRetweets}`);
  if(s.minReplies)p.push(`min_replies:${s.minReplies}`);
  if(s.filterLinks)p.push(\"filter:links\");
  if(s.filterMedia)p.push(\"filter:media\");
  if(s.lang)p.push(`lang:${s.lang}`);
  if(s.url.trim())p.push(`url:${s.url.trim()}`);
  return p.join(\" \");
}

function formReducer(state,a){
  if(a.type===\"SET\")return{...state,[a.key]:a.value};
  if(a.type===\"RESET\")return INITIAL;
  return state;
}

export default function App(){
  const [form,dispatch]=useReducer(formReducer,INITIAL);
  const [theme,setTheme]=useState(()=>ls(\"theme\",\"dark\"));
  const [lang,setLang]=useState(()=>ls(\"lang\",\"en\"));
  const [history,setHistory]=useState(()=>ls(\"history\",[]));
  const [toast,setToast]=useState(\"\");
  const tr=I18N[lang];
  const c=T[theme];
  const query=useMemo(()=>buildQuery(form),[form]);
  const empty=!query.trim();

  useEffect(()=>lsSet(\"theme\",theme),[theme]);
  useEffect(()=>lsSet(\"lang\",lang),[lang]);
  useEffect(()=>lsSet(\"history\",history),[history]);

  function flash(msg){setToast(msg);setTimeout(()=>setToast(\"\"),1800);}

  return(
    <div style={{background:c.bg,color:c.text,minHeight:\"100vh\",padding:20,fontFamily:\"'Space Mono',monospace\"}}>
      <div style={{maxWidth:960,margin:\"0 auto\"}}>
        <header style={{marginBottom:20}}>
          <h1 style={{fontSize:24,marginBottom:8,color:c.accent}}>Twitter Search Builder</h1>
          <p style={{color:c.dim,fontSize:12}}>Advanced Twitter/X search with filters</p>
        </header>

        {/* Theme & Language */}
        <div style={{display:\"flex\",gap:10,marginBottom:20,justifyContent:\"flex-end\"}}>
          <button onClick={()=>setTheme(t=>t===\"dark\"?\"light\":\"dark\")} style={{background:c.sectionBg,border:`1px solid ${c.border}`,borderRadius:6,padding:\"6px 12px\",color:c.muted,cursor:\"pointer\",fontSize:11}}>
            {theme===\"dark\"?<Moon size={14}/>:<Sun size={14}/>}
          </button>
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:\"6px 10px\",color:c.text,fontSize:11}}>
            {LANGS_LIST.map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        {/* Form Sections */}
        <div style={{display:\"grid\",gridTemplateColumns:\"1fr 1fr\",gap:15,marginBottom:20}}>
          {/* Keywords */}
          <div style={{background:c.sectionBg,border:`1px solid ${c.border}`,borderRadius:10,padding:15}}>
            <h3 style={{fontSize:12,color:c.accent,marginBottom:10,textTransform:\"uppercase\",letterSpacing:1}}>{tr.sKeywords}</h3>
            <input placeholder={tr.allWords} value={form.allWords} onChange={e=>dispatch({type:\"SET\",key:\"allWords\",value:e.target.value})} style={{width:\"100%\",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:8,color:c.text,fontSize:11,marginBottom:8,boxSizing:\"border-box\"}}/>
            <input placeholder={tr.exactPhrase} value={form.exactPhrase} onChange={e=>dispatch({type:\"SET\",key:\"exactPhrase\",value:e.target.value})} style={{width:\"100%\",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:8,color:c.text,fontSize:11,marginBottom:8,boxSizing:\"border-box\"}}/>
            <input placeholder={tr.anyWords} value={form.anyWords} onChange={e=>dispatch({type:\"SET\",key:\"anyWords\",value:e.target.value})} style={{width:\"100%\",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:8,color:c.text,fontSize:11,boxSizing:\"border-box\"}}/>
          </div>

          {/* Accounts */}
          <div style={{background:c.sectionBg,border:`1px solid ${c.border}`,borderRadius:10,padding:15}}>
            <h3 style={{fontSize:12,color:c.accent,marginBottom:10,textTransform:\"uppercase\",letterSpacing:1}}>{tr.sAccounts}</h3>
            <input placeholder={tr.fromUser} value={form.fromUser} onChange={e=>dispatch({type:\"SET\",key:\"fromUser\",value:e.target.value})} style={{width:\"100%\",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:8,color:c.text,fontSize:11,marginBottom:8,boxSizing:\"border-box\"}}/>
            <input placeholder={tr.toUser} value={form.toUser} onChange={e=>dispatch({type:\"SET\",key:\"toUser\",value:e.target.value})} style={{width:\"100%\",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:8,color:c.text,fontSize:11,boxSizing:\"border-box\"}}/>
          </div>
        </div>

        {/* Query Preview */}
        <div style={{background:c.sectionBg,border:`1px solid ${c.border}`,borderRadius:10,padding:15,marginBottom:20}}>
          <p style={{fontSize:10,color:c.dim,marginBottom:8,letterSpacing:1}}>{tr.queryPreview}</p>
          <pre style={{background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:12,fontSize:11,color:c.accent,overflow:\"auto\",margin:0,whiteSpace:\"pre-wrap\",wordBreak:\"break-all\"}}>
            {query||\"—\"}
          </pre>
        </div>

        {/* Action Buttons */}
        <div style={{display:\"flex\",gap:10,justifyContent:\"center\"}}>
          <button onClick={()=>{navigator.clipboard.writeText(query);flash(tr.queryCopied);}} disabled={empty} style={{background:c.accent,color:c.bg,border:\"none\",borderRadius:6,padding:\"8px 20px\",cursor:empty?\"not-allowed\":\"pointer\",fontSize:11,opacity:empty?0.5:1}}>
            <Copy size={12} style={{display:\"inline\",marginRight:4}}/> {tr.copy}
          </button>
          <button onClick={()=>{dispatch({type:\"RESET\"});flash(tr.allCleared);}} style={{background:c.sectionBg,border:`1px solid ${c.border}`,borderRadius:6,padding:\"8px 20px\",color:c.muted,cursor:\"pointer\",fontSize:11}}>
            <RotateCcw size={12} style={{display:\"inline\",marginRight:4}}/> {tr.clearAll}
          </button>
        </div>

        {/* Recent */}
        {history.length>0&&(
          <div style={{marginTop:20,background:c.sectionBg,border:`1px solid ${c.border}`,borderRadius:10,padding:15}}>
            <p style={{fontSize:10,color:c.dim,marginBottom:10,letterSpacing:1}}>{tr.recentSearches}</p>
            <div style={{display:\"flex\",flexDirection:\"column\",gap:6}}>
              {history.slice(0,5).map((h,i)=>(
                <button key={i} onClick={()=>{window.open(`https://x.com/search?q=${encodeURIComponent(h)}`,\"_blank\");}} style={{textAlign:\"left\",background:c.inputBg,border:`1px solid ${c.border}`,borderRadius:6,padding:8,color:c.text,fontSize:10,cursor:\"pointer\",overflow:\"hidden\",textOverflow:\"ellipsis\",whiteSpace:\"nowrap\"}}>
                  {h}
                </button>
              ))}
              <button onClick={()=>{setHistory([]);flash(tr.allCleared);}} style={{background:\"transparent\",border:`1px solid #ef4444\",borderRadius:6,padding:6,color:\"#ef4444\",cursor:\"pointer\",fontSize:10}}>
                {tr.clearHistory}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast&&(
        <div style={{position:\"fixed\",bottom:20,left:\"50%\",transform:\"translateX(-50%)\",background:c.sectionBg,border:`1px solid ${c.border}`,borderRadius:8,padding:\"10px 20px\",color:c.accent,fontSize:11,zIndex:9999}}>
          {toast}
        </div>
      )}
    </div>
  );
}