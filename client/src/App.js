import { Switch, Route, Link, useHistory } from "react-router-dom"

import { Map, Province } from "./pages"

function App() {
  const history = useHistory()
  return (

    <Switch>
      <Route exact path="/">
        <Link to="/map" >dupa</Link>
      </Route>
      <Route exact path="/map">
        <Map />
      </Route>
      <Route path="/map/province/:chunkId">
        <button onClick={() => history.goBack()}>Wróć</button>
        <Province />
      </Route>
    </Switch>
  );
}

export default App;
