/// <reference types="Cypress" />

// Suite de teste
describe('Central de Atendimento ao Cliente TAT', function() {
    
    // 1º Caso de teste
    it('Verifica o título da aplicação', function() {
        cy.visit('./src/index.html')

        // Tradução: O titulo da página deve ser igual a "Central de Atendimento ao Cliente TAT"
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
  })
  