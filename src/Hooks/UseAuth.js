import Axios from 'axios'
import { useEffect, useState } from 'react'


const useAuth = () => {
    const [isRegistered, setIsRegistered] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let CheckUserAuthStatus = async() => {
            let result = await Axios.get('http://localhost:5001/user/isRegistered', {withCredentials: true})
            .then((res) => {
                setIsRegistered(res.data.isRegistered)
            })
            .catch((err) => {
                console.error("Auth check failed", err);
                setIsRegistered(false)
                
                
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }
        CheckUserAuthStatus()
    }, [])
    
    return [isRegistered, isLoading]
}

export default useAuth