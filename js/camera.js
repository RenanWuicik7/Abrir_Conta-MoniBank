const buttonCamI = document.querySelector("[data-video-botao]");
const campoCam = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const buttonTakeAPicture = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const submitButton = document.querySelector("[data-enviar]");

let imagemURL = "";

buttonCamI.addEventListener("click", async function () {
    const videoIniciate = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

    buttonCamI.style.display = "none";
    campoCam.style.display = "block";

    video.srcObject = videoIniciate;
})

buttonTakeAPicture.addEventListener("click", function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL("imagem/jpeg");

    campoCam.style.display = "none";
    mensagem.style.display = "block";
})

submitButton.addEventListener("click", () => {
    const reciveDdsExsts = localStorage.getItem("cadastro");
    const convertReturn = JSON.parse(reciveDdsExsts);

    convertReturn.imagem = imagemURL;

    localStorage.setItem('cadastro', JSON.stringify(convertReturn));

    window.location.href = "./abrir-conta-form-3.html";
})