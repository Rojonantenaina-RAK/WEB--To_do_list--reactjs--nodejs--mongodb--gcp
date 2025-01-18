describe('Tests d\'intégration Frontend et Backend', () => {
    it('Devrait créer une nouvelle tâche', () => {
      // Intercepter les requêtes vers l'API du backend pour s'assurer qu'elles sont effectuées
      cy.intercept('POST', 'http://localhost:5000/tasks').as('createTask');
  
      // Accéder à la page frontend où les tâches sont créées
      cy.visit('/'); // Visiter l'application frontend
  
      // Remplir le formulaire
      cy.get('input#task').type('Ma nouvelle tâche');
      cy.get('textarea#contenu').type('Description de ma tâche');
      
      // Soumettre le formulaire
      cy.get('form').submit();
  
      // Vérifier que la requête POST a été effectuée
      cy.wait('@createTask').its('response.statusCode').should('eq', 201);
  
      // Vérifier que la tâche apparaît dans l'UI (par exemple, avec son titre)
      cy.contains('Ma nouvelle tâche').should('be.visible');
    });
});
