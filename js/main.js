/* =====================================================
   EXXCLUSIVO TRANSPORTES – Main JS
===================================================== */

'use strict';

// ===== AOS INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

const handleNavbarScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navMenu?.querySelectorAll('.nav-link, .navbar__cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu on backdrop click
document.addEventListener('click', (e) => {
  if (navMenu?.classList.contains('open') && !navMenu.contains(e.target) && e.target !== hamburger) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
}, { passive: true });

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== COUNTER ANIMATION =====
const animateCounter = (el, target, duration = 1600) => {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease-out quad
    const eased = 1 - Math.pow(1 - progress, 2);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
};

// Intersection Observer for counters
const statsSection = document.querySelector('.stats-strip');
let countersStarted = false;

if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        document.querySelectorAll('.stat-number[data-target]').forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
        });
      }
    });
  }, { threshold: 0.4 });

  observer.observe(statsSection);
}

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== BOOKING FORM – WhatsApp Integration =====
const bookingForm = document.getElementById('bookingForm');

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome      = document.getElementById('nome')?.value.trim();
  const telefone  = document.getElementById('telefone')?.value.trim();
  const origem    = document.getElementById('origem')?.value.trim();
  const destino   = document.getElementById('destino')?.value.trim();
  const data      = document.getElementById('data')?.value;
  const hora      = document.getElementById('hora')?.value;
  const obs       = document.getElementById('observacao')?.value.trim();

  // Simple validation
  if (!nome || !telefone || !origem || !destino || !data || !hora) {
    showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }

  // Format date
  const dateFormatted = data
    ? new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
      })
    : '';

  const timeFormatted = hora ? hora.replace(':', 'h') + 'min' : '';

  const message = [
    `🚗 *SOLICITAÇÃO DE CORRIDA – EXXCLUSIVO TRANSPORTES*`,
    ``,
    `👤 *Nome:* ${nome}`,
    `📱 *Telefone:* ${telefone}`,
    ``,
    `📍 *Origem:* ${origem}`,
    `🏁 *Destino:* ${destino}`,
    ``,
    `📅 *Data:* ${dateFormatted}`,
    `⏰ *Horário:* ${timeFormatted}`,
    obs ? `\n📝 *Observações:* ${obs}` : '',
    ``,
    `_Mensagem enviada pelo site._`
  ].filter(Boolean).join('\n');

  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/5519995750193?text=${encoded}`;
  window.open(whatsappUrl, '_blank');

  showFormMessage('Redirecionando para o WhatsApp... 🚀', 'success');
  bookingForm.reset();
});

function showFormMessage(msg, type) {
  // Remove any existing message
  const existing = bookingForm?.querySelector('.form-message');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = `form-message form-message--${type}`;
  el.textContent = msg;

  // Inject styles inline
  Object.assign(el.style, {
    padding: '14px 20px',
    borderRadius: '10px',
    marginTop: '16px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textAlign: 'center',
    background: type === 'success'
      ? 'rgba(37, 211, 102, 0.12)'
      : 'rgba(239, 68, 68, 0.12)',
    border: `1px solid ${type === 'success' ? 'rgba(37, 211, 102, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
    color: type === 'success' ? '#25D366' : '#EF4444',
    transition: 'all 0.3s ease'
  });

  bookingForm?.appendChild(el);

  // Auto remove after 5s
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 400);
  }, 5000);
}

// ===== NAVBAR ACTIVE LINK on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar__menu .nav-link');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeLinkObserver.observe(s));

// ===== GOLD SHIMMER on hero title =====
const heroGoldSpan = document.querySelector('.hero__title .text-gold');
if (heroGoldSpan) {
  heroGoldSpan.classList.add('text-gold-shimmer');
}

// ===== LAZY LOAD images (fallback) =====
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Intersection Observer fallback
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imgObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ===== SERVICE CARDS – tilt micro-interaction =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotX = ((y - midY) / midY) * -5;
    const rotY = ((x - midX) / midX) * 5;
    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

// ===== Phone input mask =====
const telInput = document.getElementById('telefone');
telInput?.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').substring(0, 11);
  if (v.length >= 7) {
    v = v.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2$3-$4');
  } else if (v.length >= 3) {
    v = v.replace(/^(\d{2})(\d+)/, '($1) $2');
  }
  e.target.value = v;
});

// ===== PAGE LOADING FADE IN =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
