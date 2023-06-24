import SearchPage from "./containers/searchPage/searchPage";
import { Route, Routes } from "react-router-dom";
import ListingPage from "./containers/ListingPage/ListingPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/list" element={<ListingPage />} />
      </Routes>
    </>
  );
};

export default App;
