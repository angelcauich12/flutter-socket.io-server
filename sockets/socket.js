
const { io } = require('../index')
const Bands = require('../models/bands')
const Band = require('../models/band')


const bands = new Bands();

bands.addBand(new Band( 'Liran Roll'));
bands.addBand(new Band( 'DLD'));
bands.addBand(new Band( 'La gusana ciega'));
bands.addBand(new Band( 'El haragán'));

console.log(bands);

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', data => {
        console.log('Cliente desconectado');
    });

    client.on('message', (payload) => {
        console.log('Message!!!', payload)

        io.emit('message', { admin: 'Nuevo mensaje' })
    });

    client.on('new-message', (payload) => {
        // console.log('New message!!!', payload)
        client.broadcast.emit('new-message', { message: 'HEY!!!', payload });
    });


});