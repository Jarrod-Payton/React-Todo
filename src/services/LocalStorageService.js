import { idService } from "./IdService";

class LocalStorageService {
  LOCAL_STORAGE_KEY_TODOS = "JarrodPsTodoApp.todos";
  LOCAL_STORAGE_KEY_LISTS = "JarrodPsTodoApp.lists";

  async getTodosByListId(listId) {
    const storageId = this.LOCAL_STORAGE_KEY_TODOS + listId;
    const storedTodos = await JSON.parse(localStorage.getItem(storageId));
    console.log("Service Layer", storedTodos);
    return storedTodos;
  }

  async updateTodosByListId(listId, todos) {
    const storageId = this.LOCAL_STORAGE_KEY_TODOS + listId;
    // console.log("Update Service Hit", listId, todos, storageId);
    if (todos.length > 0) {
      await localStorage.setItem(storageId, JSON.stringify(todos));
      //   console.log("Update Service Hit Inside If", listId, todos);
    }
  }

  async clearTodosByListId(listId) {
    const storageId = this.LOCAL_STORAGE_KEY_TODOS + listId;
    await localStorage.setItem(storageId, null);
  }

  async getMyLists() {
    const storageId = this.LOCAL_STORAGE_KEY_LISTS;

    // This is for when I accidentally put in a list that isn't JSON stringified into the localstorage
    // await localStorage.setItem(storageId, null);

    let myLists = await JSON.parse(localStorage.getItem(storageId));
    if (!myLists) {
      myLists = [];
    }
    return myLists;
  }

  async createNewList(listName) {
    if (listName === "") {
      return null;
    }
    const storageId = this.LOCAL_STORAGE_KEY_LISTS;
    const lists = await this.getMyLists();

    const listId = await idService.makeId(lists);
    const list = { name: listName, id: listId };
    lists.push(list);
    await localStorage.setItem(storageId, JSON.stringify(lists));
    return lists;
  }

  async deleteListById(listId) {
    const storageId = this.LOCAL_STORAGE_KEY_LISTS;
    const myLists = await this.getMyLists();
    const filteredLists = await myLists.filter((list) => list.id !== listId);
    await localStorage.setItem(storageId, JSON.stringify(filteredLists));

    // To preserve memory, no point in having a bunch of random data stored if the parent doesn't exist anymore
    await this.clearTodosByListId(listId);

    // Return new set of lists, prevents having to filter twice, once for the service, once for the component who called it
    return filteredLists;
  }
}

export const localStorageService = new LocalStorageService();
