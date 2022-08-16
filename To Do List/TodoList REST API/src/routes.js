const {
  // eslint-disable-next-line max-len
  addTodoListHandler, getAllToDoListHandler, getToDoListHandler, editToDoListHandler, deleteToDoListHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/todolist',
    handler: addTodoListHandler,
  },
  {
    method: 'GET',
    path: '/todolist',
    handler: getAllToDoListHandler,
  },
  {
    method: 'GET',
    path: '/todolist/{id}',
    handler: getToDoListHandler,
  },
  {
    method: 'PUT',
    path: '/todolist/{id}',
    handler: editToDoListHandler,
  },
  {
    method: 'DELETE',
    path: '/todolist/{id}',
    handler: deleteToDoListHandler,
  },
];

module.exports = routes;
