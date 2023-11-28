/* eslint-disable no-undef */
describe("Dashboard page test", () => {
  beforeEach(() => {
    cy.viewport(1250, 750)
    cy.visit("/bitcoin")
  })
  it("Check chart load successful", () => {
    cy.wait(2000)
    cy.contains('Bitcoin Price').should(
      "have.text",
      "Bitcoin Price"
    );
  })
  it("check Prediction button", () => {
    cy.wait(2000)
    cy.get('#Prediction').click();
  })
})