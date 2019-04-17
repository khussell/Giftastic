var buttonsArea= $("#buttonsArea"),
    gifsArea= $("#gifsArea"),
    submit= $("#submit"),
    array=["Taco","Cookie", "Burrito", "Cheeseburger", "Spaghetti", "Donuts","Ice Cream", "Hot Dog", "Pizza", "Fries","Pancake", "Muffin", "Peanut Butter", "Turkey", "Bacon", "Cheetos", "Carrots"]


$(document).ready(function(){

var showButtons= function(){
  for (var i=0; i < array.length; i ++){
    var newDiv= $("<div>").addClass("buttonDiv")
                          .attr("data-food", array[i])
    var newButton= $("<button>").attr("data-food", array[i])
    newButton.text(array[i])
    


    var buttonOnButton=$("<button>").attr("id", "favorite")
                                    .attr("data-food", array[i])
                                    .html("&#10003;")
                                    .attr("data-check", "yes")
    


    newDiv.append(newButton)
          .append(buttonOnButton)
    
    buttonsArea.append(newDiv)
}
}

showButtons()


submit.on("click", function(){
    event.preventDefault()
    buttonsArea.empty()

    var userChoice= $("#userChoice").val()
    array.unshift(userChoice)


   $("#userChoice").val("")

   showButtons()

})


$("#buttonsArea").on("click", "button",function(){
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



   
$("#gifsArea").on("click", "#gif", function(){
    var state= $(this).attr("data-state")

   if( state === "still"){
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")

   } 
     else if ( state === "animate"){
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
   }

})  




$("#buttonsArea").on("click", "#favorite", function(){
   var current= $(this).data("food")
   var unFavorite= $(this).html("-")
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
