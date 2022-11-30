import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginAdmin = () => {
    // Context
    const { loginAdmin } = useContext(AuthContext)

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const { username, password } = loginForm

    const onChangeLoginForm = event =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginAdmin(loginForm)
            if (!loginData.success) {
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 5000)
            }
            else window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>Admintrators</h1>
                    <h4>Login with admin's account to access this page!</h4>
                    <Form className='my-4' onSubmit={login}>
                        <AlertMessage info={alert} />

                        <Form.Group>
                            <Form.Control
                                style={{ margin: '5px' }}
                                type='text'
                                placeholder='Username'
                                name='username'
                                required
                                value={username}
                                onChange={onChangeLoginForm}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                style={{ margin: '5px' }}
                                type='password'
                                placeholder='Password'
                                name='password'
                                required
                                value={password}
                                onChange={onChangeLoginForm}
                            />
                        </Form.Group>
                        <Button variant='success' type='submit'>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin;
