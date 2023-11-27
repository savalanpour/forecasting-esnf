/* eslint-disable no-undef */
describe("Dashboard page test", () => {
  beforeEach(() => {
    cy.viewport(1250, 750)
    cy.visit("/")
  })
  it("Check dashboard page title", () => {
    cy.wait(2000)
    cy.get('#title-product').should(
      "have.text",
      "Time series Forecasting App"
    );
  })
  it("Load bitcoin page", () => {
    cy.wait(2000)
    cy.get('#bitcoin').click();
  })
})