require('cypress-xpath');

describe('Test case 1', () => {
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

    it('fills the Contact Us form, clicks Send and checks for error message', () => {
      cy.xpath("//span[contains(text(),'Contact us')]/parent::button").click()
      cy.fixture('invalid_emails').each((testdata) => {
        cy.get("input[name='your-name']").clear().type("Florent")
        cy.get("input[name='your-email']").clear().type(testdata)
        cy.get("input[name='mobile-number']").clear().type("070111222")
        cy.get("input[name='your-subject']").clear().type("Test Subject")
        cy.get("textarea[name='your-message']").clear().type("Test Message")
        cy.get("input[value='Send']").click()
        cy.xpath("//span[contains(text(),'The e-mail address entered is invalid.')]").should("be.visible")

      })
        
        
       
    })
    
  })
