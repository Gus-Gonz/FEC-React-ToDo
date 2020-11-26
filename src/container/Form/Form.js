import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';


let Form = ({click}) =>{
    return (
        <div className='form'>
            <Input/>
            <Button click={click} text="Add"/>
        </div>
    )
}

export default Form ;