from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

# --- Section Membres ---
class Membre(models.Model):
    STATUT_CHOICES = [
        ('actif', 'Actif'),
        ('en_attente', 'En attente'),
        ('bloque', 'Bloqué'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profil_membre')
    telephone = models.CharField(max_length=20, blank=True)
    date_adhesion = models.DateField(default=timezone.now)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
    photo = models.ImageField(upload_to='membres/photos/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        verbose_name = 'Membre'
        verbose_name_plural = 'Membres'

# --- Section Formations ---
class Formation(models.Model):
    TITRE_CHOICES = [
        ('brouillon', 'Brouillon'),
        ('publie', 'Publié'),
        ('archive', 'Archivé'),
    ]
    titre = models.CharField(max_length=200)
    description = models.TextField()
    date_debut = models.DateField()
    date_fin = models.DateField()
    statut = models.CharField(max_length=20, choices=TITRE_CHOICES, default='brouillon')
    image = models.ImageField(upload_to='formations/images/', null=True, blank=True)

    def __str__(self):
        return self.titre

    class Meta:
        verbose_name = 'Formation'
        verbose_name_plural = 'Formations'

# --- Section Projets ---
class Projet(models.Model):
    STATUT_PROJET = [
        ('planification', 'Planification'),
        ('en_cours', 'En cours'),
        ('termine', 'Terminé'),
    ]
    titre = models.CharField(max_length=200)
    description = models.TextField()
    chef_projet = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='projets_diriges')
    date_debut = models.DateField()
    date_fin_prevue = models.DateField()
    progression = models.IntegerField(default=0, help_text="Pourcentage de réalisation (0-100)")
    statut = models.CharField(max_length=20, choices=STATUT_PROJET, default='planification')

    def __str__(self):
        return self.titre

    class Meta:
        verbose_name = 'Projet'
        verbose_name_plural = 'Projets'

# --- Section Paiements ---
class Paiement(models.Model):
    TYPE_PAIEMENT = [
        ('adhesion', 'Adhésion'),
        ('formation', 'Frais de formation'),
        ('don', 'Don'),
    ]
    membre = models.ForeignKey(Membre, on_delete=models.CASCADE, related_name='paiements')
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    date_paiement = models.DateTimeField(auto_now_add=True)
    type_paiement = models.CharField(max_length=20, choices=TYPE_PAIEMENT)
    statut = models.CharField(max_length=20, choices=[('succes', 'Succès'), ('echec', 'Échec'), ('pending', 'En attente')], default='pending')
    reference_transaction = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"Paiement de {self.montant} par {self.membre.user.username}"

    class Meta:
        verbose_name = 'Paiement'
        verbose_name_plural = 'Paiements'

# --- Section Certificats ---
class Certificat(models.Model):
    membre = models.ForeignKey(Membre, on_delete=models.CASCADE, related_name='certificats')
    formation = models.ForeignKey(Formation, on_delete=models.CASCADE, null=True)
    date_emission = models.DateField(auto_now_add=True)
    code_unique = models.CharField(max_length=50, unique=True, default=uuid.uuid4)
    fichier_pdf = models.FileField(upload_to='certificats/pdfs/', null=True, blank=True)

    def __str__(self):
        return f"Certificat pour {self.membre.user.username}"

    class Meta:
        verbose_name = 'Certificat'
        verbose_name_plural = 'Certificats'

# --- Section Ressources ---
class Ressource(models.Model):
    CATEGORIE = [
        ('document', 'Document'),
        ('video', 'Vidéo'),
        ('image', 'Image'),
        ('autre', 'Autre'),
    ]
    titre = models.CharField(max_length=200)
    fichier = models.FileField(upload_to='ressources/')
    categorie = models.CharField(max_length=20, choices=CATEGORIE)
    date_ajout = models.DateTimeField(auto_now_add=True)
    telechargements = models.IntegerField(default=0)

    def __str__(self):
        return self.titre

    class Meta:
        verbose_name = 'Ressource'
        verbose_name_plural = 'Ressources'
