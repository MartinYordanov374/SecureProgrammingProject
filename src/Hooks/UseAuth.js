import { useEffect } from "react"
import Axios from 'axios'

const useAuth = () => {
    useEffect(() => {
        async function FetchUserStatusEndpoint(){
            await Axios.get('http://localhost:5001/user/isRegistered')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        FetchUserStatusEndpoint()
    }, [])
   
}

export default useAuth;