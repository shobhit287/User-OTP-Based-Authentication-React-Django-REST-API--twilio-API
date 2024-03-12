import { Button,  Form, Input} from 'antd';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Verify from './Verify';
import { useState } from 'react';
function Signup(){
  const [formdata,setformdata]=useState('');
  const [otpsent,setotpsent]=useState(false);
  const [otp,setotp]=useState(null);
  const navigate=useNavigate();
   function register_user(status=null){
    if(status){
       axios({
        method:'post',
        url:'http://127.0.0.1:8000/signup',
        data:formdata
      }).then(response=>{
        if(response.data.success){
          toast.success("Signup Successfully");
          navigate("/login");
        }
        else{
          if (response.data.error) {
            if (response.data.error.email && response.data.error.email.length > 0) {
                toast.error(response.data.error.email[0].substring(7));
            } else if (response.data.error.phone_no && response.data.error.phone_no.length > 0) {
                toast.error(response.data.error.phone_no[0].substring(7));
            } else {
                // Handle other types of errors
                toast.error("An error occurred");
            }
        } else {
            toast.error("An unexpected error occurred");
        }


        }
      }).catch(error=>{
        console.log(error);
      })
    }
     else{
      toast.error("Wrong OTP Entered");
     }
  }
   function finishHandler(){
      const phone_no=formdata['phone_no'];
       axios.post('http://127.0.0.1:8000/generate_otp',{ mobile_number: phone_no })
      .then(response=>{
         if(response.data.success){
            toast.success("OTP Sent Successfully");
            setotp(response.data.otp);
            setotpsent(true);
            
         }
         else{
          toast.error("OTP Send Failed");
         }
      }).catch(error=>{
        console.log(error);
        toast.error("Error While Generating OTP")
      })
    }
    function changeHandler(changedValues,allValues){
       console.log(allValues)
        setformdata(allValues);
    }
    return(
      <div className='signup_form'>
    {otpsent?(<Verify otp={otp} register_user={register_user} />):(<>
    <h3>Signup:</h3>
    <Form
    name="basic"
    labelCol={{
      span: 10,
    }}
    wrapperCol={{
      span: 18,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={finishHandler}
    onValuesChange={changeHandler}
    autoComplete="off"
  >
    <Form.Item
      label="First Name"
      name="first_name"
      rules={[
        {
          required: true,
          message: 'Enter First Name',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Last Name"
      name="last_name"
      rules={[
        {
          required: true,
          message: 'Enter Last Name',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="Phone Number"
      name="phone_no"
      rules={[
        {
          required: true,
          message: 'Enter Phone Number',
        },
        {
          pattern: /^\d{10}$/,
          message: 'Phone number must be 10 digits long and contain only numbers',
        },
      ]}
    >
      <Input
        
        
      />
    </Form.Item>
    <Form.Item
      name={['email']}
      label="Email"
      rules={[
        {
          required:true,
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

   

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form></>)}
      </div>  
    )
}
export default Signup;