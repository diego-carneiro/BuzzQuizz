/*:::::HTML das telas:::::*/
const pagInicial = document.querySelector(".corpoPaginaInicial");
const telaCriação_1 = document.querySelector(".criação_1");
const telaCriação_2 = document.querySelector(".criação_2");
const telaCriação_3 = document.querySelector(".criação_3");
const telaCriação_4 = document.querySelector(".criação_4"); 

const paginaDeUmQuizz = document.querySelector('.pagina-de-um-quizz');


/*:::::Fim do HTML das telas:::::*/

const quizURL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

capturarQuizzes()


//Capturar Quiz
function capturarQuizzes() {
    const promise = axios.get(quizURL);

    promise.then(renderizarQuizes);
}

function renderizarQuizes(quizzes) {
    console.log(quizzes.data); //lista de objetos (quizzes)

    const caixaDeQuizz = document.querySelector(".caixaDeQuizz");
    console.log(caixaDeQuizz);

    for (i=0; i < quizzes.data.length; i ++){
        console.log(quizzes.data[i].image); //url da imagen (colocar no src com innerHTML)

        console.log(quizzes.data[i].title); //título do quizz
    } 
    
    for (i=0; i < quizzes.data.length; i ++){
        caixaDeQuizz.innerHTML += `<div class="quizzesDeOutros" id="${i}" onclick="testeOnclick(this); abrirQuizz(this)">
        <img src="${quizzes.data[i].image}">
        <span>${quizzes.data[i].title}</span>
        <div class="sombraImagem"></div>
    </div>` 
    } 

}

function testeOnclick(elemento) {
    alert(elemento.id)
    console.log(elemento.innerHTML);
}

/*:::::Trocas entre telas Abrir Quizz (joão):::::*/

function abrirQuizz(elemento) {
    alert('abrir quizz');

    console.log(elemento.innerHTML)

    pagInicial.innerHTML = `<div class="pagina-de-um-quizz">
    <div class="container-foto-de-capa-quizz">

    </div>
</div>`
}

/*:::::Fim da Trocas entre telas Abrir Quizz (joão):::::*/

/*:::::Trocas entre telas para criação:::::*/
function estadoInicial(){
    pagInicial.classList.remove('displayNone');
    telaCriação_1.classList.add('displayNone');
    telaCriação_2.classList.add('displayNone');
    telaCriação_3.classList.add('displayNone');
    telaCriação_4.classList.add('displayNone');

    paginaDeUmQuizz.classList.add('displayNone');
}
estadoInicial();

function subirCriação_1(){
    pagInicial.classList.add('displayNone');
    telaCriação_1.classList.remove('displayNone');
    telaCriação_2.classList.add('displayNone');
    telaCriação_3.classList.add('displayNone');
    telaCriação_4.classList.add('displayNone');
}
function subirCriação_2(){
    pagInicial.classList.add('displayNone');
    telaCriação_1.classList.add('displayNone');
    telaCriação_2.classList.remove('displayNone');
    telaCriação_3.classList.add('displayNone');
    telaCriação_4.classList.add('displayNone');
}
function subirCriação_3(){
    pagInicial.classList.add('displayNone');
    telaCriação_1.classList.add('displayNone');
    telaCriação_2.classList.add('displayNone');
    telaCriação_3.classList.remove('displayNone');
    telaCriação_4.classList.add('displayNone');
}
function subirCriação_4(){
    pagInicial.classList.add('displayNone');
    telaCriação_1.classList.add('displayNone');
    telaCriação_2.classList.add('displayNone');
    telaCriação_3.classList.add('displayNone');
    telaCriação_4.classList.remove('displayNone');
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

