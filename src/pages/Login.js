import { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { motion } from "framer-motion"
import { AuthContext } from '../contexts/AuthContext'
import FormError from '../components/FormError'
import firebase from '../utils/firebase'
import getTime from '../utils/time'

function validateName(value){
    let error;
    if((value !== 'Mani') && (value !== 'Chinnu')){
        error = "Incorrect Name";
    } 
    return error;
}

function vaidatePassword(value){
    let error;
    if(value !== 'Sep6'){
        error = "Incorrect Password"
    }
    return error;
}

function Login() {
    const history = useHistory();
    const { setLoginDetails } = useContext(AuthContext);

    return (
        <motion.div 
            exit={{ x: '-100%' }}
            transition={{ duration: 1 }}
            className="h-screen bg-gradient-to-r from-green-400 to-blue-500 p-5"
        >
            <motion.div 
                initial={{ y: '-130%' }}
                animate={{ y: 0 }}
                transition={{ delay: 1.6 }}
                className="bg-white p-6 rounded-sm max-w-sm mx-auto overflow-hidden"
            >
                <motion.div
                    initial={{ translateX: '120%' }}
                    animate={{ translateX: 0 }}
                    transition={{ delay: 2.4 }}
                >
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Welcome</h1>
                    <p className="text-gray-700">Login to continue</p>
                </motion.div>
                <img 
                    src="images/undraw_book_lover_mkck.svg" 
                    alt="girl with books" className="mt-8" 
                />
                <Formik
                    initialValues={{ name: '', password: '' }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Name is Required'),
                        password: Yup.string().required('Password is Required'),
                    })}
                    onSubmit={({ name }, props) => {
                        props.resetForm();
                        setLoginDetails({
                            name,
                            isLogin: true
                        })
                        // inser login data
                        const logginsRef = firebase.database().ref("Loggins");
                        const login = {
                            name,
                            loginAt: getTime()
                        }
                        logginsRef.push(login);

                        history.push('/');
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    <Form className="mt-6 p-2">
                        <div>
                            <Field 
                                name="name" 
                                type="text" 
                                validate={validateName} 
                                autoComplete="off"
                                className="border w-full py-1 pl-8 rounded-sm focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent bg-no-repeat"  
                                placeholder="User Name"
                                style={{ backgroundImage: `url("images/user-90.png")`, backgroundPosition: '2% 50%', backgroundSize: '22px'  }}
                            />
                            <ErrorMessage name="name" component={FormError} />
                        </div>
                        <div className="mt-3">
                            <Field 
                                name="password" 
                                type="text" 
                                validate={vaidatePassword} 
                                autoComplete="off"
                                className="border w-full py-1 pl-8 rounded-sm focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent bg-no-repeat"    
                                placeholder="Password"
                                style={{ backgroundImage: `url("images/lock-52.png")`, backgroundPosition: '2% 50%', backgroundSize: '21px'  }}
                            />
                            <ErrorMessage name="password" component={FormError} />
                        </div>
                        <motion.button 
                            initial={{ scale: 0.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            type="submit"
                            className="bg-purple-500 hover:bg-purple-600 p-5 px-4 py-2 mt-5 w-full rounded-full text-white focus:outline-none"
                        >  
                            Login
                        </motion.button>
                    </Form>
                </Formik>
            </motion.div>
        </motion.div>
    )
}

export default Login
