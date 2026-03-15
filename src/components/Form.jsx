import {useState,useEffect} from "react";
import Input from "./Input";
import Button from "./Button";

function Form({addUser,editUser}){

const [name,setName] = useState("");
const [email,setEmail] = useState("");

useEffect(()=>{
if(editUser){
setName(editUser.name);
setEmail(editUser.email);
}
},[editUser])

const handleSubmit=(e)=>{
e.preventDefault();

addUser({
id: editUser ? editUser.id : Date.now(),
name,
email
});

setName("");
setEmail("");
}

return(

<form onSubmit={handleSubmit}>

<Input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<Input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<Button
type="submit"
text={editUser ? "Update" : "Add User"}
/>

</form>

)

}

export default Form;
