import { useEffect, useRef, useState } from "react";
import { localStorageService } from "../services/LocalStorageService";
import ListsDisplay from "../components/ListsDisplay";

export default function NewListPage() {
  const [lists, setLists] = useState([]);

  const listNameRef = useRef();

  useEffect(() => {
    const grabMyLists = async () => {
      const storedLists = await localStorageService.getMyLists();
      setLists(storedLists);
    };
    grabMyLists();
  }, []);

  async function handleCreateList(e) {
    const listName = listNameRef.current.value;
    const newLists = await localStorageService.createNewList(listName);
    await setLists(newLists);
    listNameRef.current.value = "";
  }

  return (
    <>
      <div>NewListPage</div>
      <input type="text" ref={listNameRef} />
      <button onClick={handleCreateList}>Create List</button>
      <ListsDisplay parentData={lists} allowListEditing={true} />
    </>
  );
}
