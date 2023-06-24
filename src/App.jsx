import SearchPage from "./containers/searchPage/SearchPage";
import { Route, Routes } from "react-router-dom";
import ListingPage from "./containers/ListingPage/ListingPage";
import Bookmarks from "./containers/bookmarksPage/Bookmarks";
import DetailsPage from "./containers/detailsPage/detailsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/list" element={<ListingPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/details/:name" element={<DetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
