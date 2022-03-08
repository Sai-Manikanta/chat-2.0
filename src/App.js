import { useContext } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom'
import ProtectRoute from './components/ProtectRoute'
import { AnimatePresence } from 'framer-motion'
import { ThemeContext } from './contexts/ThemeContext'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Feachers from './pages/Feachers'
import LastLogins from './pages/LastLogins'
import NotFound from './pages/NotFound'
import Loggins from './pages/Loggins';
import VideoCall from './pages/VideoCall';
import Movies from './pages/Movies'

function App() {
    const { isDarkTheme } = useContext(ThemeContext);
    const location = useLocation();

    return (
        <div className={`${isDarkTheme && 'dark'}`}>
            <AnimatePresence exitBeforeEnter initial={true}>
                <Switch location={location} key={location.key}>
                    <ProtectRoute path="/" component={Home} exact />
                    <ProtectRoute path="/lastlogins" component={LastLogins} />
                    <ProtectRoute path="/feachers" component={Feachers} />
                    <Route path="/login" component={Login} />
                    <Route path="/logindata" component={Loggins} />
                    <ProtectRoute path="/video-call" component={VideoCall} />
                    <ProtectRoute path="/video-call" component={VideoCall} />
                    <Route path="/movies" component={Movies} />
                </Switch>
            </AnimatePresence>
        </div>
    )
}

export default App
