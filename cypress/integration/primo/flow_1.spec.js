describe('Primo', function() {
    it("Should handle a simple flow", function() {
        cy.visit("https://limo.q.libis.be/primo-explore/search?vid=KADOC");
        cy.url().should('contain', 'lang');
        cy.get("#searchBar").should('exist').type("water{enter}");   
        cy.get('div[id^="SEARCH_RESULT_RECORDID_"]').as("resultSet");
        cy.get("@resultSet").should('have.length', 10);
        cy.get("@resultSet").eq(3).click();   
        cy.url().should('contain', 'fulldisplay');
        for(let i=0; i<3;i++) {
            cy.get("button[ng-click='$ctrl.getNextRecord()']").click();      
            cy.wait(5000);
        }
    })
});