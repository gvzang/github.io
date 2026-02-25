function setLanguage(lang) {
  // Set the lang attribute on the HTML tag. 
  // CSS handles hiding the .lang-en or .lang-es elements via this attribute!
  document.documentElement.lang = lang;

  // Update button active states
  const btns = document.querySelectorAll('.lang-toggle button');
  btns.forEach(btn => btn.classList.remove('active'));

  // Target the correct button
  const activeBtn = document.querySelector(`.text-${lang}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Save preference to localStorage so it remembers the user's choice
  localStorage.setItem('portfolio-language', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  // Check if a language was previously saved
  const savedLang = localStorage.getItem('portfolio-language');

  // Default to English, but if they saved Spanish, use it.
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    // Check browser preference
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'es') {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  }

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
