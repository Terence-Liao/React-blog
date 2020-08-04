module.exports = app =>{
    const {router,controller} = app
   //router.get('/default/index',controller.default.home.index);
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    router.get('/default/getArticleId/:id',controller.default.home.getArticleId)
    router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
    router.get('/default/getListId/:id',controller.default.home.getListId)
}