$(document).ready(function() {

	var questions = {
		question: [["Who discovered the contemporary model of DNA?"],["Which of the following is not a nitrogenic base of DNA?"],["Which of the following is not a part of the central dogma of biology?"],["Who is generally credited with inventing the modern day microscope?"],["Which of the following is not considered one of the three domains of life?"]],
		choices: [["Gregor Mendel", "Friedrich Miescher", "Rosaland Franklin", "Watson and Crick"],["Adenine", "Uracil", "Guanine", "Cytosine"],["Replication", "Transcription", "Translation", "Notsuration"],["Robert Hooke","Thomas Jefferson", "Benjamin Franklin", "Charles Darwin"],["Bactera","Eukaryota", "Archae", "Halophiles"]],
		answer: [["Watson and Crick"],["Uracil"],["Notsuration"],["Robert Hooke"],["Halophiles"]],
		completed: [false,false,false,false,false]
	};

	var totalScore = 0;
	var globalCounter = 0;

	var callQuestion = function (number) {
		var j = number;
		$("<div></div>").addClass("question").text(questions.question[j]).appendTo(".inner-wrap");
		var populate = function() {
			globalCounter = number;
			for (var i = 0; i < questions.choices[i].length; i++) {
				$("<div>"+questions.choices[j][i]+"</div>").addClass("answer").appendTo(".inner-wrap");
			}
			return;
		};
		populate();
	}

	var masterCallBack = function (number, callback) {
		callback(number);
	}




var style = function () {
		$(".answer").on("click", function() {
			$('.select').removeClass('select');
			$(this).toggleClass("select");
		});
	}

	masterCallBack(0, callQuestion);
	style();

	$(".bstyle2").on("click", function() {
		var check = $(".inner-wrap").find(".select").text();
		if (check == questions.answer[globalCounter]) {
			totalScore += 1;
			$(".score").text(totalScore);
		}

	});


	$(".arrowright").on("click", function() {
		$(".inner-wrap").html("");
		console.log(globalCounter);
		if (globalCounter < 4) {
			globalCounter += 1;
			masterCallBack(globalCounter, callQuestion);
			style();
		} else {
			$(".inner-wrap").html("Your score is " + totalScore);

		}
	});



});