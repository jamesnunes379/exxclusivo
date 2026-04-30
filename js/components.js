/* =====================================================
   EXXCLUSIVO TRANSPORTES – Shared Components
   Navbar e Footer injetados em todas as páginas
===================================================== */

const WA_NUMBER = '5519995750193';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

const CITIES = [
  { name: 'Campinas',           slug: 'campinas' },
  { name: 'Valinhos',           slug: 'valinhos' },
  { name: 'Vinhedo',            slug: 'vinhedo' },
  { name: 'Paulínia',           slug: 'paulinia' },
  { name: 'Sumaré',             slug: 'sumare' },
  { name: 'Hortolândia',        slug: 'hortolandia' },
  { name: 'Indaiatuba',         slug: 'indaiatuba' },
  { name: 'Sorocaba',           slug: 'sorocaba' },
  { name: 'São Paulo',          slug: 'sao-paulo' },
  { name: 'Ribeirão Preto',     slug: 'ribeirao-preto' },
  { name: 'São José dos Campos',slug: 'sao-jose-dos-campos' },
  { name: 'Rio de Janeiro',     slug: 'rio-de-janeiro' },
  { name: 'Belo Horizonte',     slug: 'belo-horizonte' },
  { name: 'Curitiba',           slug: 'curitiba' },
  { name: 'Florianópolis',      slug: 'florianopolis' },
];

/* ---------- NAVBAR ---------- */
function renderNavbar(activePage = '') {
  const isSubPage = window.location.pathname.includes('/transporte-executivo-') ||
                    window.location.pathname.includes('/transfer-aeroporto-');
  const root = isSubPage ? '../' : '';

  const citiesLinks = CITIES.map(c =>
    `<a href="${root}transporte-executivo-${c.slug}.html"><i class="fas fa-chevron-right"></i> ${c.name}</a>`
  ).join('');

  return `
  <header id="navbar" class="navbar">
    <div class="container navbar__inner">
      <a href="${root}index.html" class="navbar__logo">
        <span class="logo-exx">EXX</span><span class="logo-clusivo">CLUSIVO</span>
        <span class="logo-sub">TRANSPORTES</span>
      </a>
      <button class="navbar__hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="navbar__menu" id="navMenu">
        <a href="${root}index.html#servicos" class="nav-link">Serviços</a>
        <a href="${root}index.html#frota" class="nav-link">Frota</a>
        <div class="nav-dropdown" id="citiesDropdown">
          <span class="nav-link nav-dropdown__toggle">
            Cidades <i class="fas fa-chevron-down"></i>
          </span>
          <div class="nav-dropdown__menu">
            ${citiesLinks}
            <div class="dropdown-divider"></div>
            <a href="${root}transfer-aeroporto-viracopos.html" class="dropdown-special">
              <i class="fas fa-plane"></i> Transfer Viracopos
            </a>
          </div>
        </div>
        <a href="${root}index.html#diferenciais" class="nav-link">Diferenciais</a>
        <a href="${root}index.html#depoimentos" class="nav-link">Depoimentos</a>
        <a href="${WA_BASE}?text=Olá!%20Gostaria%20de%20solicitar%20uma%20corrida%20executiva."
           target="_blank" class="btn btn--gold navbar__cta">
          <i class="fab fa-whatsapp"></i> Solicitar Corrida
        </a>

        <!-- Mobile only cities -->
        <div class="mobile-nav-cities">
          <button class="mobile-cities-toggle" id="mobileCitiesToggle">
            Cidades <i class="fas fa-chevron-down"></i>
          </button>
          <div class="mobile-cities-list" id="mobileCitiesList">
            ${CITIES.map(c =>
              `<a href="${root}transporte-executivo-${c.slug}.html">${c.name}</a>`
            ).join('')}
            <a href="${root}transfer-aeroporto-viracopos.html" style="color:var(--gold);font-weight:700;">✈ Transfer Viracopos</a>
          </div>
        </div>
      </nav>
    </div>
  </header>`;
}

/* ---------- FOOTER ---------- */
function renderFooter() {
  const isSubPage = window.location.pathname.includes('/transporte-executivo-') ||
                    window.location.pathname.includes('/transfer-aeroporto-');
  const root = isSubPage ? '../' : '';

  return `
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="${root}index.html" class="navbar__logo" style="display:inline-flex;margin-bottom:10px;">
          <span class="logo-exx">EXX</span><span class="logo-clusivo">CLUSIVO</span>
          <span class="logo-sub">TRANSPORTES</span>
        </a>
        <p class="footer__tagline">Conforto, Segurança e Pontualidade em cada viagem.</p>
      </div>
      <div class="footer__links">
        <h4>Cidades</h4>
        <ul>
          <li><a href="${root}transporte-executivo-campinas.html">Campinas</a></li>
          <li><a href="${root}transporte-executivo-sao-paulo.html">São Paulo</a></li>
          <li><a href="${root}transporte-executivo-sorocaba.html">Sorocaba</a></li>
          <li><a href="${root}transporte-executivo-curitiba.html">Curitiba</a></li>
          <li><a href="${root}transporte-executivo-rio-de-janeiro.html">Rio de Janeiro</a></li>
          <li><a href="${root}transfer-aeroporto-viracopos.html">Transfer Viracopos</a></li>
        </ul>
      </div>
      <div class="footer__contact">
        <h4>Contato</h4>
        <a href="${WA_BASE}" target="_blank" class="footer__contact-item">
          <i class="fab fa-whatsapp text-gold"></i> (19) 99575-0193
        </a>
        <a href="tel:+5519995750193" class="footer__contact-item">
          <i class="fas fa-phone-alt text-gold"></i> (19) 99575-0193
        </a>
        <div class="footer__social">
          <a href="${WA_BASE}" target="_blank" aria-label="WhatsApp" class="social-icon">
            <i class="fab fa-whatsapp"></i>
          </a>
          <a href="#" aria-label="Instagram" class="social-icon">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="Facebook" class="social-icon">
            <i class="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© 2025 EXXCLUSIVO TRANSPORTES. Todos os direitos reservados.</p>
    </div>
  </footer>

  <!-- WhatsApp Float -->
  <a href="${WA_BASE}?text=Olá!%20Gostaria%20de%20solicitar%20uma%20corrida%20executiva."
     target="_blank" class="whatsapp-float" aria-label="WhatsApp" title="Solicitar corrida">
    <i class="fab fa-whatsapp"></i>
    <span class="whatsapp-float__tooltip">Solicitar Corrida</span>
  </a>

  <!-- Back to top -->
  <button id="backToTop" class="back-to-top" aria-label="Voltar ao topo">
    <i class="fas fa-chevron-up"></i>
  </button>`;
}

/* ---------- INIT SHARED BEHAVIORS ---------- */
function initSharedBehaviors() {
  // AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });
  }

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });
  navMenu?.querySelectorAll('.nav-link, .navbar__cta').forEach(l =>
    l.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    })
  );

  // Desktop dropdown
  const dropdown = document.getElementById('citiesDropdown');
  dropdown?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => dropdown?.classList.remove('open'));

  // Mobile cities toggle
  const mobileCitiesToggle = document.getElementById('mobileCitiesToggle');
  const mobileCitiesList   = document.getElementById('mobileCitiesList');
  mobileCitiesToggle?.addEventListener('click', () => {
    mobileCitiesList?.classList.toggle('open');
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    })
  );
}

/* ---------- INJECT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Inject navbar
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = renderNavbar();

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = renderFooter();

  initSharedBehaviors();
});
