import React,{useState,useEffect} from 'react'
import '../static/style/components/header.css'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import {Row,Col,Menu,Icon} from 'antd'
import servicePath from '../config/apiUrl'

const Header =() =>{

    const [navArry,setNavData] = useState([])

    useEffect(()=>{

        const reqData = async () =>{
            const result = await axios(servicePath.getTypeInfo).then(

                (res)=>{
                    var data = res['data']['data'];
                    setNavData(data)
                }

            )
         }

            reqData();

    },[])


    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        }


    }


    return(
        <div className="header">
            <Row type="flex" justify="center">

                <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">
                       <Link  href={{pathname:'/index'}}>
                           <a>加瓦斯库</a>
                       </Link >
                    </span>
                    <span className="header-txt">最渺小的我 有大大的夢</span>
                </Col>


                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu
                        mode="horizontal"
                        onClick={handleClick}
                    >
                        <Menu.Item key="0">
                            <Icon type="home" style={{color: '#08c'}}/>
                            博客首页
                        </Menu.Item>
                        {
                            navArry.map((item)=>{

                                return(
                                    <Menu.Item key={item.Id} >
                                        <Icon type={item.icon}   style={{color: '#08c'}} />
                                        {item.typeName}
                                    </Menu.Item>
                                )

                            })


                        }
                    </Menu>
                </Col>

            </Row>


        </div>
    )
}
export default  Header
