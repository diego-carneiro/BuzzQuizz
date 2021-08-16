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

capturarQuizzes();


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
let quizzAberto;

function abrirQuizz(elemento) {

    quizzAberto = elemento;

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

        //Adicionar mudaças ao DOM
        pagInicial.innerHTML += `<div class="container-pergunta-individual">
        <div class="container-titulo-pergunta-individual  ${corId}">
            <h2>${quizzIndividual.questions[i].title}</h2>
        </div>
        <div class="container-respostas-pergunta-individual">
            ${stringRespostas}
        </div>
    </div>`


        //mudar cor do container título
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
    elemento.classList.add("selecionado");


    //checar fim do quizz
    checarFimQuizz();
}

function checarFimQuizz() {
    const naoModificado = document.querySelector(".nao-modificado")
    if (naoModificado === null) {
        renderizarFimQuizz();
    }
}

function renderizarFimQuizz() {
    const listaAcertos = document.querySelectorAll(".verde.selecionado"); //lista de acertos
    const quantidadeAcertos = listaAcertos.length;

    const porcentagemAcertos = Math.round((quantidadeAcertos * 100) / quantidadePerguntas);

    let nivelAtingido = niveisQuiz[0];

    for (i = 0; i < niveisQuiz.length; i ++) {
        console.log(niveisQuiz[i].minValue);
        if (porcentagemAcertos > niveisQuiz[i].minValue) {
            nivelAtingido = niveisQuiz[i];
        }
    }

    pagInicial.innerHTML += `<div class="container-fim-quizz">
    <div class="container-resultado">
        <h1>${nivelAtingido.title}</h1>
    </div>
    <div class="imagem-e-descricao">
        <img src="${nivelAtingido.image}">
        <p>${nivelAtingido.text}</p>
    </div>
</div>

<span class="reiniciar-quizz" onclick="abrirQuizz(quizzAberto)">Reiniciar Quizz</span>
<span class="voltar-home" onclick="estadoInicial()">Voltar pra home</span>`

};

/*:::::Fim da Trocas entre telas Abrir Quizz (joão):::::*/

/*:::::Trocas entre telas para criação:::::*/
function estadoInicial() {
    pagInicial.innerHTML = `<div class=corpo-pagina-inicial>
    <div class="criar-quizz">
        <div class="botao-criacao" onclick="subirCriação_1()">
            <p class="aviso-quizz">Você não criou nenhum quizz ainda:(</p>
            <button class="criar">Criar Quizz</button>
        </div>
    </div>
    <div class="caixa-quizz">
    </div>
</div>`
    
    capturarQuizzes() 
}

function subirCriação_1() {
    pagInicial.innerHTML = `<div class="corpo-pagina-criacao criacao_1">
    <div class="conteudo-criacao">
        <p class="instrucao">Comece pelo começo</p>
        <div class="dados-quizz_1">
            <input placeholder="   Título do seu quizz" id="input-box">
            <input placeholder="   URL da imagem do seu quizz" id="input-box">
            <input placeholder="   Quantidade de perguntas do quizz" id="input-box">
            <input placeholder="   Quantidade de níveis do quizz" id="input-box">

        </div>
        <div class="botao-prosseguir" onclick="subirCriação_2()">
            <p class="texto-botao-prosseguir">Prosseguir para criar perguntas</p>
        </div>
        <div class="botao-voltar" onclick="estadoInicial()">
            <button class="voltar">Voltar</button>
        </div>
    </div>
</div>`
};

function subirCriação_2() {
    pagInicial.innerHTML = `<div class="corpo-pagina-criacao criacao_2">
    <div class="conteudo-criacao">
        <p class="instrucao">Crie suas perguntas</p>
        <div class="dados-quizz_2">
            <p class="input-title">Pergunta 1</p>
            <div class="input-box">
                <input placeholder="   Texto da Pergunta" id="input-box">
                <input placeholder="   Cor de fundo da pergunta" id="input-box">
            </div>
            <p class="input-title">Resposta correta</p>
            <div class="input-box">
                <input placeholder="   Resposta correta" id="input-box">
                <input placeholder="   URL da imagem" id="input-box">
            </div>
            <p class="input-title">Respostas Incorretas</p>
            <div class="input-box">
                <input placeholder="   Resposta incorreta 1" id="input-box">
                <input placeholder="   URL da imagem 1" id="input-box">
            </div>
            <div class="input-box">
                <input placeholder="   Resposta incorreta 2" id="input-box">
                <input placeholder="   URL da imagem 2" id="input-box">
            </div>
            <div class="input-box">
                <input placeholder="   Resposta incorreta 3" id="input-box">
                <input placeholder="   URL da imagem 3" id="input-box">
            </div>
        </div>
        <div class="botao-prosseguir" onclick="subirCriação_3()">
            <p class="texto-botao-prosseguir">Prosseguir para criar níveis</p>
        </div>
        <div class="botao-voltar" onclick="subirCriação_1()">
            <button class="voltar">Voltar</button>
        </div>
    </div>
</div>
</div>`
};

function subirCriação_3() {
    pagInicial.innerHTML = `<div class="corpo-pagina-criacao criacao_3">
    <div class="conteudo-criacao">
        <p class="instrucao">Agora, decida os níveis</p>
        <div class="caixa-niveis">
            <p class="input-title">Nível 1</p>
            <input placeholder="   Título do nível" id="input-box">
            <input placeholder="   % de acerto mínima" id="input-box">
            <input placeholder="   URL da imagem do nível" id="input-box">
            <input placeholder="   Descrição do nível" id="input-box">
        </div>
        <div class="caixa-adicao segundo-nivel">
            <p class="add-title">Nível 2</p>
            <img class="pencil" src="pencil.png" />
        </div>
        <div class="caixa-adicao terceiro-nivel">
            <p class="add-title">Nível 3</p>
            <img class="pencil" src="pencil.png" onclick="segundoNivel()" />
        </div>
        <div class="botao-prosseguir" onclick="subirCriação_4()">
            <p class="texto-botao-prosseguir">Finalizar Quizz</p>
        </div>
        <div class="botao-voltar" onclick="subirCriação_2()">
            <button class="voltar">Voltar</button>
        </div>
    </div>
</div>`
};

function subirCriação_4() {
    pagInicial.innerHTML = `<div class="corpo-pagina-criacao criacao_4">
    <div class="conteudo-criacao">
        <p class="instrucao">Seu quizz está pronto!</p>
        <div class="botao-de-prosseguir">
            <p class="texto-botao-prosseguir">Acessar Quizz</p>
        </div>
        <div class="botao-voltar" onclick="estadoInicial()">
            <button class="voltar">Voltar</button>
        </div>
    </div>
</div>`
};


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

