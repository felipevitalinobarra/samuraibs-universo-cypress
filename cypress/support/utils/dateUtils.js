function getNextBusinessDay() {
    const today = new Date();
    let nextBusinessDay = new Date(today);

    // Adiciona um dia
    nextBusinessDay.setDate(today.getDate() + 1);

    // Se cair em fim de semana, ajusta para o próximo dia útil
    // if (nextBusinessDay.getDay() === 6) {
        // Se for sábado, pula para segunda-feira
        // nextBusinessDay.setDate(nextBusinessDay.getDate() + 2);
    // } else if (nextBusinessDay.getDay() === 0) {
        // Se for domingo, pula para segunda-feira
        // nextBusinessDay.setDate(nextBusinessDay.getDate() + 1);
    // }

    return nextBusinessDay.getDate();
}

module.exports = { getNextBusinessDay };