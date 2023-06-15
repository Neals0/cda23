#!/bin/bash
# Mettre à jour le code source
git pull
# Construire l'image Docker
docker build --no-cache -t image-application .
# Arreter le conteneur existant
docker stop conteneur-application
# Supprimer le conteneur existant
docker rm conteneur-application
# Lancer un nouveau conteneur
docker run -d --name=conteneur-application -p 4200:80 image-application