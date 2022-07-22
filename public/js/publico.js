const lblTicket1 = document.querySelector('#lblTicket1')
const lblEscritorio1 = document.querySelector('#lblEscritorio1')
const lblTicket2 = document.querySelector('#lblTicket2')
const lblEscritorio2 = document.querySelector('#lblEscritorio2')
const lblTicket3 = document.querySelector('#lblTicket3')
const lblEscritorio3 = document.querySelector('#lblEscritorio3')
const lblTicket4 = document.querySelector('#lblTicket4')
const lblEscritorio4 = document.querySelector('#lblEscritorio4')




const socket = io();

socket.on('estado-actual', (ultimos4) => {

    const audio = new Audio('./audio/new-ticket.mp3')
    audio.play()

    for (let i = 0; i < ultimos4.length; i++) {
        window['lblTicket' + (i + 1)].innerText = 'Ticket ' + ultimos4[i].numero
        window['lblEscritorio' + (i + 1)].innerText = ultimos4[i].escritorio
    }
})