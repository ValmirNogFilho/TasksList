import { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button/Button'
import TaskList from './components/TaskList/TaskList'
import ModalForm from './components/ModalForm/ModalForm'
import axios from 'axios'

const baseUrl = "https://tasks-list-api.vercel.app/"

function App() {

  const [modalOpened, setModalOpened] = useState(false)
  const [pendingTasks, setPendingTasks] = useState([])
  const [currentTasks, setCurrentTasks] = useState([])
  const [concludedTasks, setConcludedTasks] = useState([])
  const [formData, setFormData] = useState(
    {
      title: "",
      description: "",
      status: 1
    }
  )



  function organizeTasks(tasks) {
    const pending = [];
    const current = [];
    const concluded = [];
  
    tasks.forEach((task) => {
      switch (task.status) {
        case 1:
          pending.push(task);
          break;
        case 2:
          current.push(task);
          break;
        case 3:
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
    axios.get(baseUrl + "/tasks")
      .then((response) => {
        organizeTasks(response.data)
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }


  function createNewTask() {
    console.log(formData)
    axios.post(baseUrl + "/tasks", formData)
    .then( () => {
      closeModal()
      getTasks()
    }
    )
  }


  function handleFormChanges(attr, value) {
    setFormData(
      {
        ...formData, [attr]: value
      }
    )
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
      <ModalForm modalOpen={modalOpened} closeModal={() => setModalOpened(false)} callback={createNewTask} 
      form={formData} setForm={handleFormChanges}/>
    </>
  )
}

export default App
