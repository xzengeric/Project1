$(document).ready(function () {

    var app_id = "98b05697";
    var app_key = "66b497d1c74de44a3ee14c66199e0618";
    var q;

    $('button').click(function () {
        q = $('input').val();
        var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}`;
        fetch(recipeUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (recipesData) {
                console.log(recipesData);
                var receipesDataBasedOnInput = recipesData.hits;
                for (var i = 0; i < 6; i++){
                    var newDiv = $('<div>').attr('class', 'recipe' + i);
                    var title = $('<h2>').text(receipesDataBasedOnInput[i].recipe.label);
                    var img = $('<img>').attr('src', receipesDataBasedOnInput[i].recipe.image).attr('width', '300px').attr('height', '300px');
                    var link = $('<a>').attr('href', receipesDataBasedOnInput[i].recipe.url).text('link to this recipe');
                    var calories = $('<p>').text("Calories: " + receipesDataBasedOnInput[i].recipe.calories + " Kcal");
                    var dietLabels = $('<p>').text(receipesDataBasedOnInput[i].recipe.dietLabels);
                    var healthLabels = $('<p>').text(receipesDataBasedOnInput[i].recipe.healthLabels);
                    console.log(receipesDataBasedOnInput[i].recipe.ingredients.length);
                    newDiv.append(title);
                    var div = $('<div>').attr('class', 'ingredients');
                    for (var j = 0; j < receipesDataBasedOnInput[j].recipe.ingredients.length; j++){
                        var ingredients = receipesDataBasedOnInput[j].recipe.ingredientLines[j];
                        var li = $('<li>').text(ingredients);
                        div.append(li);
                    }
                    newDiv.append(dietLabels);
                    newDiv.append(healthLabels);
                    newDiv.append(calories);
                    newDiv.append(img);
                    newDiv.append(link);
                    $('body').append(newDiv);
                    $('body').append(div);
                }

            })
    })
})
