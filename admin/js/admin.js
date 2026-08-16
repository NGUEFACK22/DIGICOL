// Navigation entre les sections
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la navigation sidebar
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    // Fonction pour changer de section
    function switchSection(sectionId) {
        // Masquer toutes les sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Retirer la classe active de tous les liens
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });

        // Afficher la section demandée
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Mettre à jour le lien actif
        const activeLink = document.querySelector(`a[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.parentElement.classList.add('active');
        }

        // Mettre à jour le titre de la page
        const titleMap = {
            'dashboard': 'Tableau de bord',
            'membres': 'Gestion des Membres',
            'formations': 'Gestion des Formations',
            'projets': 'Gestion des Projets',
            'paiements': 'Gestion des Paiements',
            'certificats': 'Gestion des Certificats',
            'ressources': 'Gestion des Ressources',
            'statistiques': 'Statistiques'
        };

        if (titleMap[sectionId]) {
            pageTitle.textContent = titleMap[sectionId];
        }

        // Fermer le menu sur mobile après sélection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }

        // Sauvegarder dans le localStorage
        localStorage.setItem('currentSection', sectionId);
    }

    // Ajouter les écouteurs d'événements sur les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    // Toggle du menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Restaurer la dernière section visitée
    const lastSection = localStorage.getItem('currentSection') || 'dashboard';
    switchSection(lastSection);

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Gestion des notifications (exemple)
    const notificationIcon = document.querySelector('.notifications');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('Vous avez 3 nouvelles notifications:\n\n- Nouvelle inscription de Marie Dupont\n- Paiement validé de Jean Martin\n- Certificat généré pour Sophie Bernard');
        });
    }

    // Gestion du profil utilisateur
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            const menu = document.createElement('div');
            menu.className = 'profile-dropdown';
            menu.innerHTML = `
                <a href="#"><i class="fas fa-user"></i> Mon Profil</a>
                <a href="#"><i class="fas fa-cog"></i> Paramètres</a>
                <a href="#"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
            `;
            menu.style.cssText = `
                position: absolute;
                top: 60px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                padding: 10px 0;
                min-width: 200px;
                z-index: 1000;
            `;
            
            // Style des liens
            const links = menu.querySelectorAll('a');
            links.forEach(link => {
                link.style.cssText = `
                    display: block;
                    padding: 10px 20px;
                    color: #2c3e50;
                    text-decoration: none;
                    transition: all 0.3s ease;
                `;
                link.addEventListener('mouseenter', function() {
                    this.style.background = '#f8f9fa';
                });
                link.addEventListener('mouseleave', function() {
                    this.style.background = 'transparent';
                });
            });

            document.body.appendChild(menu);

            // Fermer le menu quand on clique ailleurs
            setTimeout(() => {
                document.addEventListener('click', function closeMenu(e) {
                    if (!userProfile.contains(e.target) && !menu.contains(e.target)) {
                        menu.remove();
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }, 100);
        });
    }

    // Gestion des boutons d'action dans les tableaux
    setupActionButtons();

    // Gestion des recherches
    setupSearchBoxes();

    // Initialiser les graphiques (simulation)
    initializeCharts();
});

// Configuration des boutons d'action
function setupActionButtons() {
    // Boutons Edit
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            if (row) {
                const name = row.querySelector('td:nth-child(2)')?.textContent || 'élément';
                alert(`Modifier: ${name.trim()}`);
            }
        });
    });

    // Boutons View
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            if (row) {
                const name = row.querySelector('td:nth-child(2)')?.textContent || 'élément';
                alert(`Voir détails: ${name.trim()}`);
            }
        });
    });

    // Boutons Delete
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            if (row) {
                const name = row.querySelector('td:nth-child(2)')?.textContent || 'élément';
                if (confirm(`Êtes-vous sûr de vouloir supprimer: ${name.trim()}?`)) {
                    row.style.opacity = '0';
                    setTimeout(() => row.remove(), 300);
                }
            }
        });
    });

    // Boutons Download
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Téléchargement du certificat en cours...');
        });
    });
}

// Configuration des recherches
function setupSearchBoxes() {
    document.querySelectorAll('.search-box input').forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.content-section').querySelector('.data-table');
            
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    });
}

// Initialisation des graphiques (avec Chart.js si disponible)
function initializeCharts() {
    // Vérifier si Chart.js est disponible
    if (typeof Chart !== 'undefined') {
        // Graphique des inscriptions
        const regCtx = document.getElementById('registrationsChart');
        if (regCtx) {
            new Chart(regCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                    datasets: [{
                        label: 'Inscriptions',
                        data: [120, 150, 180, 220, 250, 280],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            });
        }

        // Graphique des revenus
        const revCtx = document.getElementById('revenueChart');
        if (revCtx) {
            new Chart(revCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Formations', 'Adhésions', 'Projets', 'Certificats'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: [
                            '#3498db',
                            '#27ae60',
                            '#f39c12',
                            '#9b59b6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Graphique de progression
        const memCtx = document.getElementById('membersChart');
        if (memCtx) {
            new Chart(memCtx, {
                type: 'bar',
                data: {
                    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                    datasets: [{
                        label: 'Nouveaux membres',
                        data: [15, 22, 18, 25, 30, 12, 8],
                        backgroundColor: '#27ae60'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            });
        }
    }
}

// Fonctions utilitaires pour les actions rapides
function addMember() {
    const name = prompt('Nom du membre:');
    const email = prompt('Email du membre:');
    
    if (name && email) {
        alert(`Membre ajouté avec succès:\nNom: ${name}\nEmail: ${email}`);
        // Ici, vous ajouteriez le code pour envoyer les données au serveur
    }
}

function addFormation() {
    const title = prompt('Titre de la formation:');
    
    if (title) {
        alert(`Formation créée avec succès: ${title}`);
        // Ici, vous ajouteriez le code pour envoyer les données au serveur
    }
}

function createProject() {
    const name = prompt('Nom du projet:');
    
    if (name) {
        alert(`Projet créé avec succès: ${name}`);
        // Ici, vous ajouteriez le code pour envoyer les données au serveur
    }
}

function generateReport() {
    alert('Génération du rapport en cours...\nLe rapport sera téléchargé une fois prêt.');
    // Ici, vous ajouteriez le code pour générer le rapport
}

// Attacher les événements aux boutons d'action rapide
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.btn-action');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            switch(action) {
                case 'Ajouter Membre':
                    addMember();
                    break;
                case 'Nouvelle Formation':
                    addFormation();
                    break;
                case 'Créer Projet':
                    createProject();
                    break;
                case 'Générer Rapport':
                    generateReport();
                    break;
            }
        });
    });
});

// Export pour utilisation globale
window.adminFunctions = {
    addMember,
    addFormation,
    createProject,
    generateReport,
    switchSection: function(sectionId) {
        const event = new Event('click');
        const link = document.querySelector(`a[data-section="${sectionId}"]`);
        if (link) {
            link.dispatchEvent(event);
        }
    }
};

console.log('DIGICOL Admin Panel initialized successfully!');
