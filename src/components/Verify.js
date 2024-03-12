import { Button,  Form, Input} from 'antd';
import { useState } from 'react';

function Verify(props){
    const [otp,setotp]=useState('');
    function changeHandler(changedValues,allValues){
        console.log(allValues)
         setotp(allValues);
     }
     function finishHandler(){
        if(otp['otp']===props.otp){
            props.register_user(true);
        }
        else{
            props.register_user(false);
        }
     }
    return(
      <div>
        <h1>Verify OTP :</h1>
        <Form  name="basic"
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
    autoComplete="off">

    <Form.Item
      label="OTP:"
      name="otp"
      rules={[
        {
          required: true,
          message: 'Enter OTP',
        },
        {
          pattern: /^\d{6}$/,
          message:""
        },
      ]}
    >
      <Input
        
        
      />
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
export default Verify;