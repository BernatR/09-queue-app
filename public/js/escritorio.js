const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')


const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('Escritorio obligatorio')

}
const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio
divAlert.style.display = 'none'


const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disable = false


});

socket.on('disconnect', () => {
    //console.log('Desconectado del servidor');
    btnAtender.disable = true
});

socket.on('ultimo-ticket', (ticket) => {
    //lblNuevoTicket.innerText = `Ticket ${ticket}`
})

socket.on('tickets-pendientes', (count) => {
    lblPendientes.innerText = count
})

btnAtender.addEventListener('click', () => {


    socket.emit('atender-ticket', { escritorio }, ({ ok, msg, ticket }) => {
        if (!ok) {
            lblTicket.innerHTML = 'Nadie'
            return divAlert.style.display = ''
        }
        lblTicket.innerHTML = 'Ticket ' + ticket.numero
    });

});