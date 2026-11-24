/// <reference types="cypress" />

    it('Deve mudar o idioma do site da EBAC para espanhol', () => {
    cy.visit('https://lms.ebaconline.com.br/')
    cy.setCookie('i18n_redirected', 'esp')
    cy.reload()
    })





