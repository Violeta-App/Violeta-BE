// scoreCalculator.js
const causeWeights = {
    "Homicídio/Tentativa": 100,
    "Estupro": 90,
    "Sequestro/Cárcere Privado": 80,
    "Assédio": 70,
    "Roubo/Tentativa": 60,
    "Briga": 50,
    "Operação Policial": 40,
    "Disparo Acidental": 30,
    "Arrastão": 20,
    "Não Identificado": 10
};

const victimSituationWeights = {
    "dead": 100,
    "wounded": 50,
    "unharmed": 10
};

function calculateScore(mainReason, victimSituation) {
    const causeWeight = causeWeights[mainReason] || 0;
    const victimWeight = victimSituationWeights[victimSituation] || 0;
    return causeWeight + victimWeight;
}

export default calculateScore