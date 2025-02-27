// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setToken', function(){
    cy.api({
      method: 'POST',
      url: '/sessions',
      body: {
        email: 'fernando@qacademy.io',
        password: 'qa-cademy'
      },
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.eql(200) 
      cy.log(response.body.token)
      Cypress.env('token', response.body.token)
    })  
  })
  
  Cypress.Commands.add('back2ThePast', function(){
    cy.api({
      method: "DELETE",
      url:'/back2thepast/629279d295a93d00168e794b',
      failOnStatusCode: false
  }).then(function(response){
    expect(response.status).to.eql(200)
  })
  })

// POST requisiçaão que testa o cadastro do personagem
  Cypress.Commands.add('postCharacter', function(payload){
    cy.api({
      method: 'POST',
      url: '/characters',
      body: payload,
      headers: {
          authorization: Cypress.env('token')
      },
      failOnStatusCode: false
  }).then(function(response){
    return response
  })
  })
  