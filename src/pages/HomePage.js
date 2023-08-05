import ListsDisplay from "../components/ListsDisplay";
export default function HomePage() {
  return (
    <>
      <div className="p-3">
        <h1 className="mx-1 text-3xl text-center shadow-sm outline outline-2 outline-offset-4 font-serif">
          Hello There Welcome To Jarrod P's Todos
        </h1>
      </div>
      <ListsDisplay parentData={[]} allowListEditing={false} />
    </>
  );
}
