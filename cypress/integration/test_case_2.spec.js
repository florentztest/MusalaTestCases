require('cypress-xpath');
Cypress.Cookies.debug(true);
describe('Test case 2', () => {
    before(() => {
        cy.visit('/')
        Cypress.on('uncaught:exception', (err, runnable) => {
            // an error with message that contains 'Unexpected token' is thrown when opening the Musala page
            // this is causing the Cypress tests to fail
            // i'm catching the error and returning false so the test continues
            if (err.message.includes('Unexpected token')) {
              return false
            }
      })
    })

    it('goes to company screen, checks leadership section and visits musala facebook page', () => {
        cy.xpath("//div[@id='menu']/descendant::a[contains(@href,'https://www.musala.com/company/')]").click({force: true})
        cy.url().should('eq', 'https://www.musala.com/company/')
        cy.get("section[class='company-members']").should("be.visible")
        //check leadership title
        cy.xpath("//h2[contains(text(),'Leadership')]").should("be.visible")
        //check everyones link to linkedin and picture is present
        cy.xpath("//a[contains(@href,'https://www.linkedin.com/in/delyanlilov')]").should("be.visible")
        cy.get('img[alt="Delyan Lilov CEO"]').should('be.visible')
        cy.xpath("//a[contains(@href,'https://www.linkedin.com/in/emarinova')]").should("be.visible")
        cy.get('img[alt="Elena Marinova President"]').should('be.visible')
        cy.xpath("//a[contains(@href,'https://www.linkedin.com/in/stanislav-ovcharov')]").should("be.visible")
        cy.get('img[alt="Stanislav Ovcharov COO"]').should('be.visible')
        //removed the target attribute, so it doesnt open the link in new tab, since Cypress doesnt support new tab checks yet
        cy.xpath("//a[@href='https://www.facebook.com/MusalaSoft?fref=ts']").invoke('removeAttr', 'target').click({force: true})
        
        //need to catch an exception in the facebook too, so the test does not fail
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Minified React error #419')) {
              return false
            }
      })
      //check for correct url and profile pic
        cy.url().should('eq', 'https://www.facebook.com/MusalaSoft?fref=ts')
        cy.xpath("//a[@aria-label='Musala Soft profile photo' and contains(@href,'https://www.facebook.com/MusalaSoft/photos/a.152166551470703/3926723730681614/')]").should("be.visible")

        

    })
})