describe('OwnersTable', () => {
    beforeEach (() => {
      cy.visit("/");
      
      context('PetLogo', () => {
        it('should be visible logo', () => {
        cy.get('.img-responsive').should('be.visible');
         });
      });
      
      context('NewOwner', () => {
        it('shoud create new owner', () => {
        cy.get('a[routerlink="/owners"]').click();
        cy.get('.addOwner').click();
        cy.get('form').should('be.visible');
        cy.get('#firstName').type('Maxim');
        cy.get('#lastName').type('Novit');
        cy.get('#address').type('Shewchenko');
        cy.get('#city').type('Kyiv');
        cy.get('#telephone').type('9999999999'); 
        cy.get('.addOwner').click();
        cy.wait('@addOwner');
        cy.wait('@getOwners');
        });
    
       it('should check new owner', () => {
        cy.get('a[routerlink="/owners"]').click();
        cy.get('.ownerFullName').should('be.visible').and('have.text', 'Maxim Novit');  
        });
    });
});
});
