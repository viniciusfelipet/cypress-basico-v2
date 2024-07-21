// Lodash: Repete o caso de teste 5 vezes
Cypress._.times(5, () => {
    it('1 - Testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    
    });
})