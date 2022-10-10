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

const CreateTaskModal = ({ createTask, toggle, 
  modal, update, id }) => {
  
  const [taskDescription, setTaskDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  
  
  return (
    <>
       
<Modal isOpen={modal} toggle={toggle}>
<ModalHeader>Create A Task</ModalHeader>
        <ModalBody>
         <Label>Task Name</Label>
  <Input type="text" name="taskName" value={taskName} 
  onChange={(e) => { setTaskName(e.target.value)}} />

  <Label>Description</Label>
  <Input type="textarea" rows="5" cols="5" name="taskDescription" value={taskDescription} 
  onChange={(e) => { setTaskDescription(e.target.value)}} />
  </ModalBody>
  <ModalFooter>
  <Button
            variant="dark"
            size="sm"
            onClick={() => {
              createTask({
                taskName, taskDescription
              });
            }}
          >
            Create
          </Button>
        
  </ModalFooter>
</Modal>

        
          
    </>
  );
};

CreateTaskModal.propTypes = {
  createTask: PropTypes.func.isRequired,
  // update: PropTypes.func.isRequired,
};

export default CreateTaskModal;