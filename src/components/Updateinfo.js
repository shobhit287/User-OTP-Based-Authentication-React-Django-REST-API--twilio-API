import { Button,  Form, Input,InputNumber } from 'antd';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Updateinfo(){
    const navigate=useNavigate();
    const [formdata,setformdata]=useState('');
    function changeHandler(changedValues,allValues){
        console.log(allValues)
         setformdata(allValues);
     }
     function finishHandler(){
         axios.post('http://127.0.0.1:8000/api/token/refresh',{
            refresh:localStorage.getItem('refresh_token')
           })
           .then(response=>{
            const access_token=response.data.access;
            axios.patch('http://127.0.0.1:8000/update_data',formdata,{
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(response=>{
                if(response.data.success){
                    toast.success("Data Update Successfully");
                    navigate("/login");
                    localStorage.clear();
                }
            }).catch(error=>{
                toast.error("Failed To Update");
            })
           }).catch(error=>{
            console.log("error");
           })  
     }
    return(
    
           <div className='signup_form'>
    <h3>Update Data:</h3>
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
      ]}
    >
      <InputNumber
        style={{
          width: '100%',
        }}
      />
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
  </Form>
        </div>
    )
}
export default Updateinfo;