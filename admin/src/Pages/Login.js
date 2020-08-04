import React,{useState} from 'react'
import 'antd/dist/antd.css'
import '../styles/Login.css'
import {Card,Input,Button,Spin,message} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props){

    const [userName , setUserName] = useState('')
    const [passWord , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = ()=>{
        setIsLoading(true)


        if(!userName){
            message.error('用户不能为空')
                setIsLoading(false)
            return false;
        }else if(!passWord){
            message.error('密码不能为空')
                setIsLoading(false)
            return false;
        }

        let dataProps = {
            'userName': userName,
            'passWord': passWord
        }


        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(res=>{

            setIsLoading(false)
            if(res.data.data === '登录成功'){
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')
            }else{
                message.error('用户名密码错误')
            }

        })
        
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }



    return (
       <div className="login-div">

           <Spin tip='Loading...' spinning = {isLoading}>

               <Card title="Management System of TerenceLiao ">

                   <Input
                       id="userName"
                       size="large"
                       placeholder="Enter your accountNumber"
                       //prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                       onChange={(e)=>{setUserName(e.target.value)}}
                   />
                   <br/><br/>

                   <Input.Password
                       id="password"
                       size="large"
                       placeholder="Enter your password"
                       //prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                       onChange={(e)=>{setPassword(e.target.value)}}
                   />
                   <br/><br/>

                   <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>

               </Card>


           </Spin>

       </div>
    )
}

export default Login