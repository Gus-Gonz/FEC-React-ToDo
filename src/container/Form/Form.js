import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'


let Form = (props) =>{
    return (
        <div>
            <Input/>
            <Button click={props.click} text="Add"/>
        </div>
    )
}

export default Form ;