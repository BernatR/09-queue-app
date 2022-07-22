const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl()


const socketController = (socket) => {


    socket.emit('ultimo-ticket', ticketControl.ultimo)
    socket.emit('estado-actual', ticketControl.ultimos4)
    socket.emit('tickets-pendientes', ticketControl.tickets.length)

    socket.on('siguiente-ticket', (payload, callback) => {

        const siguiente = ticketControl.siguiente()
        callback(siguiente)

        //TODO: Notificar que hay un nuevo ticket pendiente de asignar
        socket.brodcast.emit('tickets-pendientes', ticketControl.tickets.length)
    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligaorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio)

        //TODO notificar cambio en los ultimos 4
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4)
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
        socket.emit('tickets-pendientes', ticketControl.tickets.length)

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'No hay tickets que atender'
            })
        }

        callback({
            ok: true,
            ticket
        })

    })

}



module.exports = {
    socketController
}

