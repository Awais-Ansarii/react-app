import React from 'react';
import SearchPage from './containers/searchPage/searchPage';
import Bookmarks from './containers/bookmarksPage/bookmarks';
import {Route, Switch} from 'react-router-dom';

const App = () => {

  return (
    <>
      <Switch>
        <Route exact path = "/" component = {SearchPage} />
        <Route path = '/bookmarks' component = {Bookmarks} />
      </Switch>
    </>
  )
}

export default App
