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

    listaQuizzesImportados = quizzes.data

    const caixaDeQuizz = document.querySelector(".caixa-quizz");
    console.log(caixaDeQuizz);

    for (i = 0; i < listaQuizzesImportados.length; i ++){
        caixaDeQuizz.innerHTML += `<div class="quizzes-de-outros" id="${i}" onclick= "abrirQuizz(this)">
        <img src="${listaQuizzesImportados[i].image}">
        <span>${listaQuizzesImportados[i].title}</span>
        <div class="sombraImagem"></div>
    </div>` 
    } 

}

/*:::::Trocas entre telas Abrir Quizz (joão):::::*/

function abrirQuizz(elemento) {

    const quizzID = elemento.id;
    const quizzImgUrl = listaQuizzesImportados[quizzID].image;
    const quizzTitulo = listaQuizzesImportados[quizzID].title;

    pagInicial.innerHTML = `<div class="pagina-de-um-quizz">
    <div class="container-foto-de-capa-quizz">
    <img src="${quizzImgUrl}">
    <span>${listaQuizzesImportados[quizzID].title}</span>
    </div>
</div>`

    //adicionar perguntas
    for (i = 0; i < listaQuizzesImportados[quizzID].questions.length; i ++){
        pagInicial.innerHTML += `<div class="container-pergunta-individual"></div>` 
    }
}

/*:::::Fim da Trocas entre telas Abrir Quizz (joão):::::*/

/*:::::Trocas entre telas para criação:::::*/
function estadoInicial(){
    pagInicial.classList.remove('display-none');
    telaCriação_1.classList.add('display-none');
    telaCriação_2.classList.add('display-none');
    telaCriação_3.classList.add('display-none');
    telaCriação_4.classList.add('display-none');

    paginaDeUmQuizz.classList.add('display-none');
}
estadoInicial();

function subirCriação_1(){
    pagInicial.classList.add('display-none');
    telaCriação_1.classList.remove('display-none');
    telaCriação_2.classList.add('display-none');
    telaCriação_3.classList.add('display-none');
    telaCriação_4.classList.add('display-none');
}
function subirCriação_2(){
    pagInicial.classList.add('display-none');
    telaCriação_1.classList.add('display-none');
    telaCriação_2.classList.remove('display-none');
    telaCriação_3.classList.add('display-none');
    telaCriação_4.classList.add('display-none');
}
function subirCriação_3(){
    pagInicial.classList.add('display-none');
    telaCriação_1.classList.add('display-none');
    telaCriação_2.classList.add('display-none');
    telaCriação_3.classList.remove('display-none');
    telaCriação_4.classList.add('display-none');
}
function subirCriação_4(){
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

