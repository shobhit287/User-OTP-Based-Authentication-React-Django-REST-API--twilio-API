import axios from "axios";
import { useEffect,useState } from "react";
function Info(){
    useEffect(() => {
        generate_token();
    }, []);
    const [userData, setUserData] = useState(null);
    async function generate_token(){
       await axios.post('http://127.0.0.1:8000/api/token/refresh',{
        refresh:localStorage.getItem('refresh_token')
       })
       .then(response=>{
        const access_token=response.data.access;
        axios.get('http://127.0.0.1:8000/user_info',{
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(response=>{
            const data=response.data.details;
            console.log(data)
            setUserData(data);
        }).catch(error=>{
            console.log(error)
        })
       }).catch(error=>{
        console.log("error");
       })
        
    }
  
    return(
         <div>
                <h1> User Information Given Below:</h1>
            {userData && ( 
                <>
                    <h3>Name:  <span>{userData['first_name']}</span></h3>
                    <h3>Email:  <span>{userData['email']}</span></h3>
                    <h3>Phone:  <span>{userData['phone_no']}</span></h3>
                </>
            )}
       
         </div>
    )
}
export default Info;