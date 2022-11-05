import Proptypes from "prop-types"


export function Button({text, name}){
    
    return <button onClick={function(){
        console.log("hola mundo")
    }}>
        {text},{name}
    </button>
}

Button.prototype={
    text: Proptypes.string.isRequired
}

Button.defaultProps = {
    name:"usuario"
}