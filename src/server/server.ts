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

const ws =  require('ws');
const wss = new ws.Server({port: port});

wss.use(express())
wss.use(json())
wss.use(cors())
wss.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');  

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

wss.use(router)

wss.broadcast = function(data) {
  wss.clients.forEach(client => client.send(data));
};



wss.get('/hcheck' , (req,res)=>{
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





