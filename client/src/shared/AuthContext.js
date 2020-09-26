import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState({});
	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
			{props.children}
		</AuthContext.Provider>
	);
};
