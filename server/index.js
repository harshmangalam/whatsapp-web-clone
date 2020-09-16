const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 5000
const { addUser, getUser, getUsers, removeUser } = require('./db')

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  req.io = io
  next()
})

app.get('/api/users', (req, res) => {
  res.status(200).json({ users: getUsers() })
})

io.on('connect', (socket) => {
  socket.on('login', ({ name }, callback) => {
    const { error, user } = addUser({ id: socket.id, name })
    if (error) return callback(error)
    socket.emit('alert', {
      text: 'You have loggedin successfully',
    })
    socket.broadcast.emit('alert', {
      text: `${name} joined `,
    })

    io.emit('users', { users: getUsers() })
    io.to(socket.id).emit('login', { user })
    callback()
  })

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('hey', {
      signal: data.signalData,
      from: data.from,
    })
  })

  socket.on('acceptCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal)
  })

  socket.on('end_call',(to)=>{
    socket.broadcast.to(to).emit("end_call")
  })

  socket.on('message', (data, callback) => {
    if (data.text.trim().length === 0)
      return callback('cannnot send empty message')
    let now = new Date().toISOString()
    let new_data = {
      ...data,
      time: now,
    }
    socket.broadcast.to(new_data.to).emit('message', new_data)
    socket.emit('message', new_data)
  })



  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      io.emit('alert', { text: `${user.name} disconnected` })
    }
  })
})

server.listen(PORT, () => console.log(`server started on port ${PORT}`))
