// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved user preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle Function
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Save preference
    localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
    
    // Update icon
    darkModeToggle.innerHTML = isDarkMode 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
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
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    
    // Filter projects
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Animate Skills on Scroll
const skills = document.querySelectorAll('.skill');

const animateSkills = () => {
    skills.forEach(skill => {
        const skillLevel = skill.dataset.level;
        const skillProgress = skill.querySelector('.skill-progress');
        skillProgress.style.width = `${skillLevel}%`;
    });
};

// Animate Projects on Scroll
const projectCards = document.querySelectorAll('.project-card');

const animateProjects = () => {
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
};

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProjects();
            projectsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe Sections
document.querySelectorAll('#skills, #projects').forEach(section => {
    if (section.id === 'skills') {
        skillsObserver.observe(section);
    } else if (section.id === 'projects') {
        projectsObserver.observe(section);
    }
});

// Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
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
    
    // Here you would typically send the form data to a server
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.querySelector('footer p').innerHTML = 
        `&copy; ${new Date().getFullYear()} Muskan Ahmad. All rights reserved.`;
    
    // Set all filter buttons to inactive except "All"
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.textContent !== 'All') {
            btn.classList.remove('active');
        }
    });
});
