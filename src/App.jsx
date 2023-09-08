import React from 'react';
import { createStore } from 'redux';
import "./App.css"
import { Provider, useDispatch, useSelector } from 'react-redux';
import add from "../src/assets/icons/add.png";
import edit from "../src/assets/icons/edit.svg";
import remove from "../src/assets/icons/remove.svg";

const ADD_GROUP = 'ADD_GROUP';
const EDIT_GROUP = 'EDIT_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';

const addGroup = (name, parentId, id) => ({
  type: ADD_GROUP,
  payload: { name, parentId, id },
});

const editGroup = (id, name) => ({
  type: EDIT_GROUP,
  payload: { id, name },
});

const deleteGroup = (id) => ({
  type: DELETE_GROUP,
  payload: { id },
});

const initialState = {
  groups: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [
          ...state.groups,
          { id: action.payload.id, name: action.payload.name, parentId: action.payload.parentId },
        ],
      };

    case EDIT_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.id ? { ...group, name: action.payload.name } : group
        ),
      };

    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload.id),
      };

    default:
      return state;
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
  }
};

const store = createStore(rootReducer, loadStateFromLocalStorage());

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

const generateId = (parentId) => {
  const parentGroups = store.getState().groups.filter((group) => group.parentId === parentId);
  let maxId = 0;
  parentGroups.forEach((group) => {
    const groupId = parseInt(group.id);
    if (groupId > maxId) {
      maxId = groupId;
    }
  });
  const newId = maxId + 1;
  return parentId ? parentId + newId.toString().padStart(1, '0') : newId.toString();
};

const GroupManager = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);

  const handleAddGroup = (parentId) => {
    const groupName = prompt("Enter Group Name:");
    if (groupName) {
      const id = generateId(parentId);
      dispatch(addGroup(groupName, parentId, id));
    }
  };

  const handleEditGroup = (id) => {
    const newName = prompt("Enter New Group Name:");
    if (newName) {
      dispatch(editGroup(id, newName));
    }
  };

  const handleDeleteGroup = (id) => {
    dispatch(deleteGroup(id));
  };

  const renderGroups = (parentId) => {
    const filteredGroups = groups.filter((group) => group.parentId === parentId);
    if (filteredGroups.length === 0) {
      return null;
    }
    return (
      <ul>
        {filteredGroups.map((group) => (
          <li key={group.id} className='list'>
            {group.id} - {group.name}
            <button onClick={() => handleAddGroup(group.id)}> <img src={add} alt="add" /> </button>
            <button onClick={() => handleEditGroup(group.id)}> <img src={edit} alt="edit" /> </button>
            <button onClick={() => handleDeleteGroup(group.id)}> <img src={remove} alt="remove" /> </button>
            {renderGroups(group.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Hierarchy</h1>
      <img src={add} alt="add" onClick={() => handleAddGroup(null)} className='add' />
      {renderGroups(null)}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GroupManager />
    </Provider>
  );
};

export default App;
