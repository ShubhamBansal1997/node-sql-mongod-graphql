/*
* @Author: Shubham Bansal
* @Date:   2018-03-11 08:12:22
* @Last Modified by:   Shubham Bansal
* @Last Modified time: 2018-03-11 08:39:32
*/
import casual from 'casual';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    author: (root, args) => {
      return { firstName: args.firstName, lastName: args.lastName };
    },
  }),
  Author: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ title: casual.title, text: casual.sentences(3) }),
};

export default mocks;
