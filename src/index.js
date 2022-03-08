import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import AuthContextProvider from './contexts/AuthContext'
import UploadContextProvider from './contexts/UploadContext'
import ChatContextProvider from './contexts/ChatContext'
import ThemeContextProvider from './contexts/ThemeContext'
import './index.css'

ReactDOM.render(
    <AuthContextProvider>
        <ChatContextProvider>
            <UploadContextProvider>
                <ThemeContextProvider>
                    <Router>
                        <App />
                    </Router>
                </ThemeContextProvider>
            </UploadContextProvider>
        </ChatContextProvider>
    </AuthContextProvider>,
    document.getElementById('root')
)