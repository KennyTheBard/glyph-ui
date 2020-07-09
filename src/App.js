import React from 'react';
import {
	BrowserRouter, Route, Switch,
} from 'react-router-dom';

import GlyphNav from './general/GlyphNav.js';
import Dashboard from './pages/dashboard/Dashboard.js';
import Activate from './pages/activate/Activate.js';
import Register from './pages/register/Register.js';
import Login from './pages/login/Login.js';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

require('dotenv').config()


function App() {

	return (
		<>
			<GlyphNav/>
			<BrowserRouter>
				<Switch>
					<Route 	path="/"
							render={(matchProps) => 
								<Dashboard
									{...matchProps}
								/>
							}/>
					<Route 	path="/register"
							render={(matchProps) => 
								<Register
									{...matchProps}
								/>
							}/>
					<Route 	path="/activate"
							render={(matchProps) => 
								<Activate
									{...matchProps}
								/>
							}/>
					<Route 	path="/activate/:id/:code"
							render={(matchProps) => 
								<Activate
									{...matchProps}
								/>
							}/>
					<Route path="/login"
							render={(matchProps) => 
								<Login
									{...matchProps}
								/>
							}/>
					<Route path="/story/new">
						<Dashboard/>
					</Route>
					<Route path="/story/edit/:storyId">
						<Dashboard/>
					</Route>
					<Route path="/story/play/:storyId">
						<Dashboard/>
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
