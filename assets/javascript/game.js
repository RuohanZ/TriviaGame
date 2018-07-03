window.onload = function () {
    $("#timeLeft").hide();
    $("#start").on("click", startGame);
    $(document).on("click", ".option", check);
}

var currentQIndex = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer = 5;
var timerId;
var resultId;

var questions = ["What is the most visited museum in Europe?",
                "Jackson Pollock was an influential abstract expressionist painter from what country?",
                "The Van Gogh museum is located in what European capital city?",
                "Who painted a late 15th-century mural known as the The Lady with an Ermine?",
                 "Which artist is credited with developing linear perspective?"];

var options = [["British Museum", "Louvre", "Pompidou Center"],
               ["The United States", "Britain", "Canada"],
               ["Luxembourg", "Paris", "Amsterdam"],
               ["Leonardo da Vinci", "Sandro Botticelli", "Raphael"],
               ["Brunelleschi", "Donatello", "Michelangelo"]];

var answers = ["Louvre",
    "The United States",
    "Amsterdam",
    "Leonardo da Vinci",
    "Brunelleschi"];

function nextQ(){
    $("#results").empty();
    timer = 5;
    $('#timer').text(timer);
    timerId = setInterval(run, 1000);
    $('#question').text(questions[currentQIndex]);
    $.each(options[currentQIndex], function(i, item){
     $("#options").append($('<button class="btn btn-outline-dark option">'+item+'</button>'+'<br><br>'));
    })

   
 };

function startGame() {
    clearInterval(timerId);
    currentQIndex = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    $('#start').hide();
    $("#main").show();
    $("#timeLeft").show();
    $("#results").empty();
    nextQ();
};

function check(){
    $("#options").empty();
    clearInterval(timerId);
    if($(this).text() === answers[currentQIndex]){
        correct++;
        $('#results').html("<h3>Correct!</h3>");
        currentQIndex++;
        clearTimeout(resultId);
        resultId = setTimeout(nextQ, 1000);
      }
    else{
        incorrect++;
        $('#results').html("<h3>Nope!</h3>"+"<p>The right answer is: "+ answers[currentQIndex] +"</p>");
        currentQIndex++;
        clearTimeout(resultId);
        resultId = setTimeout(nextQ, 2000);
    }
};

function run() {
    if(timer > 0 && currentQIndex < questions.length){
      timer--;
      $('#timer').text(timer);
    }
    else if(timer == 0){
      $("#options").empty();
      unanswered++;
      clearInterval(timerId);
      $('#results').html("<h3>Out of Time!</h3>"+"<p>The right answer is: "+ answers[currentQIndex] +"</p>");
      currentQIndex++;
      clearTimeout(resultId);
      resultId = setTimeout(nextQ, 2000);
    }
    else if(currentQIndex === questions.length){
      $("#main").hide();
      $("#start").show();
      $("#results")
        .html('<h3>Game Over!</h3>'+
        '<p>Correct: '+ correct +'</p>'+
        '<p>Incorrect: '+incorrect +'</p>'+
        '<p>Unaswered: '+unanswered +'</p>'
        );
    }
  };

