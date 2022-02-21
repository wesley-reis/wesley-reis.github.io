// Buttons
var btnAddText = document.querySelector("#addText")
var btnCancel = document.querySelector("#cancel")
var btnAddPlay = document.querySelector("#addPlay")

var btnPlay = document.querySelector("#play")
var btnNewPlay = document.querySelector("#newPlay")
var btnCancelPlay = document.querySelector("#cancelPlay")

//Páginas
var pagHome = document.querySelector("#pagHome")
var pagAddText = document.querySelector("#pagText")
var pagPlay = document.querySelector("#pagPlay")

//Div Search
var divSearch = document.querySelector("#divSearch")

//input add text
let input = document.querySelector('#input')  

//message
let message = document.querySelector("#message")

//contador de silabas
let countSilab = document.querySelector("#silab-count")

// search
let inputSearch = document.querySelector("#inputSearch")

// letter error
let letterError = document.querySelector("#letter-error")

//count acert
let countAdd = document.querySelector("#count-acert")

//audio
let audioError = document.querySelector("#audioError");
let audioWin = document.querySelector("#audioWin");
let audioFinish = document.querySelector("#audioFinish");

//forca
let forcaPalco = document.querySelector("#forca")

//vidas
var life = document.querySelector("#life")

//secret text
var secret =''
var person = 0
var vidas = 7

life.textContent = `Vidas: ${vidas}`

//search silab
inputSearch.addEventListener('keyup', (e) => {
    var key = e.which || e.keyCode
    if(key == 13){
        verifyLeter()
    }
})

//open pag e add text
btnAddText.addEventListener('click', () => {
    openClose(pagAddText, pagHome)
    input.focus()

})

//cancel game
btnCancel.addEventListener('click', () => {
    openClose(pagHome, pagAddText)
    openClose('',divSearch)
    letterError.classList.add('hidden')
})

//play game
btnPlay.addEventListener('click', () => {
    startGame()
    openClose(pagPlay, pagHome)
    openClose(divSearch)
    letterError.classList.add('hidden')
    inputSearch.focus()
})
//cancel game
btnCancelPlay.addEventListener('click', () => {
    clearFrom()
    stopGame()
    openClose(pagHome, pagPlay)
    letterError.classList.add('hidden')
    openClose('',divSearch)
})

//add text and init game
btnAddPlay.addEventListener('click', () => {

    const ListWords = JSON.parse(localStorage.getItem('words')) || []
    const inputText = input.value

    if (inputText == '') {
        message.classList.remove('hidden')
        message.innerHTML = '<p class="text-lg font-bold text-[#AE5336]">preencha o campo por favor</p>'

        setTimeout(() => {
            message.classList.add('hidden')
        }, 3000)
        return 
    }
    
    const index = ListWords.indexOf(inputText)

    const existsInLocalStorage = index != -1 

    if (existsInLocalStorage) {
     
        message.classList.remove('hidden')
        message.innerHTML = '<p class="text-lg font-bold text-[#AE5336]">A palavra '+ inputText +' já está cadastrada</p>'
        input.value = ''
        input.focus()

        setTimeout(() => {
            message.classList.add('hidden')
        }, 3000)

        return
    }else{
        ListWords.push(inputText)
        input.value = ''

        message.classList.remove('hidden')
        message.innerHTML = '<p class="text-lg font-bold text-[#608C62]">Palavra cadastrada com sucesso ;)</p>'

        setTimeout(() => {
            message.classList.add('hidden')
            localStorage.setItem('words', JSON.stringify(ListWords))

            clearFrom()
            startGame()
            openClose(pagPlay, pagAddText)
            openClose(divSearch)
            letterError.classList.add('hidden')
            inputSearch.focus()
        }, 2000)

   
    }

})

//init new game
btnNewPlay.addEventListener('click', () => {
    clearFrom()
    startGame()
    openClose(divSearch)
    letterError.classList.add('hidden')
    inputSearch.focus()
})

//verify we leter exists in text
function verifyLeter(){
    var letter = inputSearch.value.toUpperCase()
    if (!letter) {
        message.classList.remove('hidden')
        message.innerHTML = '<p class="text-lg font-bold text-[#AE5336]">preencha o campo por favor</p>'

        setTimeout(() => {
            message.classList.add('hidden')
        }, 3000)

        return
    }
    var countLetter = 0
    pos = secret.indexOf(letter)
    res = secret.indexOf(letter) !== -1

    // adiciona letras na posição correta do elemento em relaçao ao pai
    while(pos != -1){
        countLetter ++
        countSilab.children[pos].textContent = letter
        pos = secret.indexOf(letter, pos +1)

        addLetter(letter)
    }
    inputSearch.value = ''
    inputSearch.focus()

    error(res, letter)
}


//retorna erro de escolha da letra
function error(res, letter){
    if (res === true) {
        var totalLetter = countSilab.children.length
        var totalAcept = countAdd.children.length
        if(totalAcept === totalLetter){
            somWin()
            vidas = 7
            openClose('', divSearch)
        }
        return
    }
    letterError.classList.remove('hidden')

    var p = document.createElement("p")
    p.className="text-red-500 text-base font-bold" 
    p.textContent = letter.toUpperCase()
    letterError.appendChild(p)

    renderError()
}

function addLetter(valor){
    var letA = document.createElement("p")
    letA.className="border-b-4 font-medium" 
    letA.textContent = valor.toUpperCase()
    countAdd.appendChild(letA)
}

//renderizar som e imagem final
function renderError(){
    var totalError = letterError.children.length
    if(totalError < 7){
       somError()
       vidas --
       life.textContent = `Vidas: ${vidas}`
    }else{
        somFinish()
        imageFinish()
        life.textContent = "Vidas: 0"
        vidas = 7
        openClose('',divSearch)
    }
}

function somError(){
    audioError.play()
}

function somFinish(){
    audioFinish.play()
    imageFinish()
}

function somWin(){
    audioWin.play()
    imageWin()
}

function imageFinish(){
    searchImage("youlose")
}

function imageWin(){
    searchImage("youwin")
}

//função para abrir e fechar página
function openClose(pagOpen=null, pagClose=null){
    if(pagOpen){
        pagOpen.classList.add('flex')
        pagOpen.classList.remove('hidden')
    }
    if(pagClose){
        pagClose.classList.add('hidden')
        pagClose.classList.remove('flex')
    }
}

function startGame(){
    vidas = 7
    pagPlay.classList.add('start')
    sortText()
    numRandom()
    searchImage("init")
    life.textContent = `Vidas: ${vidas}`
    life.classList.remove("hidden")
}

function stopGame(){
    vidas = 7
    pagPlay.classList.remove('start')
    life.classList.add("hidden")
}

function clearFrom(){
    while(countSilab.hasChildNodes()){
        countSilab.removeChild(countSilab.lastChild)
    }

    while(letterError.hasChildNodes()){
        letterError.removeChild(letterError.lastChild)
    }

    while(countAdd.hasChildNodes()){
        countAdd.removeChild(countAdd.lastChild)
    }
}
//text random
function sortText(){
    const ListWords = JSON.parse(localStorage.getItem('words'))
    var text = ListWords[Math.floor(Math.random()*ListWords.length)]
    secret = text.toUpperCase()
    for(let index=0; index < text.length; index++) {
        var p = document.createElement("p")
        p.className="border-b-4 border-[#86734d] px-3 text-gray-50 text-sm sm:text-xl font-medium" 
        countSilab.appendChild(p)
    }

}

//escolher personagem do jogo
function searchImage(image="forca"){
    console.log(forcaPalco.src)
    if(image == "forca"){
        forcaPalco.src = `./src/assets/img/${image}.png`
    }else{
        forcaPalco.src = `./src/assets/img/person-${person}/${image}.png`
    }

}

function numRandom(){
    person = Math.floor(Math.random()*5+1)
}
