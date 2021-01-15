import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space } from 'antd';
import './accounts.css';
import AddAccount from './AddAccount';
import { connect, useDispatch } from 'react-redux';
import { get_accounts } from '../../Actions/actions';
import { baseUrl } from '../../shared';
import { getDateString } from '../../utils/date';
import { EditOutlined } from '@ant-design/icons';
import EditAccount from './EditAccount';



function Accounts({ Accounts: { fetched, accounts }, Auth: { user } }) {
  const [account_id, setAccount_id] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    var config = {
      params: { user_id: user.user_id }
    };
    baseUrl.get('/accounts/user_id', config)
      .then(res => {
        dispatch(get_accounts(res.data));
      })
      .catch(error => {
        console.log(error);
      })
  }, [])


  console.log(accounts);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Date Created',
      dataIndex: 'date_created',
      key: 'date_created',
      render: text => getDateString(text),
    },
    {
      title: 'Actions',
      dataIndex: 'account_id',
      key: 'account_id',
      render: text => <div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          // loading={loadings[1]}
          onClick={() => setAccount_id(text)}
        >
          Edit
        </Button>
      </div>,
    },
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div>
      <AddAccount  />
      <EditAccount account_id={account_id} setAccountId={setAccount_id} />
      <Table columns={columns} dataSource={accounts} />
    </div>
  )
}

const mapStateToProps = ({ Auth, Accounts }) => ({ Auth, Accounts })
export default connect(mapStateToProps)(Accounts)