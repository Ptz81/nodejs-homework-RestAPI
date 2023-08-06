import styles from 'Chat.module.css'
const Chat = ({ items }) => {
    const elements = items.map(({ id, type, message }) => {
        const className = type === 'you' ? styles.youMessage : styles.userMessage;
        return <p key={id} className={className}>{message}</p>
        
    });
    return (
        <div className={styles.chat}>
            {elements}
        </div>
    )
}
export default Chat;

Chat.defaultProps = {
    items:[]
}