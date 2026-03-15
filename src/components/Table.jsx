import TableRow from "./TableRow";

function Table({users,deleteUser,startEdit}){

return(

<table>

<thead>
<tr>
<th>Select</th>
<th>Name</th>
<th>Email</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{users.map(user=>(
<TableRow
key={user.id}
user={user}
deleteUser={deleteUser}
startEdit={startEdit}
/>
))}

</tbody>

</table>

)

}

export default Table;
