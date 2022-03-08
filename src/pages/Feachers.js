import React from 'react'
import { useHistory, useRouteMatch, NavLink, Switch, Route } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import ImageUpload from '../components/ImageUpload'
import Menu from '../components/feachers/Menu'
import Status from '../components/feachers/Status'

function Feachers() {
    const history = useHistory();
    const { url, path } = useRouteMatch();

    return (
        <div className="bg-indigo-100 dark:bg-gray-800 h-screen text-gray-800"> 
        {/* style={{ backgroundColor: '#23285C' }} */}
            <div 
                style={{ backgroundColor: '#E9467C' }}
                className="p-2"
            >
                <div className="flex">
                    <button 
                        className="p-1.5 block"
                        onClick={() => history.push('/')}
                    >
                        <IoMdArrowRoundBack color="white" size="1.6em" />
                    </button>
                    <h2 className="flex-grow flex items-center justify-center text-pink-500">
                        Feachers bey
                    </h2>
                    <div className="w-10"></div>
                </div>

                <div className="flex justify-between space-x-2 mt-3">
                  <NavLink 
                    to={`${url}/menu`} 
                    className="bg-white flex-grow text-center py-1.5 rounded text-sm border-b-4" 
                    activeClassName="border-b-4 border-indigo-300 text-indigo-500"
                  >
                      Menu
                  </NavLink>
                  <NavLink 
                    to={`${url}/status/yours`} 
                    className="bg-white flex-grow text-center py-1.5 rounded text-sm border-b-4" 
                    activeClassName="border-b-4 border-indigo-300 text-indigo-500">
                      Status
                  </NavLink> 
                </div>
            </div>

            <div className="p-4 rounded-sm">
                <Switch>
                    <Route path={`${path}/menu`}>
                        <Menu />
                    </Route>
                    <Route path={`${path}/status`}>
                        <Status />
                    </Route>
                    <Route path={`${path}/image-upload`} component={ImageUpload} />
                </Switch>
            </div>

        </div>
    )
}

export default Feachers

