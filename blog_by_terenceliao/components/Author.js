import{Avatar,Divider} from 'antd'
import '../static/style/components/author.css'

const Author = () =>{

    return (

        <div className="author-div comm-box">
            <div> <Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg"  /></div>
            <div className="author-introduction">
                一枚菜鸡程序猿,专注web和移动前端开发,爱健身、美食,玩魔术
                想有花不完的美元,想走遍全世界每一个角落,想有个金发蓝(绿)瞳孔长腿欧美女友。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />

            </div>
        </div>
    )


}

export default Author;