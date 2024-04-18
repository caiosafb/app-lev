import styles from './Input.module.css'

function Input({
    type,
    text,
    name,
    email,
    placeholder, 
    handleOnChang,
    value, 
}) {
    return (
     <div>
        <label htmlFor={name}>{text}:</label>
         <input 
         type={type} 
         email={name}
         id={name}
         placeholder={placeholder}
         onChange={handleOnChang}
         value={value}
         />
        </div>
    )
}


export default Input 