import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logOut} from "../../redux/auth-reducer";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";


const HeaderCom: React.FC = () => {
    const isAuth = useSelector<AppStateType,boolean>(state => state.auth.isAuth)
    const login = useSelector<AppStateType,string | null>(state => state.auth.login)
    const dispatch = useDispatch();
    const HeaderLogout = () =>{
        //@ts-ignore
        dispatch(logOut())
    }
    return <header className={s.header}>
        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
        <div className={s.loginBlock}>
            {isAuth ?
                <div style={{color:'white'}}>{login}  <Button onClick={HeaderLogout} style={{marginLeft:'20px'}}>Log Out</Button></div>
                : <Button style={{marginLeft:'20px'}}><NavLink to={'/login'}>Login</NavLink></Button>}
        </div>
    </header>
}

export default HeaderCom;