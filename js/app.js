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

  /*Global Variables*/

  var totalScore = 0; // used to display score total at the botton of .inro-bottom div
  var globalCounter = 0; // used to perform some funky logic. See  callQuestion function and arrow handlers
  
  /*question builder*/

  var callQuestion = function(number) {
    var j = number;
      globalCounter = number;
    $("<div></div>").addClass("question").text(questions.question[j]).appendTo(".inner-wrap");
      for (var i = 0; i < questions.choices[i].length; i++) {
        $("<div>" + questions.choices[j][i] + "</div>").addClass("answer").appendTo(".inner-wrap");
      }
      return;
  }

  /*higher order function*/

  var masterCallBack = function(number, callback) {
    callback(number);
  }

  /*apply classes with jquery function*/

  var style = function() {
    $(".answer").on("click", function() {
      $('.select').removeClass('select');
      $(this).toggleClass("select");
    });
  }

  /*creates a new game*/

  var newGame = function () {
	  masterCallBack(0, callQuestion);
	  style(); // I have to call style here for now in order to get question to have my jquery click handler styles
  }

  /*this function generates the first question */

 newGame();

  /*submit answer handler, checks against question object using globalCounter*/ 

  $(".bstyle2").on("click", function() {
    var check = $(".inner-wrap").find(".select").text();
    if (check == questions.answer[globalCounter]) {
      totalScore += 1;
      $(".score").text(totalScore);
    } else {
    	console.log("wrong answer"); //temporary, will style an incorrect class on div
    }
  });

/*  $(".arrowleft").on("click", function() {
    $(".inner-wrap").html("");
    console.log(globalCounter);
    if (globalCounter < (questions.question.length - 1)) {
      globalCounter -= 1;
      masterCallBack(globalCounter, callQuestion);
      style();
    }
  });*/

	/*handles my right arrow, functional for now.  trying to apply similar logic to left arrow above*/

  $(".arrowright").on("click", function() {
    $(".inner-wrap").html("");
    console.log(globalCounter);
    if (globalCounter < (questions.question.length - 1)) {
      globalCounter += 1;
      masterCallBack(globalCounter, callQuestion);
      style();
    } else {
      $(".inner-wrap").html("Your score is " + totalScore);

    }
  });

  /*resets quiz*/

  $(".bleft").on("click", function() {
  	totalScore = 0;
  	$(".score").html("");
  	$(".inner-wrap").html("");
  	newGame();
  });

});