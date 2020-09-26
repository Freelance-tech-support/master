import React, { useState } from "react";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
	const [authenticated, setAuthenticated] = useState(false);

	let routes = (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Redirect path="/register" component={Register} />
		</Switch>
  );
  
  if (authenticated) {
    routes = (
      <div>Home</div>
    )
  }

	return <div className="App">{routes}</div>;
};

export default App;
