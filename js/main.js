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