import { ButtonHTMLAttributes } from "react"
import './button.scss'

/* this will take every HTML button properts  */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps){
    return(
        <button className="button" {...props} />
    )
}