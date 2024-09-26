import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class LoginPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.signIn)
            .click()
    }

    alertHaveText(expectedText){
        cy.contains(el.alertError, expectedText)
            .should('be.visible')
    }
}

export default new LoginPage()