const quizURL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

capturarQuizzes()


//Capturar Quiz
function capturarQuizzes() {
    const promise = axios.get(quizURL);

    promise.then(renderizarQuizes);
}

function renderizarQuizes(quizzes) {
    console.log(quizzes.data); //lista de objetos (quizzes)

    for (i=0; i < quizzes.data.length; i ++){
        console.log(quizzes.data[i].image) //url da imagen (colocar no src com innerHTML)

        console.log(quizzes.data[i].title) //título do quizz
    }
}


/*::::::::::Trocas entre Telas::::::::::*/

function subirCriação_1(){
    let corpoPagInicial = document.querySelector(".corpoPaginaInicial");
    let criação_1 = document.querySelector(".criação_1");

    corpoPagInicial.classList.add('displayNone');
    criação_1.classList.remove('displayNone');
}
function subirCriação_2(){
    let criação_1 = document.querySelector(".criação_1");
    let criação_2 = document.querySelector(".criação_2");

    criação_1.classList.add('displayNone');

}
function retornarTelaInicial(){
    let corpoPagInicial = document.querySelector(".corpoPaginaInicial");
    let criação_1 = document.querySelector(".corpoPaginaCriação");
    corpoPagInicial.classList.remove('displayNone');
    criação_1.classList.add('displayNone');
}


/*::::::::::Trocas entre Telas::::::::::*/

