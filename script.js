document.addEventListener('DOMContentLoaded', () => {
  // Language Toggle
  const langBtns = document.querySelectorAll('.lang-toggle button');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      langBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

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

  // Modal logic for "Engineering Decisions"
  const modalOverlay = document.getElementById('decisionModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.querySelector('.close-modal');

  const openModal = (htmlContent) => {
    modalContent.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // restore scrolling
  };

  // Add click listener to all cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const decisionsHTML = card.querySelector('.engineering-decisions').innerHTML;
      openModal(decisionsHTML);
    });
  });

  // Prevent btn click from bubbling up (though it's functionally harmless here)
  const detailsBtns = document.querySelectorAll('.details-btn');
  detailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = e.target.closest('.project-card');
      const decisionsHTML = card.querySelector('.engineering-decisions').innerHTML;
      openModal(decisionsHTML);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});
