/// <reference types="Cypress" />

// Suite de teste do formulário CAC TAT
describe('Central de Atendimento ao Cliente TAT', function() {
    // Para cada testes, antes de executa-lo, será feito o visit
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    // 1º Caso de teste
    it('1 - Verifica o título da aplicação', () => {
        // Tradução: O titulo da página deve ser igual a "Central de Atendimento ao Cliente TAT"
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    // 2º Caso de teste
    // it.only('', () => {}); - Utilizado quando estamos escrevendo um novo caso de teste e quero executar somente ele.
    it('2 - Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Tobias')
        cy.get('#email').type('vinicius.felipe@gmail.com')

        const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, "
        cy.get('#open-text-area').type(longText, { delay: 0 }) // Delay = 0 é praticamente instantâneo (default = 10ms)

        // cy.get('.button').click() // (buscando pela classe "button")
        // cy.get('button[type="submit"').click() // (buscando pela tag button com o atributo "submit")
        cy.contains('button', 'Enviar').click() // (buscando o botão pela tag button e cujo texto é igual a "Enviar")

        // Verifica se a mensagem de sucesso foi exibida
        cy.get('.success').should('be.visible')
    });
    
    // 3º Caso de teste
    it('3 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Tobias')
        cy.get('#email').type('vinicius.felipe@gmail,com')
        cy.get('#open-text-area').type('Teste')

        cy.get('button[type="submit"').click()

        // Verifica se a mensagem de erro foi exibida
        cy.get('.error').should('be.visible')
    });

    // 4º Caso de teste
    it('4 - Campo telefone continua vazio quando preenchido com valor não-númerico', () => {
        cy.get('#phone')
            .type('abcdefghij') // tenta digitar um valor não-númerico
            .should('have.value', '') // verificar se o input continuou com branco
    });

    // 5º Caso de teste
    it('5 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Tobias')
        cy.get('#email').type('vinicius.felipe@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')

        cy.get('button[type="submit"').click()

        cy.get('.error').should('be.visible')
    });

    // 6º Caso de teste
    it('6 - Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Vinicius')
            .should('have.value', 'Vinicius')
            .clear()
            .should('have.value', '')
            
        cy.get('#lastName')
            .type('Tobias')
            .should('have.value', 'Tobias')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('vinicius.felipe@gmail.com')
            .should('have.value', 'vinicius.felipe@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('991973599')
            .should('have.value', '991973599')
            .clear()
            .should('have.value', '')
    });

    // 7º Caso de teste
    it('7 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"').click()
        cy.get('.error').should('be.visible')
    });

    // 8º Caso de teste
    it('8 - Envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    // 9º Caso de teste
    it('9 - Fazendo login com variáveis de ambiente', () => {
        cy.get('#firstName').type(Cypress.env('primeiro_nome'))
        cy.get('#lastName').type(Cypress.env('sobrenome'))
        cy.get('#email').type('vinicius.felipe@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"').click()
    });

    // 10º Caso de teste
    it('10 - Seleciona um produto (YouTube) por seu TEXTO', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube') // atributo value de <option>
    });

    // 11º Caso de teste
    it('11 - Seleciona um produto (Mentoria) por seu VALOR (value)', () => {
        const value = 'mentoria'
        cy.get('#product')
            .select(value)
            .should('have.value', value)
    });

    // 12º Caso de teste
    it('12 - Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    // 13º Caso de teste
    it('13 - Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });

    // 14º Caso de teste
    it('14 - Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"')
            .should('have.length', 3)
            .each(($element) => {
                cy.wrap($element) // Wrap: faz o empacotamento do elemento JQuery, transformando-o em um elemento Cypress
                    .check()
                    .should('be.checked')
            })
    });

    // 15º Caso de teste
    it('15 - Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('#check input[type="checkbox"]') // obtem todos os checkboxes
            .check() // faz um check em todos os checkboxes
            .should('be.checked') // verifica se ambos os checkboxes estão marcados
            .last() // obtem o último checkbox
            .uncheck() // desmarca o último checkbox
            .should('not.be.checked') // verifica se o último checkbox foi de fato desmarcado
    });

    // 16º Caso de teste
    it('16 - Seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('not.have.value') // verifica se já não tem um arquivo selecionado
            .selectFile('cypress/fixtures/example.json') // caminho relativo do arquivo
            .should(($input) => { // elemento obtido pelo cy.get
                // Verifica se o nome do arquivo é igual ao nome esperado
                expect($input[0].files[0].name).equal('example.json')
            })
    });

    // 17º Caso de teste
    it('17 - Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: "drag-drop" }) // Ação arrastar e soltar arquivo em cima do input
        .should(($input) => {
            expect($input[0].files[0].name).equal('example.json')
        })
    });

    // 18º Caso de teste
    it('18 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture("example.json").as('arquivoExemplo')
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@arquivoExemplo')
            .should(($input) => {
                expect($input[0].files[0].name).equal('example.json')
            })
    });

    // 19º Caso de teste
    it('19 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    // 20º Caso de teste
    it('20 - Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    });
  })