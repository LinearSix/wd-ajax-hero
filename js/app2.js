console.log(`shit!`);
(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  console.log(window.location.search);
  let urlParams = new URLSearchParams(window.location.search);
  // console.log(urlParams.has('post')); // true
  // console.log(urlParams.get('action')); // "edit"
  // console.log(urlParams.getAll('action')); // ["edit"]
  // console.log(urlParams.toString()); // "?post=1234&action=edit"
  // console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1"

  let searchData = urlParams.get(`search`);
  console.log(searchData);
  let searchUrl = `https://omdb-api.now.sh/?s=${searchData}`;
  let data;
  let currentMovie = {};
  fetch(searchUrl)
      .then(response => response.json())
      .then( (data) => {
          
          console.log(data.Search.length);
          let results = data.Search;

          for (const result in results) {
            let currentMovie =
            {
              id: results[result].imdbID,
              poster: results[result].Poster,
              title: results[result].Title,
              year: results[result].Year
            };
            movies.push(currentMovie);
          };
          renderMovies();

  });
  
  // python -m SimpleHTTPServer
  renderMovies();

})();