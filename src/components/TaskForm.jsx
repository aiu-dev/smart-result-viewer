import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  padding:10px;
  width:70%;
  margin-right:10px;
`;

const Button = styled.button`
  padding:10px;
  background:${props => props.theme.primary};
  border:none;
  color:white;
  cursor:pointer;
`;

function TaskForm({addTask}){

const [task,setTask] = useState("");

function handleSubmit(e){
  e.preventDefault();
  addTask(task);
  setTask("");
}

return(

<form onSubmit={handleSubmit}>
<Input
value={task}
onChange={(e)=>setTask(e.target.value)}
placeholder="Enter task"
/>

<Button>Add</Button>

</form>

)

}

export default TaskForm
