import express from "express";
import graphqlHTTP from "express-graphql";
import {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList
} from "graphql";
import redis from "redis";

import loadGames from "../src/Server/loadGames";

const app = express();
const redisClient = redis.createClient();
const { promisify } = require("util");
const redisClientGet = promisify(redisClient.get).bind(redisClient);
const redisClientSet = promisify(redisClient.set).bind(redisClient);

function loggingMiddleware(req, res, next) {
  console.log("ip:", req.ip);
  next();
}
app.use(loggingMiddleware);

const RatingsType = new GraphQLObjectType({
  name: "GameRatings",
  fields: {
    average: { type: GraphQLFloat },
    bayesaverage: { type: GraphQLFloat },
    stddev: { type: GraphQLFloat }
  }
});

const StatsType = new GraphQLObjectType({
  name: "GameStats",
  fields: {
    _minplayers: { type: GraphQLInt },
    _maxplayers: { type: GraphQLInt },
    _minplaytime: { type: GraphQLInt },
    _maxplaytime: { type: GraphQLInt },
    rating: { type: RatingsType }
  }
});

const StatusType = new GraphQLObjectType({
  name: "GameStatus",
  fields: {
    _own: { type: GraphQLBoolean },
    _wanttoplay: { type: GraphQLBoolean },
    _wanttobuy: { type: GraphQLBoolean }
  }
});

const GameType = new GraphQLObjectType({
  name: "Game",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    _objectid: { type: GraphQLInt },
    thumbnail: { type: GraphQLString },
    yearpublished: { type: GraphQLInt },
    numplays: { type: GraphQLInt },
    stats: { type: StatsType },
    status: { type: StatusType }
  }
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    games: {
      type: GraphQLList(GameType),
      args: {
        username: { type: GraphQLString }
      },
      resolve: async (_, { username }) => {
        const gamesFromRedis = await redisClientGet(`bgg-${username}`);
        if (gamesFromRedis) {
          console.log(`Source: Redis`);
          return JSON.parse(gamesFromRedis);
        }
        const games = (await loadGames(username)).map(g => ({
          ...g,
          id: g._objectid
        }));

        await redisClientSet(`bgg-${username}`, JSON.stringify(games));
        return games ? games : [];
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: QueryType
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
