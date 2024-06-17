document.addEventListener("DOMContentLoaded", () => {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Card hover effect
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Fade-in effect for cards on scroll
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Slideshow functionality
    let slideIndex = 0;
    let slideInterval = setInterval(showSlides, 15000); // Change image every 15 seconds

    function showSlides() {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
    }

    // Popup functionality
    const newItemsPopup = document.getElementById("newItemsPopup");

    function closePopup() {
        newItemsPopup.style.display = "none";
        localStorage.setItem('popupClosed', 'true');
    }

    if (!localStorage.getItem('popupClosed')) {
        newItemsPopup.style.display = "block"; // Show the popup
    }

    window.closePopup = closePopup; // Make the function globally accessible

    // Hamburger menu toggle
    window.toggleMenu = function() {
        const navbar = document.querySelector('.navbar');
        const navbarRight = document.querySelector('.navbar-right');
        navbar.classList.toggle('active');
        navbarRight.classList.toggle('active');
    };

    // Login button hover effect with particles
    const loginBtn = document.querySelector('.cute-login-btn');
    loginBtn.addEventListener('mouseenter', createParticles);
    loginBtn.addEventListener('mouseleave', removeParticles);

    function createParticles() {
        for (let i = 0; i < 10; i++) { // Increased number of particles to 10
            const particle = document.createElement('span');
            particle.classList.add('particle');
            const size = Math.random() * 10 + 5 + 'px';
            particle.style.width = size;
            particle.style.height = size;
            particle.style.top = Math.random() * 120 - 50 + '%'; // Allow particles to appear above the button
            particle.style.left = Math.random() * 120 - 10 + '%'; // Adjusted to appear slightly outside the button
            particle.style.backgroundColor = '#ff99a6';
            loginBtn.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    function removeParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
    }

    // Confetti effect on button click
    loginBtn.addEventListener('click', confettiEffect);

    function confettiEffect() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confettiContainer.appendChild(confetti);
        }

        setTimeout(() => {
            confettiContainer.remove();
        }, 4000);
    }

    // Bouncing icons on hover
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('bounce');
            setTimeout(() => icon.classList.remove('bounce'), 300);
        });
    });
});
