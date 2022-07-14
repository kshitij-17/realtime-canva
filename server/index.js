const express=require('express')
const app=express();
const http=require("http")
const server=http.createServer(app)
const cors=require("cors")
app.use(cors());
const {Server}=require("socket.io")
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
})


io.on("connection",(socket)=>{
    
    console.log(`socket id:${socket.id} has connected`);

    socket.on("draw",(data)=>{
        
                socket.broadcast.emit("isDraw",data)
          
    })

    // socket.on("down",(data)=>{
    //     connections.forEach(con=>{
    //         if(con.id!==socket.id)
    //         {
               
    //             con.broadcast.emit("onDown",data)
    //         }
    //     })
    // })

    socket.on("disconnect",(reason)=>{
        console.log(`${socket.id} has disconnected`)
        
    })
})

server.listen(3001,()=>{console.log('server started')})

