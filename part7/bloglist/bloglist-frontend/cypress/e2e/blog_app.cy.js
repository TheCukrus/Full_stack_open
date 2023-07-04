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

    const user2 =
    {
      username: "Milda",
      password: "password123",
      name: "Milda"
    }

    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.request("POST", "http://localhost:3003/api/users", user2)
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
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")
      cy.get(".error").should("have.css", "border-style", "solid")
    })
  })

  describe("When logged in", function ()
  {
    beforeEach(function ()
    {
      cy.get("#username").type("Jevgenij")
      cy.get("#password").type("password123")
      cy.get("#login-button").click()
    })

    it("A blog can be created", function ()
    {
      cy.get("#show").click()

      cy.get("#title-input").type("Testing blog")
      cy.get("#author-input").type("Jevgenij")
      cy.get("#url-input").type("http://testtesttest.test")
      cy.get("#create-button").click()

      cy.get(".success").should("contain", "A new blog Testing blog by Jevgenij added")
      cy.get(".success").should("have.css", "border-style", "solid")
      cy.contains("Testing blog Jevgenij")
    })

    it("user can like a blog", function ()
    {
      cy.get("#show").click()

      cy.get("#title-input").type("Testing blog")
      cy.get("#author-input").type("Jevgenij")
      cy.get("#url-input").type("http://testtesttest.test")
      cy.get("#create-button").click()

      cy.get("#view").click()
      cy.get("#like").click()

      cy.contains("Likes 1")
    })

    it("deleting post", function ()
    {
      cy.get("#show").click()

      cy.get("#title-input").type("Testing blog")
      cy.get("#author-input").type("Jevgenij")
      cy.get("#url-input").type("http://testtesttest.test")
      cy.get("#create-button").click()

      cy.get("#view").click()
      cy.get("#remove").click()

      cy.get(".success").should("contain", "Removed blog: Testing blog")
      cy.get(".success").should("have.css", "border-style", "solid")
    })
  })

  describe("check for deleting", function ()
  {
    beforeEach(function ()
    {
      cy.get("#username").type("Jevgenij")
      cy.get("#password").type("password123")
      cy.get("#login-button").click()

      cy.get("#show").click()

      cy.get("#title-input").type("Testing blog")
      cy.get("#author-input").type("Jevgenij")
      cy.get("#url-input").type("http://testtesttest.test")
      cy.get("#create-button").click()

      cy.get("#view").click()
      cy.get("#like").click()


      cy.get("#logout-button").click()
    })

    it("author only can see blog's delete button", function ()
    {
      cy.get("#username").type("Milda")
      cy.get("#password").type("password123")
      cy.get("#login-button").click()

      cy.get("#view").click()

      cy.get('#remove').should('not.exist')
    })
  })

  describe("order blogs by like", function ()
  {
    beforeEach(function ()
    {
      cy.get("#username").type("Jevgenij")
      cy.get("#password").type("password123")
      cy.get("#login-button").click()

      cy.get("#show").click()

      cy.get("#title-input").type("Testing blog")
      cy.get("#author-input").type("Jevgenij")
      cy.get("#url-input").type("http://testtesttest.test")
      cy.get("#create-button").click()

      cy.get("#view").click()
      cy.get("#like").click()


      cy.get("#logout-button").click()
    })

    it("check if like count sorting blogs", function ()
    {
      cy.get("#username").type("Jevgenij")
      cy.get("#password").type("password123")
      cy.get("#login-button").click()

      cy.get("#show").click()

      cy.get("#title-input").type("Blog with the most likes")
      cy.get("#author-input").type("Jevgenij")
      cy.get("#url-input").type("http://testtesttest.test")
      cy.get("#create-button").click()

      cy.contains("Testing blog Jevgenij").parent().find("#view").click()

      cy.contains("Blog with the most likes Jevgenij").find("#view").click()

      cy.get('.blog').eq(0).contains("Blog with the most likes Jevgenij")
      cy.get('.blog').eq(1).contains("Testing blog Jevgenij")
    })
  })

})