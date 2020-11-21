const Button = (props) =>{
    return (
    <button className={props.style} onClick={props.click}>{props.text}</button>
    )
}

export default Button ;