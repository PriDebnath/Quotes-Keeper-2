describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.performTaskWithinElement({
      parentSelector:"body",
      selector: "button",elementType:"button"
    })
  })
})