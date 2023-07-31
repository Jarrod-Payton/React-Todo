import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import NewListPage from "./pages/NewListPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list">
          <Route index element={<ListPage />} />
          <Route path=":listId" element={<ListPage />} />
          <Route path="new" element={<NewListPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
