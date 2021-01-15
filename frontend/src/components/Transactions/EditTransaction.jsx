import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Select, InputNumber, } from 'antd';
import {  } from '@ant-design/icons';
import { connect, useDispatch } from 'react-redux';
import { update_transaction, delete_transaction } from '../../Actions/actions';
import { baseUrl } from '../../shared';

const { Option } = Select;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};



function AddAccount({ id, setId, Auth: { user }, Accounts: { accounts }, Transactions: { transactions } }) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    if (id) {
      console.log("running");
      const transaction = transactions.find(acc => acc.transaction_id === id);
      setState(transaction);
      form.setFieldsValue({ ...transaction });
    }
  }, [id]);


  const onFinish = values => {
    setLoading(true);
    values.transaction_id = id;
    console.log("values to send", values);
    baseUrl.post('/transactions', values)
      .then(res => {
        setLoading(false);
        setId(false);
        dispatch(update_transaction({ id: id, transaction: { ...values, transaction_id: id } }));
      })
      .catch(error => {
        console.log(error.message);
      })

  };

  const handleDelete = () => {
    baseUrl.delete("/transactions/id", { params: { id } })
      .then(res => {
        setId(false);
        dispatch(delete_transaction(id));
      })
      .catch(error => {
        console.log(error);
      })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onTypeChange = value => {
    setState({ ...state, transaction_type: value })
  }
  const onAccountChange = value => {
    setState({ ...state, account_id: value })
  }
  const visible = id ? true : false;
  console.log(visible, id);
  return (
    <div>
        <Modal
          visible={visible}
          title="Edit Transaction"
          // onOk={this.handleOk}
          onCancel={() => setId(false)}
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
                label="Transaction Amount"
                name="transaction_amount"
                rules={[{ required: true, message: 'Please input Transaction Amount!' }]}
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

const mapStateToProps = ({ Auth, Accounts, Transactions }) => ({ Auth, Accounts, Transactions })
export default connect(mapStateToProps)(AddAccount)