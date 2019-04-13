var buttonsArea= $("#buttonsArea"),
    gifsArea= $("#gifsArea"),
    submit= $("#submit"),
    array=["Taco", "Cheeseburger", "Ice Cream", "Hot Dog", "Pizza", "Fries", "Peanut Butter", "Turkey"]


$(document).ready(function(){

var showButtons= function(){
  for (var i=0; i < array.length; i ++){
    var newButton= $("<button>").attr("data-food", array[i])
    newButton.text(array[i])
    buttonsArea.append(newButton)
}
}

showButtons()


submit.on("click", function(){
    event.preventDefault()
    buttonsArea.empty()

    var userChoice= $("#userChoice").val()
    array.push(userChoice)


   $("#userChoice").val("")

   showButtons()

})


$("button").on("click",function(){
    var food= $(this).data("food")

    var queryURL= "https://api.giphy.com/v1/gifs/search?api_key=xfOXGaT5zSiJEMcIqabs4Iy7ccrIigZd&q=" + food + "&limit=10&offset=0&lang=en"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
         console.log(response)

         for (var i=0; i < response.data.length; i++){
             var newP= $("<p>").text("Rated: " + response.data[i].rating)

             var newImg= $('<img>').attr("src", response.data[i].images.fixed_height.url)




             gifsArea.append(newP)
             gifsArea.append(newImg)
         }

    })








})























})
