import { Button,  Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import { Auth } from '../ContexntAPI/Auth';
import { useContext } from 'react';
function Login(){
        const {setauth}=useContext(Auth);
        const [formdata,setformdata]=useState({email:"",password:""});
        const navigate=useNavigate();
        async function finishHandler(){
          await axios({
            method:'post',
            url:'http://127.0.0.1:8000/login',
            data:formdata
          }).then(response=>{
            if(response.data.success){
              toast.success("Login Successfully");
              localStorage.setItem('refresh_token',response.data.token['refresh'])
              setauth(true);
              navigate("/loggedin");
            }
            else{
              toast.error("Wrong Credentials");
            }
          }).catch(error=>{
            console.log(error);
          })
          }
          function changeHandler(changedValues,allValues){
              setformdata(allValues);
          }
          return(
          <div className='signup_form'>
          <h3>Login:</h3>
          <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
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
          
        </Form>
        
              </div>
    )
}
export default Login;