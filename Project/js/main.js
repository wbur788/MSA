
var title;
var year;
$('button').click(function() {
  //Gets the title and year that the user inputs into the text boxes
  title = $("#movieName").val(); 
  year = $("#movieYear").val();   

  //hides the textboxes and the button and show the title
  $("#button").hide();
  $("#inputBoxes").hide();
  

  //Starts api request after submitting information
  $.ajax({
    type: 'GET',
    url: "http://www.omdbapi.com/?t=" + title + "&y=" + year + "&plot=short&r=json", //url of the GET request
    success: function(data) {
      if (data.Response == "False"){ //Displays an error message, if no such movie was found and allows user to try again.
        $("#app-name").text("Whoops! No such movie found. Please try again.");
        $("#button").show(); 
        $("#inputBoxes").show();
        title = $("#movieName").val(); 
        year = $("#movieYear").val();    
      } 
        //Displays the movie title and a short plot summary.
        $("#page-header").text(data.Plot);
        $("#app-name").text(data.Title);

        //If the movie has a poster, then it will be displayed.
        if (data.Poster != null){
          moviePoster = data.Poster; 
          var img = document.createElement("img");
          img.id = "poster";
          img.src = moviePoster;
          img.align = "left";
          var src = document.getElementById("page-container");
          src.appendChild(img);
        }
       
    },
    error: function() {
        alert("Oops. Something went wrong!");
    }
  });
    
});
