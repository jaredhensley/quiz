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

 /* checkAnswer: function(){
    // if correct this.globalCounter++;
    // this.displayCurrentQuestion();
  },*/

  displayCurrentQuestion: function(number) {
    var j = number;
    this.globalCounter = number; // passing number param out of scope for further use
    $("<div></div>").fadeIn("slow").addClass("question").text(this.questions.question[j]).appendTo(".inner-wrap");
    for (var i = 0; i < this.questions.choices[i].length; i++) {
      $("<div>" + this.questions.choices[j][i] + "</div>").fadeIn("slow").addClass("answer").appendTo(".inner-wrap");
    }
  },

  bindUI: function(){
    $(".reset").on("click", this.reset);
    $(".arrowleft").on("click", this.prevQuestion);
    $(".inner-wrap").on("click", this.toggleSelect);
    $(".arrowright").on("click", this.nextQuestion);
    $(".start").on("click", this.newGame);
  },

  init: function(number){
    this.bindUI();
  },

  reset: function() {
    totalScore = 0;
    $(".score").html("");
    $(".inner-wrap").html("");
    $(".start").hide();
    this.newGame();
   },

   prevQuestion: function() {
    if (this.globalCounter < (this.questions.question.length)) {
      if (this.globalCounter > 0) {
        $(".inner-wrap").html("");
        this.globalCounter--;
        this.displayCurrentQuestion(this.globalCounter);
      }
    }
  },

  nextQuestion: function() {
    $(".inner-wrap").html("");
    if (this.globalCounter < (this.questions.question.length - 1)) {
      this.globalCounter++;
      this.displayCurrentQuestion(this.globalCounter);
    } else {
      this.globalCounter++;
      $("<div></div>").fadeIn("slow").css("text-align", "center").html("You answered a total of " + totalScore + " this.questions correctly.").appendTo(".inner-wrap");
      $(".intro-bottom").hide();
   }
  },

  toggleSelect: function() {
    $(".answer").toggleClass("select").siblings().removeClass("select");
  },

   newGame: function() {
    firstSubmission = true;
    this.displayCurrentQuestion(0); 
    $(".intro-bottom").show();
    for (var i = 0; i < this.questions.question.length; i++) {
      this.questions.completed[i] = false;
    }
   },
   startGame: function() {
    $(".inner-wrap").html("");
    $(this).css("display", "none");
    this.newGame();
  }
};

quizApp.init();
});


