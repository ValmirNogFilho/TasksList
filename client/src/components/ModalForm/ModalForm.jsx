import React, { useState } from 'react'
import './ModalForm.css'; 
import axios from 'axios';
const ModalForm = ({modalOpen, closeModal, reload, initialTitle, initialDesc, initialStatus}) => {
    const [title, setTitle] = useState(initialTitle)
    const [description, setDescription] = useState(initialDesc)
    const [status, setStatus] = useState(initialStatus)

    function createNewTask() {
      let request = {
        title: title,
        description: description,
        status: parseInt(status)
      }
      axios.post("http://127.0.0.1:5050/tasks", request)
      .then( () => {
        closeModal()
        reload()
      }
      )
    }

    return (
      <form>
        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <span className="close-modal" onClick={closeModal}>&times;</span>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h4>Título: </h4>
              <input type="text" placeholder='Ex.: Ir às compras'
               value={title} onChange={(e) => setTitle(e.target.value)}/> 
              <h4>Descrição: </h4>
              <textarea type="text" placeholder='Insira sua descrição aqui (máximo de 500 caracteres)'
              value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500}/> 
              <h4>Status da tarefa: </h4>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="1">Pendente</option>
                  <option value="2">Em andamento</option>
                  <option value="3">Concluído</option>
              </select>
              <button className="cancel" onClick={closeModal}>Cancelar</button>
              <button className='send' onClick={createNewTask}>Enviar</button>
            </div>
          </div>
        )}
      </form>
    );
}

export default ModalForm