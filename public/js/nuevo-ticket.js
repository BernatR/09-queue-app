
// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnSiguiente = document.querySelector('#btnSiguienteTicket')


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnSiguiente.disable = false


});

socket.on('disconnect', () => {
    //console.log('Desconectado del servidor');
    btnSiguiente.disable = true
});

socket.on('ultimo-ticket', (ticket) => {
    lblNuevoTicket.innerText = `Ticket ${ticket}`
})


btnSiguiente.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket
    });

});