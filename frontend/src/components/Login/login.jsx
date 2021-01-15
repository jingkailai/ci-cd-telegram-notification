import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { login } from '../../API/auth';
import './login.css';
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

function Login(props) {

  const isAuthenticated = props.Auth.isAuthenticated;
  const login_error= props.Auth.login_error;
  const dispatch = useDispatch();

  const onFinish = values => {
    console.log('Success:', values);
    dispatch(login(values));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  if (isAuthenticated) {
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
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input type="email" />
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
          <p>{login_error}</p>
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
export default connect(mapStateToProps)(Login)