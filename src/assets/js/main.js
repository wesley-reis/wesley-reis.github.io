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



btnAddText.addEventListener('click', () => {
    openClose(pagAddText, pagHome)
})

btnCancel.addEventListener('click', () => {
    openClose(pagHome, pagAddText)
    openClose('',divSearch)
})

btnPlay.addEventListener('click', () => {
    openClose(pagPlay, pagHome)
    openClose(divSearch)
})
btnCancelPlay.addEventListener('click', () => {
    openClose(pagHome, pagPlay)
    openClose('',divSearch)
})


btnAddPlay.addEventListener('click', () => {
    openClose(pagPlay, pagAddText)
    openClose(divSearch)
})

btnNewPlay.addEventListener('click', () => {
    alert('novo jogo')
    openClose(divSearch)
})





//função para abrir e fechar página
function openClose(pagOpen=null, pagClose=null){
    if(pagOpen){
        pagOpen.classList.add('flex')
        pagOpen.classList.remove('hidden')
    }
    if(pagClose){
        pagClose.classList.add('hidden')
        pagClose.classList.remove('flex')
    }else{
        pagOpen.classList.add('flex')
        pagOpen.classList.remove('hidden')
    
        pagClose.classList.add('hidden')
        pagClose.classList.remove('flex')
    }

}