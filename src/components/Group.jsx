import React from 'react';

const Group = ({ group, onAddSubgroup, onEdit, onDelete }) => {
  return (
    <li>
      {group.id} - {group.name}
      <button onClick={onAddSubgroup}>Add Subgroup</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default Group;
