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
      <div className="flex mx-2 outline outline-2 rounded-full">
        <input
          type="text"
          ref={listNameRef}
          placeholder="New List's Name"
          className="w-5/6 mx-1 p-2 font-mono rounded-full border-none focus:outline-none"
        />
        <button
          onClick={handleCreateList}
          className="w-1/6 p-1 rounded-full bg-lime-500 text-black hover:bg-lime-400"
        >
          Create
        </button>
      </div>
      <ListsDisplay parentData={lists} allowListEditing={true} />
    </>
  );
}
