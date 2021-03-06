//dont pass in the port connection as parameter in function call  IIFE?
const io = require('socket.io')({
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

//runs everytime a client connects to a server, we get an instance of the socket object as cb?
io.on('connect', socket => {
  socket.emit('connection established')

  // setInterval(() => {
  //   socket.emit('hello world!')
  // }, 2000)

  // socket.on('new message', (number, cb) => {
  //   console.log('a new message received with number', number)
  //   console.log('replying with', number + 1)
  //   cb(number + 1)
  // })

  // socket.on('another api', cb => {
  //   cb('another api response')
  // })

  socket.on('new message', (streamId, message) => {
    socket.to(streamId).emit('new live stream message', message)
  })

  socket.on('join stream', streamId => {
    socket.join(streamId)
  })

  socket.on('go live', (userId, cb) => {
    console.log(`${userId} is going live`)

    socket.broadcast.emit('new live stream', userId)
    socket.join(userId)
    //socket callback confirms/acknowledges the 'new live stream' event with true
    cb(true)
  })
})

module.exports = io
