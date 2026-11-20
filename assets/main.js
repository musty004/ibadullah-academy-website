/* Ibadullah Online Academy — site scripts */

// Mobile menu
function openMenu(){document.getElementById('mmenu').classList.add('open');document.body.classList.add('menu-open');document.body.style.overflow='hidden';}
function closeMenu(){document.getElementById('mmenu').classList.remove('open');document.body.classList.remove('menu-open');document.body.style.overflow='';}

// FAQ accordion
function toggleFaq(btn){
  var item=btn.parentElement, isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i){
    i.classList.remove('open');
    var b=i.querySelector('.faq-q'); if(b) b.setAttribute('aria-expanded','false');
  });
  if(!isOpen){item.classList.add('open');btn.setAttribute('aria-expanded','true');}
}

// Visitor's time zone, used for currency, clocks and form pre-fill
var IA_TZ='';
try{IA_TZ=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}
function iaCountry(tz){
  if(/^Europe\/(London|Belfast)$/.test(tz)) return 'United Kingdom';
  if(/^Australia\//.test(tz)) return 'Australia';
  if(/^America\/(Toronto|Montreal|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Yellowknife|Iqaluit|Dawson_Creek|Swift_Current|Fort_Nelson|Creston|Rankin_Inlet|Cambridge_Bay|Inuvik)$/.test(tz)) return 'Canada';
  if(/^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Boise|Juneau|Adak|Sitka|Nome|Metlakatla|Yakutat|Menominee|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+)$/.test(tz) || tz==='Pacific/Honolulu') return 'United States';
  return '';
}
var IA_CUR={'United Kingdom':'GBP','United States':'USD','Canada':'CAD','Australia':'AUD'};

// Scroll reveal
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('in');});return;}
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});
  },{threshold:0.1});
  els.forEach(function(el){obs.observe(el);});
})();

// Currency switcher (pricing page)
(function(){
  var sw=document.querySelector('.cur-switch'); if(!sw) return;
  var SYM={GBP:'£',USD:'$',CAD:'CA$',AUD:'A$'};
  function set(cur){
    document.querySelectorAll('.pamt').forEach(function(el){
      var v=el.getAttribute('data-'+cur.toLowerCase()); if(!v) return;
      el.querySelector('.psym').textContent=SYM[cur];
      el.querySelector('.pnum').textContent=v;
    });
    sw.querySelectorAll('button').forEach(function(b){
      var on=b.getAttribute('data-cur')===cur;
      b.classList.toggle('on',on); b.setAttribute('aria-pressed',on?'true':'false');
    });
    var from=document.querySelector('.js-from'), first=document.querySelector('.pamt');
    if(from&&first) from.textContent=SYM[cur]+first.getAttribute('data-'+cur.toLowerCase());
    try{localStorage.setItem('ia_cur',cur);}catch(e){}
  }
  var saved=null; try{saved=localStorage.getItem('ia_cur');}catch(e){}
  set(SYM[saved]?saved:(IA_CUR[iaCountry(IA_TZ)]||'GBP'));
  sw.addEventListener('click',function(e){var b=e.target.closest('button[data-cur]'); if(b) set(b.getAttribute('data-cur'));});
})();

// Live local clocks
(function(){
  var els=document.querySelectorAll('[data-tz]'); if(!els.length) return;
  function tick(){
    els.forEach(function(el){
      try{el.textContent=new Date().toLocaleTimeString('en-GB',{hour:'numeric',minute:'2-digit',hour12:true,timeZone:el.getAttribute('data-tz')}).toLowerCase();}
      catch(e){el.textContent='';}
    });
  }
  tick(); setInterval(tick,30000);
})();

// Apply form: pre-select the subject and fill in time zone / country
(function(){
  var sel=document.getElementById('a-prog');
  if(sel){
    var m=location.search.match(/[?&]program=([a-z-]+)/);
    if(m){var o=sel.querySelector('option[data-slug="'+m[1]+'"]'); if(o) o.selected=true;}
  }
  document.querySelectorAll('[data-autotz]').forEach(function(el){
    if(!el.value&&IA_TZ){el.value=IA_TZ.split('/').pop().replace(/_/g,' ')+' ('+IA_TZ+')';}
  });
  var c=iaCountry(IA_TZ);
  if(c) document.querySelectorAll('select[data-autocountry]').forEach(function(s){if(!s.value) s.value=c;});
})();

// Forms: send to Formspree in the background, then show the thank-you panel
(function(){
  document.querySelectorAll('form.js-fs').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var err=document.getElementById(form.getAttribute('data-error'));
      var ok=document.getElementById(form.getAttribute('data-success'));
      var wrap=document.getElementById(form.getAttribute('data-wrap'));
      var btn=form.querySelector('[type="submit"]');
      if(err) err.hidden=true;
      if(btn){btn.disabled=true;btn.style.opacity='0.7';}
      var data=new FormData(form);
      fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}})
        .then(function(res){
          if(!res.ok) throw new Error('Form error');
          var waId=form.getAttribute('data-wa');
          if(waId){
            var a=document.getElementById(waId);
            if(a){
              var name=String(data.get('name')||'').trim(), subj=String(data.get('subject')||'').trim();
              var msg='Assalamu Alaikum. I just sent a message on your website'+(name?'. My name is '+name:'')+'.'+(subj?" I'm interested in "+subj+'.':'');
              a.href=a.href.split('?')[0]+'?text='+encodeURIComponent(msg);
            }
          }
          if(wrap) wrap.hidden=true;
          if(ok){ok.hidden=false;ok.scrollIntoView({behavior:'smooth',block:'start'});}
        })
        .catch(function(){
          if(err) err.hidden=false;
          if(btn){btn.disabled=false;btn.style.opacity='1';}
        });
    });
  });
})();
