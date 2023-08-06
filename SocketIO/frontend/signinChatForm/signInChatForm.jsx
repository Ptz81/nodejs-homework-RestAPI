import { useState } from 'react';

const signInChatForm = ({ onSubmit }) => {
    const [state, setState] = useState({
        name: '' //у формі одне поле name, привязуємо вгорі функцію onSubmit
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
            name:''
        })
    }

}
export default signInChatForm;