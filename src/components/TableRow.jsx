import Button from "./Button";
import Checkbox from "./Checkbox";

function TableRow({user,deleteUser,startEdit}){

return(

<tr>

<td><Checkbox/></td>

<td>{user.name}</td>

<td>{user.email}</td>

<td>

<Button
text="Edit"
onClick={()=>startEdit(user)}
/>

<Button
text="Delete"
onClick={()=>deleteUser(user.id)}
/>

</td>

</tr>

)

}

export default TableRow;
