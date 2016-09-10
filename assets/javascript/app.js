var animals = ['panda', 'monkey', 'fox', 'rabbit', 'cat', 'bird'];


// ANIMAL BUTTONS AT THE TOP OF THE PAGE: for loop loops through my array to create buttons with text and attributes
for (var i = 0; i < animals.length; i++){

    var b = $('<button>') // create a button
    b.addClass('initialButtons'); // add a class 
    b.attr('data-animal', animals[i]); // add array indexes as a data-attribute
    b.text(animals[i]); // text on initial buttons
    $('#animalsButtons').append(b); // added button to the page
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

                var p = $('<p>').text("Rating: " + results[j].rating);

                var animalImage = $('<img>');
                animalImage.attr('src', results[j].images.fixed_height.url);

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $('#animals').prepend(animalDiv);
                
            }

        });
});