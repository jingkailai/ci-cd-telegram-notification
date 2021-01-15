import React from 'react'
import { Layout, Menu, Button, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './layout.css';
import Login from '../Login/login';
import Signup from '../Signup/signup';
import { Switch, Route, withRouter } from 'react-router-dom';
import Accounts from '../Accounts/Accounts';
import PrivateRoute from '../Routing/PrivateRoute';
import Transactions from '../Transactions/Transactions';
import { Logout } from '../../API/auth';
import { useDispatch, connect } from 'react-redux';
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Index({ history, Auth: { user, isAuthenticated } }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Layout>
        <Header className="header">
          <span className="logo">NUSMoney</span>
          <div>
            {/* <Button type="primary" 
            onClick={() => dispatch(Logout())} >
              Logout
            </Button> */}
          </div>
        </Header>
        <Layout>
          {isAuthenticated &&
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                onSelect={e => console.log(e)}
              >
                <Menu.Item key="/" icon={<UserOutlined />} onClick={() => history.push("/transactions")} >Transactions</Menu.Item>
                <Menu.Item key="/accounts" icon={<UserOutlined />} onClick={() => history.push("/accounts")}>Accounts</Menu.Item>
                <Menu.Item key="/logout" icon={<UserOutlined />} onClick={() => dispatch(Logout())}>Logout</Menu.Item>
              </Menu>
            </Sider>
          }
          {!isAuthenticated &&
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                onSelect={e => console.log(e)}
              >
                <Menu.Item key="/login" icon={<UserOutlined />} onClick={() => history.push("/login")} >Login</Menu.Item>
                <Menu.Item key="/signup" icon={<UserOutlined />} onClick={() => history.push("/signup")} >Signup</Menu.Item>
              </Menu>
            </Sider>
          }
          <Layout style={{ padding: '0 24px 24px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
            
            </Breadcrumb> */}
            <Content
              className="site-layout-background main-content"
            >
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/accounts" component={Accounts} />
                <PrivateRoute path="/transactions" component={Transactions} />
                <PrivateRoute path="/" component={Accounts} />
                <Route path="/" component={Login} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
const mapStateToProps = ({ Auth }) => ({ Auth })
export default connect(mapStateToProps)(withRouter(Index))