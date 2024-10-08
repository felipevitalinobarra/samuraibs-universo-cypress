import dashPage from '../support/pages/dash'
import { getNextBusinessDay } from '../support/utils/dateUtils';
import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function () {

    context('quando o cliente faz um agendamento no app mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            const day = getNextBusinessDay()

            // cy.uiLogin(provider)
            cy.apiLogin(provider, true)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(day)
            dashPage.appointmentShouldBe(customer, appointment.hour)
        })

    })

})