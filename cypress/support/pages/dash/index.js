import { el } from './elements'
import header from '../../components/header'

class DashPage {

    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 })
            .should('be.visible')
    }

    selectDay(day) {
        const target = new RegExp('^' + day + '$', 'g')

        cy.get(el.boxMonth).then($caption => {
            const currentMonth = $caption.text().trim()

            // Função para mapear o mês por extenso para o número correspondente
            const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

            const currentMonthIndex = months.findIndex(month => currentMonth.includes(month))

            // Verifica se o próximo dia é o dia 1 e estamos no fim do mês
            if (day === 1 && currentMonthIndex !== -1) {
                // Avançar para o próximo mês
                cy.get(el.nextMonthButton).click()
            }

            // Selecionar o dia útil no calendário (pode estar no próximo mês)
            cy.get(el.boxDay).not(el.unavailableDay).contains(target)
                .click({ force: true })
        })
    }

    appointmentShouldBe(customer, hour) {
        cy.contains('div', customer.name, { timeout: 10000 })
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour)
            .should('be.visible')
    }
}

export default new DashPage()