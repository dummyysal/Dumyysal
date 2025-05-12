// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
        });
    });
});

// Form handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Dynamic project loading (optional)
// You could fetch your GitHub projects here using the GitHub API
async function loadProjects() {
    try {
        const response = await fetch('https://api.github.com/users/YOUR_USERNAME/repos');
        const projects = await response.json();
        
        const projectGrid = document.querySelector('.project-grid');
        
        projects.forEach(project => {
            if (!project.fork) { // Only show non-forked projects
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                projectCard.innerHTML = `
                    <div class="project-info">
                        <h3>${project.name}</h3>
                        <p>${project.description || 'No description available'}</p>
                        <div class="project-links">
                            <a href="${project.html_url}" target="_blank">View on GitHub</a>
                            ${project.homepage ? `<a href="${project.homepage}" target="_blank">Live Demo</a>` : ''}
                        </div>
                    </div>
                `;
                
                projectGrid.appendChild(projectCard);
            }
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', loadProjects);