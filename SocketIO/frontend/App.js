import { useState, useCallback, useEffect } from 'react';
import signInChatForm from './signinChatForm/signInChatForm';
import io from 'socket.io-client';
import ChatForm from './ChatForm/ChatForm';
import { nanoid } from 'nanoid';

const socket = io.connect('http://localhost:3001');

function App() {
    const [nickname, setNickname] = useState(''); //список імен
    const [messages, setMessages] = useState([]); //список повідомлень

    //ловимо повідомлення з бекенду. створюємо нове, тільки змінюємо тип
    useEffect(() => {
        socket.on('chat-message', message => {
         const newMessage = {
                id: nanoid(),
                type: 'user',
                message,
            }
    })
}, [])

    const addNickname = useCallback(({ name }) => setNickname(name), []);
    const addMessages = useCallback(({ message }) => {
        setMessages(prevMessage => {
            //створюємо нове повідомлення
            const newMessage = {
                id: nanoid(),
                type: 'you',
                message,
            }
            return [newMessage, ...prevMessage]//спочатку показуємо нове повідомлення, а потім розпилюємо старі
        });
    socket.emit('chat-message', message) //(тип повідомлення, саме повідомлення) emit генерує подію чат месідж, яка відправляється на бекенд
    }, []);
    return (
        <div>
            {!nickname && <signInChatForm onSubmit={addNickname} />}
            {nickname && <ChatForm onSubmit={addMessages}/>}
            {nickname && <Chat items={ messages} />}
        </div>
    )
}