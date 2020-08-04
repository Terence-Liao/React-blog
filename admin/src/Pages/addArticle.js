import React,{ useState,useEffect } from'react'
import marked from 'marked'
import '../styles/addArticle.css'
import axios  from 'axios'
import serPath from '../config/apiUrl'
import { Row,Col,Input,Select,Button,DatePicker,message } from "antd";

const { Option } =Select;
const { TextArea } = Input;




function AddArticle(props){


    const [articleId,setArticleId] = useState(0)   // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState()  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('选择文章类别') //选择的文章类别


    const handleClickArticle = e=>{
        if(e.key ==='addArticle'){props.history.push('/index/add')}
        else { props.history.push('/index/list') }
    }

    const getArticleById = (id)=>{
        axios(serPath.getArticleById+id,{
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res=>{
            setArticleTitle(res.data.data[0].title)
            setArticleContent(res.data.data[0].article_content)
            let html=marked(res.data.data[0].article_content)
            setMarkdownContent(html)
            setIntroducemd(res.data.data[0].introduce)
            let tmpInt = marked(res.data.data[0].introduce)
            setIntroducehtml(tmpInt)
            setShowDate(res.data.data[0].addTime)
            setSelectType(res.data.data[0].typeId)
        })
    }

    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const ChangeTxtType = (value)=>{
        setSelectType(value);
    }





    const getTypeinfo = ()=>{
        axios({
            method:'get',
            url: serPath.getTypeinfo,
            header: { 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(res=>{

            if(res['data']['data'] ===   "没有登录"){
                localStorage.removeItem('openId')
                props.history.push('/')
            }else{
                setTypeInfo(res['data']['data'])
            }

        })

    }

    useEffect(()=>{
        getTypeinfo()
        let tmpId = props.match.params.id
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    },[])




    const saveArticle = ()=>{

        if(!selectedType){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }

        let dataProps = {

        }
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content =articleContent
        dataProps.introduce =introducemd
        let datetext= showDate.replace('-','/') //Converts a string to a timestamp
        dataProps.addTime =(new Date(datetext).getTime())/1000

        if(articleId===0){
            console.log('articleId=:'+articleId)
            dataProps.view_count =Math.ceil(Math.random()*100)+1000
            axios({
                method:'post',
                url:serPath.addArticle,
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isScuccess){
                        message.success('文章保存成功')
                    }else{
                        message.error('文章保存失败');
                    }

                }
            )
        }else{
            dataProps.id = articleId
            axios({
                method: 'post',
                url:serPath.updateArticle,
                data:dataProps,
                withCredentials: true
            }).
            then(
                res=>{
                    if(res.data.isScuccess){
                        message.success('文章修改成功')
                    }else{
                        message.error('保存失败');
                    }
                    
                    
                }
                
            )  


        }


    }



    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pendantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })



    return(
        <div>
            <Row gutter={5}>

                <Col span={16}>

                    <Row gutter={10} >

                        <Col span={19}>
                            <Input
                                value={articleTitle}
                                onChange={e=>{
                                    setArticleTitle(e.target.value)
                                }}
                                placeholder="博客标题"
                                size="large" />
                        </Col>
                        <Col span={3}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={ChangeTxtType}>

                                {
                                    typeInfo.map((item,index)=>{

                                                return(
                                                    <Option     key={index} value={ item['Id'] } >
                                                        { item['typeName'] }
                                                    </Option>
                                                )

                                        }
                                    )

                                }


                            </Select>
                        </Col>

                    </Row>

                    <br/>

                    <Row gutter={10} >

                        <Col span={12}>

                            <TextArea
                                value={articleContent}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                             />

                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML = {{__html:markdownContent}}
                            >

                            </div>

                        </Col>

                    </Row>

                </Col>

                <Col span={8}>

                    <Row>

                        <Col span={24}>
                            &nbsp;
                            &nbsp;
                            <DatePicker
                                onChange={(date,dateString)=>setShowDate(dateString)}
                                placeholder="发布日期"
                                size="large"
                            />

                            &nbsp;
                            &nbsp;
                            <Button  size="large">暂存文章</Button>&nbsp;

                            &nbsp;

                            <Button type="primary" size="large"  onClick={saveArticle}>发布文章</Button>

                            <br/>

                        </Col>



                        <Col span={24}>

                            <br/>
                            <TextArea
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                rows={4}
                                placeholder="文章简介"

                            />
                            <br/><br/>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML = {{__html: '文章简介:'+introducehtml}}
                            >

                            </div>



                        </Col>

                    </Row>


                </Col>

            </Row>
        </div>
    )
}

export default  AddArticle;