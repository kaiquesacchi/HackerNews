import { Switch, Route, Redirect } from "react-router-dom";

import LinkList from "../components/LinkList";
import CreateLink from "../components/CreateLink";
import Header from "../components/Header";
import Login from "../components/Login";
import Search from "../components/Search";

export default function Router() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/new/1" />} />
          <Route exact path="/new/:page" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    </div>
  );
}
