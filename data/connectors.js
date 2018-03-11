/*
* @Author: Shubham Bansal
* @Date:   2018-03-11 08:45:10
* @Last Modified by:   Shubham Bansal
* @Last Modified time: 2018-03-11 09:13:59
*/
import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import Mongoose from 'mongoose';
import fetch from 'node-fetch';


const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://localhost/views',  {
  useMongoClient: true
});

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('views', ViewSchema);

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

const FortuneCookie = {
  getOne() {
    return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
      .then(res => res.json())
      .then(res => {
        return res[0].fortune.message;
      });
  },
};

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);


// creating a mock data with the seed
// so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A Post written by ${author.firstName}`,
        text: casual.sentences(3),
      }).then((post) => {
        // creating some views mocks
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true });
      });
    });
  });
});

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post, View, FortuneCookie };
