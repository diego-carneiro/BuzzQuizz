function pageSwitch() {
    
    const page = document.querySelector(".hidden")
    page.classList.remove("hidden")
}
function disporQuizes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(imprimirQuizes);
    promise.catch();
}
function imprimirQuizes(resposta){
    const listaQuizes = resposta.data;
    const caixaQuizes = document.querySelector(".caixa-quizz");
    console.log(listaQuizes);
    listaQuizes.map(quiz =>
        caixaQuizes.innerHTML += 
        `<div class="quizzes-de-outros">
        <img src="${quiz.image}"/>
        <div class="sombra-imagem"></div>
        <span>${quiz.title}</span>
        </div>`
        );
}