import styles from '../form/Input.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Input({
    icon,
    type,
    text,
    name,
    placeholder, 
    handleOnChang,
    value, 
}) {
    return (
     <div className={styles.form_control}>
        <label htmlFor={name}>{text}</label>
        <div className={styles.input_container_login}> 
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon_login}/>}
         <input 
         type={type} 
         name={name}
         id={name}
         placeholder={placeholder}
         onChange={handleOnChang}
         value={value}
         />
         </div>
        </div>
    )
}


export default Input 