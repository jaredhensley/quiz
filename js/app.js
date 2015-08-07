$(document).ready(function() {

  var questions = {
    question: [
      ["Who discovered the contemporary model of DNA?"],
      ["Which of the following is not a nitrogenic base of DNA?"],
      ["Which of the following is not a part of the central dogma of biology?"],
      ["Who is generally credited with inventing the modern day microscope?"],
      ["Which of the following is not considered one of the three domains of life?"]
    ],
    choices: [
      ["Gregor Mendel", "Friedrich Miescher", "Rosaland Franklin", "Watson and Crick"],
      ["Adenine", "Uracil", "Guanine", "Cytosine"],
      ["Replication", "Transcription", "Translation", "Notsuration"],
      ["Robert Hooke", "Thomas Jefferson", "Benjamin Franklin", "Charles Darwin"],
      ["Bactera", "Eukaryota", "Archae", "Halophiles"]
    ],
    answer: [
      ["Watson and Crick"],
      ["Uracil"],
      ["Notsuration"],
      ["Robert Hooke"],
      ["Halophiles"]
    ],
    completed: [false, false, false, false, false]
  };

  /*
   ***Global Variables***
   *totalScore is used to display score total at the botton of .inro-bottom div
   *globalCounter is used to perform some funky logic. See callQuestion function and arrow handlers
   */

  var totalScore = 0;
  var globalCounter = 0;

  /*
  *question builder
  funky logic, setting  var j  is set equal to number parameter that is actually an argument from my masterCallBack function
  */

  var callQuestion = function(number) {
    var j = number;
    globalCounter = number;
    $("<div></div>").addClass("question").text(questions.question[j]).appendTo(".inner-wrap");
    for (var i = 0; i < questions.choices[i].length; i++) {
      $("<div>" + questions.choices[j][i] + "</div>").addClass("answer").appendTo(".inner-wrap");
    }
  }

  /*higher order function*/

  var masterCallBack = function(number, callback) {
    callback(number);
  }

  /*apply classes with jquery function*/

  $(".inner-wrap").on("click", ".answer", function() {
    $(this).toggleClass("select").siblings().removeClass("select");
  });

  /*creates a new game*/

  var newGame = function() {
    masterCallBack(0, callQuestion); //can just call callQuestion(callback practice!)
    $(".intro-bottom").show();
  }

  /*this function generates the first question */

  /*submit answer handler, checks against question object using globalCounter*/

  $(".bstyle2").on("click", function() {
    var check = $(".inner-wrap").find(".select").text();
    if (!questions.completed[globalCounter]) {
      if (check == questions.answer[globalCounter]) {
        questions.completed[globalCounter] = true;
        totalScore += 1;
        $(".score").text("Current Score: " + totalScore);
        $('.arrowright').trigger('click');
      } else {
        $(".inner-wrap").find(".select").addClass("incorrect"); //temporary, will style an incorrect class on div
        questions.completed[globalCounter] = true;
      }
    }
  });

  /*handles my left arrow*/

  $(".arrowleft").on("click", function() {
    $(".inner-wrap").html("");
    console.log(globalCounter);
    if (globalCounter <= (questions.question.length - 1)) {
      globalCounter--;
      masterCallBack(globalCounter, callQuestion);
    }
  });

  /*handles my right arrow*/

  $(".arrowright").on("click", function(j) {
    $(".inner-wrap").html("");
    if (globalCounter < (questions.question.length - 1)) {
      globalCounter += 1;
      masterCallBack(globalCounter, callQuestion);
    } else {
      $(".inner-wrap").css("text-align", "center").html("You answered a total of " + totalScore + " questions correctly.");
      $(".intro-bottom").hide();
    }
  });

  /*resets quiz*/

  $(".bleft").on("click", function() {
    totalScore = 0;
    $(".score").html("");
    $(".inner-wrap").html("");
    newGame();
  });

  $(".start").on("click", function() {
    $(".inner-wrap").html("");
    $(this).css("display", "none");
    newGame();

  })
  /*newGame();*/

});




// optinal and cleaner way to go about it from my mentor Tomas.  

/*  function getQuestionData(currentQuestionNumber, questions){
      var currentQuestion = [ questions.question[currentQuestionNumber], questions.choices[currentQuestionNumber], questions.answer[currentQuestionNumber] ];

      return currentQuestion;

    }

    function displayCurrentQuestion(){
      var currentQuestion = getQuestionData(currentQuestionNumber, questions);
      //loop through data here, add to UI
      // YEAH!!
    }

    function checkAnswer(){
      if correct globalCounter++;

      displayCurrentQuestion()
    }*/