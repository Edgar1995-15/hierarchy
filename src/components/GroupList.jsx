import React from 'react';
import Group from './Group';

const GroupList = ({ groups, onAddGroup, onEditGroup, onDeleteGroup }) => {
  return (
    <ul>
      {groups.map((group) => (
        <Group
          key={group.id}
          group={group}
          onAddSubgroup={() => onAddGroup(group.id)}
          onEdit={() => onEditGroup(group.id)}
          onDelete={() => onDeleteGroup(group.id)}
        />
      ))}
    </ul>
  );
};

export default GroupList;
