require('dotenv').config({path :'../.env'});
const mongoose = require('mongoose');
const {MONGODB_URI} = process.env;

mongoose.connect(MONGODB_URI).catch(err => console.log(err));

const ratingSchema = new mongoose.Schema({ date : 'string', ratings : [],});

//DB에 저장
ratingSchema.statics.create = function (payload) {
  const todo = new this(payload);
  return todo.save();
};
//전부 가져오기
ratingSchema.statics.findAll = function () {
  return this.find({});
};
//id로 가져오기
ratingSchema.statics.findOneByID = function (id) {
  return this.findOne({ id });
};
//모델로 내보내기
module.exports = mongoose.model('Schema', ratingSchema);