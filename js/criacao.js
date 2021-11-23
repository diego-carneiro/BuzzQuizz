let quizUsuario = false;
let infoBasica = {title: "", image: "", questions: [], levels: []};
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
                 questions: arrayPerguntas,
                 levels: arrayNiveis
                 };
    
    criarTelaPerguntas();
    trocarPagina();
    document.querySelector(".tela-infos-basicas").classList.add("hidden");
}
function criarTelaPerguntas(){
    const container = document.querySelector(".tela-perguntas");
    let perguntas = "";
    for (let i = 0; i < infoBasica.questions.length; i++){
        perguntas +=
            `<button type="button" class="dados-quizz_2 colapsavel" onclick="colapsarPergunta(this)">
            Pergunta ${i+1}
            <ion-icon name="create-outline" class="pencil"></ion-icon>
            </button>
                <div class="conteudo-pergunta">
                    <div class="input-box">
                        <input placeholder="Texto da Pergunta" name="titulo-pergunta" id="input-box" minlength="20" required>
                        <input placeholder="Cor de fundo da pergunta" name="cor-pergunta" id="input-box" onchange="is_hexadecimal(this)" minlength="7" maxlength="7" value="#" required>
                    </div>
                    <label class="input-title">Resposta correta</label>
                    <div class="input-box">
                        <input placeholder="Resposta correta" id="input-box" name="resposta-correta-${i}" required>
                        <input placeholder="URL da imagem" id="input-box" type="url" name="url-resposta-correta-${i}" required>
                    </div>
                    <label class="input-title">Respostas Incorretas</label>
                    <div class="input-box">
                        <input placeholder="Resposta incorreta 1" id="input-box" name="resposta-incorreta-1-${i}" required>
                        <input placeholder="URL da imagem 1" id="input-box" type="url" name="url-resposta-incorreta-1-${i}" required>
                    </div>
                    <div class="input-box">
                        <input placeholder="Resposta incorreta 2" id="input-box" name="resposta-incorreta-2-${i}">
                        <input placeholder="URL da imagem 2" id="input-box" type="url" name="url-resposta-incorreta-2-${i}">
                    </div>
                    <div class="input-box">
                        <input placeholder="Resposta incorreta 3" id="input-box" name="resposta-incorreta-3-${i}">
                        <input placeholder="URL da imagem 3" id="input-box" type="url" name="url-resposta-incorreta-3-${i}">
                    </div>
                </div>`
    }
    container.innerHTML =`  <form class="conteudo-criacao" name="perguntas-geral" id="form-perguntas" onsubmit="submeterPerguntas(); criarTelaNiveis(); return false">
                                <label class="instrucao">Crie suas perguntas</label>
                                ${perguntas}
                                <button type="submit" class="botao-prosseguir">
                                Prosseguir para criar níveis
                                </button>
                                <button type="button" class="botao-voltar" onclick="subirCriação_1()">
                                Voltar
                                </button>
                                </form>`
}
function criarTelaNiveis(){
    const container = document.querySelector(".tela-niveis");
    const perguntas = document.querySelector(".tela-perguntas");
    container.classList.remove("hidden");
    perguntas.classList.add("hidden");
    let niveis = "";
    for (let i = 0; i < infoBasica.levels.length; i++){
        niveis += 
            `<button type="button" class="dados-quizz_2 colapsavel" onclick="colapsarPergunta(this)">
            Nível${i+1}
            <ion-icon name="create-outline" class="pencil"></ion-icon>
            </button>
            <div class="conteudo-pergunta">
                <input placeholder="Título do nível" id="input-box" name="titulo-nivel" type="text" minlength="10" required>
                <input placeholder="% de acerto mínima" id="input-box" name="porcentagem" type="number" min="0" max="100" required>
                <input placeholder="URL da imagem do nível" id="input-box" name="url-nivel" type="url" required>
                <input placeholder="Descrição do nível" id="input-box" name="descricao-nivel" type="text" minlength="30">
            </div>`
    }

    container.innerHTML=`   <form class="conteudo-criacao" name="niveis-geral" onsubmit="conferirPresença(); criarTelaFinal(); return false">
                            <label class="instrucao">Agora, decida os níveis</label>
                            ${niveis}
                            <button type="submit" class="botao-prosseguir">
                            Prosseguir para criar níveis
                            </button>
                            <button type="button" class="botao-voltar" onclick="subirCriação_1()">
                            Voltar
                            </button>
                            </form>`
    
}
function criarTelaFinal(){
    const container = document.querySelector(".tela-final");
    const niveis = document.querySelector(".tela-niveis");
    container.classList.remove("hidden");
    niveis.classList.add("hidden");
    container.innerHTML=`<div class="conteudo-criacao">
                            <p class="instrucao">Seu quizz está pronto!</p>
                            <div class="quizzes-de-outros" onclick="irPraTelaQuiz()">
                            <img src="${infoBasica.image}"/>
                            <div class="sombra-imagem"></div>
                            <span>${infoBasica.title}</span>
                            </div>
                            <div class="botao-de-prosseguir">
                                <p class="texto-botao-prosseguir">Acessar Quizz</p>
                            </div>
                            <div class="botao-voltar" onclick="estadoInicial()">
                                <button type="button" class="voltar">Voltar</button>
                            </div>
                        </div>`
}
function conferirPresença(){
    const niveis = document.getElementsByName("porcentagem");
    let possui = false;
    for (let i = 0; i < niveis.length; i++){
        if (niveis[i].value === "0"){
            possui = true;
        }
    }
    if (!possui){
        alert("uma das opções deve ser 0%");
    }
    else{
        submeterNiveis();
    }
}
function submeterPerguntas(){
    let perguntas = [];
    let titulos = document.getElementsByName("titulo-pergunta");
    let cores = document.getElementsByName("cor-pergunta");
    for (let i = 0; i < titulos.length; i++){
        perguntas.push({title: titulos[i].value, color: cores[i].value, answers: respostasSubmetidas(i)});
    }
    infoBasica.questions = perguntas;
    const requisition = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", infoBasica);
    requisition.then(() => console.log("enviado"))
}
function respostasSubmetidas(index_pergunta){
    let retorno = []
    const resposta_correta = document.getElementsByName(`resposta-correta-${index_pergunta}`)[0].value;
    const url_resposta_correta = document.getElementsByName(`url-resposta-correta-${index_pergunta}`)[0].value;
    const resposta_incorreta1 = document.getElementsByName(`resposta-incorreta-1-${index_pergunta}`)[0].value;
    const url_resposta_incorreta1 = document.getElementsByName(`url-resposta-incorreta-1-${index_pergunta}`)[0].value;
    const resposta_incorreta2 = document.getElementsByName(`resposta-incorreta-2-${index_pergunta}`)[0].value;
    const url_resposta_incorreta2 = document.getElementsByName(`url-resposta-incorreta-2-${index_pergunta}`)[0].value;
    const resposta_incorreta3 = document.getElementsByName(`resposta-incorreta-3-${index_pergunta}`)[0].value;
    const url_resposta_incorreta3 = document.getElementsByName(`url-resposta-incorreta-3-${index_pergunta}`)[0].value;
    retorno = [{text: resposta_correta, image: url_resposta_correta, isCorrectAnswer: true},
               {text: resposta_incorreta1, image: url_resposta_incorreta1, isCorrectAnswer: false}];
    if (resposta_incorreta2 !== ""){
        retorno.push({text: resposta_incorreta2, image: url_resposta_incorreta2, isCorrectAnswer: false});
    }
    if (resposta_incorreta3 !== ""){
        retorno.push({text: resposta_incorreta3, image: url_resposta_incorreta3, isCorrectAnswer: false});
    };
    return retorno;
}
function submeterNiveis(){
    let niveis = [];
    let titulos = document.getElementsByName("titulo-nivel");
    let imagens = document.getElementsByName("url-nivel");
    let descricao = document.getElementsByName("descricao-nivel");
    let porcentagens = document.getElementsByName("porcentagem");

    for (let i = 0; i < titulos.length; i++){
        niveis.push({title: titulos[i].value, image: imagens[i].value, text: descricao[i].value, minValue: Number(porcentagens[i].value)})
    }
    infoBasica.levels = niveis;

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
    const ativoAtualmente = document.querySelector(".ativo");
    let content = elemento.nextElementSibling;
    if (ativoAtualmente !== null && elemento !== ativoAtualmente){
        ativoAtualmente.classList.remove("ativo");
        ativoAtualmente.nextElementSibling.style.display = "none";
    }
    elemento.classList.toggle("ativo");
    if (content.style.display === "flex") {
        content.style.display = "none";
    } 
    else {
        content.style.display = "flex";
    }
}