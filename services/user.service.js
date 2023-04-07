const getConnection = require('../libs/postgres')
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class UserService {

  constructor(){
    this.user = []
  }

  async get(){
    const con = await getConnection()
    const res = await con.query('select * from users')
    return res.rows;
  }

  async getOne(id){
    const con = await getConnection()
    const res = await con.query(`select * from users where id=${id}`)
    return res.rows;
  }

  async create(data){
    const con = await getConnection()
    const res = await con.query(`insert into users (name,lastname) values ('${data.name}','${data.lastname}')`)
    return res.rows;
  }

  update(){

  }

  delete(){

  }

}


module.exports = UserService;
