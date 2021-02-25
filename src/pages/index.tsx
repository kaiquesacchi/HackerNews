import { Switch, Route } from "react-router-dom";

import LinkList from "../components/LinkList";
import CreateLink from "../components/CreateLink";
import Header from "../components/Header";
import Login from "../components/Login";

export default function Router() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
}
