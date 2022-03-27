import './_styles/button.css'

interface IButtonProps {
    color: string;
    buttonText?: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
}

const Button = (props: IButtonProps): JSX.Element => {
    return(
        <button onClick={props.handleClick} className={props.color}>
            {props.buttonText ? props.buttonText : props.children}
        </button>
    )
}
export default Button