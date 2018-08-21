describe("Primo", function() {
    before(function(){
        cy.fixture('config.json').as('config');
        cy.get('@config').then(function(config){
            cy.visit(`/primo-explore/search?vid=${config.vid}`);
        })
    });

    it("Should open the landing page", function(){
        cy.url().should('contain', 'lang');
    });

    it("should start a search", function(){
        cy.get("#searchBar").should('exist').type("water{enter}");   
    });

    describe("Result set", function(){
        beforeEach(function(){
            cy.get('div[id^="SEARCH_RESULT_RECORDID_"]').as("resultSet");
        });
        
        it("should have a resultset", function(){
            cy.get("@resultSet").should('have.length', 10);
        })
    
        it("should click the 4th record", function(){
            cy.get("@resultSet").eq(3).click();   
            cy.wait(5000).then(function(){
                cy.url().should('contain', 'fulldisplay');
            });
        })        

        it("should scroll to 2 records", function(){            
            for(let i=0; i<2;i++) {
                cy.wait(5000).then(function(){
                    cy.get("button[ng-click='$ctrl.getNextRecord()']").click({force:true});                      
                });
            }            
        })
    })
});