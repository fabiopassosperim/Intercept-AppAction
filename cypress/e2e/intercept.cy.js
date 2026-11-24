/// <reference types="cypress" />

describe('Testes com Intercept', () => {

    beforeEach(() => {
        cy.visit('login.html')
    });

    it('Deve realizar login com sucesso com usuário comum (cenário positivo)', () => {
        cy.intercept('POST', '/api/login', { statusCode: 200,
            body: {
                token: 'token123'
            }
        }).as('loginMock');
        cy.login('usuario@teste.com', 'user123');
         cy.wait('@loginMock');
        cy.get('h4').should('contain', 'Olá');
    });

    it('Deve simular um erro do servidor (cenário negativo)', () => {
        cy.intercept('POST', '/api/login', { statusCode: 500
        }).as('erroServer');
        cy.login('usuario@teste.com', 'user123');
        cy.wait('@erroServer');
        cy.get('#alert-container').should('contain', 'Erro de conexão. Tente novamente.');

    });
});    
