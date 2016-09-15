var title;
var year;
$('#page-container').hide();
$('#movieInfoBox').hide();
$('#inputDiv').hide();
$(".fb-share-button").hide();
$('#startMessage').css({"top": 60, "font-size": 30});


$('#initial').click(function(){
  $('#initial').fadeOut();
  $('#page-container').fadeIn(3800);
  $('#inputDiv').fadeIn(3800);
});

$('#button').click(function() {
  //Gets the title and year that the user inputs into the text boxes
  title = $("#movieName").val(); 
  year = $("#movieYear").val();   
  getMovie(title, year);
  //hides the textboxes and the button and show the title
  $("#inputDiv").hide();
  $("#app-name").hide();
  

//Starts api request after submitting information
function getMovie(title,year){
  $.ajax({
    type: 'GET',
    url: "http://www.omdbapi.com/?t=" + title + "&y=" + year + "&plot=short&r=json", //url of the GET request
    success: function(data) {
      if (data.Response == "False"){ //Displays an error message, if no such movie was found and allows user to try again.
        $(".board").hide();
        $("#app-name").show();
        $("#app-name").text("Whoops! No such movie found. Please try again.");
        $("#inputDiv").show();
        title = $("#movieName").val(); 
        year = $("#movieYear").val();    
      } else {
        //Displays the movie title, a short plot summary and relevant info.
        $("#app-name").show();
        $(".board").hide();
        $("#page-header").text(data.Plot);
        $('#movieInfoBox').show();
        $("#app-name").text(data.Title);
        $("#ratingNo").append(data.imdbRating);
        $("#yearReleased").append(data.Year);
        $("#dateReleased").append(data.Released);
        $("#genre").append(data.Genre);
        $("#directors").append(data.Director);
        $("#actors").append(data.Actors + "...");
        $("#awards").append(data.Awards);
        $(".fb-share-button").show();
        $("#stars").removeClass();
        
        starRating = data.imdbRating / 2;
        starRating = Math.round(starRating*2)/2;
        console.log(starRating);
        switch(starRating) {
          case 0.5:
              $("#stars").addClass("stars-container stars-10");
              break;
          case 1:
              $("#stars").addClass("stars-container stars-20");
              break;
          case 1.5:
            $("#stars").addClass("stars-container stars-30");
              break;
          case 2:
            $("#stars").addClass("stars-container stars-40");
              break;
          case 2.5:
            $("#stars").addClass("stars-container stars-50");
             break;
          case 3:
            $("#stars").addClass("stars-container stars-60");
              break;
          case 3.5:
            $("#stars").addClass("stars-container stars-70");
              break;
          case 4:
            $("#stars").addClass("stars-container stars-80");
              break;
          case 4.5:
            $("#stars").addClass("stars-container stars-90");
              break;
          case 5:
            $("#stars").addClass("stars-container stars-100");
              break;
          default:
              $("#stars").addClass("stars-container stars-0");
      };
              

        //If the movie has a poster, then it will be displayed.
        if (data.Poster != null){
          moviePoster = data.Poster; 
          var img = document.createElement("img");
          img.id = "poster";
          img.src = moviePoster;
          img.align = "left";
          var src = document.getElementById("page-container");
          src.appendChild(img);
        };
      }; 
    },
    //Error handling for the AJAX request
    error: function() {
        alert("Oops. Something went wrong!");
    }
  });
}

});

