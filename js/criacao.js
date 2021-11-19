let quizUsuario = false;
let infoBasica = {title: "", image: "", answers: [], levels: []};
function criarTelaInicial(){
    const caixaBotao = document.querySelector(".criar-quizz");
    if (!quizUsuario) {
    caixaBotao.innerHTML = 
    `<div class="botao-criacao">
    <p class="aviso-quizz">Você não criou nenhum quizz ainda:(</p>
    <button class="criar" onclick="trocarPagina()">Criar Quizz</button>
    </div>`
    }
    else {
    caixaBotao.innerHTML = 
    `<div class="botao-criacao">
    <button class="criar possuiQuiz" onclick="trocarPagina()"><ion-icon name="add-circle"></ion-icon></button>
    </div>`
    }
}
function trocarPagina(){
    const tela1 = document.querySelector(".corpo-pagina-inicial");
    const telaCriacao = document.querySelector(".corpo-pagina-criacao.hidden");
    tela1.classList.add("hidden");
    telaCriacao.classList.remove("hidden");
}
function verificarCriacao_1(){
    const tituloQuizCriado = document.querySelector(".criacao-titulo").value;
    const imagemQuizCriado = document.querySelector(".criacao-img").value;
    const perguntasQuizCriado = document.querySelector(".criacao-quantidade-perguntas").value;
    const niveisQuizCriado = document.querySelector(".criacao-quantidade-niveis").value;
    
    let arrayPerguntas = [];
    let arrayNiveis = [];

    for (let i = 0; i < perguntasQuizCriado; i++){
        arrayPerguntas.push({text: "", image: "", isCorrectAnswer: false});
    }
    for (let i = 0; i < niveisQuizCriado; i++){
        arrayNiveis.push({title:"", image:"", text:"", minValue: 0});
    }
    infoBasica = {
                 title: tituloQuizCriado, 
                 image: imagemQuizCriado, 
                 answers: arrayPerguntas,
                 levels: arrayNiveis
                 };
    
    criarTelaPerguntas();
    trocarPagina();
    document.querySelector(".tela-infos-basicas").classList.add("hidden");
}
function criarTelaPerguntas(){
    const container = document.querySelector(".tela-perguntas");
    let perguntas = "";
    for (let i = 0; i < infoBasica.answers.length; i++){
        perguntas +=
        `<div class="dados-quizz_2">
                <p class="input-title">Pergunta ${i+1}</p>
                <div class="input-box">
                    <input placeholder="Texto da Pergunta" id="input-box" minlength="20" required>
                    <input placeholder="Cor de fundo da pergunta" id="input-box" onchange="is_hexadecimal(this)" required>
                </div>
                <p class="input-title">Resposta correta</p>
                <div class="input-box">
                    <input placeholder="Resposta correta" id="input-box" required>
                    <input placeholder="URL da imagem" id="input-box" type="url" required>
                </div>
                <p class="input-title">Respostas Incorretas</p>
                <div class="input-box">
                    <input placeholder="Resposta incorreta 1" id="input-box" required>
                    <input placeholder="URL da imagem 1" id="input-box" type="url">
                </div>
                <div class="input-box">
                    <input placeholder="Resposta incorreta 2" id="input-box">
                    <input placeholder="URL da imagem 2" id="input-box" type="url">
                </div>
                <div class="input-box">
                    <input placeholder="Resposta incorreta 3" id="input-box">
                    <input placeholder="URL da imagem 3" id="input-box" type="url">
                </div>
            </div>`
    }
    container.innerHTML =`<div class="conteudo-criacao">
            <p class="instrucao">Crie suas perguntas</p>
            ${perguntas}
            <div class="botao-prosseguir" onclick="subirCriação_3()">
                <p class="texto-botao-prosseguir">Prosseguir para criar níveis</p>
            </div>
            <div class="botao-voltar" onclick="subirCriação_1()">
                <button class="voltar">Voltar</button>
            </div>
        </div>`
}
function is_hexadecimal(elemento){
    let str = elemento.value;
    regexp = /^[0-9a-fA-F]+$/;
    if (regexp.test(str)) {
    }
    else {
        str = "";
        return alert("Insira uma cor hexadecimal");
    }
}