import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, editGroup, deleteGroup } from '../store/reducers'; // Import your actions
import GroupList from './GroupList';

const generateId = (groups) => {
  let maxId = 0;
  groups.forEach((group) => {
    const groupId = parseInt(group.id);
    if (groupId > maxId) {
      maxId = groupId;
    }
  });
  return maxId + 1;
};

const GroupManager = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);

  const handleAddGroup = (parentId) => {
    const groupName = prompt('Enter Group Name:');
    if (groupName) {
      const id = generateId(groups);
      dispatch(addGroup(groupName, parentId, id));
    }
  };

  const handleEditGroup = (id) => {
    const newName = prompt('Enter New Group Name:');
    if (newName) {
      dispatch(editGroup(id, newName));
    }
  };

  const handleDeleteGroup = (id) => {
    dispatch(deleteGroup(id));
  };

  // ... Rest of the component remains the same

  return (
    <div>
      <h1>Group Manager</h1>
      <button onClick={() => handleAddGroup(null)}>Add Root Group</button>
      <GroupList
        groups={groups.filter((group) => !group.parentId)}
        onAddGroup={handleAddGroup}
        onEditGroup={handleEditGroup}
        onDeleteGroup={handleDeleteGroup}
      />
    </div>
  );
};

export default GroupManager;
