export default function isACpf(campo) {
    const cpf = campo.value.replace(/\.|-/g, "")
    if (vRepeatNumbers(cpf) || vfirstDig(cpf) || vSecondDig(cpf)) {
        campo.setCustomValidity('Esse cpf não é válido');
    }
}

function vRepeatNumbers(cpf) {
    const repeatedNumbers = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    return repeatedNumbers.includes(cpf);
}

function vfirstDig(cpf) {
    let sum = 0;
    let multiplicador = 10;

    for(let tamanho = 0; tamanho < 9; tamanho++) {
        sum += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10 || sum == 11) {
        sum = 0;
    }

    return sum != cpf[9];
}

function vSecondDig(cpf) {
    let sum = 0;
    let multiplicador = 11;

    for(let tamanho = 0; tamanho < 10; tamanho++) {
        sum += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10 || sum == 11) {
        sum = 0;
    }

    return sum != cpf[10];
}