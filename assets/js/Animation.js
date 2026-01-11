// Enhanced Carousel Animation
document.querySelectorAll('.carousel').forEach(carousel => {
  const slides = carousel.querySelectorAll('.slide');

  if (slides.length > 0) {
    slides[0].classList.add('in-view');
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    root: carousel,
    threshold: [0.5]
  });

  slides.forEach(slide => observer.observe(slide));
});

// Smooth Scroll Reveal Animation
const revealElements = document.querySelectorAll('.content-block, .blog-post, .quote-container');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  revealObserver.observe(el);
});

// Parallax Effect for Welcome Block
const welcomeBlock = document.querySelector('.welcome-block');

if (welcomeBlock) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    if (scrolled < window.innerHeight) {
      welcomeBlock.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Navbar Active State on Scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Image Lazy Loading with Fade In
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('fade-in');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Add fade-in class for loaded images
document.querySelectorAll('img').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
  }
});

// Table of Contents Active State
const tocLinks = document.querySelectorAll('.toc-list a');
const contentSections = document.querySelectorAll('.blog-content h2, .blog-content h3');

const tocObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      
      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  rootMargin: '-20% 0px -70% 0px'
});

contentSections.forEach(section => tocObserver.observe(section));

// Typing Animation for Headings (Optional)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #064663, #106690);
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 20px;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.opacity = '1';
    scrollTopBtn.style.visibility = 'visible';
  } else {
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollTopBtn.addEventListener('mouseenter', () => {
  scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
  scrollTopBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
  scrollTopBtn.style.transform = 'translateY(0) scale(1)';
  scrollTopBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
});

// Mobile: Adjust scroll-to-top button position
if (window.innerWidth <= 768) {
  scrollTopBtn.style.bottom = '20px';
  scrollTopBtn.style.right = '20px';
  scrollTopBtn.style.width = '45px';
  scrollTopBtn.style.height = '45px';
  scrollTopBtn.style.fontSize = '18px';
}

// Card Hover 3D Effect
const cards = document.querySelectorAll('.content-block, .blog-post');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// Text Gradient Animation
const gradientTexts = document.querySelectorAll('.welcome-block h2');

gradientTexts.forEach(text => {
  text.style.background = 'linear-gradient(90deg, #fff, #4cb9e7, #fff)';
  text.style.backgroundSize = '200% auto';
  text.style.webkitBackgroundClip = 'text';
  text.style.webkitTextFillColor = 'transparent';
  text.style.backgroundClip = 'text';
  text.style.animation = 'gradient 3s ease infinite';
});

// Add gradient animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .fade-in {
    animation: fadeIn 0.6s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .loaded {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .scroll-to-top {
      bottom: 20px !important;
      right: 20px !important;
      width: 45px !important;
      height: 45px !important;
      font-size: 18px !important;
    }
  }
  
  @media (max-width: 480px) {
    .scroll-to-top {
      bottom: 15px !important;
      right: 15px !important;
      width: 42px !important;
      height: 42px !important;
      font-size: 16px !important;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

document.head.appendChild(style);

// Loading Screen Animation (Optional)
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Add stagger animation to elements
  const elements = document.querySelectorAll('.content-block, .blog-post');
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
});

// Console Easter Egg
console.log('%c🎨 Welcome to the Developer Console! ', 'background: #064663; color: white; font-size: 16px; padding: 10px;');
console.log('%cWebsite crafted with ❤️', 'color: #4cb9e7; font-size: 14px;');