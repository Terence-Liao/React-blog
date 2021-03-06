
import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col , List ,Icon ,Breadcrumb  } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import Link from 'next/link'
import hljs from 'highlight.js'
import marked from 'marked'
import 'highlight.js/styles/monokai-sublime.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'


const artList = (list) =>{

    const [ mylist , setMylist ] = useState(list['data']);

    const renderer = new marked.Renderer();

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });




    return (
        <div>

            <Head>
                <title>Home</title>
            </Head>

            <Header />

            {/*ListContent*/}
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>

                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{mylist[0]['typeName']}</Breadcrumb.Item>

                            </Breadcrumb>
                        </div>

                        <List
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">

                                        <Link href={{pathname:'/detailed' ,query:{id: item.id}}} >
                                            <a >{item.title}</a>
                                        </Link>

                                    </div>
                                    <div className="list-icon">
                                        <span><Icon type="calendar" />{item.addTime}</span>
                                        <span><Icon type="folder" /> {item.typeName}</span>
                                        <span><Icon type="fire" />  {item.view_count}人</span>
                                    </div>
                                    <div className="list-context"
                                         dangerouslySetInnerHTML={{__html:marked(item.articleTxt)}}
                                    ></div>
                                </List.Item>
                            )}
                        />

                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Advert />
                </Col>
            </Row>

            <Footer/>

        </div>
    )

}





artList.getInitialProps = async (contentxt)=>{

    let id =contentxt.query.id

    const promise = new Promise((resolve)=>{

        axios(servicePath.getListId+id).then(
            (res)=>{
                console.log(res['data'])
                resolve(res.data)
            }
        )

    })

    return await promise;

}



export default artList