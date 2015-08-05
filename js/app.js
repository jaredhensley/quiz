$(document).ready(function() {

	var question1 = {
		question: "Who discovered the contemporary model of DNA?",
		choices: ["Gregor Mendel", "Friedrich Miescher", "Rosaland Franklin", "Watson and Crick"],
		answer: ["Watson and Crick"],
		completed: false
	};

	var j = 0;

	while (j === 0) {
		var callQuestion = function () {
			$("<div></div>").addClass("question").text(question1.question).appendTo(".inner-wrap");
			var populate = function() {
				for (var i = 0; i < question1.choices.length; i++) {
					$("<div>"+question1.choices[i]+"</div>").addClass("answer").appendTo(".inner-wrap");
				}
			};

			populate();

		}

	j++;
	callQuestion();

	} //end while loop

	$(".answer").on("click", function() {
		if ($(this).not(".select")) {
			$(this).toggleClass("select");
		}
	});

var totalScore = 0;

$(".bstyle2").on("click", function() {
	
	console.log(totalScore);
		var check = $(this).closest(".select").text("test");
		console.log(check);
		console.log(question1.answer);
		if (check == question1.answer) {
			alert('test');
			totalScore += 1;
			console.log(totalScore);
		}
	});



});

