let quizUsuario = false;
let infoBasica = {title: "", image: "", questions: [], levels: []};
let verificacaoChamada = 0;
const caixaErro = "Por favor, preencha os dados corretamente";
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
                <div class="conteudo-pergunta" name="container-inputs">
                    <div class="input-box">
                        <input placeholder="Texto da Pergunta" name="Titulo da Pergunta ${i+1}" id="input-box" minlength="20" required oninvalid="verificarEntrada(this)">
                        <input placeholder="Cor de fundo da pergunta" name="cor-pergunta" id="input-box" onchange="is_hexadecimal(this)" minlength="7" maxlength="7" value="#" required oninvalid="verificarEntrada(this)">
                    </div>
                    <label class="input-title">Resposta correta</label>
                    <div class="input-box">
                        <input placeholder="Resposta correta" id="input-box" name="Resposta Correta ${i+1}" required oninvalid="verificarEntrada(this)">
                        <input placeholder="URL da imagem" id="input-box" type="url" name="Imagem Resposta Correta ${i+1}" required oninvalid="verificarEntrada(this)">
                    </div>
                    <label class="input-title">Respostas Incorretas</label>
                    <div class="input-box">
                        <input placeholder="Resposta incorreta 1" id="input-box" name="Resposta Incorreta 1 ${i+1}" required oninvalid="verificarEntrada(this)">
                        <input placeholder="URL da imagem 1" id="input-box" type="url" name="Imagem Resposta Incorreta 1 ${i+1}" required oninvalid="verificarEntrada(this)">
                    </div>
                    <div class="input-box">
                        <input placeholder="Resposta incorreta 2" id="input-box" name="Resposta Incorreta 2 ${i+1}" oninvalid="verificarEntrada(this)">
                        <input placeholder="URL da imagem 2" id="input-box" type="url" name="Imagem Resposta Incorreta 2 ${i+1}" oninvalid="verificarEntrada(this)">
                    </div>
                    <div class="input-box">
                        <input placeholder="Resposta incorreta 3" id="input-box" name="Resposta Incorreta 3 ${i+1}" oninvalid="verificarEntrada(this)">
                        <input placeholder="URL da imagem 3" id="input-box" type="url" name="Imagem Resposta Incorreta 3 ${i+1}" oninvalid="verificarEntrada(this)">
                    </div>
                </div>`
    }
    container.innerHTML =`  <form class="conteudo-criacao" name="perguntas-geral" id="form-perguntas" onsubmit="submeterPerguntas(); criarTelaNiveis(); return false">
                                <label class="instrucao">Crie suas perguntas</label>
                                ${perguntas}
                                <button type="submit" class="botao-prosseguir">
                                Prosseguir para criar níveis
                                </button>
                                <button type="button" class="botao-voltar" onclick="voltarTela('.tela-infos-basicas', '.tela-perguntas')">
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
            <div class="conteudo-pergunta" name="container-inputs">
                <input placeholder="Título do nível" id="input-box" name="Título do Nível" type="text" minlength="10" required oninvalid="verificarEntrada(this)">
                <input placeholder="% de acerto mínima" id="input-box" name="Porcentagem do Nível" type="number" min="0" max="100" maxlength="3" required oninvalid="verificarEntrada(this)">
                <input placeholder="URL da imagem do nível" id="input-box" name="URL da Imagem do Nível" type="url" required oninvalid="verificarEntrada(this)">
                <input placeholder="Descrição do nível" id="input-box" name="Descrição do Nível" type="text" minlength="30" oninvalid="verificarEntrada(this)">
            </div>`
    }

    container.innerHTML=`   <form class="conteudo-criacao" name="niveis-geral" onsubmit="conferirPresença(); criarTelaFinal(); return false">
                            <label class="instrucao">Prosseguir para Tela Final</label>
                            ${niveis}
                            <button type="submit" class="botao-prosseguir">
                            Prosseguir para Tela Final
                            </button>
                            <button type="button" class="botao-voltar" onclick="voltarTela('.tela-perguntas', '.tela-niveis')">
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
                            <div class="botao-voltar" onclick="voltarTela('.corpo-pagina-inicial', '.tela-final')">
                                <button type="button" class="voltar">Voltar para home</button>
                            </div>
                        </div>`
}
function conferirPresença(){
    const niveis = document.getElementsByName("Porcentagem do Nível");
    let possui = false;
    for (let i = 0; i < niveis.length; i++){
        if (niveis[i].value === "0"){
            possui = true;
        }
    }
    if (!possui){
        alert("Uma das opções deve ser 0%");
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
}
function respostasSubmetidas(index_pergunta){
    let retorno = []
    const resposta_correta = document.getElementsByName(`Resposta Correta ${index_pergunta + 1}`)[0].value;
    const url_resposta_correta = document.getElementsByName(`Imagem Resposta Correta ${index_pergunta + 1}`)[0].value;
    const resposta_incorreta1 = document.getElementsByName(`Resposta Incorreta 1 ${index_pergunta + 1}`)[0].value;
    const url_resposta_incorreta1 = document.getElementsByName(`Imagem Resposta Incorreta 1 ${index_pergunta + 1}`)[0].value;
    const resposta_incorreta2 = document.getElementsByName(`Resposta Incorreta 2 ${index_pergunta + 1}`)[0].value;
    const url_resposta_incorreta2 = document.getElementsByName(`Imagem Resposta Incorreta 2 ${index_pergunta + 1}`)[0].value;
    const resposta_incorreta3 = document.getElementsByName(`Resposta Incorreta 3 ${index_pergunta + 1}`)[0].value;
    const url_resposta_incorreta3 = document.getElementsByName(`Imagem Resposta Incorreta 3 ${index_pergunta + 1}`)[0].value;
    retorno = [{text: resposta_correta, image: url_resposta_correta, isCorrectAnswer: true},
               {text: resposta_incorreta1, image: url_resposta_incorreta1, isCorrectAnswer: false}];
    if (resposta_incorreta2 !== "" || isUrl(url_resposta_incorreta2) === false){
        retorno.push({text: resposta_incorreta2, image: url_resposta_incorreta2, isCorrectAnswer: false});
    }
    if (resposta_incorreta3 !== ""  || isUrl(url_resposta_incorreta2) === false){
        retorno.push({text: resposta_incorreta3, image: url_resposta_incorreta3, isCorrectAnswer: false});
    };
    return retorno;
}
function submeterNiveis(){
    let niveis = [];
    let titulos = document.getElementsByName("Título do Nível");
    let imagens = document.getElementsByName("URL da Imagem do Nível");
    let descricao = document.getElementsByName("Descrição do Nível");
    let porcentagens = document.getElementsByName("Porcentagem do Nível");

    for (let i = 0; i < titulos.length; i++){
        niveis.push({title: titulos[i].value, image: imagens[i].value, text: descricao[i].value, minValue: Number(porcentagens[i].value)})
    }
    infoBasica.levels = niveis;
    const requisition = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", infoBasica);
    requisition.then();
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
function verificarEntrada(input){
    let elementoColapsavel = input.parentNode;
    let pai = elementoColapsavel.nodeName;
    if (pai !== "container-inputs"){
        elementoColapsavel = input.parentNode.parentNode;
    }
    const anterior = elementoColapsavel.previousElementSibling;
    colapsarPergunta(anterior);
    alert(`Por favor, Insira dados válidos no campo ${input.name}`);
}
function voltarTela(alvo, atual){
    const destino = document.querySelector(alvo);
    const presente = document.querySelector(atual);
    const topo = document.querySelector(".barra-topo");
    destino.classList.remove("hidden");
    presente.classList.add("hidden");
    topo.scrollIntoView({block: "center"});
}
function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
 }