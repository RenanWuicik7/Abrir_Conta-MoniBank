export default function haveMoreThan18(campo) {
    const dataNascimento = new Date(campo.value);
    if(!vIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

function vIdade(data) {
    const atualDate = new Date();
    const dateMore18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return atualDate >= dateMore18;
}