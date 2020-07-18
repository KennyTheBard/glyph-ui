import React, { useState } from 'react';
import {
	BrowserRouter, Route, Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import GlyphNav from './general/GlyphNav.js';
import Dashboard from './pages/general/Dashboard.js';
import StoryPage from './pages/general/StoryPage.js';
import Activate from './pages/activate/Activate.js';
import Register from './pages/register/Register.js';
import Login from './pages/login/Login.js';
import Library from './pages/library/Library.js';
import PlayStory from './pages/library/PlayStory.js';
import Workbench from './pages/workbench/Workbench.js';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

import { parseJwt } from './utils/parseJwt.js';

require('dotenv').config()

const history = createBrowserHistory();

function App() {
	const storedJwt = localStorage.getItem("jwt");
	const [user, setUser] = useState(!storedJwt ? null : parseJwt(storedJwt));

	return (
		<>
			<BrowserRouter basename="/" history={history}>
				<GlyphNav user={user}/>
				<div className="content">
					<Switch>
						<Route 	exact path={"/"}
								render={(matchProps) => 
									<Dashboard
										{...matchProps}
									/>
								}/>
						<Route exact path="/story/:storyId"
								render={(matchProps) => 
									<StoryPage
										{...matchProps}
										user={user}
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
						<Route 	exact path="/activate/:userId/:code"
								render={(matchProps) => 
									<Activate
										{...matchProps}
									/>
								}/>
						<Route 	exact path="/login"
								render={(matchProps) => 
									<Login
										{...matchProps}
										setUserHook={setUser}
									/>
								}/>
						<Route exact path="/library"
								render={(matchProps) => 
									<Library
										{...matchProps}
										user={user}
									/>
								}/>
						<Route exact path="/play/:storyId"
								render={(matchProps) => 
									<PlayStory
										{...matchProps}
										user={user}
									/>
								}/>
						<Route exact path="/workbench"
								render={(matchProps) => 
									<Workbench
										{...matchProps}
										user={user}
									/>
								}/>
					</Switch>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
