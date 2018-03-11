/*
* @Author: Shubham Bansal
* @Date:   2018-03-11 08:10:19
* @Last Modified by:   Shubham Bansal
* @Last Modified time: 2018-03-11 08:12:11
*/
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';

const typeDefs = `
  type Query {
    testString: String
  }
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

export default schema;
