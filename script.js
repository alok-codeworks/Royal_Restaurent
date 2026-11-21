"use strict";
/* ===== Royal Taste – main script =====
   CHANGE THE WHATSAPP NUMBER BELOW (country code + number, no + or spaces) */
const CONFIG={whatsapp:"919999999999",name:"Royal Taste Restaurant & Cafe"};
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const waLink=t=>`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* 1. Mobile navigation + active link */
const header=$(".site-header"),toggle=$(".nav-toggle"),nav=$("#nav");
const setNav=o=>{nav.classList.toggle("open",o);toggle.classList.toggle("open",o);toggle.setAttribute("aria-expanded",o)};
toggle.addEventListener("click",()=>setNav(!nav.classList.contains("open")));
$$("#nav a").forEach(a=>a.addEventListener("click",()=>setNav(false)));
const here=location.pathname.split("/").pop()||"index.html";
$$("#nav ul a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")===here));

/* 2. Sticky header shadow + back-to-top */
const topBtn=$("#toTop");
addEventListener("scroll",()=>{header.classList.toggle("scrolled",scrollY>20);topBtn.classList.toggle("show",scrollY>600)},{passive:true});
topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

/* 3. Scroll animations */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(el=>io.observe(el));

/* 4. Menu filtering */
$$(".filters").forEach(f=>{
  const grid=$("#"+f.dataset.target);
  f.addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    $$("button",f).forEach(x=>{x.classList.toggle("active",x===b);x.setAttribute("aria-pressed",x===b)});
    $$(".menu-item",grid).forEach(it=>{it.hidden=!(b.dataset.filter==="all"||it.dataset.cat===b.dataset.filter)});
  });
});

/* 5. WhatsApp links (general + per-dish) */
$$(".wa-link").forEach(a=>a.href=waLink(`Hello ${CONFIG.name}, I would like to make an enquiry.`));
$$(".wa-order").forEach(a=>a.href=waLink(`Hello ${CONFIG.name}, I would like to order: ${a.dataset.item}`));

/* 6. Lightbox (gallery + food images) */
const lb=document.createElement("div");lb.className="lightbox";lb.hidden=true;lb.setAttribute("role","dialog");lb.setAttribute("aria-modal","true");lb.setAttribute("aria-label","Image viewer");
lb.innerHTML='<button class="lb-close" aria-label="Close">&times;</button><button class="lb-prev" aria-label="Previous image">&#10094;</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-next" aria-label="Next image">&#10095;</button>';
document.body.appendChild(lb);
let list=[],idx=0;
const showImg=i=>{idx=(i+list.length)%list.length;const im=list[idx];$("img",lb).src=im.src;$("img",lb).alt=im.alt;$("figcaption",lb).textContent=im.alt;lb.hidden=false;document.body.style.overflow="hidden";$(".lb-close",lb).focus()};
const closeLb=()=>{lb.hidden=true;document.body.style.overflow=""};
$$("[data-lightbox]").forEach(im=>{
  im.tabIndex=0;
  const open=()=>{list=$$("[data-lightbox]").filter(x=>!x.closest("[hidden]"));showImg(list.indexOf(im))};
  im.addEventListener("click",open);im.addEventListener("keydown",e=>{if(e.key==="Enter")open()});
});
$(".lb-close",lb).onclick=closeLb;$(".lb-prev",lb).onclick=()=>showImg(idx-1);$(".lb-next",lb).onclick=()=>showImg(idx+1);
lb.addEventListener("click",e=>{if(e.target===lb)closeLb()});
addEventListener("keydown",e=>{if(lb.hidden)return;if(e.key==="Escape")closeLb();if(e.key==="ArrowLeft")showImg(idx-1);if(e.key==="ArrowRight")showImg(idx+1)});

/* 7. Reservation enquiry form: validation + WhatsApp hand-off */
const form=$("#reservation-form");
if(form){
  const dateEl=$("#date"),t=new Date();
  dateEl.min=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;
  const rules={
    name:v=>v.trim().length>=2||"Enter your full name.",
    phone:v=>/^\+?[0-9\s-]{10,14}$/.test(v.trim())||"Enter a valid phone number (10–14 digits).",
    email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())||"Enter a valid email address.",
    date:v=>(v&&v>=dateEl.min)||"Choose today or a future date.",
    time:v=>(v&&v>="11:00"&&v<="22:30")||"Choose a time between 11:00 AM and 10:30 PM.",
    guests:v=>(+v>=1&&+v<=20)||"Guests must be between 1 and 20."
  };
  const check=el=>{const r=rules[el.name](el.value);$(".error",el.parentElement).textContent=r===true?"":r;el.classList.toggle("invalid",r!==true);return r===true};
  const fields=$$("input",form).filter(el=>el.name in rules);
  form.addEventListener("input",e=>{if(e.target.name in rules)check(e.target)});
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const box=$("#form-status"),ok=fields.map(check).every(Boolean);
    if(!ok){box.className="form-status err";box.textContent="Please fix the highlighted fields and try again.";return}
    const f=Object.fromEntries(new FormData(form));
    const msg=`Hello ${CONFIG.name}, I would like to enquire about a table.\nName: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email}\nDate: ${f.date}\nTime: ${f.time}\nGuests: ${f.guests}\nSpecial requests: ${f.requests||"None"}`;
    box.className="form-status ok";
    box.innerHTML=`<span><strong>Thank you, ${esc(f.name)}.</strong> Your enquiry is ready, but it is <strong>not a confirmed booking</strong>. Send it on WhatsApp and our team will confirm availability.</span><a class="btn btn-gold" target="_blank" rel="noopener" href="${waLink(msg)}">Send enquiry on WhatsApp</a>`;
    form.reset();
  });
}
