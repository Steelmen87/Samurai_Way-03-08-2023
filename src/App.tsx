import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppStateType} from './redux/redux-store'
import {withSuspense} from "./hoc/withSuspense";
import {PageUsers} from "./components/Users/PageUsers";
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';

import {Breadcrumb, Col, Layout, Menu, Row} from 'antd';
import s from "./components/Navbar/Navbar.module.css";
import HeaderCom from "./components/Header/Header";

const {Content, Footer, Sider, Header} = Layout;


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

const LoginPage = React.lazy(() => import('./components/Login/Login'));
//100 done


type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType, any> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("some Error")
    }

    componentDidMount() {
        this.props.initializeApp();
        //@ts-ignore
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        //@ts-ignore
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Row>
                        <Col span={16}>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                                <Menu.Item key={'1'}>
                                    <NavLink to="/profile"
                                             activeClassName={s.activeLink}>Developer
                                    </NavLink>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={4}>
                            <HeaderCom/>
                        </Col>
                    </Row>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            ><Menu.SubMenu key={'sub1'} icon={<UserOutlined/>} title={"My profile"}>
                                <Menu.Item key={'1'}>
                                    <NavLink to="/profile"
                                             activeClassName={s.activeLink}>Developer
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key={'2'}>
                                    <NavLink to="/dialogs"
                                             activeClassName={s.activeLink}>Message
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key={'3'}>
                                    <NavLink to="#"
                                             activeClassName={s.activeLink}>item
                                    </NavLink>
                                </Menu.Item>
                            </Menu.SubMenu>
                                <Menu.SubMenu key={'sub2'} icon={<LaptopOutlined/>} title={"Developers"}>
                                    <Menu.Item key={'1'}>
                                        <NavLink to="/users"
                                                 activeClassName={s.activeLink}>users
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key={'4'}>
                                        <NavLink to="/chat"
                                                 activeClassName={s.activeLink}>Chat
                                        </NavLink>
                                    </Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                                <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                                <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                                <Route path='/users' render={() => <PageUsers/>}/>
                                <Route path='/login' render={withSuspense(LoginPage)}/>
                                <Route path='/chat' render={withSuspense(ChatPage)}/>
                                <Route path='*' render={() => <div>Page 404</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Samurai Social Network ©2022</Footer>
            </Layout>
            /*<div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                        <Route path='/users' render={() => <PageUsers/>}/>
                        <Route path='/login' render={withSuspense(LoginPage)}/>
                        <Route path='*' render={() => <div>Page 404</div>}/>

                    </Switch>
                </div>
            </div>*/
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
type MapPropsType = ReturnType<typeof mapStateToProps>
const MainApp = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

export default MainApp;