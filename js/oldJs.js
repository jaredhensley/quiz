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
  globalCounter has a relationship with number argument from callQuestion function
  */

  var totalScore = 0;
  var globalCounter = 0;

  /*
  question builder
  */

  var callQuestion = function(number) {
    var j = number;
    globalCounter = number; // passing number param out of scope for further use
    $("<div></div>").fadeIn("slow").addClass("question").text(questions.question[j]).appendTo(".inner-wrap");
    for (var i = 0; i < questions.choices[i].length; i++) {
      $("<div>" + questions.choices[j][i] + "</div>").fadeIn("slow").addClass("answer").appendTo(".inner-wrap");
    }
  }

  /*
  higher order function
  */

  var masterCallBack = function(number, callback) {
    callback(number);
  }

  /*
  toggle select class with jquery function
  */

  $(".inner-wrap").on("click", ".answer", function() {
    $(this).toggleClass("select").siblings().removeClass("select");
  });

  /*creates a new game*/

  var newGame = function() {
    firstSubmission = true;
    masterCallBack(0, callQuestion); 
    $(".intro-bottom").show();
    for (var i = 0; i < questions.question.length; i++) {
      questions.completed[i] = false;
    }
  }

  /*submit answer handler, checks against question object using globalCounter*/

  $(".bstyle2").on("click", function() {

    if (firstSubmission === true) {
      var check = $(".inner-wrap").find(".select").text();
      if (!questions.completed[globalCounter]) {
        questions.completed[globalCounter] = true;
        if (check == questions.answer[globalCounter]) {
          totalScore++;
          $(".score").text("Current Score: " + totalScore);
          $('.arrowright').trigger('click');
        } else {
          $(".inner-wrap").find(".select").addClass("incorrect");
          firstSubmission = false;
        }
      }
    } else {
      $('.arrowright').trigger('click');
      firstSubmission = true;
    }

  });

  /*handles my left arrow*/

  $(".arrowleft").on("click", function() {
    if (globalCounter < (questions.question.length)) {
      if (globalCounter > 0) {
        $(".inner-wrap").html("");
        globalCounter--;
        masterCallBack(globalCounter, callQuestion);
      }
    }
  });

  /*handles my right arrow*/

  $(".arrowright").on("click", function(j) {
    $(".inner-wrap").html("");
    if (globalCounter < (questions.question.length - 1)) {
      globalCounter++;
      masterCallBack(globalCounter, callQuestion);
    } else {
      globalCounter++;
      $("<div></div>").fadeIn("slow").css("text-align", "center").html("You answered a total of " + totalScore + " questions correctly.").appendTo(".inner-wrap");
      $(".intro-bottom").hide();
    }
  });

  /*resets quiz*/

  $(".reset").on("click", function() {
    totalScore = 0;
    $(".score").html("");
    $(".inner-wrap").html("");
    $(".start").hide();
    newGame();
  });

  /*starts quiz*/

  $(".start").on("click", function() {
    $(".inner-wrap").html("");
    $(this).css("display", "none");
    newGame();
  })

});

// optimal and cleaner way to go about it from my mentor Tomas P. @ Thinkful.  

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