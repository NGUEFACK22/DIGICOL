from django.contrib import admin
from .models import Membre, Formation, Projet, Paiement, Certificat, Ressource

@admin.register(Membre)
class MembreAdmin(admin.ModelAdmin):
    list_display = ['user', 'telephone', 'date_adhesion', 'statut']
    list_filter = ['statut', 'date_adhesion']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'telephone']
    ordering = ['-date_adhesion']

@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ['titre', 'date_debut', 'date_fin', 'statut']
    list_filter = ['statut', 'date_debut']
    search_fields = ['titre', 'description']
    ordering = ['-date_debut']

@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ['titre', 'chef_projet', 'date_debut', 'date_fin_prevue', 'progression', 'statut']
    list_filter = ['statut', 'date_debut']
    search_fields = ['titre', 'description']
    ordering = ['-date_debut']

@admin.register(Paiement)
class PaiementAdmin(admin.ModelAdmin):
    list_display = ['membre', 'montant', 'date_paiement', 'type_paiement', 'statut', 'reference_transaction']
    list_filter = ['statut', 'type_paiement', 'date_paiement']
    search_fields = ['membre__user__username', 'reference_transaction']
    ordering = ['-date_paiement']

@admin.register(Certificat)
class CertificatAdmin(admin.ModelAdmin):
    list_display = ['membre', 'formation', 'date_emission', 'code_unique']
    list_filter = ['date_emission']
    search_fields = ['membre__user__username', 'code_unique']
    ordering = ['-date_emission']

@admin.register(Ressource)
class RessourceAdmin(admin.ModelAdmin):
    list_display = ['titre', 'categorie', 'date_ajout', 'telechargements']
    list_filter = ['categorie', 'date_ajout']
    search_fields = ['titre']
    ordering = ['-date_ajout']

# Personnalisation de l'admin Django
admin.site.site_header = "Administration DIGICOL"
admin.site.site_title = "DIGICOL Admin"
admin.site.index_title = "Tableau de bord"
