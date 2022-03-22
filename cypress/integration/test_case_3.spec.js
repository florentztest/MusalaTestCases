require('cypress-xpath');
require('cypress-file-upload');
Cypress.Cookies.debug(true);
describe('Test case 3', () => {
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

    it('', () => {
        cy.xpath("//div[@id='menu']/descendant::a[contains(@href,'https://www.musala.com/careers/')]").click({force: true})
        cy.get("section[class='link_field']").find("a[href='join-us/']").click()
        cy.url().should('eq', 'https://www.musala.com/careers/join-us/')
        cy.get("select[id='get_location']").select('Anywhere')
        //cy.get("option[value='Anywhere']").click()
        //parent of type a, of h2 with text exp. qa
        cy.xpath("//h2[contains(text(),'Experienced Automation QA Engineer')]/ancestor-or-self::a").click()
        //general description title + some text
        cy.xpath("//h2[text() = 'General description']").should("be.visible")
        cy.xpath("//p[contains(text(),'We build next generation IT')]").should("be.visible")
        //Requirements title + some text
        cy.xpath("//h2[text() = 'Requirements']").should("be.visible")
        cy.xpath("//li[contains(text(),'Passionate about quality')]").should("be.visible")
        //Responsibilies title + some text
        cy.xpath("//h2[text() = 'Responsibilities']").should("be.visible")
        cy.xpath("//li[contains(text(),'Participate in automation test tool selection')]").should("be.visible")
        //What we offer title + some text
        cy.xpath("//h2[text() = 'What we offer']").should("be.visible")
        cy.xpath("//li[contains(text(),'Attractive compensation package – competitive salary')]").should("be.visible")
        cy.get("input[value='Apply']").should("be.visible")
        cy.get("input[value='Apply']").click({force: true})
        //Form
        cy.get("input[name='your-name']").type("Florent")
        cy.get("input[name='your-email']").type("test@test")
        cy.get("input[name='mobile-number']").type("070111222")
        const filepath = 'images/CV.pdf'
        cy.get('input[type="file"]').attachFile(filepath)
        cy.get("input[id='adConsentChx']").click({force: true})
        cy.get("input[value='Send']").click()
        cy.xpath("//span[contains(text(),'The e-mail address entered is invalid.')]").should("be.visible")


       
    })
  })
