title = prompt("Enter a movie title: ").toLowerCase();
year = prompt("If known enter the movie year: ");

$.ajax({
  type: 'GET',
  url: "http://www.omdbapi.com/?t=" + title + "&y=" + year + "&plot=short&r=json", //url of the GET request
  success: function(data) {
    moviePoster = data.Poster; //
    var img = document.createElement("img");
    img.src = moviePoster;

    var src = document.getElementById("page-header");
    src.appendChild(img);
  }
});

$(document).ready(function() {
  
    
});