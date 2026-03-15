import styled from "styled-components";

const Card = styled.div`
  padding: 16px;
  margin: 10px;
  border-radius: 8px;
  background: ${props => props.theme.card};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskText = styled.span`
  text-decoration: ${props => props.done ? "line-through" : "none"};
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
`;

function TaskCard({ task, done, onDelete, onToggle }) {
  return (
    <Card>

      <TaskText done={done} onClick={onToggle}>
        {task}
      </TaskText>

      <DeleteButton onClick={onDelete}>
        Delete
      </DeleteButton>

    </Card>
  );
}

export default TaskCard;
