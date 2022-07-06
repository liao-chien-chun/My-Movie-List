const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL =  BASE_URL + '/api/v1/movies'
const POSTER_URL = BASE_URL + '/posters/'

//存放電影資料
const movies = []










//取得電影資料
axios
  .get(INDEX_URL)
  .then(response => {
    //法一用迭代器for系列
    // for (const movie of response.data.results) {
    //   movies.push(movie)
    // }
    // console.log(movies.length) //測試看看數字是否正確

    //法二 展開運算子 spread opeartor
    movies.push(...response.data.results) 
    console.log(movies)

  })
  .catch(error => console.log(error))
