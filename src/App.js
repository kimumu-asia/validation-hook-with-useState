import "./styles.css";
import { Switch, Route, Link } from "react-router-dom";

import LoginForm from "./forms/LoginForm";
import DynamicLoginForm from "./forms/DynamicLoginForm";
import ComplexForm from "./forms/ComplexForm";

export default function App() {
  return (
    <div className="App">
      <Link to="/login-form">Simple Form</Link> |{" "}
      <Link to="/dynamic-form">Dynamic Form</Link> |{" "}
      <Link to="/nested-form">Nested Form</Link>
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route path="/login-form">
          <LoginForm />
        </Route>
        <Route path="/dynamic-form">
          <DynamicLoginForm />
        </Route>
        <Route path="/nested-form">
          <ComplexForm />
        </Route>
      </Switch>
    </div>
  );
}
