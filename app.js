const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL =  BASE_URL + '/api/v1/movies'
const POSTER_URL = BASE_URL + '/posters/'

//存放電影資料
const movies = []

//選出節點
const dataPanel = document.querySelector('#data-panel')

//渲染電影清單
function renderMovieList(movies) {
  let rawhtml = ''
  movies.forEach(movie => {
    rawhtml += `
      <div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img 
              src="${POSTER_URL + movie.image}"
              alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
            </div>
            <div class="card-footer">
              <button 
                class="btn btn-primary btn-show-movie"
                data-bs-toggle="modal"
                data-bs-target="#movie">More</button>
              <button class="btn btn-info btn-add-favorite">+</button>
            </div>
          </div>
        </div>
      </div>`
  });
  dataPanel.innerHTML = rawhtml
}


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
    renderMovieList(movies)
    console.log(movies)
  })
  .catch(error => console.log(error))
