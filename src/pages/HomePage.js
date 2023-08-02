import ListsDisplay from "../components/ListsDisplay";
export default function HomePage() {
  return (
    <>
      <h1>Hello There Welcome To Jarrod P's Todos</h1>
      <h2>This is a react project</h2>
      <ListsDisplay parentData={[]} allowListEditing={false} />
    </>
  );
}
