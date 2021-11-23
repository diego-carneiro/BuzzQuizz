let qtdAcertos = 0;
let totalRespostas = 0;
let porcentagemDeAcertos = 0;
let levels;

function pageSwitch() {
    
    const page = document.querySelector(".hidden")
    page.classList.remove("hidden")
}
function disporQuizes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(imprimirQuizes);
    promise.catch(erroAxios);
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
    quizAtualObj.catch(erroAxios);
}
function telaQuiz(resposta){
    const quizAtual = resposta.data;
    levels = resposta.data.levels;

    const corpo = document.querySelector("body");

    let caixaRespostas = "";

    for (let i = 0; i < quizAtual.questions.length; i++){
        caixaRespostas +=
        `<div class="container-pergunta-individual">
            <div class="container-titulo-pergunta-individual" style="background-color: ${quizAtual.questions[i].color};">
                <h2 style=" color: ${quizAtual.questions[i].color >= '#7FFFFF' ? 'black': 'white'}">${quizAtual.questions[i].title}</h2>
            </div>
            <div class="container-respostas-pergunta-individual">
                ${mostrarRespostasIndividuais(quizAtual.questions[i].answers, quizAtual.questions.length)}
            </div>        
        </div>`
    }

    corpo.innerHTML += 
        `
            <div class="pagina-de-um-quizz">
                <div class="container-foto-de-capa-quizz">
                    <img src="${quizAtual.image}"/>
                    <span>${quizAtual.title}</span>
                </div>
                ${caixaRespostas}

                <div class="container-fim-quizz hidden">
                    <div class="container-resultado">
                        <h1 class="tituloFimQuizz">${porcentagemDeAcertos}% de acerto: ${quizAtual.levels[0].title}</h1>
                    </div>
                    <div class="imagem-e-descricao">
                        <img src=${quizAtual.levels[0].image}"/>
                        <p class= "textoQuizz">${quizAtual.levels[0].text}
                        </p>
                    </div>
                    <button class="reiniciar-quizz" onclick="reiniciarQuizz(${quizAtual.id})">
                        Reiniciar Quizz
                    </button>
                    <button  id='fullReset' class="voltar-home" onclick="voltarTela('.corpo-pagina-inicial', '.pagina-de-um-quizz')">
                        Voltar para home
                    </button>
                </div>
            
            </div> 
        `
    
}

function reiniciarQuizz(quizAtual){
    const paginaDoQuizzReiniciada = document.querySelector(".pagina-de-um-quizz");
    qtdAcertos = 0;
    totalRespostas = 0;
    porcentagemDeAcertos = 0;
    paginaDoQuizzReiniciada.remove();

    irPraTelaQuiz(quizAtual);
}

// function voltarHome(voltar){
//     //document.location.reload(true);
//     let fullReset = document.getElementById('fullReset');

//     fullReset.addEventListener('click', function(e) {
//       location.reload();
//     }, false);
    
// }
function mostrarRespostasIndividuais(respostas, qtdOpcoes){
    let retorno = [];
    let retornoString = "";
    for (let i = 0; i < respostas.length; i++){
        retorno.push(
        `<div class="container-resposta-indivual ${(respostas[i].isCorrectAnswer === true) ? "resposta-correta" : "resposta-errada"}" onclick="selecionarResposta(this, ${qtdOpcoes})">
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
function selecionarResposta(selecionada, qtdOpcoes){
    const paiSelecionada = selecionada.parentNode;
    const irmasSelecionada = paiSelecionada.children;
    const avoSelecionada = paiSelecionada.parentNode;
    
    const irmasErradas = paiSelecionada.querySelectorAll(".resposta-errada");
    const irmaCerta = paiSelecionada.querySelector(".resposta-correta");
    for (let i = 0; i < irmasSelecionada.length; i++){
        irmasSelecionada[i].classList.add("nao-selecionado");
        irmasSelecionada[i].removeAttribute("onclick");
    }
    for (let i = 0; i < irmasErradas.length; i++){
        irmasErradas[i].classList.add("vermelho");
    }
    if(selecionada.classList.contains("resposta-correta")){
        qtdAcertos++;
    }
    irmaCerta.classList.add("verde");
    selecionada.classList.remove("nao-selecionado");
    totalRespostas++;

    if(totalRespostas === qtdOpcoes){
      const porcentagem = Math.round((qtdAcertos/qtdOpcoes)*100);
      finalizacaoQuizz(porcentagem);
    }

    setTimeout(mostrarProximaQuestao, 2000, avoSelecionada);
}

function finalizacaoQuizz (porcentagem){
    const fimQuizz = document.querySelector(".container-fim-quizz");
    fimQuizz.classList.remove('hidden');
    const titleQuizz = fimQuizz.querySelector(".tituloFimQuizz");
    titleQuizz.innerHTML = `${porcentagem}% de acerto: `;
    const imgFimQuizz = fimQuizz.querySelector("img");
    imgFimQuizz.setAttribute("src",levels[0].image);
    //const textoDoQuizz = fimQuizz.querySelector(".textoQuizz");
    //textoDoQuizz.innerHTML = `${quizAtual.levels[0].text}`;
   
   
}
function mostrarProximaQuestao(caixaAtual){
    const perguntas = document.querySelectorAll(".container-pergunta-individual");
    let posicao = 0;
    let scrollou = false;
    //Pedaço de código extra, utilizado para ver se o usuário já scrollou e assim desativar o scroll 
    window.addEventListener('scroll', (e) => {  
        scrollou = true;
    })

    for (let i = 0; i < perguntas.length; i++){
        if(perguntas[i] === caixaAtual){
            posicao = i;
        }
    }
    if ((posicao + 1) < perguntas.length && !scrollou){
        perguntas[posicao+1].scrollIntoView({behavior: "smooth", block: "center"});
    }
    else if (!scrollou){
        document.querySelector(".container-fim-quizz").scrollIntoView({behavior: "smooth", block: "center"});
    }
}