import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';

import {
  getTaskById, updateTaskById
} from "../simple";


const CheckTaskModal = ({closeModal, toggle, modal, update, taskId, taskDetails = {} }) => {
  // const navigate =useNavigate()
  const [taskName, setTaskName] = useState("");
  
  const [price, setPrice] = useState(0);
  const isFormFilled = () => true;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // eslint-disable-next-line no-unused-vars
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({...form, [name]: value})
  }
console.log("taskId", taskDetails)
  
const [id, setId] = useState("1")

//   const getTaskDetails = async (id) => {
//   try{
//     getTaskById(id)
//     .then((resp) => {
//       console.log(resp)
//     })
//   }
//   catch(error) {
//     console.log({error})
//   }
// }

const isEmpty = Object.keys(taskDetails).length === 0;

const updateBeats = async (id, name) => {
  try{
    updateTaskById(id, name)
    .then((resp) => {
      console.log(resp)
      
    })
  }
  catch(error) {
    console.log({error})
  }
}

  
  return (
    <>
       
<Modal 
isOpen={modal}
        toggle={toggle} 
        // backdrop="static"
        >
        <ModalHeader toggle={() => closeModal(false)}></ModalHeader>
        <ModalBody>
  {!isEmpty ? 
    <>
    <p>Task ID: {taskDetails.id}</p>
    <p>Task Name: {taskDetails.taskName}</p>
    <p>Task Description: </p>
    <p>Date Created: {taskDetails.dateCreated}</p>
    <p>Status: {taskDetails.status}</p>
    </>
  :null 

  }
  </ModalBody>
  <ModalFooter>
  
          <Button onClick={() => updateBeats(taskId, taskName)}>Fetch</Button>
         
          <Button onClick={() => closeModal(false)}>Close</Button>
         </ModalFooter>
</Modal>

        
          
    </>
  );
};

CheckTaskModal.propTypes = {
  
  closeModal: PropTypes.func.isRequired,
  
};

export default CheckTaskModal;