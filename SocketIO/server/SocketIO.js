import { Server } from "socket.io";
import { createServer } from 'http';

const httpServer = createServer(); //створюємо http сервер і його передаємо у сервер IO

//створюємо вебсокет сервер
const io = new Server(httpServer, {
    cors: {
        origin: '*' //дозволити підключення з інших портів
    }
})
io.on('connection', (socket) => {
        console.log("New frontend connect") //запускаємо сервер іо
    //сокет ловить нашу подію типу чат - месідж, приймає зміст (месідж)
    socket.on('chat-message', message => {
        socket.broadcast.emit("chat-message", message) //відправляємо повідомлення усім, окрім себе
    })
})

httpServer.listen(3001);//запускаємо сервер від http 
    