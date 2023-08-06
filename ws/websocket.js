import WebSocket, { WebSocketServer } from 'ws';
// const ws = new WebSocket();//екземпляр класу

const wsServer = new WebSocketServer({
    port: 5000,
});//створюємо через фукнцію конструктор сервер та передаємо об'єкт з налаштуваннями

const socketList = []; //масив підключених користувачів

wsServer.on('connection', (socket) => {
//    console.log('New Frontend connection') 
    socketList.push(socket);//записуємо у змінну сесії користувачів
    setTimeout(()=>{
        socket.send("Welcom to web-server socket")
    }, 3000) //через 3 сек після підключення сервер відправить відповідь на клієнта

    socketList.forEach(item => {
        if (item !== socket) {
            item.send('New member connect') //відправляємо повідомлення усім користувачам
        }
    })
}) //слухаємо подію, кожного раху як підключеться новий фронтенд. обєкт сокет звязаний з тим фронендом, що підключився