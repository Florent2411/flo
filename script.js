// Slider for awards section
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.awards-slider-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const items = document.querySelectorAll('.award-item');

  if (track && prevBtn && nextBtn && items.length > 0) {
    const itemWidth = items[0].getBoundingClientRect().width + 25; // width + gap
    let currentIndex = 0;

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });
  }
});

// Loading screen logic
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingProgress = document.getElementById('loading-progress');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.getElementById('main-content').style.display = 'flex';
      }, 500);
    }
    loadingProgress.style.width = progress + '%';
  }, 100);
});

// Typing effect
const texts = ["Project Manager", "Senior Developer", "DBA Oracle", "System Admin", "AI Enthusiast"];
let textIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById('typing');
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  if (!isDeleting) {
    typingElement.innerHTML += currentText.charAt(charIndex);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000); // Pause before deleting
      return;
    }
  } else {
    typingElement.innerHTML = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeWriter, 500); // Pause before typing next
      return;
    }
  }
  setTimeout(typeWriter, isDeleting ? 50 : 100);
}

window.addEventListener('load', typeWriter);

// Smooth scrolling for navigation
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Active navigation on scroll
const sections = document.querySelectorAll('section[id], main[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

const observerOptions = {
  root: null,
  rootMargin: '-50px 0px -50px 0px',
  threshold: 0.1
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.parentElement.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  navObserver.observe(section);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-width') || '90%';
    }
  });
});
skillBars.forEach(bar => {
  observer.observe(bar);
});

// Modal functionality for award images
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.award-image img').forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = 'block';
    modalImg.src = this.src;
  });
});

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Projects slider functionality
document.addEventListener('DOMContentLoaded', () => {
  const projectsTrack = document.querySelector('.projects-slider-track');
  const projectsPrevBtn = document.querySelector('.projects-prev-btn');
  const projectsNextBtn = document.querySelector('.projects-next-btn');
  const projectsItems = document.querySelectorAll('.project-item');
  const projectsItemWidth = projectsItems[0].getBoundingClientRect().width + 600; // width + gap
  let projectsCurrentIndex = 0;

  function updateProjectsSlider() {
    projectsTrack.style.transform = `translateX(-${projectsCurrentIndex * projectsItemWidth}px)`;
  }

  projectsPrevBtn.addEventListener('click', () => {
    if (projectsCurrentIndex > 0) {
      projectsCurrentIndex--;
      updateProjectsSlider();
    }
  });

  projectsNextBtn.addEventListener('click', () => {
    if (projectsCurrentIndex < projectsItems.length - 1) {
      projectsCurrentIndex++;
      updateProjectsSlider();
    }
  });
});

// Gestion de la galerie d'images des projets
document.addEventListener('DOMContentLoaded', function() {
  // Initialisation des variables
  let currentProjectIndex = 0;
  let currentImageIndex = 0;
  let projectImages = [];
  
  // Sélection des éléments
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.modal-gallery-nav.prev');
  const nextBtn = document.querySelector('.modal-gallery-nav.next');
  const pagination = document.querySelector('.modal-gallery-pagination');
  
  // Fonction pour ouvrir la modale avec l'image sélectionnée
  function openModal(projectIndex, imgIndex = 0) {
    const project = document.querySelectorAll('.project-item')[projectIndex];
    const images = project.querySelectorAll('.project-image img');
    
    // Mise à jour des variables globales
    currentProjectIndex = projectIndex;
    currentImageIndex = imgIndex;
    projectImages = Array.from(images);
    
    // Mise à jour de l'interface
    updateModalContent();
    updatePagination();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  // Fonction pour fermer la modale
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Fonction pour mettre à jour le contenu de la modale
  function updateModalContent() {
    const galleryContent = document.querySelector('.modal-gallery-content');
    galleryContent.innerHTML = '';
    
    projectImages.forEach((img, index) => {
      const slide = document.createElement('div');
      slide.className = 'modal-gallery-slide';
      if (index === currentImageIndex) {
        slide.classList.add('active');
      }
      
      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      imgElement.alt = img.alt;
      
      slide.appendChild(imgElement);
      galleryContent.appendChild(slide);
    });
    
    // Faire défiler jusqu'à l'image active
    const activeSlide = document.querySelector(`.modal-gallery-slide:nth-child(${currentImageIndex + 1})`);
    if (activeSlide) {
      activeSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }
  
  // Fonction pour mettre à jour la pagination
  function updatePagination() {
    pagination.innerHTML = '';
    
    projectImages.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'modal-gallery-dot';
      if (index === currentImageIndex) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        currentImageIndex = index;
        updateModalContent();
        updatePagination();
      });
      
      pagination.appendChild(dot);
    });
  }
  
  // Gestion des événements de navigation
  function goToPrev() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      currentImageIndex = projectImages.length - 1;
    }
    updateModalContent();
    updatePagination();
  }
  
  function goToNext() {
    if (currentImageIndex < projectImages.length - 1) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0;
    }
    updateModalContent();
    updatePagination();
  }
  
  // Gestion des événements tactiles pour le défilement
  let touchStartX = 0;
  let touchEndX = 0;
  
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }
  
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe gauche
      goToNext();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe droit
      goToPrev();
    }
  }
  
  // Ajout des écouteurs d'événements
  document.querySelectorAll('.project-image').forEach((img, index) => {
    img.addEventListener('click', () => {
      const projectIndex = Array.from(img.closest('.project-item').parentElement.children).indexOf(img.closest('.project-item'));
      const imageIndex = Array.from(img.parentElement.children).indexOf(img);
      openModal(projectIndex, imageIndex);
    });
  });
  
  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', goToPrev);
  nextBtn.addEventListener('click', goToNext);
  
  // Fermer la modale en cliquant en dehors de l'image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Navigation au clavier
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    }
  });
  
  // Gestion du défilement tactile
  const galleryContent = document.createElement('div');
  galleryContent.className = 'modal-gallery-content';
  galleryContent.addEventListener('touchstart', handleTouchStart, false);
  galleryContent.addEventListener('touchend', handleTouchEnd, false);
  
  // Ajout de la structure de la modale si elle n'existe pas déjà
  if (!document.querySelector('.modal-gallery')) {
    const modalGallery = document.createElement('div');
    modalGallery.className = 'modal-gallery';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'modal-gallery-nav prev';
    prevBtn.innerHTML = '&lsaquo;';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'modal-gallery-nav next';
    nextBtn.innerHTML = '&rsaquo;';
    
    const pagination = document.createElement('div');
    pagination.className = 'modal-gallery-pagination';
    
    modalGallery.appendChild(prevBtn);
    modalGallery.appendChild(galleryContent);
    modalGallery.appendChild(nextBtn);
    modalGallery.appendChild(pagination);
    
    modal.insertBefore(modalGallery, modal.firstChild);
  }
});

// Modal functionality for project images
const projectModal = document.getElementById('image-modal');
const projectModalImg = document.getElementById('modal-img');
const projectCloseBtn = document.querySelector('.close');

document.querySelectorAll('.project-image img').forEach(img => {
  img.addEventListener('click', function() {
    projectModal.style.display = 'block';
    projectModalImg.src = this.src;
  });
});

projectCloseBtn.addEventListener('click', function() {
  projectModal.style.display = 'none';
});

projectModal.addEventListener('click', function(event) {
  if (event.target === projectModal) {
    projectModal.style.display = 'none';
  }
});

// Skill tabs filtering
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebarToggle.classList.toggle('active');
    });
  }
});


