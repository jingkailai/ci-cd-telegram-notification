import React from 'react'
import { Form, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { signup, login } from '../../API/auth';
import './signup.css';
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};


function Signup(props) {
  const isAuthenticated = props.Auth.isAuthenticated;
  const dispatch = useDispatch();
  const loginAfterSignup = (values) => {
    dispatch(login(values))
  }
  const onFinish = values => {
    dispatch(signup(values, loginAfterSignup));
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  if(isAuthenticated){
    return <Redirect to="/" />
  }
  return (
    <div className="login-page-sec1">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: 'Please input your Date of Birth!' }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          don't have an account? <Link to="/signup">Create Account</Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
const mapStateToProps = ({ Auth }) => ({ Auth })
export default connect(mapStateToProps)(Signup)