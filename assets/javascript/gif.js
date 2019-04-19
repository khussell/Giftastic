
//starting with my variables that store display areas, submit button, and array of my favorite foods
var buttonsArea= $("#buttonsArea"),
    gifsArea= $("#gifsArea"),
    submit= $("#submit"),
    array=["Taco","Cookie", "Burrito", "Cheeseburger", "Spaghetti", "Donuts","Ice Cream", "Hot Dog", "Pizza", "Fries","Pancake", "Muffin", "Peanut Butter", "Turkey", "Bacon", "Cheetos", "Carrots"]


//starting it out
$(document).ready(function(){





//this variable stores a function that will loop through my array of foods an display a button on
//the screen for each of them    
var showButtons= function(){
  for (var i=0; i < array.length; i ++){
    //creating a newDiv that will soon hold the newButton and favoriteButton, class given and a data attribute that holds what food 
    //the button is associated with
    var newDiv= $("<div>").addClass("buttonDiv")
                          .attr("data-food", array[i])
    var newButton= $("<button>").attr("data-food", array[i])
    newButton.text(array[i])
    


    var favoriteButton=$("<button>").attr("id", "favorite")
                                    //data-food same as newButton food to pair the two buttons together
                                    .attr("data-food", array[i])
                                    .html("&#10003;")
                                    //data-check given for only buttons with check marks 
                                    .attr("data-check", "yes")
    

    //appending buttons to newDiv that has same food data attribute
    newDiv.append(newButton)
          .append(favoriteButton)
    
    //appending newDiv with buttons to the buttons display area
    buttonsArea.append(newDiv)
}
}

//call function to show buttons to screen
showButtons()






//when submit button is clicked, clear buttons area and grab the input value and store as userChoice
//add userChoice to the array
//make input box empty
//call function to show buttons (new button will be shown)
submit.on("click", function(){
    event.preventDefault()
    buttonsArea.empty()

    var userChoice= $("#userChoice").val()
    array.unshift(userChoice)


   $("#userChoice").val("")

   showButtons()

})






//when buttonsArea is clicked and it is a button
//variable hasCheck created to store if button data check is yes or no
$("#buttonsArea").on("click", "button",function(){
    var hasCheck= $(this).data("check")


    //if button pressed hasCheck is NOT yes, meaning that the button pressed is not one of the favorite (check mark)buttons
    //then a gif will show in the gifs area
    if(hasCheck !== "yes"){

    //storing buttons food data as food to be placed in queryURL for API search
    var food= $(this).data("food")

    //query URL to get access to API w/ search of food, limit of 10, api key
    var queryURL= "https://api.giphy.com/v1/gifs/search?api_key=xfOXGaT5zSiJEMcIqabs4Iy7ccrIigZd&q=" + food + "&limit=10&offset=0&lang=en"


    //getting ajax involved to obtain a response using queryURL and GET method to get info from database
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
         console.log(response)


         // for every position in the response array a new paragraph will be made and a new image will be made 
         // they will then be appended to the screen
         for (var i=0; i < response.data.length; i++){

            //new paragraph created with the text of the response position rating
             var newP= $("<p>").text("Rated: " + response.data[i].rating)
             //new paragraph given an id for styling
             newP.attr("id", "rating")
             

             //creating a newImage and storing it in newImg
             //newImg will have a source equal to gif's still image
             //attributes that will hold path to animated and still images
             //attribute that will hold data-state as still, later to be changed when animated
             //id gif given for styling and to grab when clicked later
             var newImg= $('<img>').attr("src", response.data[i].images.fixed_height_small_still.url)
                                   .attr("data-state", "still")
                                   .attr("data-still", response.data[i].images.fixed_height_small_still.url)
                                   .attr("data-animate", response.data[i].images.fixed_height_small.url)
                                   .attr("id", "gif")

            //display gifs and gif rating to screen
             gifsArea.prepend(newP)
             gifsArea.prepend(newImg)        
    
         }  
    
      }) 
   
    }

})



//on click of gifs area if it is a gif that was clicked
//state will store info on the gifs data-state  
$("#gifsArea").on("click", "#gif", function(){
    var state= $(this).attr("data-state")

    //if gif is clicked and it is still it will be changed to animate and so will its state
   if( state === "still"){
        $(this).attr("src", $(this).attr("data-animate")) //changing src of gif image to url info for animate
        $(this).attr("data-state", "animate")

   } 
   //if gif is clicked and it is animated then it will be changed to still and the state will be changed to still
     else if ( state === "animate"){
        $(this).attr("src", $(this).attr("data-still")) //data-still contains url info for still image
        $(this).attr("data-state", "still")
   }

})  





//when buttons area is clicked and it is a button with an id of favorite
//the buttons food data will be stored in current

$("#buttonsArea").on("click", "#favorite", function(){
   var current= $(this).data("food")
   $(this).html("-")
   var pairedButton= $('[data-food="'+ current +'"]')

  $("#favoritesArea").append(pairedButton)

      


})


$("#favoritesArea").on("click", "#favorite", function(){
    var current= $(this).data("food")
    $(this).html("&#10003;")
   var pairedButton= $('[data-food="'+ current +'"]')

  $("#buttonsArea").append(pairedButton)
                   
})







$("#favoritesArea").on("click", "button",function(){
    var hasCheck= $(this).data("check")

    if(hasCheck !== "yes"){
    var food= $(this).data("food")

    var queryURL= "https://api.giphy.com/v1/gifs/search?api_key=xfOXGaT5zSiJEMcIqabs4Iy7ccrIigZd&q=" + food + "&limit=5&offset=0&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
         console.log(response)

         for (var i=0; i < response.data.length; i++){
             var newP= $("<p>").text("Rated: " + response.data[i].rating)
             newP.attr("id", "rating")

             var newImg= $('<img>').attr("src", response.data[i].images.fixed_height_small_still.url)
                                   .attr("data-state", "still")
                                   .attr("data-still", response.data[i].images.fixed_height_small_still.url)
                                   .attr("data-animate", response.data[i].images.fixed_height_small.url)
                                   .attr("id", "gif")





       //trying one click download                            
       //      var newDownloadButton= $("<a download>").attr("id", "downloadButton")  
        //                              .attr("href", "/media/lUnbg5saTIVjO/100.gif")
                                     
                                     
       //                              .text("Download!")   

       //     gifsArea.prepend(newDownloadButton)
             gifsArea.prepend(newP)
             gifsArea.prepend(newImg)



                 
    
         }  
         
   
    
      }) 
      
      


   
    }

})
























})
