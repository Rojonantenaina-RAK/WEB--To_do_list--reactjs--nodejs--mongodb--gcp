const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // URL du frontend
    specPattern: "cypress/e2e/frontend-backend/integration.spec.cy.js", // Spécifie le chemin du test spécifique
    setupNodeEvents(on, config) {
      // on peux ajouter des écouteurs d'événements si nécessaire
    },
    supportFile: "cypress/support/commands.js", // commandes personnalisées
  },
});
