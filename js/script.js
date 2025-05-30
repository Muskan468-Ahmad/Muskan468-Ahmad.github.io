// Dark Mode Toggle - Now Defaults to Dark
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Set dark mode as default and initialize
if (localStorage.getItem('dark-mode') === 'disabled') {
    body.classList.add('light-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {
    body.classList.remove('light-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('dark-mode', 'enabled');
}

// Toggle Function
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    
    localStorage.setItem('dark-mode', isLightMode ? 'disabled' : 'enabled');
    darkModeToggle.innerHTML = isLightMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    
    // Force visibility updates when toggling
    updateVisibility();
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project Filter System
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Animate Skills on Scroll
const animateSkills = () => {
    document.querySelectorAll('.skill').forEach(skill => {
        const skillLevel = skill.dataset.level;
        const skillProgress = skill.querySelector('.skill-progress');
        skillProgress.style.width = `${skillLevel}%`;
    });
};

// Animate Projects on Scroll with Visibility Enhancements
const animateProjects = () => {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
            // Force visibility styles
            card.style.color = '#ffffff';
            card.querySelector('h3').style.color = '#ffffff';
            card.querySelector('p').style.color = '#d1d1e0';
        }, index * 200);
    });
};

// Intersection Observers
const createObserver = (targetClass, callback) => {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
};

const skillsObserver = createObserver('#skills', animateSkills);
const projectsObserver = createObserver('#projects', animateProjects);

// Observe Sections
document.querySelectorAll('#skills, #projects').forEach(section => {
    if (section.id === 'skills') {
        skillsObserver.observe(section);
    } else if (section.id === 'projects') {
        projectsObserver.observe(section);
    }
});

// Form Validation with Visibility Enhancements
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all required fields!');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Visibility Enhancement Functions
function updateVisibility() {
    // Critical text elements
    document.querySelectorAll('.project-card, .contact-info, .contact-form, footer, .skill-category').forEach(el => {
        el.style.color = '#ffffff';
    });
    
    // Project descriptions
    document.querySelectorAll('.project-card p').forEach(desc => {
        desc.style.color = '#d1d1e0';
        desc.style.fontSize = '1.05rem';
        desc.style.lineHeight = '1.6';
    });
    
    // Form inputs
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.style.backgroundColor = '#252538';
        input.style.color = '#ffffff';
        input.style.border = '1px solid #4d4d6d';
    });
    
    // Contact info
    document.querySelectorAll('.contact-info p, .contact-info i').forEach(el => {
        el.style.color = '#ffffff';
    });
}

// Project Card Hover Effects
function setupProjectCardHovers() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 25px rgba(179, 136, 255, 0.6)';
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.textContent !== 'All') {
            btn.classList.remove('active');
        }
    });
    
    // Apply visibility enhancements
    updateVisibility();
    setupProjectCardHovers();
    
    // Initialize animations
    if (document.querySelector('#skills').getBoundingClientRect().top < window.innerHeight) {
        animateSkills();
    }
    if (document.querySelector('#projects').getBoundingClientRect().top < window.innerHeight) {
        animateProjects();
    }
});
