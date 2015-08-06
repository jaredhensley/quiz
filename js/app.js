$(document).ready(function() {

	var question1 = {
		question: "Who discovered the contemporary model of DNA?",
		choices: ["Gregor Mendel", "Friedrich Miescher", "Rosaland Franklin", "Watson and Crick"],
		answer: ["Watson and Crick"],
		completed: false
	};


	var callQuestion = function () {
		$("<div></div>").addClass("question").text(question1.question).appendTo(".inner-wrap");
		var populate = function() {
			for (var i = 0; i < question1.choices.length; i++) {
				$("<div>"+question1.choices[i]+"</div>").addClass("answer").appendTo(".inner-wrap");
			}
		};

		populate();

	}

	callQuestion();


	$(".answer").on("click", function() {
		$('.select').removeClass('select');
		$(this).toggleClass("select");
		
	});

	var totalScore = 0;

	$(".bstyle2").on("click", function() {
		
		var check = $(".inner-wrap").find(".select").text();
		if (check == question1.answer) {
			totalScore += 1;
			$(".score").text(totalScore);
		}

	});

	$(".arrowright").on("click", function() {
		$(".inner-wrap").text("");
	});



});