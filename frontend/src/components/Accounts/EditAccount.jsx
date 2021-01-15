import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, InputNumber, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect, useDispatch } from 'react-redux';
import { update_account, delete_account } from '../../Actions/actions';
import { baseUrl } from '../../shared';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};
function AddAccount({ account_id, setAccountId, Auth: { user }, Accounts: { accounts } }) {
  // const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null)
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    if (account_id) {
      console.log("running");
      const account = accounts.find(acc => acc.account_id === account_id);
      setState(account);
      form.setFieldsValue({ ...account });
    }
  }, [account_id]);


  const onFinish = values => {
    setLoading(true);
    values.user_id = user.user_id;
    values.account_id = account_id;
    baseUrl.put('/accounts', values)
      .then(res => {
        setLoading(false);
        setAccountId(false);
        dispatch(update_account({ id: account_id, account: { ...values, account_id: account_id } }));
      })
      .catch(error => {
        console.log(error.message);
      })

  };

  const handleDelete = () => {
    baseUrl.delete("/accounts/account_id", { params: { account_id } })
      .then(res => {
        setAccountId(false);
        dispatch(delete_account(account_id));
      })
      .catch(error => {
        console.log(error);
      })
  }

  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
  };
  const visible = account_id ? true : false;
  console.log(visible, account_id);
  return (
    <div>

      <Modal
        visible={visible}
        title="Edit Account"
        // onOk={this.handleOk}
        onCancel={() => setAccountId(false)}
        footer={[
          <Button key="submit" type="primary"
            danger
            loading={loading}
            onClick={() => handleDelete()}
          >
            Delete
            </Button>,
          <Button key="submit" type="primary"
            loading={loading}
            onClick={() => { document.getElementById("add-btn").click() }}
          >
            Update
            </Button>,
        ]}
      >
        <div>
          <Form
            {...layout}
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Balance"
              name="balance"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <InputNumber />
            </Form.Item>
            {/* <Form.Item {...tailLayout}> */}
            <Button id="add-btn" style={{ display: 'none' }} type="primary" htmlType="submit">
              Update
                </Button>
            {/* </Form.Item> */}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ Auth, Accounts }) => ({ Auth, Accounts })
export default connect(mapStateToProps)(AddAccount)