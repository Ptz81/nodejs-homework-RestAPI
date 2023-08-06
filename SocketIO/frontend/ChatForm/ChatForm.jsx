import { useState } from 'react';

const ChatForm = ({ onSubmit }) => {
    const [state, setState] = useState({
        message: '' //у формі одне поле message, привязуємо вгорі функцію onSubmit
    });

    const handleChange = ({ target }) => {
        const [name, value] = target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };

    const handleSubmit = ({ e }) => {
        e.preventDefault(),
            onSubmit({ ...state });//передаємо у фукнцію весь стейт
        setState({
            message: ''
        })
    }
}
export default ChatForm