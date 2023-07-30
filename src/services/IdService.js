class IdService {
  async makeId(todos) {
    let highestId = 0;
    await todos.forEach((todo) => {
      if (todo.id > highestId) {
        highestId = todo.id;
      }
    });
    return highestId + 1;
  }
}

export const idService = new IdService();
