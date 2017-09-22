function init() {
	QUESTIONS = [
		"Which of the following genres do you like most?",
		"Which of the following emotions do you currently feel most?"
	];
	ANSWERS = [
		["Pop", "Rock", "Electronic"],
		["Happy", "Sad", "Angry"]
	];
	RESULTS = {
		"00" : "4u900uoi9mXBWQ8l0UOrwj", // Happy Pop
		"01" : "453QwgDIG95NmmLqSxnPsR", // Sad Pop
		"02" : "7GhIk7Il098yCjg4BQjzvb", // Angry Pop

		"10" : "2FYNX8DuCpb6xNL4B0vtve", // Happy Rock
		"11" : "7ExHUFljhAyx0X9UIYpEnZ", // Sad Rock
		"12" : "3pkJxPpIaboAYThOm2DM6d", // Angry Rock

		"20" : "05KizhJc5qATFI2D7SauJ5", // Happy Electronic
		"21" : "7ob9o7QNvsHaRTniMjzzUq", // Sad Electronic
		"22" : "5tnvEAyp1VgyaIaPAOIqiW", // Angry Electronic
	};
	USER_ANSWERS = "";
	PROGRESS = -1;
	LAST_QUESTION = 0;
	nextQuestion();
}

function nextQuestion() {
	if(PROGRESS <= LAST_QUESTION) {
		PROGRESS++;
		document.getElementById("question-text").innerText = QUESTIONS[PROGRESS];
		var html = "";
		ANSWERS[PROGRESS].forEach(function (answer) {
			html += "<input value='" + sanitize(answer) + "' onclick='enableButton()' class='answer-radio' name='genre' type='radio'>" + answer + "</input><br>";
		});
		document.getElementById("answers").innerHTML = html;
	} else {
		document.getElementById("questions").style.display = "none";
		showResult();
	}
}

function answer() {
	var radios = document.querySelectorAll("#answers > input");
	for(var i = 0; i < radios.length; i++) {
		if(radios[i].checked) {
			USER_ANSWERS += i;
		}
	}
	disableButton();
	nextQuestion();
}

function showResult() {
	var spotifyPreview = "<iframe src='https://open.spotify.com/embed/track/" + RESULTS[USER_ANSWERS] + "' width='562' height='712' frameborder='0' allowtransparency='true'></iframe>"
	var resultsDiv = document.getElementById("result-preview");
	resultsDiv.innerHTML = spotifyPreview;
	document.getElementById("result").style.display = "block";
	document.querySelector("header").innerText = "Enjoy the song.";
}

function enableButton() {
	document.getElementById("next").disabled = false;
}

function disableButton() {
	document.getElementById("next").disabled = true;	
}

function sanitize(text) {
	return text.toLowerCase().replace(/\s+/g, "-");
}