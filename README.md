# 検索エンジンを GraphQL で作ってみる

いまのところ、`.env`の`CRAWL_PATH`以下のファイルのみ（ただし起動時にスキャンするだけ）を検索できる仕様です。

でかい JSON とか yarn.lock みたいなファイルを食わせると、検索インデックス登録の負荷がめっちゃ重いことに注意。
tokenizerの問題か、そもそも自然言語を使うこと前提だからかは不明

## つかいかた

```sh
$ yarn
$ yarn gen
$ yarn start
```

## TODO

* esa とか DocBase とか slack とかその他の、一括データを登録できるようにする
* Git repository 履歴込みとか対応したいけど、いいデータ構造が？？
* 検索用 slack bot を作る
