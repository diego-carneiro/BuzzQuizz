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
        `<div class="quizzes-de-outros" onclick="irPraTelaQuiz(${quiz.id})">
            <img src="${quiz.image}"/>
            <div class="sombra-imagem"></div>
            <span>${quiz.title}</span>
        </div>`
        );
}
function irPraTelaQuiz(id){
    const primeiraTela = document.querySelector(".corpo-pagina-inicial");
    
    const quizAtualObj = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    primeiraTela.classList.add("hidden");
    quizAtualObj.then(telaQuiz);
}
function telaQuiz(resposta){
    const quizAtual = resposta.data;
    const corpo = document.querySelector("body");

    let caixaRespostas = "";

    for (let i = 0; i < quizAtual.questions.length; i++){
        caixaRespostas +=
        `<div class="container-pergunta-individual">
            <div class="container-titulo-pegunta-individual">
                <h2>${quizAtual.questions[i].title}</h2>
            </div>
            <div class="container-respostas-pergunta-individual">
                ${mostrarRespostasIndividuais(quizAtual.questions[i].answers)}
            </div>        
        </div>`
    }

    corpo.innerHTML += 
        `<div class="pagina-de-um-quizz">
            <div class="container-foto-de-capa-quizz">
                <img src="${quizAtual.image}"/>
                <span>${quizAtual.title}</span>
            </div>
            ${caixaRespostas}
        </div>`
}
function mostrarRespostasIndividuais(respostas){
    let retorno = "";

    for (let i = 0; i < respostas.length; i++){
        retorno +=
        `<div class="container-resposta-indivual">
            <img src="${respostas[i].image}"/>
            <span>${respostas[i].text}</span>
        </div>`
    }
    return retorno;
}