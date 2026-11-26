/// <reference types="cypress" />

   it('Deve fazer login API', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    body: {
      email: 'usuario@teste.com',
      password: 'user123'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.token).to.exist;

    cy.visit('/dashboard.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('authToken', response.body.token);
        win.localStorage.setItem('userId', response.body.id);
        win.localStorage.setItem('userName', response.body.name);
        win.localStorage.setItem(
          'isAdmin',
          String(response.body.isAdmin)
        );
      }
    });

    cy.location('pathname').should('include', 'dashboard.html');
  });
});





