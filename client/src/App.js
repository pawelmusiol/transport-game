import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Map } from "./pages"

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <p>dupa</p>
          </Route>
          <Route path="/map">
            <p>kek</p>
            <Map />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
