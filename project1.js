$(document).ready(function () {
    $('nav').hide();
    var app_id = "98b05697";
    var app_key = "66b497d1c74de44a3ee14c66199e0618";

    $("#submitButton").click(function () {
        $('h1').hide();
        $('.input').hide();
        var q = $('.ing').val();
        var calFrom = $('.col-from').val();
        var calTo = $('.col-to').val();
        var foodType = $('.food-type').val();

        if (calFrom != "" && calTo != "") {
            if (foodType != "") {
                var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}&cuisinetype=${foodType}`;
            }
            else {
                var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}`;

            }
        } else {

            if (foodType != "") {
                var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&cuisinetype=${foodType}`;
            }
            else {
                var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}`;
            }

        }
    
        getData(recipeUrl);
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
                        var caloriesPerServing = $('<h4>').text("Total Calories: " + calRange.toFixed(2) + " Kcal");
                        var dietLabels = $('<h4>').text("Diet Labels: " + receipesDataBasedOnInput[i].recipe.dietLabels);


                        var div = $('<ul>').attr('class', 'ingredients' + i);
                        for (var j = 0; j < receipesDataBasedOnInput[i].recipe.ingredients.length; j++) {
                            var ingredients = receipesDataBasedOnInput[i].recipe.ingredientLines[j];
                            var li = $('<li>').text(ingredients);
                            div.append(li);
                        }

                        newDiv.append(title);
                        newDiv.append(dietLabels);
                        newDiv.append(caloriesPerServing);
                        newDiv.append($('<br>'));
                        newDiv.append(link);
                        link.append(img);
                        newDiv.append($('<br>'));
                        newDiv.append(linkText);
                        newDiv.append($('<br>'));
                        newDiv.append(div);
                        $('body').append(newDiv);
                        $('nav').show();


                    }

                })

        }
        $('nav').show();

        $('#nav1').click(function () {
            location.reload();
        })

        $('#nav2').click(function () {
            $('.recipe0, .recipe1, .recipe2, .recipe3, .recipe4').remove();
            if (calFrom != "" && calTo != "") {
                if (foodType != "") {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}&cuisinetype=${foodType}&health=peanut-free`;
                }
                else {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}&health=peanut-free`;

                }
            } else {

                if (foodType != "") {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&cuisinetype=${foodType}&health=peanut-free`;
                }
                else {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&health=peanut-free`;
                }

            }
            getData(recipeUrl);
        })
        $('#nav3').click(function () {
            $('.recipe0, .recipe1, .recipe2, .recipe3, .recipe4').remove();
            if (calFrom != "" && calTo != "") {
                if (foodType != "") {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}&cuisinetype=${foodType}&health=tree-nut-free`;
                }
                else {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}&health=tree-nut-free`;

                }
            } else {

                if (foodType != "") {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&cuisinetype=${foodType}&health=tree-nut-free`;
                }
                else {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&health=tree-nut-free`;
                }

            }
            getData(recipeUrl);

        })
        $('#nav4').click(function () {
            $('.recipe0, .recipe1, .recipe2, .recipe3, .recipe4').remove();
            if (calFrom != "" && calTo != "") {
                if (foodType != "") {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}&cuisinetype=${foodType}&health=alcoho-free`;
                }
                else {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}&health=alcoho-free`;

                }
            } else {

                if (foodType != "") {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&cuisinetype=${foodType}&health=alcoho-free`;
                }
                else {
                    var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&health=alcoho-free`;
                }

            }

            getData(recipeUrl);

        
        })
    })
        
})
