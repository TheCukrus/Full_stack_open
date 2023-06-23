/* eslint-disable no-undef */

describe("Blog app", function ()
{
  beforeEach(function ()
  {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user =
    {
      username: "Jevgenij",
      password: "password123",
      name: "Jevgenij"
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function ()
  {
    cy.contains("Log in to application")
    cy.contains("Username")
    cy.contains("Password")
    cy.get("#login-button")
  })

  describe("Login", function ()
  {
    it("succeeds with correct credentials", function ()
    {
      cy.get("#username").type("Jevgenij")
      cy.get("#password").type("password123")
      cy.get("#login-button").click()
    })

    it("fails with wrong credencials", function ()
    {
      cy.get("#username").type("NoJevgenij")
      cy.get("#password").type("Nopassword123")
      cy.get("#login-button").click()

      cy.get(".error").should("contain", "Wrong username or password")
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })


})