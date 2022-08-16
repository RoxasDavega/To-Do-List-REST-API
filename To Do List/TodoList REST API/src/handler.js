/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { nanoid } = require('nanoid');
const todoList = require('./todoList');

const addTodoListHandler = (request, h) => { // untuk menambahkan to do
  const { title, description } = request.payload;

  if (title === null || !title) { // untuk mengatasi jika title belum diisi
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan To Do. Isi title To Do terlebih dahulu',
    });
    response.code(400);
    return response;
  }

  if (description === null || !description) { // untuk mengatasi jika description belum diisi
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan To Do. Isi description To Do terlebih dahulu',
    });
    response.code(400);
    return response;
  }

  if (todoList.length !== 0) { // jika sudah ada isinya, maka akan melakukan pengecekan apakah judul sudah ada
    const findName = todoList.find((toDo) => toDo.title === title);
    if (findName) {
      const response = h.response({
        status: 'fail',
        message: 'To Do sudah ada',
      });
      response.code(400);
      return response;
      // eslint-disable-next-line no-else-return
    }
  }
  const id = nanoid(16);
  const newToDo = {
    id,
    title,
    description,
  };

  todoList.push(newToDo);
  const isSuccess = todoList.filter((toDo) => toDo.id === id).length > 0; // pengecekan sudah berhasil masuk atau belum
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Sukses menambahkan To Do',
      data: {
        toDoId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan To Do',
  });
  response.code(500);
  return response;
};

const getAllToDoListHandler = (request, h) => { // untuk mendapatkan seluruh to do
  const { title } = request.query;

  if (title) { // jika ada query title, akan mencari berdasarkan title
    const filteredTitleToDo = todoList.filter((todo) => {
      const titleFiltered = new RegExp(title, 'gi');
      return titleFiltered.test(todo.title);
    });

    const response = h.response({
      status: 'success',
      data: {
        todoList: filteredTitleToDo,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      // eslint-disable-next-line object-shorthand
      todoList: todoList,
    },
  });
  response.code(200);
  return response;
};

const getToDoListHandler = (request, h) => { // menampilkan satu to do berdasarkan id
  const { id } = request.params;

  const toDo = todoList.filter((list) => list.id === id)[0];

  if (toDo !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        todoList: toDo,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'To Do tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editToDoListHandler = (request, h) => { // mengedit atau meng-update to do
  const { id } = request.params;
  const { title, description } = request.payload;

  const index = todoList.findIndex((todo) => todo.id === id); // untuk menyimpan index to do yang akan diedit

  if (title === null || !title) { // untuk mengatasi jika title belum diisi
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan To Do. Isi title To Do terlebih dahulu',
    });
    response.code(400);
    return response;
  }

  if (description === null || !description) { // untuk mengatasi jika description belum diisi
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan To Do. Isi description To Do terlebih dahulu',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) { // jika to do ditemukan
    const checkTitle = todoList.filter((todo) => todo.title === title)[0];
    if (checkTitle) {
      const response = h.response({
        status: 'fail',
        message: 'To Do sudah ada',
      });
      response.code(400);
      return response;
    }

    todoList[index] = { // untuk merubah isi to do
      ...todoList[index],
      title,
      description,
    };

    const response = h.response({
      status: 'success',
      message: 'To Do berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui To Do',
  });
  response.code(500);
  return response;
};

const deleteToDoListHandler = (request, h) => {
  const { id } = request.params;
  const index = todoList.findIndex((todo) => todo.id === id);

  if (index !== 1) {
    todoList.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'To Do Berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'To Do tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  // eslint-disable-next-line max-len
  addTodoListHandler, getAllToDoListHandler, getToDoListHandler, editToDoListHandler, deleteToDoListHandler,
};
