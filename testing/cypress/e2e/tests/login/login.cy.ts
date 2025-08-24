describe("Auth", () => {
    const baseUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

    before(function () {
    });
    it("login should work", () => {
        cy.visit(baseUrl!)
        cy.wait(3000)
        //  cy.get('input') 
        //  cy.get('input[name="username"]') 
        cy.get('input[name="username"]').type("Admin");
        cy.get('input[name="password"]').type("admin123");
        cy.get('button[type="submit"]').click()

        // 
        cy.url().should("include", "dashboard"); // Asserting @1
        cy.wait(3000)
        cy.contains('Dashboard')
        // .parent()
        .should('have.class', 'active') // Asserting @2
    })
})