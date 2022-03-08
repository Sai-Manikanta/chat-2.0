import { useContext } from 'react'
import { NavLink, useRouteMatch, Switch, Route } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import YourStatus from './YourStatus';
import PartnerStatus from './PartnerStatus';

function Status() {
    const { name } = useContext(AuthContext);
    const { url, path } = useRouteMatch();

    return (
        <div>
            <div className="flex">
                <NavLink 
                    to={`${url}/yours`}
                    activeClassName="bg-gradient-to-r from-green-400 to-blue-500 text-white"
                    className="border flex-grow text-center py-2 text-sm rounded-l border-r-0 bg-white"
                >
                    Your Status
                </NavLink>
                <NavLink 
                    to={`${url}/${name}`}
                    activeClassName="bg-gradient-to-r from-green-400 to-blue-500 text-white"
                    className="border flex-grow text-center py-2 text-sm rounded-r bg-white"
                >
                    {(name === 'Mani') ? 'Chinnu' : 'Mani'} Status
                </NavLink>
            </div>

            <div className="shadow bg-white mt-4 p-4 rounded">
                <Switch>
                    <Route path={`${path}/yours`}>
                        <YourStatus />
                    </Route>
                    <Route path={`${path}/${name}`}>
                        <PartnerStatus />
                    </Route>
                </Switch>
            </div>

        </div>
    )
}

export default Status
