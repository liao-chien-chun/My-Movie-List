const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL =  BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

//存放電影資料
const movies = []

//選出節點
const dataPanel = document.querySelector('#data-panel')

//渲染電影清單
function renderMovieList(data) {
  let rawhtml = ''
  movies.forEach(item => {
    //title, image, id 
    rawhtml += `
      <div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img 
              src="${POSTER_URL + item.image}"
              alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button 
                class="btn btn-primary btn-show-movie"
                data-bs-toggle="modal"
                data-bs-target="#movie"
                data-id="${item.id}"
                >More</button>
              <button class="btn btn-info btn-add-favorite">+</button>
            </div>
          </div>
        </div>
      </div>`
  });
  dataPanel.innerHTML = rawhtml
}

//function showmodal
function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')

  axios
    .get(INDEX_URL + id)
    .then(response => {
      const data = response.data.results
      console.log(data)
      modalTitle.innerText = data.title
      modalDate.innerText = 'Release date: ' + data.release_date
      modalDescription.innerText = data.description
      modalImage.innerHTML = `<img src="${POSTER_URL + data.image
        }" alt="movie-poster" class="img-fluid">` 
    })

}

//show modal監聽器
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  }
})

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
  })
  .catch(error => console.log(error))
