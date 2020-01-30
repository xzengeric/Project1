$(document).ready(function () {

    // Slider
    var slider = document.getElementById("slider");
    if (slider == null) {
        alert("slider not found");
    }

    noUiSlider.create(slider, {
        start: [50, 250],
        connect: true,
        tooltips: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
            'min': 30,
            'max': 2000
        },
        format: {
            from: function (value) {
                return parseInt(value);
            },
            to: function (value) {
                return parseInt(value);
            }
        }
    });
    $('nav').hide();
    var app_id = "98b05697";
    var app_key = "66b497d1c74de44a3ee14c66199e0618";


    $("#submitButton").click(function () {
        $('body').css("background-image", "url('./source/food.png')").css('background-repeat', 'repeat').css('background-size','auto');
        $('h5').hide();
        $('.input').hide();

        // Pass user's input to q .
        var q = $('.ing').val();

        var slider = document.getElementById("slider");
        var calRange = slider.noUiSlider.get();
        var calFrom = calRange[0]; //$('.col-from').val();
        var calTo = calRange[1]; //$('.col-to').val();

        // var foodType = $('.food-type').val();


        if (calFrom != "" && calTo != "") {

            var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&calories=${calFrom}-${calTo}`;
        }
        else {
            var recipeUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}`;
        }





        getData(recipeUrl);


        function getData(recipeUrl) {



            fetch(recipeUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (recipesData) {
                    console.log(recipesData);
                    var receipesDataBasedOnInput = recipesData.hits;
                    for (var i = 0; i < recipesData.hits.length; i++) {
                        var newDiv = $('<div>').attr('class', 'recipe' + i).addClass('col s6');
                        var title = $('<h2>').text(receipesDataBasedOnInput[i].recipe.label);
                        var img = $('<img>').attr('src', receipesDataBasedOnInput[i].recipe.image).attr('href', receipesDataBasedOnInput[i].recipe.url).attr('width', '300px').attr('height', '300px');
                        var link = $('<a>').attr('href', receipesDataBasedOnInput[i].recipe.url);
                        var linkText = $('<p>').text('Click image to see the whole recipe!').css('color', 'grey');
                        var calories = receipesDataBasedOnInput[i].recipe.calories;
                        var serving = receipesDataBasedOnInput[i].recipe.yield;
                        var calRange = calories / serving;
                        var caloriesPerServing = $('<h5>').text("Total Calories: " + calRange.toFixed(0) + " Kcal");
                        var dietLabels = $('<h5>').text("Diet Labels: " + receipesDataBasedOnInput[i].recipe.dietLabels);
                        var row = $('<div>').attr('class', 'row').attr('id', 'row');
                        var div = $('<ul>').attr('class', 'ingredients' + i);



                        for (var j = 0; j < receipesDataBasedOnInput[i].recipe.ingredients.length; j++) {
                            var ingredients = receipesDataBasedOnInput[i].recipe.ingredientLines[j];
                            var li = $('<li>').text(ingredients);
                            div.append(li);

                        }
                        if ($(window).width() <= 600) {
                            newDiv.removeClass('col s6');
                        }

                        var userInput = receipesDataBasedOnInput[i].recipe.label;



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
                        row.append(newDiv);
                        $('.recipeAndYoutubeOutput').append(row);
                        $('nav').show();
                        searchYoutude(row, userInput);

                    }

                })


        }
        $('nav').show();

        $('#nav1').click(function () {
            location.reload();
        })

        $('#nav2').click(function () {
            $(".row").remove();
            var Url = recipeUrl + "&health=vegan";
            getData(Url);
        })
        $('#nav3').click(function () {
            $(".row").remove();

            var Url = recipeUrl + "&health=vegetarian";
            getData(Url);

        })
        $('#nav4').click(function () {
            $(".row").remove();

            var Url = recipeUrl + "&health=alcohol-free";
            getData(Url);

        })
    })


    //Youtube search engine. 

    function searchYoutude(row, userInput) {



        //get from the input
        var q = "how to cook " + userInput;

        //get request on API
        $.get(
            "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            maxResults: 1,
            // key: 'AIzaSyDT61zlLfAE3Q2q4t2VM_1i4VfRWrkwsSQ' 
            //backup apikey : 
            key: 'AIzaSyAS6t09aF4WVJ-5DqY-2Dk5T33xtSrGUf0'
            // 3rd apikey :
            // key: 'AIzaSyCRe5afhFZWXNUYJ5isXjPzc4sJUBL4p2g'
            //4th ApiKey :
            // key: 'AIzaSyBHRgxrv1FgsBl1JIgC9UnJ3zXgvJPLwAQ'
        },
            function (data) {

                $.each(data.items, function (i, item) {

                    var videoOutput = getOutput(i, item);

                    row.append(videoOutput);
                });
            }

            // if it failed , it will display this massage. 
        ).fail(function () {

            $.each(row, function (i, item) {

                var videoOutput = getOutputError(i, item);

                row.append(videoOutput);
            });
        })


    }

    //build error output

    function getOutputError(item) {


        var ErrorMassage = " Video is cooking..."
        var displayHTML = '<li class = "col s6">' +
            '<div class="#">' +
            '<h2 style="color: #87CEEB">' + ErrorMassage + '</h2>';

        return displayHTML;


    }
    //build output

    function getOutput(i, item) {

        var videoId = item.id.videoId;
        var title = item.snippet.title;
        var channelTitle = item.snippet.channelTitle;
        var description = item.snippet.description;
        var videoDate = item.snippet.publishedAt;


        //Output string # is where we can repleace with the class name !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        var displayHTML = '<li class = "col s6">' +
            '<div class="#">' +
            '<h2 id="titleDisplayID">' + title + '</h2>' +
            '<iframe class="youtubeVideo" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe> ' +
            '<h5>By <soan class="#">' + channelTitle + '</span> on ' + videoDate + '</h5>' +
            '<p>' + description + '</p>' +
            '</div>' +
            '</li>' +
            '';

        return displayHTML;
    }

    // if ($(window).width() <= 600) {
    //     $('li').removeClass('col s6');
    // }


// more reponsive 

    var alterClass = function () {
        var ww = document.body.clientWidth;
        if (ww <= 600) {
            $('li').removeClass('col s6');
      
        } else{
            $('li').addClass('col s6');
          

        }

    };

    $(window).resize(function () {
        alterClass();
    });

})