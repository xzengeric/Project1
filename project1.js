$(document).ready(function () {
    $('nav').hide();
    var app_id = "98b05697";
    var app_key = "66b497d1c74de44a3ee14c66199e0618";

    // Added a specific id for the button to attach the handler
    $("#submitButton").click(function () {
        // alert("it is running the click handler inside ready function");
        $('h1').hide();
        $('.input').hide();
        // Removing the "hide", so the search area can still be reused with reloading the page
        //$('h1').hide();
        //$('div').hide();
        var q = $('.ing').val();
        console.log(q);
        var calFrom = $('.col-from').val();
        var calTo = $('.col-to').val();
        var allRecipes = $('.recipe0, .recipe1, .recipe2, .recipe3, .recipe4');
        // Added this check because if the user doesn't
        // enter, the API will fail (no calories in URL will fail)
        if (calFrom != "" && calTo != "") {
            var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}`;
        } else {
            var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}`;
        }

        getData(recipeUrl);
        // for the other button that will check the nutritional value, use this URL
        // recipeUrl = 'https://api.edamam.com/api/food-database/parser?ingr=${q}&app_id={app_id}&app_key={app_key}'
        function getData() {
            fetch(recipeUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (recipesData) {
                    console.log(recipesData);
                    var receipesDataBasedOnInput = recipesData.hits;
                    for (var i = 0; i < 5; i++) {

                        var newDiv = $('<div>').attr('class', 'recipe' + i);
                        var title = $('<h2>').text(receipesDataBasedOnInput[i].recipe.label);
                        var img = $('<img>').attr('src', receipesDataBasedOnInput[i].recipe.image).attr('href', receipesDataBasedOnInput[i].recipe.url).attr('width', '300px').attr('height', '300px');
                        var link = $('<a>').attr('href', receipesDataBasedOnInput[i].recipe.url);
                        var linkText = $('<p>').text('Click Img link to the whole recipe!').css('color', 'grey');
                        var calories = receipesDataBasedOnInput[i].recipe.calories;
                        var serving = receipesDataBasedOnInput[i].recipe.yield;
                        var calRange = calories / serving;
                        var caloriesPerServing = $('<li>').text("Total Calories: " + calRange.toFixed(2) + " Kcal");
                        var dietLabels = $('<li>').text("Diet Labels: " + receipesDataBasedOnInput[i].recipe.dietLabels);
                        newDiv.append(title);

                        var div = $('<ul>').attr('class', 'ingredients' + i);
                        for (var j = 0; j < receipesDataBasedOnInput[i].recipe.ingredients.length; j++) {
                            var ingredients = receipesDataBasedOnInput[i].recipe.ingredientLines[j];
                            var li = $('<li>').text(ingredients);
                            div.append(li);
                        }

                        newDiv.append(dietLabels);
                        newDiv.append($('<br>'));
                        newDiv.append(caloriesPerServing);
                        newDiv.append($('<br>'));
                        newDiv.append(link);
                        link.append(img);
                        newDiv.append($('<br>'));
                        newDiv.append(linkText);
                        newDiv.append($('<br>'));
                        newDiv.append(div);

                        $('body').append(newDiv);
                        if ($(window).width() <= 860) {
                            div.css('position', 'absolute').css('right', '3px');
                        }

                    }

                })

        }
        $('nav').show();
        $('#nav1').click(function () {
            location.reload();
        })

        $('#nav2').click(function () {
            $('div').remove();
            var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&health=peanut-free`
            getData(recipeUrl);
        })
        $('#nav3').click(function () {
            $('div').remove();
            var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&health=tree-nut-free`
            getData(recipeUrl);

        })
        $('#nav4').click(function () {
            $('div').remove();
            var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&health=alcoho-free`
            getData(recipeUrl);

        })
    })
})