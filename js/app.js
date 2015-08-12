$(document).ready(function() {
  var quizApp = {

    questions: {
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
    },

    totalScore: 0,
    globalCounter: 0,
    firstSubmission: true,

    displayCurrentQuestion: function(number) {
      var j = number;
      this.globalCounter = number; // passing number param out of scope for further use
      $("<div></div>").fadeIn("slow").addClass("question").text(this.questions.question[j]).appendTo(".inner-wrap");
      for (var i = 0; i < this.questions.choices[i].length; i++) {
        $("<div>" + this.questions.choices[j][i] + "</div>").fadeIn("slow").addClass("answer").appendTo(".inner-wrap");
      }
    },

    bindUI: function() {
      $(".reset").on("click", quizApp.reset);
      $(".arrowleft").on("click", quizApp.prevQuestion);
      $(".inner-wrap").on("click", quizApp.toggleSelect);
      $(".arrowright").on("click", quizApp.nextQuestion);
      $(".start").on("click", quizApp.startGame);
      $(".inner-wrap").on("click", ".answer", quizApp.toggleSelect);
      $(".submit").on("click", quizApp.checkAnswer);
    },

    init: function(number) {
      this.bindUI();

    },

    reset: function() {
      quizApp.totalScore = 0;
      $(".score").html("");
      $(".inner-wrap").html("");
      $(".start").hide();
      quizApp.newGame();
    },

    prevQuestion: function() {
      if (quizApp.globalCounter < (quizApp.questions.question.length)) {
        if (quizApp.globalCounter > 0) {
          $(".inner-wrap").html("");
          quizApp.globalCounter--;
          quizApp.displayCurrentQuestion(quizApp.globalCounter);
        }
      }
    },

    nextQuestion: function() {
      $(".inner-wrap").html("");
      if (quizApp.globalCounter < (quizApp.questions.question.length - 1)) {
        quizApp.globalCounter++;
        quizApp.displayCurrentQuestion(quizApp.globalCounter);
      } else {
        quizApp.globalCounter++;
        $("<div></div>").fadeIn("slow").css("text-align", "center").html("You answered a total of " + quizApp.totalScore + " questions correctly.").appendTo(".inner-wrap");
        $(".intro-bottom").hide();
      }
    },

    checkAnswer: function() {
      if (quizApp.firstSubmission === true) {
        var check = $(".inner-wrap").find(".select").text();
        if (!quizApp.questions.completed[quizApp.globalCounter]) {
          quizApp.questions.completed[quizApp.globalCounter] = true;
          if (check == quizApp.questions.answer[quizApp.globalCounter]) {
            quizApp.totalScore++;
            $(".score").text("Current Score: " + quizApp.totalScore);
            $('.arrowright').trigger('click');
          } else {
            $(".inner-wrap").find(".select").addClass("incorrect");
            quizApp.firstSubmission = false;
          }
        }
      } else {
        $('.arrowright').trigger('click');
        quizApp.firstSubmission = true;
      }

    },

    toggleSelect: function(event) {
      console.log(this);
      event.stopPropagation();
      $(this).css("border", "1px solid blue");
      $(this).toggleClass("select").siblings().removeClass("select");
    },

    newGame: function() {
      firstSubmission = true;
      quizApp.displayCurrentQuestion(0);
      $(".intro-bottom").show();
      for (var i = 0; i < quizApp.questions.question.length; i++) {
        quizApp.questions.completed[i] = false;
      }
    },
    startGame: function() {
      $(".inner-wrap").html("");
      $(".start").css("display", "none");
      quizApp.newGame();
    }
  };

  quizApp.init();

});