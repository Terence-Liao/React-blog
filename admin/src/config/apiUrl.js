let ipUrl = 'http://127.0.0.1:7001/admin/'


let servicePath = {
    checkLogin: ipUrl + 'checkLogin',  //  首页文章列表接口
    getTypeinfo: ipUrl + 'getTypeinfo',  //   article's information for require
    addArticle: ipUrl + 'addArticle',
    updateArticle: ipUrl + 'updateArticle',
    getArticleList: ipUrl + 'getArticleList',
    delArticle: ipUrl + 'delArticle',
    getArticleById: ipUrl + 'getArticleById/'
}

export default servicePath;