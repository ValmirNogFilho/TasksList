import React from 'react'
import './ModalForm.css'; 
const ModalForm = ({modalOpen, closeModal, callback, form, setForm, disabled}) => {

    return (
      <form>
        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <span className="close-modal" onClick={closeModal}>&times;</span>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h4>Título: </h4>
              <input type="text" required disabled={disabled} name='title' placeholder='Ex.: Ir às compras (máximo de 50 caracteres)'
               value={form.title} onChange={(e) => setForm(e.target.name, e.target.value)}/> 
              <h4>Descrição: </h4>
              <textarea type="text" required disabled={disabled} name='description' placeholder='Insira sua descrição aqui (máximo de 500 caracteres)'
              value={form.description} onChange={(e) => setForm(e.target.name, e.target.value)} maxLength={500}/> 
              <h4>Status da tarefa: </h4>
              <div className="bottom">
                <select value={form.status} disabled={disabled} name='status' onChange={(e) => setForm(e.target.name, e.target.value)}>
                    <option value="1">Pendente</option>
                    <option value="2">Em andamento</option>
                    <option value="3">Concluído</option>
                </select>
                {!disabled &&
                <div className="buttons">
                  <button className="cancel" onClick={closeModal}>Cancelar</button>
                  <button type="submit" className='send' onClick={callback}>Salvar</button>
                </div>
                }
              </div>
            </div>
          </div>
        )}
      </form>
    );
}

export default ModalForm