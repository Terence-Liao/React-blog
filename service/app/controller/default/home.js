'use strict';

const Controller = require('egg').Controller;


//front'service Api
class HomeController extends Controller {

   async getArticleId(){

      let id = this.ctx.params.id

      let sql = 'SELECT article.id as id,'+
          'article.title as title,'+
          'article.introduce as introduce,'+
          'article.article_content as articleTxt,'+
          "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
          'article.view_count as view_count ,'+
          'type.typeName as typeName ,'+
          'type.id as typeId '+
          'FROM article LEFT JOIN type ON article.type_id = type.Id '+
          'WHERE article.id='+id



      const result = await this.app.mysql.query(sql);


      this.ctx.body={
         data:result
      }

   }

   async getArticleList(){
      let sql = 'SELECT article.Id as id,' +
          'article.title as title,' +
          'article.introduce as introduce,' +
          'article.article_content as articleTxt,' +
          "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
          'article.view_count as view_count,' +
          'type.typeName as typeName ' +
          'FROM article LEFT JOIN type ON article.type_id = type.Id';

      const results = await this.app.mysql.query(sql);

      this.ctx.body={
         data:results
      }
   }

   async getTypeInfo(){
      const result = await this.app.mysql.select('type')
      this.ctx.body = {data: result}
   }

   async getListId(){

      let id = this.ctx.params.id

      let sql = 'SELECT article.id as id,'+
          'article.title as title,'+
          'article.introduce as introduce,'+
          'article.article_content as articleTxt,' +
          "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
          'article.view_count as view_count ,'+
          'type.typeName as typeName '+
          'FROM article LEFT JOIN type ON article.type_id = type.Id '+
          'WHERE type_id='+id

            const result = await this.app.mysql.query(sql)
            this.ctx.body={data:result}
   }

}

module.exports = HomeController;
