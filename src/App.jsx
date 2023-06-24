import SearchPage from "./containers/searchPage/searchPage";
import { Route, Routes } from "react-router-dom";
import ListingPage from "./containers/ListingPage/ListingPage";
import Bookmarks from "./containers/bookmarksPage/Bookmarks";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/list" element={<ListingPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </>
  );
};

export default App;
