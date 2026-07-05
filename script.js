const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

if (burger && nav) {
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('aria-label', 'Мобильная навигация');
  mobileNav.innerHTML = nav.innerHTML + `
    <div class="mobile-nav__stores">
      <a href="#" class="store-link" aria-label="Скачать в App Store">
        <img src="images/badge-app-store.svg" alt="Загрузите в App Store" width="120" height="40" loading="lazy">
      </a>
      <a href="#" class="store-link" aria-label="Скачать в Google Play">
        <img src="images/badge-google-play.png" alt="Доступно в Google Play" width="135" height="40" loading="lazy">
      </a>
    </div>
    <a href="#request" class="btn btn--primary mobile-nav__cta">Спланировать поездку</a>
  `;
  document.body.appendChild(mobileNav);

  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('.step, .feature, .example-card, .dest-card, .review-card, .experience-card, .analysis-panel__inner, .app-download__inner').forEach(el => {
  el.classList.add('fade-in');
});

document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const input = document.querySelector('.search-form input');
    if (!input) return;
    if (tag.classList.contains('tag--soft')) {
      const current = input.value.trim();
      const addition = tag.textContent.trim();
      input.value = current ? `${current}, ${addition.toLowerCase()}` : addition;
    } else {
      input.value = tag.textContent + ', 2 человека';
    }
    input.focus();
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Отправлено ✓';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.opacity = '';
      form.reset();
    }, 2500);
  });
});
