import { QueryResolvers, MutationResolvers } from './generated/graphql'

const search: QueryResolvers['search'] = async (
  _,
  { words },
  { dataSources },
) => {
  return dataSources.searchBackend.search(words)
}

const add: MutationResolvers['add'] = async (
  _,
  { title, content, uri, type },
  { dataSources },
) => {
  return dataSources.searchBackend.add({ title: title!, content, uri, type })
}

export const resolvers = {
  Query: {
    search,
  },
  Mutation: {
    add,
  },
}
