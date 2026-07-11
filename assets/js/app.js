(() => {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(n)||0);

  function applyConfig(){
    $$("[data-brand-name]").forEach(el=>el.textContent=cfg.brandName||"HomeLoan Assist");
    $$("[data-brand-tagline]").forEach(el=>el.textContent=cfg.tagline||"Clarity before commitment");
    $$("[data-phone-display]").forEach(el=>el.textContent=cfg.phoneDisplay||"");
    $$("[data-email]").forEach(el=>el.textContent=cfg.email||"");
    $$("[data-service-area]").forEach(el=>el.textContent=cfg.serviceArea||"India");
    $$("[data-about-text]").forEach(el=>el.textContent=cfg.aboutText||"");
    $$("[data-fee-text]").forEach(el=>el.textContent=cfg.feeText||"");
    $$("[data-footer-description]").forEach(el=>el.textContent=cfg.footerDescription||"");
    document.title = `${cfg.brandName || "HomeLoan Assist"} | Trusted Home Loan Guidance`;
    const phone = (cfg.whatsappNumber||"").replace(/\D/g,"");
    const wa = `https://wa.me/${phone}?text=${encodeURIComponent(cfg.whatsappGreeting||"Hello")}`;
    ["#hero-whatsapp","#floating-whatsapp"].forEach(id=>{const el=$(id);if(el)el.href=wa;});
    const pl=$("#phone-link"); if(pl) pl.href=`tel:${(cfg.phoneDisplay||"").replace(/[^\d+]/g,"")}`;
    const em=$("#email-link"); if(em) em.href=`mailto:${cfg.email||""}`;
    const schema=$("#business-schema");
    if(schema){
      try{const data=JSON.parse(schema.textContent);data.name=cfg.brandName;data.url=cfg.websiteUrl;data.telephone=cfg.phoneDisplay;data.email=cfg.email;data.areaServed=cfg.serviceArea;schema.textContent=JSON.stringify(data);}catch(e){}
    }
    const rate=$("#interest-rate"); if(rate && cfg.defaultInterestRate) rate.value=cfg.defaultInterestRate;
  }

  function calculateEMI(principal, annualRate, years){
    const months = Math.max(1, years*12);
    const r = annualRate/12/100;
    if(r===0) return {emi:principal/months,total:principal,interest:0};
    const factor = Math.pow(1+r,months);
    const emi = principal*r*factor/(factor-1);
    const total = emi*months;
    return {emi,total,interest:total-principal};
  }

  function showEMI(){
    const p=Number($("#loan-amount")?.value), rate=Number($("#interest-rate")?.value), years=Number($("#loan-tenure")?.value);
    if(!(p>0) || !(rate>=0) || !(years>0)) return;
    const out=calculateEMI(p,rate,years);
    $("#emi-result").textContent=money(out.emi);
    $("#interest-result").textContent=money(out.interest);
    $("#payment-result").textContent=money(out.total);
  }

  function quickEligibility(){
    const income=Number($("#quick-income")?.value)||0;
    const existing=Number($("#quick-emi")?.value)||0;
    const years=Number($("#quick-tenure")?.value)||20;
    const foir=(Number(cfg.eligibilityFoirPercent)||50)/100;
    const available=Math.max(0,income*foir-existing);
    const rate=Number(cfg.defaultInterestRate)||8.5;
    const perLakh=calculateEMI(100000,rate,years).emi;
    const estimate=(available/perLakh)*100000;
    $("#quick-result").innerHTML=estimate>0?`Indicative loan range: <strong>${money(estimate)}</strong>`:"Existing obligations may leave limited indicative eligibility.";
  }

  function submitLead(e){
    e.preventDefault();
    const form=e.currentTarget;
    if(!form.reportValidity()) return;
    const data=Object.fromEntries(new FormData(form).entries());
    const phone=(cfg.whatsappNumber||"").replace(/\D/g,"");
    if(!phone){$("#form-status").textContent="Add a WhatsApp number in assets/js/config.js first.";return;}
    const lines=[
      `Hello ${cfg.brandName||""}, I want home-loan assistance.`,
      "",
      `Name: ${data.name}`,
      `Mobile: ${data.mobile}`,
      `City: ${data.city}`,
      `Requirement: ${data.product}`,
      `Approx. amount: ${data.amount?money(data.amount):"Not specified"}`,
      `Employment: ${data.employment||"Not specified"}`,
      `Message: ${data.message||"Not specified"}`
    ];
    $("#form-status").textContent="Opening WhatsApp. Please review the message before sending.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener");
  }

  function nav(){
    const btn=$(".menu-toggle"), menu=$("#site-nav");
    btn?.addEventListener("click",()=>{const open=menu.classList.toggle("open");btn.setAttribute("aria-expanded",String(open));});
    $$("#site-nav a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");btn?.setAttribute("aria-expanded","false");}));
  }

  document.addEventListener("DOMContentLoaded",()=>{
    applyConfig(); nav(); showEMI(); quickEligibility();
    $("#emi-calculate")?.addEventListener("click",showEMI);
    $("#quick-calculate")?.addEventListener("click",quickEligibility);
    $("#lead-form")?.addEventListener("submit",submitLead);
    $("#year").textContent=new Date().getFullYear();
  });
})();
