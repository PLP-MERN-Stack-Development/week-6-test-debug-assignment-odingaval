describe('Homepage', () => {
  it('loads and increments the counter', () => {
    cy.visit('http://localhost:3000'); // Adjust port if needed
    cy.contains('Welcome to the MERN Testing App').should('be.visible');
    cy.contains('Count: 0').should('be.visible');
    cy.contains('Increment').click();
    cy.contains('Count: 1').should('be.visible');
  });
}); 