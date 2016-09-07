var animals = ['panda', 'monkey', 'fox', 'rabbit', 'cat', 'bird'];

for (var i = 0; i < animals.length; i++){

    var b = $('<button>') // create a button
    b.addClass('animals'); // add a class 
    b.attr('data-name', animals[i]); // add array indexes as a data-attribute
    b.text(animals[i]); // text on initial buttons
    $('#animalsButtons').append(b); // added button to the page
}