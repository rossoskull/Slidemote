let express = require('express')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let path = require('path')

let slides = {}

let port = process.env.PORT || 8000
server.listen(port, err => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server running on port ${port}`)
  }
})

// Serve React files
// Desktop app
app.use('/', express.static(path.join(__dirname, 'client', 'desktop', 'build')))

// Remote app
app.use('/remote', express.static(path.join(__dirname, 'client', 'remote', 'build')))

app.get('/wakeup', (req, res) => {
  res.status(200).end()
})

io.on('connection', socket => {
  socket.emit('connected')
  
  socket.on('registerAsClient', () => {
    let randomId = String(Date.now()).slice(-6)
    socket.connectionType = 'client'
    
    slides[randomId] = {
      client: socket,
      remote: null
    }

    console.log(slides)
    
    socket.emit('clientRegistered', {keyVal: randomId})    
  })
  
  socket.on('registerAsRemote', e => {
    if (slides.hasOwnProperty(e.keyVal)) {
      socket.connectionType = 'remote'
      slides[e.keyVal].remote = socket
      
      slides[e.keyVal].client.emit('remoteConnected', {msg: 'Remote is connected'})
      socket.emit('remoteConnected', {msg: 'Remote is connected'})
      
      console.log('Remote Registered--------', slides)
    } else {
      socket.emit('remoteRegNoClient', {msg: 'No client by that ID'})
    }
  })

  socket.on('disconnect', () => {
    if (socket.connectionType === 'client') {
      for (var key in slides) {
        console.log(key)
        if (slides[key] && ( slides[key].client === socket || slides[key].remote === socket)) {
          delete slides[key]
          break
        }
      }
    }    

    console.log(slides)
  })
  
})
