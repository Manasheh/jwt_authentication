//it will be used to handle the authentication of the user
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoginRegister from '../components/LoginRegister'

const Auth = ({children}) => {
    const {token} = useContext(AuthContext)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        verify()
    }, [])

    //verify first to access the dashboard
    const verify = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/verify', 
            {
                headers: {
                    'x-access-token': token?.token
                },
                withCredentials: true
            })
            if(response.status === 200){
                setRedirect(true)
            }
        } catch (error) {
            setRedirect(false)
        }
    }
  return redirect ? children : <LoginRegister page={'Login'}/>
}

export default Auth
