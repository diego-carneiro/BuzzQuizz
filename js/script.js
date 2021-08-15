/*:::::HTML das telas:::::*/
const pagInicial = document.querySelector(".corpo-pagina-inicial");
const telaCriação_1 = document.querySelector(".criacao_1");
const telaCriação_2 = document.querySelector(".criacao_2");
const telaCriação_3 = document.querySelector(".criacao_3");
const telaCriação_4 = document.querySelector(".criacao_4");

const paginaDeUmQuizz = document.querySelector('.pagina-de-um-quizz');


/*:::::Fim do HTML das telas:::::*/

const quizURL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";
let listaQuizzesImportados;

capturarQuizzes()


//Capturar Quiz
function capturarQuizzes() {
    const promise = axios.get(quizURL);

    promise.then(renderizarQuizes);
}

function renderizarQuizes(quizzes) {

    listaQuizzesImportados = quizzes.data;

    const caixaDeQuizz = document.querySelector(".caixa-quizz");

    for (i = 0; i < listaQuizzesImportados.length; i++) {
        caixaDeQuizz.innerHTML += `<div class="quizzes-de-outros" id="${i}" onclick= "abrirQuizz(this)">
        <img src="${listaQuizzesImportados[i].image}">
        <span>${listaQuizzesImportados[i].title}</span>
        <div class="sombra-imagem"></div>
    </div>`
    }

}

/*:::::Trocas entre telas Abrir Quizz (joão):::::*/

let quantidadePerguntas;
let niveisQuiz;

function abrirQuizz(elemento) {

    //Armazenar quizz individual em uma variável


    const quizzID = elemento.id;
    const quizzIndividual = listaQuizzesImportados[quizzID];
    const quizzImgUrl = quizzIndividual.image;
    const quizzTitulo = quizzIndividual.title;

    niveisQuiz = quizzIndividual.levels;

    //abrir quizz e criar foto de capa
    pagInicial.innerHTML = `<div class="pagina-de-um-quizz">
    <div class="container-foto-de-capa-quizz">
    <img src="${quizzImgUrl}">
    <span>${quizzIndividual.title}</span>
    </div>
    </div>`



    //adicionar perguntas
    quantidadePerguntas = quizzIndividual.questions.length;

    for (i = 0; i < quantidadePerguntas; i++) {



        //armazenar string das respostas em uma variável
        let stringRespostas = '';

        //gerar respostas
        for (i_2 = 0; i_2 < quizzIndividual.questions[i].answers.length; i_2++) {
            const respostaIndividual = quizzIndividual.questions[i].answers[i_2];
            let corTexto;

            if (respostaIndividual.isCorrectAnswer) {
                corTexto = "verde"
            } else {
                corTexto = "vermelho"
            };

            stringRespostas += `<div class="container-resposta-indivual classe${i} ${corTexto} nao-modificado" id = "${i}" onclick="selecionarResposta(this)" type"blablabla">
            <img src="${respostaIndividual.image}">
            <span>${respostaIndividual.text}</span>
        </div>`;


        };

        //mudar a cor do container titulo pergunta individual
        let corId = "cor" + i;

        //adicionar ponto para querySelector
        let pontoCorId = "." + corId;

        //Adicionar mudaças ao em uma variável global
        pagInicial.innerHTML += `<div class="container-pergunta-individual">
        <div class="container-titulo-pergunta-individual  ${corId}">
            <h2>${quizzIndividual.questions[i].title}</h2>
        </div>
        <div class="container-respostas-pergunta-individual">
            ${stringRespostas}
        </div>
    </div>`



        let containerTituloPerguntaIndividual = document.querySelector(pontoCorId);

        containerTituloPerguntaIndividual.style.background = quizzIndividual.questions[i].color;
    }

    //adicionar resposta
}


//selecionar respostas
function selecionarResposta(elemento) {

    const classeId = "classe" + elemento.id;
    const selectors = ".container-respostas-pergunta-individual ." + classeId;

    const respostas = document.querySelectorAll(selectors); //uma lista de todas as respostas desta pergunta
    for (i = 0; i < respostas.length; i++) {
        respostas[i].classList.add("nao-selecionado");
        respostas[i].removeAttribute("onclick");
        respostas[i].classList.remove("nao-modificado");
    };

    elemento.classList.remove("nao-selecionado");
    elemento.classList.add("selecionado")


    //checar fim do quizz
    checarFimQuizz()
}

function checarFimQuizz() {
    const naoModificado = document.querySelector(".nao-modificado")
    if (naoModificado === null) {
        renderizarFimQuizz()
    }
}

function renderizarFimQuizz() {
    const listaAcertos = document.querySelectorAll(".verde.selecionado"); //lista de acertos
    const quantidadeAcertos = listaAcertos.length;

    const porcentagemAcertos = Math.round((quantidadeAcertos * 100) / quantidadePerguntas);

    let nivelAtingido = 0;

    for (i = 0; i < niveisQuiz.length; i ++) {
        console.log(niveisQuiz[i].minValue)
        if (porcentagemAcertos > niveisQuiz[i].minValue) {
            nivelAtingido = i;
        }
    }

    console.log("nivel:" + nivelAtingido)
    

    pagInicial.innerHTML += `<div class="container-fim-quizz">
    <div class="container-resultado">
        <span>${porcentagemAcertos}</span>
    </div>
    <div class="imagem-e-descricao">
        <img src="">
        <p></p>
    </div>
</div>`

}

/*:::::Fim da Trocas entre telas Abrir Quizz (joão):::::*/

/*:::::Trocas entre telas para criação:::::*/
function estadoInicial() {
    pagInicial.classList.remove('display-none');
    telaCriação_1.classList.add('display-none');
    telaCriação_2.classList.add('display-none');
    telaCriação_3.classList.add('display-none');
    telaCriação_4.classList.add('display-none');
}
estadoInicial();

function subirCriação_1() {
    pagInicial.classList.add('display-none');
    telaCriação_1.classList.remove('display-none');
    telaCriação_2.classList.add('display-none');
    telaCriação_3.classList.add('display-none');
    telaCriação_4.classList.add('display-none');
}
function subirCriação_2() {
    pagInicial.classList.add('display-none');
    telaCriação_1.classList.add('display-none');
    telaCriação_2.classList.remove('display-none');
    telaCriação_3.classList.add('display-none');
    telaCriação_4.classList.add('display-none');
}
function subirCriação_3() {
    pagInicial.classList.add('display-none');
    telaCriação_1.classList.add('display-none');
    telaCriação_2.classList.add('display-none');
    telaCriação_3.classList.remove('display-none');
    telaCriação_4.classList.add('display-none');
}
function subirCriação_4() {
    pagInicial.classList.add('display-none');
    telaCriação_1.classList.add('display-none');
    telaCriação_2.classList.add('display-none');
    telaCriação_3.classList.add('display-none');
    telaCriação_4.classList.remove('display-none');
}



/*:::::Fim de trocas entre telas para criação:::::*/


/*:::::Adição de Níveis:::::*/

// function segundoNivel(){
//     let conteudoCriação = document.querySelector(".conteudoCriação") 
//     let caixaDeNível = document.querySelector(".segundoNivel");


//     caixaDeNível.classList.add('displayNone');
//     conteudoCriação.innerHTML += `<div class="caixaDeNiveis">
//     <p class="inputTitle">Nível 1</p>
//     <input placeholder="   Título do nível" id="inputBox">
//     <input placeholder="   % de acerto mínima" id="inputBox">
//     <input placeholder="   URL da imagem do nível" id="inputBox">
//     <input placeholder="   Descrição do nível" id="inputBox">
// </div>` 
// }

/*:::::Fim da adição de Níveis:::::*/

