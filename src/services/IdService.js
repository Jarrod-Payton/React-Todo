class IdService {
  async makeId(array) {
    let highestId = 0;
    await array.forEach((array) => {
      if (array.id > highestId) {
        highestId = array.id;
      }
    });
    return highestId + 1;
  }
}

export const idService = new IdService();
