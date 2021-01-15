import React, { useState } from 'react'
import { Button, Modal, Form, Input, InputNumber, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect, useDispatch } from 'react-redux';
import { add_account } from '../../Actions/actions';
import { baseUrl } from '../../shared';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
function AddAccount({ Auth: { user } }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = values => {
    setLoading(true);
    values.user_id = user.user_id
    baseUrl.post('/accounts', values)
      .then(res => {
        setLoading(false);
        setVisible(false);
        dispatch(add_account({ ...values, account_id: res.data.insertId, date_created: new Date().toISOString() }));
      })
      .catch(error => {
        console.log(error.message);
      })

  };

  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div className="add-acc-btn">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          // loading={loadings[1]}
          onClick={() => setVisible(true)}
        >
          Add Account
        </Button>
        <Modal
          visible={visible}
          title="Add Account"
          // onOk={this.handleOk}
          onCancel={() => setVisible(false)}
          footer={[
            // <Button key="back" onClick={()=>setVisible(false)}>
            //   Cancel
            // </Button>,
            <Button key="submit" type="primary"
              loading={loading}
              onClick={() => { document.getElementById("add-btn").click() }}
            >
              Submit
            </Button>,
          ]}
        >
          <div>
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
              <Form.Item >
                <Button style={{ display: 'none' }} id="add-btn" type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  )
}

const mapStateToProps = ({ Auth }) => ({ Auth })
export default connect(mapStateToProps)(AddAccount)