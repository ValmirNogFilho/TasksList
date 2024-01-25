import React from 'react'
import './Button.css'
const Button = ({onclick}) => {
  return (
    <button className='add-task-btn' onClick={onclick}><h1>Adicionar nova tarefa</h1></button>
  )
}

export default Button