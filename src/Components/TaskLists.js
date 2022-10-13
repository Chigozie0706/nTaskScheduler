import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import ViewTaskModal from "./ViewTaskModal"
import { Row, Button, Table, Spinner } from "reactstrap";
import {
  getTasks,
  createTask, updateTaskById, getTaskById, deleteTaskById
} from "../simple";
import { GoChecklist } from "react-icons/go";
import { AiFillDelete, AiFillEdit, AiOutlineFolderView } from "react-icons/ai";

const TaskLists = () => {
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(false);
   const [createTaskModal, setCreateTaskModal] = useState(false);
   const [updateTaskModal, setUpdateTaskModal] = useState(false)
   const [taskId, setTaskId] = useState(null)
   const [taskDetails, setTaskDetails] = useState({})
   
//This is a function to fetch all task created.  
const getTaskLists = useCallback(async () => {
    try {
      setLoading(true);
      setTaskLists(await getTasks());
      
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  console.log(taskLists)

//This is a function to create a new task.
const addTask = async (data) => {
  try {
    setLoading(true);
    createTask(data).then((resp) => {
       console.log(resp)
       getTaskLists()
       toast.success("Task added successfully")
    });

  } catch (error) {
    console.log({ error });
    toast.error("network error")
  } finally {
    setLoading(false);
  }
};


//This is a function used to toggle a modal where you can create a task.
const toggleCreateTaskModal = () => {
  setCreateTaskModal(!createTaskModal)
}

const updateTask = async (id) => {
  try{
    updateTaskById(id)
    .then((resp) => {
      console.log(resp)
    })
  }
  catch(error) {
    console.log({error})
  }
}


//This is a function used to delete a task.
const deleteTask = async (id) => {
  try{
    deleteTaskById(id)
    .then((resp) => {
      console.log(resp)
    })
  }
  catch(error) {
    console.log({error})
  }
}

const toggleCheckListModal = (id) => {
  getTaskDetails(id);
  setUpdateTaskModal(!updateTaskModal)

}

const getTaskDetails = async (taskId) => {
  try{
    getTaskById(taskId)
    .then((resp) => {
      console.log(resp)
      setTaskDetails(resp)
    })
  }
  catch(error) {
    console.log({error})
  }
}


const closeModal = (data) => {
  setUpdateTaskModal(!updateTaskModal)
}


useEffect(() => {
  getTaskLists();
}, []);



return (
  <>
  <Button color="success" 
  onClick={toggleCreateTaskModal}
  size="sm"
  >
           Create Task
        </Button>

        
<ViewTaskModal taskId={taskId} taskDetails={taskDetails} modal={updateTaskModal} 
        toggle={toggleCheckListModal} closeModal={closeModal} />
      

<CreateTaskModal createTask={addTask} 
modal={createTaskModal} toggle={toggleCreateTaskModal} id={taskLists.length} />
     
     {loading === true ?
    <div className="text-center" style={{marginTop : 200}}>
    <Spinner />
    <p>loading...</p>
    </div>
    :
    taskLists.length === 0 ?
    <div className="text-center" style={{marginTop : 100}}>
          <p>No task created ...</p>
          </div>
        :   
                  
        <Table >
          <thead>
            <tr>
              <th>S/N</th>
              <th>Task Name</th>
              <th>Date Created</th>
              <th>Status</th>
               <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskLists.map((item, index) => (

              <tr>
                <th scope="row">{index + 1}</th>
                  <td>{item.taskName}</td>
                  <td>{new Date(item.dateCreated / 1000000).toDateString()}</td>
                  <td>{item.status}</td>
                  <td className="d-flex justify-content-between">
                  <Button size="sm" color="success" onClick={() => updateTask(item.id)}>
                    <GoChecklist />
                  </Button>
                  <Button size="sm"  onClick={() => toggleCheckListModal(item.id)}><AiOutlineFolderView  color="white"/></Button>
                  <Button size="sm" color="danger" onClick={() => deleteTask(item.id)}><AiFillDelete /> </Button>
                  </td>
                
              </tr>
              ))}

</tbody>
          </Table>
        }
          </>
          )
}

export default TaskLists;