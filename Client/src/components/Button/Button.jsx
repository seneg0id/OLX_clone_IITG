import Styles from './Button.css'
const Button = ({text,styles,click}) => {
  return (
    <div>
          <button className="btn" style={styles} onClick={click} >{text}</button>
    </div>
  )
}
Button.defaultProps = {
  text: 'Click Me',
  style: { Styles },
}

export default Button