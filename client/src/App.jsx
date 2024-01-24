import { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button/Button'
import TaskList from './components/TaskList/TaskList'
import ModalForm from './components/ModalForm/ModalForm'
import axios from 'axios'

function App() {

  const [modalOpened, setModalOpened] = useState(false)
  const [pendingTasks, setPendingTasks] = useState([])
  const [currentTasks, setCurrentTasks] = useState([])
  const [concludedTasks, setConcludedTasks] = useState([])

  function organizeTasks(tasks) {
    const pending = [];
    const current = [];
    const concluded = [];
  
    tasks.forEach((task) => {
      switch (task.status) {
        case "Pendente":
          pending.push(task);
          break;
        case "Em andamento":
          current.push(task);
          break;
        case "Concluído":
          concluded.push(task);
          break;
        default:
          break;
      }
    });
  
    setPendingTasks(pending);
    setCurrentTasks(current);
    setConcludedTasks(concluded);
  }  
  

  function getTasks() {
    axios.get("http://127.0.0.1:5050/tasks")
      .then((response) => {
        organizeTasks(response.data)
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }

  useEffect(() => {
    getTasks()
  }, []);
  

  return (
    <>
      <div className="top">
        <h1>
          Task Manager
        </h1>
        <Button onclick={() => setModalOpened(true)} />
      </div>
      <div className="task-lists">
        <TaskList listName={"Pendente"} tasks={pendingTasks} setTasks={setPendingTasks}/>
        <TaskList listName={"Em andamento"} tasks={currentTasks} setTasks={setCurrentTasks}/>
        <TaskList listName={"Concluído"} tasks={concludedTasks} setTasks={setConcludedTasks}/>
      </div>
      <ModalForm modalOpen={modalOpened} closeModal={() => setModalOpened(false)} reload={getTasks} initialStatus={1}/>
    </>
  )
}

export default App
