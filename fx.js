export function initFX(){
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-reveal]');
  if(!rm && 'IntersectionObserver' in window){
    els.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)';});
    const io = new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){const d=+(e.target.dataset.reveal||0);setTimeout(()=>{e.target.style.opacity='1';e.target.style.transform='none';},d);io.unobserve(e.target);}});},{threshold:.15});
    els.forEach(el=>io.observe(el));
    setTimeout(()=>{els.forEach(el=>{if(el.style.opacity==='0'){el.style.opacity='1';el.style.transform='none';}});},2500);
  }
  const cs = document.querySelectorAll('[data-count]');
  const io2 = new IntersectionObserver(en=>{en.forEach(e=>{
    if(!e.isIntersecting)return; io2.unobserve(e.target);
    const el=e.target, raw=el.dataset.count, t=parseFloat(raw), dec=(raw.split('.')[1]||'').length, suf=el.dataset.suffix||'';
    const fmt=x=>x.toLocaleString('en-CA',{minimumFractionDigits:dec,maximumFractionDigits:dec});
    if(rm){el.textContent=fmt(t)+suf;return;}
    const t0=performance.now(), dur=1300;
    const step=n=>{const p=Math.min(1,(n-t0)/dur), v=t*(1-Math.pow(1-p,3));el.textContent=fmt(v)+suf;if(p<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  });},{threshold:.5});
  cs.forEach(el=>io2.observe(el));
  const h = document.querySelector('[data-header]');
  if(h){
    h.style.transition='padding .2s ease, box-shadow .2s ease';
    const on=()=>{const s=scrollY>80;h.style.paddingTop=s?'10px':'18px';h.style.paddingBottom=s?'10px':'18px';h.style.boxShadow=s?'0 1px 12px rgba(13,59,122,0.12)':'none';};
    addEventListener('scroll',on,{passive:true});on();
  }
}
