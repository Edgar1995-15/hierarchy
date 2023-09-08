const ADD_GROUP = 'ADD_GROUP';
const EDIT_GROUP = 'EDIT_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';

export const addGroup = (name, parentId, id) => ({
  type: ADD_GROUP,
  payload: { name, parentId, id },
});

export const editGroup = (id, name) => ({
  type: EDIT_GROUP,
  payload: { id, name },
});

export const deleteGroup = (id) => ({
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

export default rootReducer;
