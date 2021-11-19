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
        `<div class="dados-quizz_2 colapsavel" onclick="colapsarPergunta(this)">
                <div class="conteudo-pergunta">
                <label class="input-title">Pergunta ${i+1}</label>
                <div class="input-box">
                    <input placeholder="Texto da Pergunta" name="titulo-pergunta-${i+1}" id="input-box" minlength="20" required>
                    <input placeholder="Cor de fundo da pergunta" name="cor-pergunta-${i+1}" id="input-box" onchange="is_hexadecimal(this)" minlength="7" maxlength="7" value="#" required>
                </div>
                <label class="input-title">Resposta correta</label>
                <div class="input-box">
                    <input placeholder="Resposta correta" id="input-box" name="resposta-correta-${i+1}" required>
                    <input placeholder="URL da imagem" id="input-box" type="url" name="url-resposta-correta-${i+1}" required>
                </div>
                <label class="input-title">Respostas Incorretas</label>
                <div class="input-box">
                    <input placeholder="Resposta incorreta 1" id="input-box" name="resposta-incorreta-${i+1}-1" required>
                    <input placeholder="URL da imagem 1" id="input-box" type="url" name="url-resposta-incorreta-${i+1}-1" required>
                </div>
                <div class="input-box">
                    <input placeholder="Resposta incorreta 2" id="input-box" name="resposta-incorreta-${i+1}-2">
                    <input placeholder="URL da imagem 2" id="input-box" type="url" name="url-resposta-incorreta-${i+1}-1">
                </div>
                <div class="input-box">
                    <input placeholder="Resposta incorreta 3" id="input-box" name="resposta-incorreta-${i+1}-3">
                    <input placeholder="URL da imagem 3" id="input-box" type="url" name="url-resposta-incorreta-${i+1}-1">
                </div>
                </div>
            </div>`
    }
    container.innerHTML =`  <form class="conteudo-criacao" name="perguntas-geral">
                                <label class="instrucao">Crie suas perguntas</label>
                                ${perguntas}
                                <button type="submit" class="botao-prosseguir" onsubmit="subirCriação_3()">
                                Prosseguir para criar níveis
                                </button>
                                <button type="button" class="botao-voltar" onclick="subirCriação_1()">
                                Voltar
                                </button>
                            </form>`
}
function is_hexadecimal(elemento){
    let str = elemento.value;
    regexp = /^[0-9a-fA-F#]+$/;
    if (regexp.test(str)) {
    }
    else {
        elemento.value = "";
        return alert("Insira uma cor hexadecimal");
    }
}

function colapsarPergunta(elemento){
    
    elemento.classList.toggle("ativo");
    let content = elemento.children[0];
    if (content.style.display === "block") {
        content.style.display = "none";
    } 
    else {
        content.style.display = "block";
    }
}