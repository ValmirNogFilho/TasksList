import React, { useEffect, useState } from 'react'
import './TaskList.css'
import Task from '../Task/Task';
const TaskList = ({listName, tasks, setTasks}) => {

  return (
    <div className='task-list'>
        <div className="title">
            <h4>{listName}</h4>
        </div>
        <div className="tasks">
            {tasks.length !== 0? 
            tasks.map((task) => <Task status={task.status} key={task.id} id={task.id} title={task.title} description={task.description} date={task.date}/>)
            : "Sem tarefas por aqui!"}
        </div>
    </div>
  )
}

export default TaskList