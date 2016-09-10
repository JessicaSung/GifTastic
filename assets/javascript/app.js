// My topics array
var topics = ['panda', 'monkey', 'fox', 'rabbit', 'cat', 'bird'];


renderButtons();


// Turns user input textbox into a button    LogMovieName
$(document).on('click', '#addAnimal', function(){

    // Clear the div so that you don't have duplicate buttons
    $('#animalsButtons').empty();

    // This line of code will grab the input from the textbox
    var animalInput = $('#animal-input').val().trim();

    // The animal from the textbox is then added to my array
    topics.push(animalInput);
    
    // Clicking animal buttons displays ratings and gifs
    renderButtons();

    // User can hit "enter" instead of clicking on the button and it won't move to the next page
    return false;
});


// ANIMAL BUTTONS AT THE TOP OF THE PAGE: for loop loops through my array to create buttons with text and attributes
function renderButtons(){ 
    for (var i = 0; i < topics.length; i++){

        var b = $('<button>') // create a button
        b.addClass('initialButtons btn-primary'); // add a class 
        b.attr('data-animal', topics[i]); // add array indexes as a data-attribute
        b.text(topics[i]); // text on initial buttons
        $('#animalsButtons').append(b); // added button to the page
    }
}


// Rating and Image output
$(document).on('click', '.initialButtons', function() {

    $('#animals').empty(); // clears the div so with each click search, new results are generated.

    var animal = $(this).data('animal');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            

            console.log(queryURL);

            console.log(response);

            // in the response, the first object is an array called data, so all the queries will start with response.data (name this results to shorten the text) ButtonTriggeredAJAX
 
            var results = response.data;


            for (var j = 0; j < results.length; j++) {

                var animalDiv = $('<div>');
                animalDiv.addClass('col-md-4');

                var p = $('<p>').text("Rating: " + results[j].rating);

                var animalImage = $('<img>');
                animalImage.attr('src', results[j].images.fixed_width_still.url);
                animalImage.attr('data-still', results[j].images.fixed_width_still.url);
                animalImage.attr('data-animate', results[j].images.fixed_width.url);
                animalImage.attr('data-state', 'still');
                animalImage.addClass('animalImage');


                animalDiv.append(animalImage);
                animalDiv.append(p);
                

                $('#animals').prepend(animalDiv);        
            
            }

            
        });
});


// Changes the state of the gif image based on its current state
$(document).on('click', '.animalImage', function(){
    var state = $(this).attr('data-state');

    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }
    else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});