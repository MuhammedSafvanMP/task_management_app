import React from 'react'
import { useState } from 'react'

function Taskmanager() {
    const [tasks, setTasks] = useState([])

    const [inputvalue, setInputvalue] = useState('')

    function addTask(){
        if (inputvalue.length === 0) {
            return;
        }
        setTasks([
            ...tasks,
            {

                content: inputvalue,
                isComplete: false
            }
        ])
        setInputvalue("")
    }

    function deleetTask(taskIndex){
        tasks.splice(taskIndex, 1)
        setTasks([
            ...tasks
        ])
    }

    function markCompleted(taskIndex){
        tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete
        setTasks([
          ...tasks  
        ])
    }

    function editTask(taskIndex){
        tasks[taskIndex].isEditing = true
        setTasks(
            [...tasks]
        )
    }

    function updateValue(taskIndex, value){
        tasks[taskIndex].content = value
        setTasks(
            [...tasks]
        )
    }

    function saveTask(taskIndex){
        tasks[taskIndex].isEditing = false
        setTasks(
            [...tasks]
        )
    }

  return (
    <div className='task-manager'>
        <h1>Task Manager</h1>

        <div className='tasks'>
            {
                tasks.sort((a)=> a.isComplete ? 1 : -1).map(
                    (task, index)=> <div key={index} className='task'>
                        <input type="checkbox" value={task.isComplete} onChange={()=> markCompleted(index)}  />
                        {
                            task.isEditing ?
                            
                                <input value={task.content} onChange={(event)=> updateValue(index, event.target.value)} className='edit-input'  />
                            :
                            
                                <span className='content'>

                                {
                                    task.isComplete ?
                                    <del>{task.content}</del>:
                                    task.content
                                    
                                }
                                </span>
                    
                        
                        }
                        {
                            task.isEditing ?
                        <button onClick={()=> saveTask(index)} className='save' >Save</button>:
                        <button  onClick={()=> editTask(index)} className='edit' >Edit</button>

                        }
                         
                    <button onClick={()=> deleetTask(task)} className='delete'>Delete</button>
                    </div>
                )
            }
        </div>

        <div className='add-task-container'>
            <input value={inputvalue}  onChange={(event)=> setInputvalue(event.target.value)} placeholder='Enter a Task' />
            <button onClick={addTask}>Add Task</button>
        </div>
    </div>
  )
}

export default Taskmanager