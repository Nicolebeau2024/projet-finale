// public/js/app.js

document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector('.scroll-image');

    // Observer si l'image est visible dans le viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                image.classList.add('show'); // Ajoute la classe "show" quand l'image est visible
            }
        });
    });

    observer.observe(image); // Observe l'élément de l'image différée
});

