require('dotenv').config()

import fs from 'fs'
import path from 'path'

import { ApolloServer } from 'apollo-server'

import { resolvers } from './resolvers'
import { DataSources } from './context'
import { SearchBackend } from './datasources/search'
import { createSearchEngine } from './search-engine'
import { crawler } from './search-engine/crawler'

const _DEV = process.env.NODE_ENV !== 'production'
const playground = _DEV
const introspection = _DEV

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), {
  encoding: 'utf-8',
})

const boot = async () => {
  const searchEngine = await createSearchEngine()
  const dataSources = (): DataSources => ({
    searchBackend: new SearchBackend(searchEngine),
  })
  await crawler(searchEngine)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: () => {
      return {
        basePath: '.',
      }
    },
    playground,
    introspection,
  })

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 app running at ${url}`)
  })
}

boot()
