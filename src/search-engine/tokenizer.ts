import kuromoji from 'kuromoji'

export const createTokenizer = () => {
  return new Promise<(s: string) => string[]>((resolve, reject) => {
    kuromoji
      .builder({
        dicPath: './node_modules/kuromoji/dict',
      })
      .build((err, tokenizer) => {
        if (err) {
          reject(err)
        } else {
          resolve(s => {
            const tokenized = tokenizer.tokenize(s)
            return tokenized.map(token => {
              return token.surface_form
            })
          })
        }
      })
  })
}
