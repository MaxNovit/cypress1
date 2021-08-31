describe('OwnersTable', () => {
  beforeEach (() => {
    cy.visit("/");
    cy.get('.ownerTab').click();
    cy.get('a[routerlink="/owners"]').click();

  });

 context('Empty state', () => {
     before(() => {
      cy.intercept('GET', '**/owners', { body: [] }).as('getOwners');
 });

  it('should display no rows when there are no owners', () => {
     cy.get('.ownerTab').click();
     cy.get('a[routerlink="/owners"]').click();
     cy.wait('@getOwners');
     cy.get('.petOwnersTable').should('be.visible');
     cy.get('.petOwner').should('not.exist');
     cy.get('.addOwner').should('be.visible')
    });
  });

context('With results', () => {
  before(() => {
    cy.intercept('GET', '**/owners', { fixture: 'owner/oneOwner' }).as('getOwners');
    
  });

    it('should display owner proprly in the table', () => { 
      cy.intercept('POST', '**/owners', { fixture: 'owner/newOwner' }).as('addOwner');
      cy.intercept('GET', '**/owners', { fixture: 'owner/twoOwners' }).as('getOwners');
      cy.get('.petOwner').should('have.length', 1);
      cy.get('.ownerFullName').should('be.visible').and('have.text', 'Max Nov');
      cy.get('.petName').should(ownerPetName => {
        expect(ownerPetName.text().trim()).to.eq('fdfs');
      });
    });
    it('should display added owner in the table', () => {
      

      cy.get('.petOwner').its('length').then((Count) => {ownersCount = Count; 
       cy.get('form').should('be.visible');
       cy.get('#firstName').type('Max');
       cy.get('#lastName').type('Novit');
       cy.get('#address').type('Shewchenko');
       cy.get('#city').type('Kyiv');
       cy.get('#telephone').type('9999999999'); 
       cy.get('.addOwner').click();
       cy.wait('@addOwner');
       cy.wait('@getOwners');
       cy.get('.petOwner').should('have.length', ownersCount +2);
     });
    });
  });

 
  



  
});
  