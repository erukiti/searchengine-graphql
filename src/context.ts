import { SearchBackend } from './datasources/search'

export type DataSources = {
  searchBackend: SearchBackend
}

export type Context = {
  dataSources: DataSources

  basePath: string
}
