// Update the dark mode toggle to handle our new theme
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved user preference
if (localStorage.getItem('dark-mode') === 'disabled') {
    body.classList.add('light-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {
    // Default to dark mode
    body.classList.remove('light-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle Function
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    
    // Save preference
    localStorage.setItem('dark-mode', isLightMode ? 'disabled' : 'enabled');
    
    // Update icon
    darkModeToggle.innerHTML = isLightMode 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
});

// Add glow effect to project cards on hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = `0 0 20px rgba(156, 77, 255, 0.4)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.3)`;
    });
});
