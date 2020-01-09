window.onload = function () {
  main.getData();
  main.deleteData();
  main.formToggle();
};

let main = {
  getData: function () {
    axios.get('http://localhost:3009/movies').then(function (res) {
      let movies = res.data;
      let str = '';
      movies.map((movie) => {
        str += `<div class="movie-box" data-movie=${movie.id}>
          <ul>
            <li>
              <img id="delete" data-id=${movie.id} class="delete-icon" src="./images/delete-2.png" alt="delete" />
            </li>
            <li>
              <a href="detail.html?id=${movie.id}"><img class="movie-img" data-key=${movie.id} src=${movie.imgUrl} alt="img"></a>
            </li>
            <li class="movie-name">电影名：<span>${movie.movieName}</span></li>
            <li class="movie-date">上映时间：<span>${movie.movieDate}</span></li>
          </ul>
        </div>`;
      });
      let mainWrap = document.getElementById('main-wrap');
      if (mainWrap) {
        mainWrap.innerHTML += str;
      }

    }).catch(function (err) {
      console.log(err);
    });
  },

  deleteData: function () {
    document.addEventListener('click', function (e) {
      let id;
      let flag = false;
      let classes = e.target.className.split(' ');
      if (classes) {
        for (let x = 0; x < classes.length; x++) {
          if (classes[x] === 'delete-icon') {
            id = e.target.getAttribute('data-id');
            flag = true;
          }
        }
      }
      if (flag) {
        axios.delete(`http://localhost:3009/movies/${id}`).then((res) => {
          let mainWrap = document.getElementById('main-wrap');
          let child = mainWrap.querySelector(`[data-movie='${id}']`);
          mainWrap.removeChild(child);
        }).catch(function (err) {
          console.log(err);
        });
      }
    }, false);
  },

  formToggle: function () {
    document.addEventListener('click', function (e) {
      e.stopPropagation();
      let flag = false;
      let classes = e.target.className.split(' ');
      if (classes) {
        for (let i = 0; i < classes.length; i++) {
          if (classes[i] == 'add-movie') {
            flag = true;
          }
        }
      }
      if (flag) {
        let sure = document.getElementById('sure');
        let cancel = document.getElementById('cancel');
        let modal = document.getElementById('modal');
        let close = document.getElementById('close');
        modal.style.display = 'block';
        sure.addEventListener('click', function (e) {
          e.stopImmediatePropagation();
          modal.style.display = 'none';
          // console.log("确定添加");
          main.addData();
        }, false);
        cancel.addEventListener('click', function (e) {
          e.stopImmediatePropagation();
          modal.style.display = 'none';
          main.doInputReset();
          // console.log("取消添加");
        }, false);
        close.addEventListener('click', function (e) {
          e.stopImmediatePropagation();
          modal.style.display = 'none';
          main.doInputReset();
          // console.log("关闭按钮");
        }, false);
      }
    }, false);
  },

  getDataFromForm: function () {
    let tagElements = document.getElementsByTagName('input');
    let movieData = {};
    for (let item of tagElements) {
      movieData[item.name] = item.value;
    }
    console.log(movieData);
    return movieData;
  },

  addData: function () {
    const data = main.getDataFromForm();

    // console.log(data);
    axios.post('http://localhost:3009/movies', data).then((res) => {
      // window.location.reload();
      let mainWrap = document.getElementById('main-wrap');
      mainWrap.innerHTML += `<div class="movie-box" data-movie=${data.id}>
          <ul>
            <li>
              <img id="delete" data-id=${data.id} class="delete-icon" src="./images/delete-2.png" alt="delete" />
            </li>
            <li>
              <a href="detail.html?id=${data.id}"><img class="movie-img" data-key=${data.id} src=${data.imgUrl} alt="img"></a>
            </li>
            <li class="movie-name">电影名：<span>${data.movieName}</span></li>
            <li class="movie-date">上映时间：<span>${data.movieDate}</span></li>
          </ul>
        </div>`;
    }).catch((e) => {
      console.log(e);
    });
  },

  doInputReset: function () {
    for (i = 0; i < document.getElementsByTagName('input').length; i++) {
      if (document.getElementsByTagName('input')[i].type == 'text') {
        document.getElementsByTagName('input')[i].value = '';
      }
    }
  }
};
