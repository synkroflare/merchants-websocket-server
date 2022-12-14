import 'dotenv/config'
import 'reflect-metadata'
import '../shared/container'
import { app } from '../shared/infra/http/httpServer'

import cors from 'cors'
import express, { json } from 'express'
import { router } from '../shared/infra/routes'

const fs = require('fs');
const http = require('http');
const privateKey  = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');

const credentials = {key: privateKey, cert: certificate};
const httpServer = http.createServer(app);

const port = 8082 

httpServer.listen(port , '0.0.0.0', ()  =>  {
  console.log('http online on port '+port)    
})  

const ws =  require('ws');
const wss = new ws.Server({server: httpServer});


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





