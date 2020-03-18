import { fetchFiles } from './files'
import { SearchEngine } from '.'

export const crawler = async (searchEngine: SearchEngine) => {
  const basePath = process.env.CRAWL_PATH
  console.log('crawler', basePath)
  if (basePath) {
    await fetchFiles(searchEngine, basePath)
  }
}
