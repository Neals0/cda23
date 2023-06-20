#!/bin/bash
# Mettre à jour le code source
git pull
# Construire l'image Docker
docker build --no-cache -t loc-mns-front-v1 .
# Arreter le conteneur existant
docker stop conteneur-application
# Supprimer le conteneur existant
docker rm conteneur-application
# Lancer un nouveau conteneur
docker run -d --name=angular-application -p 4200:80 loc-mns-front-v1