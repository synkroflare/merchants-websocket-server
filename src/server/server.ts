import 'dotenv/config'
import 'reflect-metadata'
import '../shared/container'
import { app } from '../shared/infra/http/httpServer'

const fs = require('fs');
const privateKey  = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');

const credentials = {key: privateKey, cert: certificate};

const port = 8082

const ws =  require('ws');
const wss = new ws.Server({port: port});

wss.broadcast = function(data) {
  wss.clients.forEach(client => client.send(data));
};

app.get('/hcheck' , (req,res)=>{
  console.log('health checked')
  res.sendStatus(200)
})


wss.on("connection", wss => {
  console.log('user connected')

   wss.on("close", wss => {
    })

    wss.on("message", message => {
      console.log("receiving message from websocket-client")
      wss.send('hello client, i am server.')

    var data
      
      try{data = JSON.parse(message.toString())}
        catch(e) {data = 'jsonparse-failed'}
      
      if (data.type == 'newBlueprintDiscoveredNotification') {
       //   wss.broadcast(JSON.stringify({
       //   type: 'newBlueprintDiscoveredNotification',
       //   message: data.message,
       //   color: data.color
      //}))
      }

      if (message.toString() == 'cm=lobby:update user locations') {
       // wss.broadcast('sm=lobby:update user locations')
      }
      

      else {
       

      }
      
  })
})





