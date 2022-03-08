import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

function ProtectRoute({ component: Component, ...rest }) {
    const { isLogin } = useContext(AuthContext);

    return (
        <Route {...rest} render={props => {
            return isLogin ? <Component {...props} /> : <Redirect to="/login" />
        }} />
    )
}

export default ProtectRoute
