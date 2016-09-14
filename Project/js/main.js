var title;
var year;
$('#page-container').hide();
$('#movieInfoBox').hide();
$('#inputDiv').hide();
$("#searchAgain").hide();
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
  

//Starts api request after submitting information
function getMovie(title,year){
  $.ajax({
    type: 'GET',
    url: "http://www.omdbapi.com/?t=" + title + "&y=" + year + "&plot=short&r=json", //url of the GET request
    success: function(data) {
      if (data.Response == "False"){ //Displays an error message, if no such movie was found and allows user to try again.
        $("#app-name").text("Whoops! No such movie found. Please try again.");
        $("#inputDiv").show();
        title = $("#movieName").val(); 
        year = $("#movieYear").val();    
      } else {
        //Displays the movie title and a short plot summary.
        $("#page-header").text(data.Plot);
        $('#movieInfoBox').show();
        $("#app-name").text(data.Title);
        $("#searchAgain").show();

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

$('#searchAgain').click(function(){
  $('#page-container').hide();
  $("#inputDiv").show();  
});    

