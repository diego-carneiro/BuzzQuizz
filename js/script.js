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

function subirCriação(){
    let corpoPagInicial = document.querySelector(".corpoPaginaInicial");
    let corpoPagCriação = document.querySelector(".corpoPaginaCriação");

    corpoPagInicial.classList.add('displayNone');
    corpoPagCriação.classList.remove('displayNone');
}
function retornarTelaInicial(){
    let corpoPagInicial = document.querySelector(".corpoPaginaInicial");
    let corpoPagCriação = document.querySelector(".corpoPaginaCriação");
    corpoPagInicial.classList.remove('displayNone');
    corpoPagCriação.classList.add('displayNone');
}
/*::::::::::Trocas entre Telas::::::::::*/

