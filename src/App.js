import React from 'react';
import {
	BrowserRouter, Route, Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import GlyphNav from './general/GlyphNav.js';
import Dashboard from './pages/dashboard/Dashboard.js';
import Activate from './pages/activate/Activate.js';
import Register from './pages/register/Register.js';
import Login from './pages/login/Login.js';
import NewStory from './pages/story/NewStory.js';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

require('dotenv').config()

const history = createBrowserHistory();

function App() {

	return (
		<>
			<BrowserRouter basename="/" history={history}>
				<GlyphNav/>
				<div className="content">
					<Switch>
						<Route 	exact path={"/"}
								render={(matchProps) => 
									<Dashboard
										{...matchProps}
									/>
								}/>
						<Route 	exact path={"/register"}
								render={(matchProps) => 
									<Register
										{...matchProps}
									/>
								}/>
						<Route 	exact path="/activate"
								render={(matchProps) => 
									<Activate
										{...matchProps}
									/>
								}/>
						<Route 	exact path="/activate/:id/:code"
								render={(matchProps) => 
									<Activate
										{...matchProps}
									/>
								}/>
						<Route 	exact path="/login"
								render={(matchProps) => 
									<Login
										{...matchProps}
									/>
								}/>
						<Route exact path="/story"
								render={(matchProps) => 
									<NewStory
										{...matchProps}
									/>
								}/>
						<Route exact path="/story/edit/:storyId">
							<Dashboard/>
						</Route>
						<Route exact path="/story/play/:storyId">
							<Dashboard/>
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
