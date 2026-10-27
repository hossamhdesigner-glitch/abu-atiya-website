(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const UNITS = ["كرتونة", "كيس", "كيلو", "شوال", "قطعة"];
  const STORE_KEY = "abuatiya-quote-v1";

  // ===== بيانات الشركة في الصفحة =====
  $$("[data-company]").forEach((el) => (el.textContent = COMPANY[el.dataset.company]));
  const waLink = (text) => `https://wa.me/${COMPANY.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  $$("[data-wa]").forEach((a) => { a.href = waLink("مرحباً أبو عطية 👋"); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-tel]").forEach((a) => (a.href = "tel:+" + COMPANY.whatsapp));
  $$("[data-mail]").forEach((a) => (a.href = "mailto:" + COMPANY.email));
  $$("[data-fb]").forEach((a) => (a.href = COMPANY.facebook));
  $("#year").textContent = new Date().getFullYear();
  $("#wholesaleNote").textContent = WHOLESALE_NOTE;
  $("#statCount").textContent = "+" + Math.floor((PRODUCTS.length + SPICES.length) / 10) * 10;

  // ===== القائمة في الموبايل =====
  const nav = $("#nav"), menuBtn = $("#menuBtn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); }
  });

  // ===== حالة الطلب =====
  let quote = [];
  try { quote = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { quote = []; }
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(quote)); } catch {} };
  const inQuote = (key) => quote.some((q) => q.key === key);

  // كل عنصر بالطلب: { key, name, img, sizes, size, qty, unit }
  function toggleItem(item) {
    const i = quote.findIndex((q) => q.key === item.key);
    if (i >= 0) { quote.splice(i, 1); toast(`شلنا «${item.name}» من الطلب`); }
    else { quote.push({ qty: 1, ...item }); toast(`✓ أضفنا «${item.name}» للطلب`); }
    save(); syncAll();
  }

  // ===== المنتجات =====
  const norm = (s) => s.replace(/[ً-ْـ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").toLowerCase();
  let activeCat = "all", query = "";
  const selectedSize = {};

  const tabs = $("#tabs");
  const tabData = [{ id: "all", name: "الكل" }, ...CATEGORIES];
  tabs.innerHTML = tabData.map((c) => {
    const n = c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c.id).length;
    return `<button class="tab" role="tab" type="button" data-cat="${c.id}" aria-selected="${c.id === activeCat}">${c.icon ? c.icon + " " : ""}${c.name}<small>${n}</small></button>`;
  }).join("");
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".tab"); if (!b) return;
    activeCat = b.dataset.cat;
    $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", t === b));
    renderGrid();
  });
  $("#search").addEventListener("input", (e) => { query = norm(e.target.value.trim()); renderGrid(); });

  const productImg = (p) => `img/products/${p.id}.webp`;

  function renderGrid() {
    const list = PRODUCTS.filter((p) =>
      (activeCat === "all" || p.cat === activeCat) &&
      (!query || norm(p.name + " " + (p.note || "") + " " + p.sizes.join(" ")).includes(query)));
    $("#empty").hidden = list.length > 0;
    $("#grid").innerHTML = list.map((p, i) => {
      const size = selectedSize[p.id] ?? p.sizes[0];
      const added = inQuote("p:" + p.id);
      return `<article class="card" style="animation-delay:${Math.min(i, 12) * 30}ms">
        <div class="card-img${p.photo ? " photo" : ""}">
          ${p.tags ? `<span class="tag">${esc(p.tags[0])}</span>` : ""}
          <img src="${productImg(p)}" alt="${esc(p.name)}" loading="lazy" decoding="async" width="380" height="600">
        </div>
        <div class="card-body">
          <h3>${esc(p.name)}</h3>
          ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}
          <div class="sizes" role="group" aria-label="الحجم">
            ${p.sizes.map((s) => `<button type="button" class="size" data-id="${p.id}" data-size="${esc(s)}" aria-pressed="${s === size}">${esc(s)}</button>`).join("")}
          </div>
          <button type="button" class="add${added ? " in" : ""}" data-add="${p.id}">${added ? "✓ بالطلب" : "+ أضف للطلب"}</button>
        </div>
      </article>`;
    }).join("");
  }

  $("#grid").addEventListener("click", (e) => {
    const s = e.target.closest(".size");
    if (s) {
      selectedSize[s.dataset.id] = s.dataset.size;
      $$(`.size[data-id="${s.dataset.id}"]`).forEach((b) => b.setAttribute("aria-pressed", b === s));
      const q = quote.find((x) => x.key === "p:" + s.dataset.id);
      if (q) { q.size = s.dataset.size; save(); renderQuote(); }
      return;
    }
    const a = e.target.closest("[data-add]");
    if (a) {
      const p = PRODUCTS.find((x) => x.id === a.dataset.add);
      toggleItem({ key: "p:" + p.id, name: p.name, img: productImg(p), sizes: p.sizes, size: selectedSize[p.id] ?? p.sizes[0], unit: "كرتونة" });
    }
  });

  // ===== البهارات =====
  $("#spiceChips").innerHTML = SPICES.map((s) => `<button type="button" class="chip" data-spice="${esc(s)}" aria-pressed="false">${esc(s)}</button>`).join("");
  $("#spiceChips").addEventListener("click", (e) => {
    const c = e.target.closest(".chip"); if (!c) return;
    toggleItem({ key: "s:" + c.dataset.spice, name: c.dataset.spice, icon: "🌶️", unit: "كرتونة" });
  });

  // ===== الماكينات =====
  $("#machineGrid").innerHTML = MACHINES.map((m) => `
    <article class="m-card${m.wide ? " wide" : ""}">
      <div class="m-img"><img src="img/machines/${m.id}.webp" alt="${esc(m.name)}" loading="lazy" decoding="async"></div>
      <div class="m-body">
        ${m.own ? `<span class="own">صناعة أبو عطية</span>` : ""}
        <h3>${esc(m.name)}</h3>
        <p class="model">${esc(m.model)}</p>
        <dl class="specs">${m.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        <button type="button" class="add" data-machine="${m.id}">+ اطلب عرض سعر</button>
      </div>
    </article>`).join("");
  $("#machineGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-machine]"); if (!b) return;
    const m = MACHINES.find((x) => x.id === b.dataset.machine);
    toggleItem({ key: "m:" + m.id, name: `${m.name} – ${m.model}`, img: `img/machines/${m.id}.webp`, unit: "قطعة" });
  });

  // ===== درج الطلب =====
  const drawer = $("#drawer"), scrim = $("#scrim");
  let lastFocus = null;
  function openQuote() {
    lastFocus = document.activeElement;
    drawer.hidden = scrim.hidden = false;
    document.body.style.overflow = "hidden";
    $("#closeQuote").focus();
  }
  function closeQuote() {
    drawer.hidden = scrim.hidden = true;
    document.body.style.overflow = "";
    lastFocus?.focus();
  }
  $("#openQuote").addEventListener("click", openQuote);
  $$("[data-open-quote]").forEach((b) => b.addEventListener("click", openQuote));
  $("#closeQuote").addEventListener("click", closeQuote);
  scrim.addEventListener("click", closeQuote);
  drawer.addEventListener("click", (e) => { if (e.target.closest("[data-close-quote]")) closeQuote(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) closeQuote(); });

  function renderQuote() {
    $("#qEmpty").hidden = quote.length > 0;
    $("#qForm").hidden = quote.length === 0;
    $("#qList").innerHTML = quote.map((q, i) => `
      <li class="q-item">
        ${q.img ? `<img src="${q.img}" alt="" loading="lazy">` : `<span class="ph">${q.icon || "📦"}</span>`}
        <div>
          <h4>${esc(q.name)}</h4>
          <div class="q-ctrl">
            ${q.sizes && q.sizes.length > 1 ? `<select data-i="${i}" data-f="size" aria-label="الحجم">${q.sizes.map((s) => `<option${s === q.size ? " selected" : ""}>${esc(s)}</option>`).join("")}</select>` : ""}
            <input type="number" min="1" inputmode="numeric" value="${q.qty}" data-i="${i}" data-f="qty" aria-label="الكمية">
            <select data-i="${i}" data-f="unit" aria-label="الوحدة">${UNITS.map((u) => `<option${u === q.unit ? " selected" : ""}>${u}</option>`).join("")}</select>
          </div>
        </div>
        <button type="button" class="q-remove" data-rm="${i}" aria-label="حذف ${esc(q.name)}">✕</button>
      </li>`).join("");
  }
  $("#qList").addEventListener("change", (e) => {
    const el = e.target; if (!el.dataset.f) return;
    const q = quote[el.dataset.i];
    q[el.dataset.f] = el.dataset.f === "qty" ? Math.max(1, parseInt(el.value, 10) || 1) : el.value;
    if (el.dataset.f === "size" && q.key.startsWith("p:")) selectedSize[q.key.slice(2)] = el.value;
    save(); syncAll(false);
  });
  $("#qList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-rm]"); if (!b) return;
    quote.splice(+b.dataset.rm, 1); save(); syncAll();
  });

  $("#qForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const name = f.get("name").trim(), city = f.get("city").trim();
    $("#formError").hidden = !!(name && city);
    if (!name || !city) return;
    const lines = quote.map((q, i) => `${i + 1}) ${q.name}${q.size ? " – " + q.size : ""} × ${q.qty} ${q.unit}`);
    const shop = f.get("shop").trim(), notes = f.get("notes").trim();
    const msg = [
      "مرحباً أبو عطية 👋",
      "بدي عرض سعر جملة للأصناف التالية:",
      "",
      ...lines,
      "",
      `الاسم: ${name}`,
      shop ? `المحل/الشركة: ${shop}` : null,
      `المدينة: ${city}`,
      notes ? `ملاحظات: ${notes}` : null,
    ].filter((l) => l !== null).join("\n");
    window.open(waLink(msg), "_blank", "noopener");
  });

  // ===== مزامنة الواجهة =====
  const badge = $("#quoteCount");
  function syncAll(rerenderGrid = true) {
    badge.hidden = quote.length === 0;
    if (badge.textContent !== String(quote.length)) {
      badge.textContent = quote.length;
      badge.classList.remove("pop"); void badge.offsetWidth; badge.classList.add("pop");
    }
    $$(".chip").forEach((c) => c.setAttribute("aria-pressed", inQuote("s:" + c.dataset.spice)));
    $$("[data-machine]").forEach((b) => {
      const on = inQuote("m:" + b.dataset.machine);
      b.classList.toggle("in", on); b.textContent = on ? "✓ بالطلب" : "+ اطلب عرض سعر";
    });
    if (rerenderGrid) {
      $$("[data-add]").forEach((b) => {
        const on = inQuote("p:" + b.dataset.add);
        b.classList.toggle("in", on); b.textContent = on ? "✓ بالطلب" : "+ أضف للطلب";
      });
      renderQuote();
    }
  }

  let toastTimer;
  function toast(text) {
    const t = $("#toast");
    t.textContent = text; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  renderGrid();
  syncAll();
})();
