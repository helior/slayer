describe('Slayer Service health check', () => {
  beforeEach( () => {
    cy.request('/health-check').as('hcRequest');
  })

  it('Inspects status', () => {
    cy.get('@hcRequest')
      .its('status')
      .should('equal', 200);
  })

  // it('Inspect headers', () => {
  //   cy.get('@hcRequest')
  //     .its('headers')
  //     .its('content-type')
  //     .should('include', 'application/json; charset=utf-8');
  // })

  // it('Inspects body', () => {
  //   cy.get('@hcRequest')
  //     .its('body')
  //     .should('include', {status: "success"})
  //     .should('have.property', 'message')
  // })
})
