import {useState,useEffect} from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Table from "./components/Table";
import GlobalStyle from "./styles/GlobalStyle";
import {saveUsers,getUsers} from "./utils/storage";

function App(){

const [users,setUsers] = useState([]);
const [editUser,setEditUser] = useState(null);

useEffect(()=>{
setUsers(getUsers());
},[])

useEffect(()=>{
saveUsers(users);
},[users])

const addUser = (user)=>{

if(editUser){

setUsers(users.map(u =>
u.id === user.id ? user : u
));

setEditUser(null);

}else{

setUsers([...users,user]);

}

}

const deleteUser = (id)=>{
setUsers(users.filter(u=>u.id !== id))
}

const startEdit = (user)=>{
setEditUser(user)
}

return(

<div>

<GlobalStyle/>

<Header/>

<Form
addUser={addUser}
editUser={editUser}
/>

<Table
users={users}
deleteUser={deleteUser}
startEdit={startEdit}
/>

</div>

)

}

export default App;
