import './mybutton.sass';

const MyButton = ({children, ...props}) => {
    return (
        <button className="my-button" {...props}>
            {children}
        </button>
    )
}

export default MyButton;