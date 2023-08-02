import { useEffect, useState } from "react";
import List from "./List";
import { localStorageService } from "../services/LocalStorageService";

export default function ListsDisplay({ parentData, allowListEditing }) {
  // The Variable "parentData" is so that if I end up adding to the list via a parent component than all I have to do is update the list attached to this component and it will grab the new data
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const grabMyLists = async () => {
      const storedLists = await localStorageService.getMyLists();
      setLists(storedLists);
    };
    grabMyLists();
  }, [parentData]);

  async function deleteList(listId) {
    const newLists = await localStorageService.deleteListById(listId);
    setLists(newLists);
  }

  return lists.map((list) => {
    return (
      <List
        key={list.id}
        list={list}
        deleteListById={deleteList}
        allowListEditing={allowListEditing}
      />
    );
  });
}
