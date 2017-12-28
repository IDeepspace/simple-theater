window.onload = function() {
  const id = parseInt(window.location.href.split('?')[1].split('=')[1]);
  axios.get(`http://localhost:3009/movies/${id}`).then((res) => {
    // console.log(res.data);
    document.getElementById('detail').innerHTML = res.data.movieName;
  }).catch(function(err) {
    console.log(err);
  });
};
