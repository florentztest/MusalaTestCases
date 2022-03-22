require('cypress-xpath');
Cypress.Cookies.debug(true);
describe('Test case 4', () => {
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

    it('gets and logs all of the open positions and links for Sofia and Skopje', () => {
        cy.xpath("//div[@id='menu']/descendant::a[contains(@href,'https://www.musala.com/careers/')]").click({force: true})
        cy.get("section[class='link_field']").find("a[href='join-us/']").click()
        cy.url().should('eq', 'https://www.musala.com/careers/join-us/')
        cy.get("select[id='get_location']").select('Sofia')
        //get all job titles for Sofia
        cy.get("h2[class='card-jobsHot__title']").each(($btn) => {
            //put every title in variable
            let txt = $btn.text()
            cy.log("Sofia open positions:")
            //log the job title
            cy.log("Position: " + txt + "\n")
            //get the a parent of every job
             cy.xpath(`//h2[text()='${txt}']/ancestor-or-self::a`).each(($parentA) => {
                //get the href value and put it in variable
                let aText = $parentA.attr('href') 
                //log the href value
                cy.log("More information: " + aText)
            })
        })
        //Skopje
        cy.get("select[id='get_location']").select('Skopje')
        //Do the same for Skopje // TO DO: Make this a function
        cy.get("h2[class='card-jobsHot__title']").each(($btn) => {
            let txt = $btn.text()
            cy.log("Skopje open positions:")
            cy.log("Position: " + txt + "\n")
            cy.xpath(`//h2[contains(text(),'${txt}')]/ancestor-or-self::a`).each(($parentA) => {
                let aText = $parentA.attr('href') 
                cy.log("More information: " + aText)
            })
        })
    })
  })
