# Utiliser une image officielle de Node.js comme base
FROM node:22.11.0-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install --production

# Copier le reste des fichiers
COPY . .

# Exposer le port de l'application
EXPOSE 5000

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]