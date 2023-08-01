class LocalStorageService {
  LOCAL_STORAGE_KEY_TODOS = "JarrodPsTodoApp.todos";
  LOCAL_STORAGE_KEY_LISTS = "JarrodPsTodoApp.lists";

  async getListById(listId) {
    const storageId = this.LOCAL_STORAGE_KEY_TODOS + listId;
  }

  async updateListById(listId, list) {}
}

export const localStorageService = new LocalStorageService();
