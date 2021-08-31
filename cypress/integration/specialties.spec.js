describe('OwnersTable', () => {
    beforeEach (() => {
      cy.visit("/");

      context('NewSpecialtie', () => {
        it('should create new specialtie', () => {
         cy.get('a[routerlink="/specialties"]').click();
         cy.get('.addSpecialty').click();
         cy.get('#name').type('equine heart surgeon');
         cy.get('#specialty > div.form-group.has-feedback > div > button').click();
       });
     });
     
     context('CheckNewSpecialtie', () => {
       it.only('should verify new specialtie when we create it', () => {
         
         
         cy.get('a[routerlink="/specialties"]').click();
         cy.wait('@getSpecialties');
         
         cy.get('.form-control').should('be.visible');
         cy.get('.table table-striped').contains('equine heart surgeon');
       });
       });

    });
});