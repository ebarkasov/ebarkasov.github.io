// Application data
const personalInfo = {
  name: "Баркасов Евгений",
  position: "Системный администратор",
  experience: "3 года опыта",
  phone: "+79961107172",
  email: "djonbd@gmail.com",
  telegram: "@ebarkasov"
};

const skills = [
  {name: "Linux", level: 85, category: "ОС", icon: "fab fa-linux", color: "#FFA500"},
  {name: "Windows Server", level: 80, category: "ОС", icon: "fab fa-windows", color: "#0078D4"},
  {name: "Docker", level: 75, category: "Виртуализация", icon: "fab fa-docker", color: "#2496ED"},
  {name: "Kubernetes", level: 70, category: "Оркестрация", icon: "fas fa-dharmachakra", color: "#326CE5"},
  {name: "Bash/PowerShell", level: 80, category: "Скриптинг", icon: "fas fa-terminal", color: "#4EAA25"},
  {name: "Python", level: 65, category: "Автоматизация", icon: "fab fa-python", color: "#3776AB"},
  {name: "AWS", level: 75, category: "Облако", icon: "fab fa-aws", color: "#FF9900"},
  {name: "Zabbix", level: 85, category: "Мониторинг", icon: "fas fa-chart-line", color: "#D40000"},
  {name: "Active Directory", level: 80, category: "Безопасность", icon: "fas fa-users", color: "#0078D4"},
  {name: "TCP/IP", level: 90, category: "Сети", icon: "fas fa-network-wired", color: "#00D4AA"}
];

const projects = [
  {
    title: "Миграция в облако AWS",
    description: "Успешная миграция корпоративной инфраструктуры из локального дата-центра в облако AWS с обеспечением нулевого времени простоя",
    technologies: ["AWS EC2", "VPC", "Route 53", "RDS", "S3"],
    results: [
      "Мигрировано 50+ серверов",
      "Нулевое время простоя", 
      "Снижение затрат на 30%",
      "Повышение отказоустойчивости"
    ],
    icon: "fab fa-aws",
    color: "#FF9900"
  },
  {
    title: "Система мониторинга Zabbix",
    description: "Развертывание и настройка системы мониторинга для комплексного контроля IT-инфраструктуры компании",
    technologies: ["Zabbix", "MySQL", "Grafana", "SNMP", "API"],
    results: [
      "Мониторинг 200+ устройств",
      "Автоматические уведомления",
      "Снижение времени реакции на 80%",
      "Детальная аналитика производительности"
    ],
    icon: "fas fa-chart-line", 
    color: "#D40000"
  },
  {
    title: "Автоматизация рутинных задач",
    description: "Разработка и внедрение скриптов автоматизации для оптимизации ежедневных операционных процессов",
    technologies: ["Python", "Bash", "PowerShell", "Ansible", "Cron"],
    results: [
      "Автоматизировано 15+ процессов",
      "Экономия времени 70%",
      "Снижение человеческих ошибок",
      "Повышение эффективности команды"
    ],
    icon: "fab fa-python",
    color: "#3776AB"
  },
  {
    title: "Комплексная ИБ система",
    description: "Внедрение многоуровневой системы информационной безопасности для защиты корпоративных данных",
    technologies: ["pfSense", "Fail2ban", "OpenVPN", "Let's Encrypt", "SIEM"],
    results: [
      "Блокировано 99.9% атак",
      "Соответствие стандартам ИБ",
      "Безопасный удаленный доступ",
      "Непрерывный мониторинг угроз"
    ],
    icon: "fas fa-shield-alt",
    color: "#E74C3C"
  }
];

// DOM elements
let navToggle, navMenu, skillsGrid, projectsGrid, contactForm, typingText;

// Typing animation variables
const titles = [
  "Системный администратор",
  "DevOps инженер", 
  "Облачный архитектор",
  "Automation specialist"
];
let currentTitle = 0;
let currentChar = 0;
let isDeleting = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  setupNavigation();
  initializeTypingAnimation();
  loadSkills();
  loadProjects();
  setupContactForm();
  setupScrollAnimations();
  setupParticleAnimation();
  addNotificationStyles();
  initializeCounterAnimations();
});

// Initialize DOM elements
function initializeElements() {
  navToggle = document.getElementById('navToggle');
  navMenu = document.getElementById('navMenu');
  skillsGrid = document.getElementById('skillsGrid');
  projectsGrid = document.getElementById('projectsGrid');
  contactForm = document.getElementById('contactForm');
  typingText = document.getElementById('typingText');
}

// Add modern notification styles
function addNotificationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 16px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      z-index: 1001;
      transform: translateX(400px);
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      max-width: 350px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .notification--success {
      background: rgba(102, 126, 234, 0.9);
      color: white;
      border-left: 4px solid #667eea;
    }
    
    .notification--error {
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border-left: 4px solid #ef4444;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification-icon {
      font-size: 1.2rem;
    }
    
    .nav-link.active {
      color: #667eea !important;
      background: rgba(102, 126, 234, 0.1) !important;
    }
    
    .counter {
      transition: all 0.3s ease;
    }
    
    .pulse-ring {
      position: absolute;
      border: 3px solid rgba(102, 126, 234, 0.3);
      border-radius: 50%;
      animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
    
    @keyframes pulse-ring {
      0% {
        transform: scale(0.33);
        opacity: 1;
      }
      80%, 100% {
        transform: scale(1.33);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Enhanced navigation functionality
function setupNavigation() {
  // Mobile navigation toggle with smooth animation
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animated hamburger menu
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        navToggle.style.transform = 'rotate(180deg)';
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navToggle.style.transform = 'rotate(0deg)';
      }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navToggle.style.transform = 'rotate(0deg)';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navToggle.style.transform = 'rotate(0deg)';
      }
    });
  }

  // Enhanced header behavior on scroll
  let lastScrollY = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    // Header opacity and blur effect
    if (currentScrollY > 50) {
      header.style.background = 'rgba(15, 15, 35, 0.95)';
      header.style.backdropFilter = 'blur(25px)';
    } else {
      header.style.background = 'rgba(15, 15, 35, 0.9)';
      header.style.backdropFilter = 'blur(20px)';
    }
    
    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });

  // Active navigation highlighting
  setupActiveNavigation();
}

// Enhanced typing animation
function initializeTypingAnimation() {
  if (!typingText) return;

  function type() {
    const currentTitleText = titles[currentTitle];
    
    if (isDeleting) {
      typingText.textContent = currentTitleText.substring(0, currentChar - 1);
      currentChar--;
    } else {
      typingText.textContent = currentTitleText.substring(0, currentChar + 1);
      currentChar++;
    }

    let typeSpeed = 150;

    if (isDeleting) {
      typeSpeed = 75;
    }

    if (!isDeleting && currentChar === currentTitleText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentTitle = (currentTitle + 1) % titles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Load skills with enhanced animations
function loadSkills() {
  if (!skillsGrid) return;

  skills.forEach((skill, index) => {
    const skillCard = createSkillCard(skill);
    skillsGrid.appendChild(skillCard);
    
    // Staggered animation
    setTimeout(() => {
      skillCard.classList.add('fade-in-up');
    }, index * 100);
  });
}

// Create enhanced skill card
function createSkillCard(skill) {
  const card = document.createElement('div');
  card.className = 'skill-card glass-card';
  
  card.innerHTML = `
    <div class="skill-header">
      <div class="skill-info">
        <i class="${skill.icon} skill-icon" style="color: ${skill.color}"></i>
        <span class="skill-name">${skill.name}</span>
      </div>
      <span class="skill-level counter" data-target="${skill.level}">${skill.level}%</span>
    </div>
    <div class="skill-progress">
      <div class="skill-progress-bar" data-progress="${skill.level}"></div>
    </div>
    <span class="skill-category">${skill.category}</span>
  `;
  
  return card;
}

// Load projects with enhanced cards
function loadProjects() {
  if (!projectsGrid) return;

  projects.forEach((project, index) => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
    
    // Staggered entrance animation
    setTimeout(() => {
      projectCard.classList.add('fade-in-up');
    }, index * 150);
  });
}

// Create enhanced project card
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card glass-card';
  
  const technologiesHTML = project.technologies.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('');
  
  const resultsHTML = project.results.map(result => 
    `<li>${result}</li>`
  ).join('');
  
  card.innerHTML = `
    <div class="project-content">
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-icon">
          <i class="${project.icon}" style="color: ${project.color}"></i>
        </div>
      </div>
      <p class="project-description">${project.description}</p>
      <div class="project-technologies">
        ${technologiesHTML}
      </div>
      <ul class="project-results">
        ${resultsHTML}
      </ul>
    </div>
  `;
  
  return card;
}

// Enhanced contact form with better UX
function setupContactForm() {
  if (!contactForm) return;

  // Add floating label effect
  const inputs = contactForm.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transform = 'scale(1.02)';
      this.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
    });

    input.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate form data
    if (!name || !email || !message) {
      showNotification('Пожалуйста, заполните все поля', 'error', 'fas fa-exclamation-circle');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Пожалуйста, введите корректный email', 'error', 'fas fa-exclamation-circle');
      return;
    }
    
    // Enhanced form submission animation
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitButton.disabled = true;
    submitButton.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      showNotification('Сообщение отправлено успешно!', 'success', 'fas fa-check-circle');
      contactForm.reset();
      
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      submitButton.style.transform = 'scale(1)';
      
      // Success animation
      submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => {
        submitButton.style.background = '';
      }, 2000);
      
    }, 1500);
  });
}

// Enhanced notification system
function showNotification(message, type = 'success', icon = 'fas fa-info-circle') {
  // Remove existing notifications
  document.querySelectorAll('.notification').forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <i class="${icon} notification-icon"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Auto remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 400);
  }, 5000);
}

// Enhanced scroll animations with Intersection Observer
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Skill progress bar animation
        if (entry.target.classList.contains('skill-card')) {
          const progressBar = entry.target.querySelector('.skill-progress-bar');
          const progress = progressBar.dataset.progress;
          
          setTimeout(() => {
            progressBar.style.width = progress + '%';
          }, 200);
          
          // Animate counter
          const counter = entry.target.querySelector('.counter');
          animateCounter(counter);
        }
        
        // Add entrance animation
        if (!entry.target.classList.contains('fade-in-up')) {
          entry.target.classList.add('fade-in-up');
        }
        
        // Add pulse ring to contact icons
        if (entry.target.classList.contains('contact-item')) {
          addPulseRing(entry.target.querySelector('.contact-icon'));
        }
      }
    });
  }, observerOptions);

  // Observe elements
  const animatedElements = document.querySelectorAll('.skill-card, .project-card, .highlight-item, .contact-item, .glass-card');
  animatedElements.forEach(el => observer.observe(el));
}

// Counter animation
function animateCounter(element) {
  if (!element || element.classList.contains('animated')) return;
  
  const target = parseInt(element.dataset.target) || parseInt(element.textContent);
  const increment = target / 50;
  let current = 0;
  
  element.classList.add('animated');
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
  }, 30);
}

// Initialize counter animations for hero stats
function initializeCounterAnimations() {
  const heroCounters = document.querySelectorAll('.stat-number');
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const numericValue = parseInt(finalValue.replace(/\+/g, ''));
        
        let current = 0;
        const increment = numericValue / 30;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            target.textContent = finalValue;
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
          }
        }, 50);
        
        heroObserver.unobserve(target);
      }
    });
  });
  
  heroCounters.forEach(counter => heroObserver.observe(counter));
}

// Add pulse ring animation
function addPulseRing(element) {
  if (!element || element.querySelector('.pulse-ring')) return;
  
  const ring = document.createElement('div');
  ring.className = 'pulse-ring';
  ring.style.top = '50%';
  ring.style.left = '50%';
  ring.style.transform = 'translate(-50%, -50%)';
  ring.style.width = '100%';
  ring.style.height = '100%';
  
  element.style.position = 'relative';
  element.appendChild(ring);
}

// Enhanced particle animation
function setupParticleAnimation() {
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach((particle, index) => {
    // Random initial position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation delay
    particle.style.animationDelay = -Math.random() * 10 + 's';
  });
}

// Active navigation highlighting
function setupActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });
  
  sections.forEach(section => observer.observe(section));
}

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Page load animations
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-stats');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('fade-in-up');
      }, index * 200 + 300);
    });
    
    // Animate profile image
    setTimeout(() => {
      const profileContainer = document.querySelector('.profile-container');
      if (profileContainer) {
        profileContainer.classList.add('fade-in-up');
      }
    }, 800);
    
  }, 100);
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
  // Close mobile menu with Escape
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    navToggle.style.transform = 'rotate(0deg)';
  }
});

// Performance optimization - throttled scroll handler
let ticking = false;

function updateOnScroll() {
  // Any scroll-based animations can be added here
  ticking = false;
}

window.addEventListener('scroll', function() {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});