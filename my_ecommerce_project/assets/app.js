/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
// Importation du CSS


// Script pour l'effet d'apparition différée
document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector('.scroll-image');

    if (image) {
        // Observer si l'image est visible dans le viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    image.classList.add('show'); // Ajoute la classe "show" quand l'image est visible
                }
            });
        });

        observer.observe(image); // Observe l'élément de l'image différée
    }
});
