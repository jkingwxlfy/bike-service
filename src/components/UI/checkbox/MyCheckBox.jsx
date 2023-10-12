import './mycheckbox.sass';

const MyCheckBox = ({placeholder, ...props}) => {
    return (
        <label>
            {placeholder}
            <input className="real-checkbox" type="checkbox" {...props}/>
            <span className="custom-checkbox"></span>
        </label>
    )
}

export default MyCheckBox;