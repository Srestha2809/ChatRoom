describe('Test Lab 13', () => {
    it('finds the server', () => {
        cy.visit("http://localhost:5173/");
    });
    it('clicks the menu button lab 13 option', () => {
        cy.visit("http://localhost:5173/");
        cy.get('#menubtn').click();
        cy.contains('a', 'Lab 13').click();
    });
    it('it confirms Lab 13 component loaded', () => {
        cy.visit("http://localhost:5173/");
        cy.get('#menubtn').click();
        cy.contains('a', 'Lab 13').click();
        cy.contains('Lab 13');
        cy.wait(1000); // wait for user data to be fetched
    });
    it('it type username', () => {
        cy.visit("http://localhost:5173/");
        cy.get('#menubtn').click();
        cy.contains('a', 'Lab 13').click();
        cy.contains('Lab 13');
        cy.wait(1000);
        cy.get("#user")
            .type("Srestha Bharadwaj")
            .type("{downArrow}{enter}");
    });
    it('it confirms User was found', () => {
        cy.visit("http://localhost:5173/");
        cy.get('#menubtn').click();
        cy.contains('a', 'Lab 13').click();
        cy.contains('Lab 13');
        cy.wait(1000);
        cy.get("#user")
            .type("Srestha Bharadwaj")
            .type("{downArrow}{enter}");
        cy.contains("You selected Srestha Bharadwaj. This user can be contacted at sb@here.com");
    });
});