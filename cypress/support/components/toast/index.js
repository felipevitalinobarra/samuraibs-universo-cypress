import { el } from './elements'

class Toast {

    shouldHaveText(expectText) {
        cy.get(el.toast, {setTimeout: 10000})
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }
}

export default new Toast()