// Bootstrap form validation
(function() {
    'use strict';
    
    window.addEventListener('load', function() {
        // Fetch all forms with needs-validation class
        var forms = document.getElementsByClassName('needs-validation');
        
        // Loop over forms and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// Carousel auto-play controls
document.addEventListener('DOMContentLoaded', function() {
    // Auto-start carousel if exists
    const carousel = document.querySelector('#featuredCarousel');
    if (carousel) {
        const bootstrapCarousel = new bootstrap.Carousel(carousel, {
            interval: 3000,
            wrap: true
        });
    }
});

// Image error handling for listings
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.listing-img, .card-img-top');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x250/e9ecef/6c757d?text=Image+Not+Found';
        });
    });
});

// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});