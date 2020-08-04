let ipUrl = 'http://127.0.0.1:7001/default/'
//let ipUrl = 'http://192.168.0.105:7001/default/'

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleId:ipUrl + 'getArticleId/',  // 文章详细页内容接口 ,需要接收参数//article Detailed relate req
    getTypeInfo:ipUrl + 'getTypeInfo',         // 文章分类信息
    getListId:ipUrl + 'getListId/',         // 根据类别ID获得文章列表  index's rightNav reqData
    getAllPartCount:ipUrl + 'getAllPartCount',         // 获得所有集数和访问数
    getListBBD:ipUrl + 'getListBBD',         // 大胖逼逼叨的列表

}

export default servicePath;