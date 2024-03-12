import { Flex,Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Auth } from "../ContexntAPI/Auth";
function Loggedin(){
    const {setauth}=useContext(Auth);
    const navigate=useNavigate();
    function logoutHandler(){
        localStorage.clear();
        toast.success("Logout Successfully")
        setauth(false);
        navigate('/login');
    }
    async function deleteHandler(){
        await axios.post('http://127.0.0.1:8000/api/token/refresh',{
            refresh:localStorage.getItem('refresh_token')
           })
           .then(response=>{
            const access_token=response.data.access;
            axios.delete('http://127.0.0.1:8000/delete',{
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(response=>{
                if(response.data.success){
                    toast.success("User Deleted Successfully");
                    setauth(false);
                    navigate("/");
                }
            }).catch(error=>{
                toast.error("Failed To Delete");
            })
           }).catch(error=>{
            console.log("error");
            navigate('/');
           })  
    }
    return(
        <div >
    <h1>Update Or Delete User</h1>
     <Flex align="center" justify="center" gap="small" wrap="wrap">
     <Link to='/user_info'><Button type="primary">User Details</Button></Link>
     <Link to='/update_user'><Button type="primary">Update User Details</Button></Link>
     <Button type="primary" onClick={deleteHandler}>Delete User</Button>
     <Button type="primary" onClick={logoutHandler}>Logout</Button>
     </Flex>
        </div>
    )
}
export default Loggedin;