# Construire l'application React
FROM node:22.11.0-alpine AS build

WORKDIR /app
COPY ./package.json ./package-lock.json ./

# Augmenter le timeout de NPM
RUN npm config set fetch-timeout 600000
RUN npm install --production

# Définir la variable d'environnement pour la construction
ENV REACT_APP_API_URL="http://34.94.144.96:5000"

# Copier le reste des fichiers
COPY . .
RUN npm run build

# Servir l'application avec Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Ajouter un fichier de configuration personnalisé pour Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80