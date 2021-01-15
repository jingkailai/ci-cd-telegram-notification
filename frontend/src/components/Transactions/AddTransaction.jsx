import React, { useState } from 'react'
import { Button, Modal, Form, Select, InputNumber, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect, useDispatch } from 'react-redux';
import { add_transaction } from '../../Actions/actions';
import { baseUrl } from '../../shared';

const { Option } = Select;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
function AddAccount({ Auth: { user }, Accounts: { accounts } }) {
  const [state, setState] = useState({})
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = values => {
    setLoading(true);
    values.user_id = user.user_id
    baseUrl.post('/transactions', values)
      .then(res => {
        setLoading(false);
        setVisible(false);
        dispatch(add_transaction({ ...values, transaction_id: res.data.insertId, date_created: new Date().toISOString() }));
      })
      .catch(error => {
        console.log(error.message);
      })

  };

  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
  };

  const onTypeChange = value => {
    setState({ ...state, transaction_type: value })
  }
  const onAccountChange = value => {
    setState({ ...state, account_id: value })
  }

  return (
    <div>
      <div className="add-acc-btn">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          // loading={loadings[1]}
          onClick={() => setVisible(true)}
        >
          Add Transaction
        </Button>
        <Modal
          visible={visible}
          title="Add Transaction"
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
                label="Select Account"
                name="account_id"
                rules={[{ required: true, message: 'Please Select Account!' }]}
              >
                <Select
                  placeholder="Select Account"
                  onChange={onAccountChange}
                  allowClear
                >
                  {
                    accounts.map((acc) => {
                      return <Option key={Math.random()} value={acc.account_id}>{acc.name}</Option>
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="Transaction Type"
                name="transaction_type"
                rules={[{ required: true, message: 'Please Select Transaction Type!' }]}
              >
                <Select
                  placeholder="Select Transaction Type"
                  onChange={onTypeChange}
                  allowClear
                >
                  <Option value="Expense">Expense</Option>
                  <Option value="Income">Income</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Trasaction Amount"
                name="transaction_amount"
                rules={[{ required: true, message: 'Please input Trasaction Amount!' }]}
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

const mapStateToProps = ({ Auth, Accounts }) => ({ Auth, Accounts })
export default connect(mapStateToProps)(AddAccount)