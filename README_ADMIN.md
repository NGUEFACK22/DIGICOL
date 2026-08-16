# Module Administration DIGICOL - Django

## Vue d'ensemble

Ce module fournit une interface d'administration complète pour la plateforme DIGICOL, construite avec Django.

## Structure du projet

```
/workspace/
├── digicol_platform/          # Projet Django principal
│   ├── settings.py            # Configuration (apps, static, media)
│   └── urls.py                # Routes URL
├── admin_panel/               # Application administration
│   ├── models.py              # Modèles de données
│   ├── admin.py               # Configuration admin Django
│   └── migrations/            # Migrations de base de données
├── media/                     # Fichiers uploadés (photos, certificats, ressources)
└── manage.py                  # Script de gestion Django
```

## Modèles implémentés

### 1. Membres (`Membre`)
- Liaison avec utilisateur Django
- Téléphone, date d'adhésion, statut (actif/en attente/bloqué)
- Photo de profil

### 2. Formations (`Formation`)
- Titre, description, dates de début/fin
- Statut (brouillon/publié/archivé)
- Image illustrative

### 3. Projets (`Projet`)
- Titre, description, chef de projet
- Dates et progression (0-100%)
- Statut (planification/en cours/terminé)

### 4. Paiements (`Paiement`)
- Membre, montant, type (adhésion/formation/don)
- Statut (succès/échec/en attente)
- Référence transaction unique

### 5. Certificats (`Certificat`)
- Membre, formation associée
- Code unique généré automatiquement
- Fichier PDF téléchargeable

### 6. Ressources (`Ressource`)
- Titre, fichier, catégorie (document/vidéo/image/autre)
- Compteur de téléchargements

## Fonctionnalités Admin Django

L'interface admin inclut :
- **Listes personnalisées** avec colonnes pertinentes
- **Filtres** par statut, date, catégorie
- **Recherche** sur les champs importants
- **Tri** par défaut chronologique
- **Personnalisation** : en-tête "Administration DIGICOL"

## Installation & Démarrage

### Prérequis
- Python 3.8+
- Django 6.1
- Pillow (pour les images)

### Commandes d'installation

```bash
# Installer les dépendances
pip install django pillow

# Créer les migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur (déjà fait)
# Identifiants : admin / admin123

# Lancer le serveur
python manage.py runserver
```

## Accès à l'administration

**URL** : `http://localhost:8000/admin/`

**Identifiants** :
- Username : `admin`
- Password : `admin123`

## Sections disponibles

1. **Tableau de bord** - Vue d'ensemble (via l'index admin Django)
2. **Membres** - Gestion des adhésions et statuts
3. **Formations** - Création et suivi des formations
4. **Projets** - Suivi de l'avancement des projets
5. **Paiements** - Validation et historique des transactions
6. **Certificats** - Émission et téléchargement
7. **Ressources** - Gestion des fichiers multimédias

## Configuration des fichiers média

Les fichiers uploadés sont stockés dans :
- `/media/membres/photos/` - Photos de profil
- `/media/formations/images/` - Images de formations
- `/media/certificats/pdfs/` - Certificats PDF
- `/media/ressources/` - Ressources diverses

En production, configurez votre serveur web (Nginx/Apache) pour servir ces fichiers.

## Personnalisation avancée

Pour ajouter des actions personnalisées ou modifier l'interface, éditez `admin_panel/admin.py`.

Exemple d'action personnalisée :
```python
@admin.action(description='Valider les membres sélectionnés')
def valider_membres(modeladmin, request, queryset):
    queryset.update(statut='actif')
```

## Notes

- Le projet est configuré avec `DEBUG=True` pour le développement
- Les fichiers static et media sont servis automatiquement en mode debug
- Pensez à configurer `ALLOWED_HOSTS` et `DEBUG=False` en production