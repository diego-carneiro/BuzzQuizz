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
            <div class="container-fim-quizz">
                <div class="container-resultado">
                    <h1>Resultado h1</h1>
                </div>
                <div class="imagem-e-descricao">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/Robert_C._Martin_surrounded_by_computers.jpg"/>
                    <p>    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis et minus beatae iure delectus velit ratione iste quae impedit? Hic qui iure nisi molestiae, voluptate quidem dignissimos magnam eaque perspiciatis?
                    </p>
                </div>
                <button class="reiniciar-quizz">
                    Reiniciar Quizz
                </button>
                <button class="voltar-home">
                    Voltar para home
                </button>
            </div>
        </div>`
}
function mostrarRespostasIndividuais(respostas){
    let retorno = [];
    let retornoString = "";
    for (let i = 0; i < respostas.length; i++){
        retorno.push(
        `<div class="container-resposta-indivual ${(respostas[i].isCorrectAnswer === true) ? "resposta-correta" : "resposta-errada"}" onclick="selecionarResposta(this)">
            <img src="${respostas[i].image}"/>
            <span>${respostas[i].text}</span>
        </div>`);
    }
    retorno.sort(randomizador);
    for (let j = 0; j < retorno.length; j++){
        retornoString += retorno[j];
    }
    return retornoString;
}
function randomizador() { 
	return Math.random() - 0.5; 
}
function selecionarResposta(selecionada){
    const paiSelecionada = selecionada.parentNode;
    const avoSelecionada = paiSelecionada.parentNode;
    const irmasSelecionada = paiSelecionada.children;
    const irmasErradas = paiSelecionada.querySelectorAll(".resposta-errada");
    const irmaCerta = paiSelecionada.querySelector(".resposta-correta");
    for (let i = 0; i < irmasSelecionada.length; i++){
        irmasSelecionada[i].classList.add("nao-selecionado");
        irmasSelecionada[i].removeAttribute("onclick");
    }
    for (let i = 0; i < irmasErradas.length; i++){
        irmasErradas[i].classList.add("vermelho");
    }
    irmaCerta.classList.add("verde");
    selecionada.classList.remove("nao-selecionado");

    setTimeout(mostrarProximaQuestao, 2000, avoSelecionada);
}
function mostrarProximaQuestao(caixaAtual){
    const perguntas = document.querySelectorAll(".container-pergunta-individual");
    let posicao = 0;
    for (let i = 0; i < perguntas.length; i++){
        if(perguntas[i] === caixaAtual){
            posicao = i;
        }
    }
    if ((posicao + 1) < perguntas.length){
        perguntas[posicao+1].scrollIntoView({behavior: "smooth", block: "center"});
    }
    else{
        document.querySelector(".container-fim-quizz").scrollIntoView({behavior: "smooth", block: "center"});
    }
}