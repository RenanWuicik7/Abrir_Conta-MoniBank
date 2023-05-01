import isACpf from "./valida-cpf.js";
import haveMoreThan18 from "./valida-idade.js";
const formCamps = document.querySelectorAll("[required]");
const form = document.querySelector("[data-formulario]");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const aswerList = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(aswerList));

    window.location.href = './abrir-conta-form-2.html'
})

formCamps.forEach((campo) => {
    campo.addEventListener("blur", () => verifyCamp(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

const errorTips = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: "O campo de CPF não pode estar vazio.",
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: "O campo de data de nascimento não pode estar vazio.",
        customError: "Você deve ser maior que 18 anos para se cadastrar."
    },
    termos: {
        valueMissing: "Você deve aceitar nossos termos antes de continuar.",
    }
}

function verifyCamp(campo) {
    let messege = "";
    campo.setCustomValidity('');
    if(campo.name == "cpf" && campo.value.length >= 11) {
        isACpf(campo);
    }
    if(campo.name == "aniversario" && campo.value != "") {
        haveMoreThan18(campo)
    }

    errorTips.forEach(erro => {
        if (campo.validity[erro]) {
            messege = mensagens[campo.name][erro];
            console.log(messege);
        }
    })

    const errorMessege = campo.parentNode.querySelector('.mensagem-erro');
    const inputValidity = campo.checkValidity();

    if(!inputValidity) {
        errorMessege.textContent = messege;
    } else {
        errorMessege.textContent = "";
    }
}