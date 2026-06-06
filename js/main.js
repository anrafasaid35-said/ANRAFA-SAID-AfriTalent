document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // 1. Gestion du DARK/LIGHT mode & localstorage
    // --------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;

    // Vérifier si un thème est déjà sauvegardé dans le localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Si le thème sombre était actif, on l'applique au chargement
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun'); // Change l'icône
    }

    // Écouteur d'événement sur le bouton de thème
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Mettre à jour l'icône et sauvegarder dans localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // --------------------------------------------------------
    // 2. Effets au scroll (navbar & bouton retour en haut)
    // --------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // A. Effet sur la Navbar (rétrécissement et ombre)
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // B. Apparition du bouton "Retour en haut"
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // --------------------------------------------------------
    // 3. Action du bouton retour en haut
    // --------------------------------------------------------
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Défilement fluide
        });
    });

    // Mise à jour automatique de l'année dans le footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Injection du CSS ---
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 2.5s ease-out, transform 2.5s ease-out;
        }
        .fade-in-section.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // --- 2. Observer ---
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation de fondu
                if (entry.target.classList.contains("fade-in-section")) {
                    entry.target.classList.add("is-visible");
                }
                // Animation des compteurs
                if (entry.target.classList.contains("counter")) {
                    const target = parseInt(entry.target.getAttribute("data-target"), 10);
                    let count = 0;
                    const increment = target / 50; 
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            entry.target.textContent = target;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(count);
                        }
                    }, 30);
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // --- 3. Ciblage dynamique ---
    // Appliquer aux sections
    document.querySelectorAll("main > section").forEach(section => {
        section.classList.add("fade-in-section");
        observer.observe(section);
    });

    // Appliquer aux compteurs (vérifiez bien que vos nombres ont la classe "counter")
    document.querySelectorAll(".counter").forEach(counter => {
        observer.observe(counter);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Création d'un élément modal "page entière" 
    const modal = document.createElement('div');
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:white; display:none; z-index:9999; padding:50px; overflow-y:auto;";
    document.body.appendChild(modal);

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const terme = e.target.value.toLowerCase().trim();
            const articles = document.querySelectorAll('.article-card');
            let match = null;

            articles.forEach(art => {
                if (art.querySelector('.card-title').innerText.toLowerCase().includes(terme)) {
                    match = art;
                }
            });

            if (match) {
                // Copie le contenu de la carte dans la modale plein écran
                modal.innerHTML = `
                    <button onclick="this.parentElement.style.display='none'" style="float:right;">Fermer</button>
                    <div style="max-width:800px; margin:auto;">
                        ${match.innerHTML}
                    </div>
                `;
                modal.style.display = 'block';
            } else {
                alert("Article non trouvé !");
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const filtre = document.getElementById('filtreCategorie');
    const cartes = document.querySelectorAll('.freelance-card');

    filtre.addEventListener('change', (e) => {
        const categorieChoisie = e.target.value;

        cartes.forEach(carte => {
            const categorieCarte = carte.getAttribute('data-categorie');
            if (categorieChoisie === 'all' || categorieCarte === categorieChoisie) {
                carte.style.display = 'block';
            } else {
                carte.style.display = 'none';
            }
        });
    });
});
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let estValide = true;

    // Nettoyage des erreurs précédentes
    document.querySelectorAll('.error-msg').forEach(el => el.remove());

    // Vérification des champs requis
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (!input.value.trim()) {
            afficherErreur(input, "Ce champ est requis.");
            estValide = false;
        }
    });

    // Validation Email (Regex)
    const email = document.getElementById('email');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !regexEmail.test(email.value)) {
        afficherErreur(email, "Format email invalide.");
        estValide = false;
    }

    // Validation longueur message (min 20)
    const message = document.getElementById('message');
    if (message.value && message.value.length < 20) {
        afficherErreur(message, "Le message doit contenir au moins 20 caractères.");
        estValide = false;
    }

    if (estValide) {
        alert("Message envoyé avec succès !");
        form.reset();
    }
});

function afficherErreur(element, message) {
    const erreur = document.createElement('div');
    erreur.className = 'error-msg text-danger small';
    erreur.innerText = message;
    element.parentNode.appendChild(erreur);
}