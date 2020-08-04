import React,{useState} from 'react';
import '../styles/AdminIndex.css';
import AddArticle from './addArticle';
import ArticleList from './ArticleList';
import { Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {DesktopOutlined}  from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props){

    const [collapsed,setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    const handleClickArticle = e=>{
        if(e.key ==='addArticle'){props.history.push('/index/add')}
        else { props.history.push('/index/artList') }
    }

    return (

        <Layout style={{ minHeight: '100vh' }}>

            <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>

                <div className="logo" />

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                    <Menu.Item key="1">

                        <span>工作台</span>

                    </Menu.Item>

                    <Menu.Item key="2">

                       添加BBC

                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        onClick={handleClickArticle}
                        title={
                            <span>
                                <DesktopOutlined />
                                <span>文章管理</span>
                            </span>
                                }
                            >
                                <Menu.Item key="addArticle">添加文章</Menu.Item>
                                <Menu.Item key="articleList">文章列表</Menu.Item>

                     </SubMenu>

                    <Menu.Item key="9">
                        <span>留言管理</span>
                    </Menu.Item>

                </Menu>

            </Sider>

            <Layout>

                <Header style={{ background: '#fff', padding: 0 }} />

                <Content style={{ margin: '0 16px' }}>

                    <Breadcrumb style={{ margin: '16px 0' }}>

                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>

                    </Breadcrumb>

                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                        <div>

                            <Route path="/index/" exact  component={AddArticle} />
                            <Route path="/index/add/" exact  component={AddArticle} />
                            <Route path='/index/add/:id' exact component={AddArticle} />
                            <Route path='/index/artList/' component={ArticleList} />


                        </div>

                    </div>

                </Content>

                <Footer style={{ textAlign: 'center' }}>TerenceLiao.com</Footer>

            </Layout>

        </Layout>

    )


}

export default AdminIndex
