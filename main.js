document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR ────────────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  navToggle && navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    const open = navMobile.classList.contains('open');
    navToggle.innerHTML = open
      ? '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });

  navMobile && navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navToggle.innerHTML = '<svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  });

  // ─── SCROLL REVEAL ─────────────────────────────────────────
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));

  // ─── HERO COUNTER ──────────────────────────────────────────
  const cio = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = target === 100 ? '%' : '+';
      let current = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target + suffix; clearInterval(timer); }
        else el.textContent = Math.ceil(current) + suffix;
      }, 20);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(c => cio.observe(c));

  // ─── ENVIRONMENTS CAROUSEL ─────────────────────────────────
  const envList = document.getElementById('envList');
  document.getElementById('envNext')?.addEventListener('click', () => envList.scrollBy({ left: 200, behavior: 'smooth' }));
  document.getElementById('envPrev')?.addEventListener('click', () => envList.scrollBy({ left: -200, behavior: 'smooth' }));

  // ─── ENVIRONMENT → FILTER ──────────────────────────────────
  window.filterByEnvironment = function(ambiente) {
    const radio = document.querySelector(`input[name="uso"][value="${ambiente}"]`);
    if (radio) radio.checked = true;
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => applyFilters(), 600);
  };

  // ─── IMAGEM INDIVIDUAL POR PRODUTO ────────────────────────
  const IMG = {
    '3 Tonos':                '/images/products/3-tonos.jpg',
    'Astral':                 '/images/products/astral.jpg',
    'Astral MB':              '/images/products/astral-mb.jpg',
    'Connect Colours':        '/images/products/connect-colours.jpg',
    'Element':                '/images/products/element.jpg',
    'Estudio':                '/images/products/estudio.jpg',
    'Flair':                  '/images/products/flair.jpg',
    'Fuse':                   '/images/products/fuse.jpg',
    'Graphic':                '/images/products/graphic.jpg',
    'Grid':                   '/images/products/grid.jpg',
    'Interlude':              '/images/products/interlude.jpg',
    'Kinetic':                '/images/products/kinetic.jpg',
    'Layout':                 '/images/products/layout.jpg',
    'Metrópolis':             '/images/products/metropolis.jpg',
    'Metrópolis Transitions': '/images/products/metropolis-transitions.jpg',
    'Mosaic':                 '/images/products/mosaic.jpg',
    'Pixel':                  '/images/products/pixel.jpg',
    'Rythm':                  '/images/products/rythm.jpg',
    'Spectrum':               '/images/products/spectrum.jpg',
    'B_ Confort Comercial':   '/images/products/b-confort-comercial.jpg',
    'Berber Point 650':       '/images/products/berber-point-650.jpg',
    'Berber Point 920':       '/images/products/berber-point-920.jpg',
    'Classic Mystique PUR':   '/images/products/classic-mystique.jpg',
    'Cosmos':                 '/images/products/cosmos.jpg',
    'Gallery':                '/images/products/gallery.jpg',
    'Jazz':                   '/images/products/jazz.jpg',
    'Noblesse':               '/images/products/noblesse.jpg',
    'Opera':                  '/images/products/opera.jpg',
    'Palazzo':                '/images/products/palazzo.jpg',
    'Prestige':               '/images/products/prestige.jpg',
    'Texture':                '/images/products/texture-carpet.jpg',
    'Timeless':               '/images/products/timeless.jpg',
    'B_ Confort Residencial': '/images/products/b-confort-residencial.jpg',
    'Castilla':               '/images/products/castilla.jpg',
    'Disco':                  '/images/products/disco.jpg',
    'Lush':                   '/images/products/lush.jpg',
    'Piano':                  '/images/products/piano.jpg',
    'Sensation':              '/images/products/sensation.jpg',
    'Sienna':                 '/images/products/sienna.jpg',
    'Soft Sense':             '/images/products/soft-sense.jpg',
    'Tango':                  '/images/products/tango.jpg',
    'Fiji':                   '/images/products/fiji.jpg',
    'Natural':                '/images/products/natural-grass.jpg',
    'Rio':                    '/images/products/rio.jpg',
    'Zoom':                   '/images/products/zoom.jpg',
    'Harmony':                '/images/products/harmony.jpg',
    'Momentum':               '/images/products/momentum.jpg',
    'Pure':                   '/images/products/pure.jpg',
    'Wave':                   '/images/products/wave.jpg',
    'Vibe':                   '/images/products/vibe.jpg',
    'Prism':                  '/images/products/prism.jpg',
    'Orbit':                  '/images/products/orbit.jpg',
    'Trident':                '/images/products/trident.jpg',
    'Baltimore':              '/images/products/baltimore.jpg',
    'City Square':            '/images/products/city-square.jpg',
    'Colorstone':             '/images/products/colorstone.jpg',
    'Dolomite':               '/images/products/dolomite.jpg',
    'Gristone':               '/images/products/gristone.jpg',
    'Luxor':                  '/images/products/luxor.jpg',
    'Marathon 1000':          '/images/products/marathon-1000.jpg',
    'Newcast':                '/images/products/newcast.jpg',
    'Pattern':                '/images/products/pattern.jpg',
    'Plus':                   '/images/products/plus.jpg',
    'Quartz':                 '/images/products/quartz.jpg',
    'Stone':                  '/images/products/stone.jpg',
    'Timberland':             '/images/products/timberland.jpg',
    'Vision':                 '/images/products/vision.jpg',
  };

  function getImg(name) {
    return IMG[name] || '/images/products/pool-modular-1.jpg';
  }

  // ─── 66 PRODUTOS BELGOTEX (exatos) ─────────────────────────
  const PRODUCTS = [
    // Carpetes Modulares — 19 produtos
    { name: '3 Tonos',               sub: 'uma inspiração',                         tipo: 'carpete-modular',     uso: 'comercio',   cores: ['#C8A882','#8B6F55','#5C4033','#9E8B7A'] },
    { name: 'Astral',                sub: 'viva!',                                  tipo: 'carpete-modular',     uso: 'comercio',   cores: ['#D4C8B8','#A89880','#8B7D6B','#6B5E4F'] },
    { name: 'Astral MB',             sub: 'boas energias',                          tipo: 'carpete-modular',     uso: 'comercio',   cores: ['#B8B0A0','#9A9282','#7C7465','#5E5648'] },
    { name: 'Connect Colours',       sub: 'design que conecta',                     tipo: 'carpete-modular',     uso: 'escritorio', cores: ['#E8D4C0','#C4A882','#A07850','#7C5430'] },
    { name: 'Element',               sub: 'design moderno e funcional',             tipo: 'carpete-modular',     uso: 'escritorio', cores: ['#B4A898','#9A8C7C','#806E60','#665042'] },
    { name: 'Estudio',               sub: 'criatividade sem limites',               tipo: 'carpete-modular',     uso: 'comercio',   cores: ['#7B9C54','#5A7240','#9ABE6E','#B8D490'] },
    { name: 'Flair',                 sub: 'estilo e personalidade',                 tipo: 'carpete-modular',     uso: 'escritorio', cores: ['#D4C8B4','#B4A890','#9A8E70','#807450'] },
    { name: 'Fuse',                  sub: 'conectando espaços',                     tipo: 'carpete-modular',     uso: 'comercio',   cores: ['#8B8B8B','#6B6B6B','#ABABAB','#CBCBCB'] },
    { name: 'Graphic',               sub: 'expressão gráfica',                      tipo: 'carpete-modular',     uso: 'escritorio', cores: ['#4A4A4A','#6A6A6A','#8A8A8A','#AAAAAA'] },
    { name: 'Grid',                  sub: 'ordem e harmonia',                       tipo: 'carpete-modular',     uso: 'banco',      cores: ['#3A5A7A','#2A4A6A','#4A6A8A','#6A8AAA'] },
    { name: 'Interlude',             sub: 'design inovador',                        tipo: 'carpete-modular',     uso: 'hotel',      cores: ['#6B7062','#B4B09C','#9E9A84','#8B8673','#7A7563'] },
    { name: 'Kinetic',               sub: 'movimento e energia',                    tipo: 'carpete-modular',     uso: 'escritorio', cores: ['#C05A3A','#A04A2A','#804020','#603010'] },
    { name: 'Layout',                sub: 'dividindo espaços — conectando pessoas', tipo: 'carpete-modular',     uso: 'escritorio', cores: ['#8B8B8B','#D4CCC4','#A19E94','#C4B5A0','#7A7A7A'] },
    { name: 'Metrópolis',            sub: 'icônico dinamismo',                      tipo: 'carpete-modular',     uso: 'comercio',   cores: ['#1B3A6B','#3A3A3A','#9E9E9E','#C4A48A','#6B5449'] },
    { name: 'Metrópolis Transitions',sub: 'uma ode em cores',                       tipo: 'carpete-modular',     uso: 'comercio',   cores: ['#7B6B5E','#4A4A4A','#B4A393','#8B6F55','#A85F3C'] },
    { name: 'Mosaic',                sub: 'arte em mosaico',                        tipo: 'carpete-modular',     uso: 'hotel',      cores: ['#5A3A2A','#7A5A4A','#9A7A6A','#BAA090'] },
    { name: 'Pixel',                 sub: 'inovação digital',                       tipo: 'carpete-modular',     uso: 'escritorio', cores: ['#2A4A6A','#4A6A8A','#6A8AAA','#8AAACA'] },
    { name: 'Rythm',                 sub: 'ritmo constante',                        tipo: 'carpete-modular',     uso: 'escritorio', cores: ['#E0D4C0','#C0B4A0','#A09480','#807460'] },
    { name: 'Spectrum',              sub: 'espectro de cores',                      tipo: 'carpete-modular',     uso: 'escola',     cores: ['#C03A3A','#3A80C0','#80C03A','#C0A03A'] },
    // Carpetes comerciais — 13 produtos
    { name: 'B_ Confort Comercial',  sub: 'caminhar nas nuvens',                    tipo: 'carpete-comercial',   uso: 'comercio',   cores: ['#D4C8B8','#B4A898','#9A8878','#807460'] },
    { name: 'Berber Point 650',      sub: 'resistência e custo-benefício',          tipo: 'carpete-comercial',   uso: 'escritorio', cores: ['#D4C0A0','#B4A080','#947060','#745040'] },
    { name: 'Berber Point 920',      sub: 'resistência absoluta',                   tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#C8C0B0','#A8A090','#888070','#686050'] },
    { name: 'Classic Mystique PUR',  sub: 'alta resistência',                       tipo: 'carpete-comercial',   uso: 'comercio',   cores: ['#7A7A7A','#5A5A5A','#9A9A9A','#BABABA'] },
    { name: 'Cosmos',                sub: 'infinitas possibilidades',               tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#4A3A2A','#6A5A4A','#8A7A6A','#AAA090'] },
    { name: 'Gallery',               sub: 'arte no seu espaço',                     tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#B8A888','#988868','#786848','#584828'] },
    { name: 'Jazz',                  sub: 'ritmo e elegância',                      tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#8A6A4A','#6A4A2A','#AA8A6A','#CAAAA8'] },
    { name: 'Noblesse',              sub: 'nobreza e refinamento',                  tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#C0A880','#A08860','#806840','#604820'] },
    { name: 'Opera',                 sub: 'performance e beleza',                   tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#2A3A5A','#4A5A7A','#6A7A9A','#8A9ABA'] },
    { name: 'Palazzo',               sub: 'grandiosidade italiana',                 tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#5A4A3A','#7A6A5A','#9A8A7A','#BAAA9A'] },
    { name: 'Prestige',              sub: 'prestígio e sofisticação',               tipo: 'carpete-comercial',   uso: 'banco',      cores: ['#3A2A1A','#5A4A3A','#7A6A5A','#9A8A7A'] },
    { name: 'Texture',               sub: 'textura que encanta',                    tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#8A7A6A','#6A5A4A','#AAA090','#CAC0B0'] },
    { name: 'Timeless',              sub: 'atemporal e elegante',                   tipo: 'carpete-comercial',   uso: 'hotel',      cores: ['#C8B898','#A89878','#887858','#685838'] },
    // Carpetes residenciais — 9 produtos
    { name: 'B_ Confort Residencial',sub: 'caminhar nas nuvens',                    tipo: 'carpete-residencial', uso: 'casa',       cores: ['#E0D0C0','#C0B0A0','#A09080','#807060'] },
    { name: 'Castilla',              sub: 'conforto com ótimo custo-benefício',     tipo: 'carpete-residencial', uso: 'casa',       cores: ['#D8C8A8','#B8A888','#988868','#787848'] },
    { name: 'Disco',                 sub: 'expressão e luxo',                       tipo: 'carpete-residencial', uso: 'hotel',      cores: ['#7B9C54','#5A7240','#9ABE6E','#B8D490'] },
    { name: 'Lush',                  sub: 'luxo e conforto',                        tipo: 'carpete-residencial', uso: 'hotel',      cores: ['#C8B090','#A89070','#887050','#685030'] },
    { name: 'Piano',                 sub: 'harmonia em tons',                       tipo: 'carpete-residencial', uso: 'casa',       cores: ['#D0C8B8','#B0A898','#908880','#706860'] },
    { name: 'Sensation',             sub: 'sensações únicas',                       tipo: 'carpete-residencial', uso: 'casa',       cores: ['#C8B0A0','#A89080','#887060','#685040'] },
    { name: 'Sienna',                sub: 'tons da terra',                          tipo: 'carpete-residencial', uso: 'casa',       cores: ['#C08060','#A06040','#804020','#603010'] },
    { name: 'Soft Sense',            sub: 'a escolha inteligente e sustentável',    tipo: 'carpete-residencial', uso: 'casa',       cores: ['#A8A8A8','#B4A89C','#8B8B8B','#D4C8BC'] },
    { name: 'Tango',                 sub: 'elegância e conforto em harmonia',       tipo: 'carpete-residencial', uso: 'hotel',      cores: ['#8B7062','#C4A882','#6B5040'] },
    // Gramas sinteticas — 4 produtos
    { name: 'Fiji',                  sub: 'leveza e naturalidade',                  tipo: 'grama-sintetica',     uso: 'jardim',     cores: ['#4A8A40','#3A7030','#5AA050','#6AB060'] },
    { name: 'Natural',               sub: 'conexão com a natureza',                 tipo: 'grama-sintetica',     uso: 'jardim',     cores: ['#5A9A50','#4A8A40','#6AAA60','#3A7030'] },
    { name: 'Rio',                   sub: 'alegria e vibração',                     tipo: 'grama-sintetica',     uso: 'jardim',     cores: ['#3A7A30','#2A6A20','#4A8A40','#5A9A50'] },
    { name: 'Zoom',                  sub: 'dinâmico e moderno',                     tipo: 'grama-sintetica',     uso: 'jardim',     cores: ['#4A8030','#3A7020','#5A9040','#6AA050'] },
    // Pisos vinilicos em manta — 8 produtos
    { name: 'Harmony',               sub: 'equilíbrio perfeito',                    tipo: 'piso-vinilico-manta', uso: 'hospital',   cores: ['#F0EDE8','#D8D4CE','#C0BCB6','#A8A4A0'] },
    { name: 'Momentum',              sub: 'força e dinamismo',                      tipo: 'piso-vinilico-manta', uso: 'escola',     cores: ['#E8EAF0','#C8CAD0','#A8AAB0','#888A90'] },
    { name: 'Pure',                  sub: 'pureza e simplicidade',                  tipo: 'piso-vinilico-manta', uso: 'hospital',   cores: ['#F4F2EE','#E0DCDA','#CCCAC6','#B8B6B2'] },
    { name: 'Wave',                  sub: 'ondas de estilo',                        tipo: 'piso-vinilico-manta', uso: 'hospital',   cores: ['#D0E8E0','#B0C8C0','#90A8A0','#708880'] },
    { name: 'Vibe',                  sub: 'vibrações positivas',                    tipo: 'piso-vinilico-manta', uso: 'escola',     cores: ['#E0E8F0','#C0C8D0','#A0A8B0','#808890'] },
    { name: 'Prism',                 sub: 'cores em prisma',                        tipo: 'piso-vinilico-manta', uso: 'escola',     cores: ['#F0D8D0','#D0B8B0','#B09890','#907870'] },
    { name: 'Orbit',                 sub: 'movimento circular',                     tipo: 'piso-vinilico-manta', uso: 'banco',      cores: ['#D8E0E8','#B8C0C8','#98A0A8','#788088'] },
    { name: 'Trident',               sub: 'força em três dimensões',                tipo: 'piso-vinilico-manta', uso: 'banco',      cores: ['#C8C0B8','#A8A098','#888078','#686058'] },
    // Pisos vinilicos — 14 produtos
    { name: 'Baltimore',             sub: 'plural sofisticação',                    tipo: 'piso-vinilico',       uso: 'comercio',   cores: ['#C8A87A','#A88858','#886838','#684818'] },
    { name: 'City Square',           sub: 'perfeita sintonia',                      tipo: 'piso-vinilico',       uso: 'escritorio', cores: ['#B0A890','#908878','#706858','#504838'] },
    { name: 'Colorstone',            sub: 'fácil de manter e limpar',               tipo: 'piso-vinilico',       uso: 'casa',       cores: ['#D8D0C8','#B8B0A8','#989088','#787068'] },
    { name: 'Dolomite',              sub: 'naturalidade e elegância',               tipo: 'piso-vinilico',       uso: 'casa',       cores: ['#E0D8D0','#C0B8B0','#A09890','#807870'] },
    { name: 'Gristone',              sub: 'sofisticação atemporal',                 tipo: 'piso-vinilico',       uso: 'escritorio', cores: ['#C8C8C8','#A8A8A8','#888888','#686868'] },
    { name: 'Luxor',                 sub: 'elegância atemporal',                    tipo: 'piso-vinilico',       uso: 'hotel',      cores: ['#D8C8A8','#B8A888','#988868','#786848'] },
    { name: 'Marathon 1000',         sub: 'alta performance',                       tipo: 'piso-vinilico',       uso: 'comercio',   cores: ['#A09080','#807060','#605040','#403020'] },
    { name: 'Newcast',               sub: 'modernidade e conforto',                 tipo: 'piso-vinilico',       uso: 'escritorio', cores: ['#B49F7E','#A89475','#9A8668','#8B7C5F'] },
    { name: 'Pattern',               sub: 'padrões únicos',                         tipo: 'piso-vinilico',       uso: 'escritorio', cores: ['#C8B898','#A89878','#887858','#685838'] },
    { name: 'Plus',                  sub: 'mais estilo para seu ambiente',          tipo: 'piso-vinilico',       uso: 'comercio',   cores: ['#D0C8B8','#B0A898','#908878','#706858'] },
    { name: 'Quartz',                sub: 'brilho e resistência',                   tipo: 'piso-vinilico',       uso: 'comercio',   cores: ['#E0D8D0','#C0B8B0','#A09890','#807870'] },
    { name: 'Stone',                 sub: 'solidez natural',                        tipo: 'piso-vinilico',       uso: 'escritorio', cores: ['#C8C0B8','#A8A0A0','#888090','#685870'] },
    { name: 'Timberland',            sub: 'sofisticação da madeira',                tipo: 'piso-vinilico',       uso: 'casa',       cores: ['#C8A068','#A88048','#886028','#684008'] },
    { name: 'Vision',                sub: 'visão de futuro',                        tipo: 'piso-vinilico',       uso: 'escritorio', cores: ['#D0D8E0','#B0B8C0','#9098A0','#707880'] },
  ];

  // ─── CATÁLOGO STATE ────────────────────────────────────────
  let PER_PAGE = 12;
  let filteredProducts = [...PRODUCTS];
  let currentPage = 1;

  const grid       = document.getElementById('catalogoGrid');
  const countFrom  = document.getElementById('countFrom');
  const countTo    = document.getElementById('countTo');
  const countTotal = document.getElementById('countTotal');
  const searchInput= document.getElementById('searchInput');
  const ordenar    = document.getElementById('ordenar');
  const perPageSel = document.getElementById('perPage');

  function renderCatalogo() {
    if (!grid) return;
    const total = filteredProducts.length;
    const from  = Math.min((currentPage - 1) * PER_PAGE + 1, total);
    const to    = Math.min(currentPage * PER_PAGE, total);
    const page  = filteredProducts.slice(from - 1, to);

    if (countFrom)  countFrom.textContent  = total === 0 ? 0 : from;
    if (countTo)    countTo.textContent    = to;
    if (countTotal) countTotal.textContent = total;

    grid.innerHTML = page.map((p) => {
      const src  = getImg(p.name);
      const dots  = p.cores.map(c => `<span class="produto-color-dot" style="background:${c}" title="${c}"></span>`).join('');
      return `
      <div class="produto-card" data-uso="${p.uso}" data-tipo="${p.tipo}">
        <div class="produto-card__img">
          <img src="${src}" alt="${p.name}" loading="lazy">
          <div class="produto-card__overlay">
            <div class="produto-card__cores">${dots}</div>
          </div>
        </div>
        <h3 class="produto-card__name">${p.name}</h3>
        <p class="produto-card__sub">${p.sub}</p>
      </div>`;
    }).join('');

    renderPagination(total);
  }

  function renderPagination(total) {
    const totalPages = Math.ceil(total / PER_PAGE);
    const wrap = document.getElementById('paginacao');
    if (!wrap) return;
    if (totalPages <= 1) { wrap.innerHTML = ''; return; }

    let html = '';
    html += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goPage(${currentPage - 1})">‹</button>`;
    for (let p = 1; p <= totalPages; p++) {
      html += `<button class="page-btn ${p === currentPage ? 'active' : ''}" onclick="goPage(${p})">${p}</button>`;
    }
    html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goPage(${currentPage + 1})">›</button>`;
    wrap.innerHTML = html;
  }

  window.goPage = function(p) {
    currentPage = p;
    renderCatalogo();
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  function applyFilters() {
    const uso   = document.querySelector('input[name="uso"]:checked')?.value   || '';
    const tipo  = document.querySelector('input[name="tipo"]:checked')?.value  || '';
    const q     = searchInput?.value.toLowerCase().trim() || '';
    const ord   = ordenar?.value || 'lancamento';

    filteredProducts = PRODUCTS.filter(p =>
      (!uso   || p.uso  === uso)  &&
      (!tipo  || p.tipo === tipo) &&
      (!q     || p.name.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q))
    );

    if (ord === 'nome-az') filteredProducts.sort((a,b) => a.name.localeCompare(b.name));
    if (ord === 'nome-za') filteredProducts.sort((a,b) => b.name.localeCompare(a.name));

    currentPage = 1;
    renderCatalogo();
  }

  // ─── EVENT LISTENERS ───────────────────────────────────────
  document.getElementById('btnAplicar')?.addEventListener('click', applyFilters);

  document.getElementById('btnLimpar')?.addEventListener('click', () => {
    document.querySelectorAll('input[name="uso"], input[name="tipo"]').forEach(r => r.checked = false);
    if (searchInput) searchInput.value = '';
    if (ordenar) ordenar.value = 'lancamento';
    if (perPageSel) { perPageSel.value = '12'; PER_PAGE = 12; }
    filteredProducts = [...PRODUCTS];
    currentPage = 1;
    renderCatalogo();
  });

  searchInput?.addEventListener('input', applyFilters);
  ordenar?.addEventListener('change', applyFilters);
  perPageSel?.addEventListener('change', () => {
    PER_PAGE = parseInt(perPageSel.value, 10);
    currentPage = 1;
    renderCatalogo();
  });

  // Suporte clique nos radio sem botão aplicar
  document.querySelectorAll('input[name="uso"], input[name="tipo"]').forEach(r => {
    r.addEventListener('change', applyFilters);
  });

  // ─── FAQ ACCORDION ─────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  // ─── CONTACT FORM ──────────────────────────────────────────
  document.getElementById('formContato')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Enviado!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Enviar mensagem'; btn.disabled = false; e.target.reset(); }, 3000);
  });

  // ─── INIT ──────────────────────────────────────────────────
  renderCatalogo();

});
