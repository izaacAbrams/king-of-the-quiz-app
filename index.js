// sets the default values for the quiz
let currentScore = 0;
let currentQuestion = 0;
// array where all questions and answers are stored
let questions = [{
    title: "What is the name of Dale's main alter ego?",
    selections: ["Dusty Paddleford", "Rusty Shackleford", "John Redcorn",
      "Who said Dale isn't the alter ego?"
    ],
    answer: 1
  },
  {
    title: "What is the name of Hank's guitar?",
    selections: ["Sally", "LouAnne", "Betsy", "Ladybird"],
    answer: 2
  },
  {
    title: "What brand of beer do Hank, Dale, Bill and Boomhauer drink in the alley?",
    selections: ["Bud Light", "Duff", "Alamo", "Slurm"],
    answer: 2
  },
  {
    title: "What scares Hank in the garage when building a boat with Bobby?",
    selections: ["A snake", "A clown", "A spider", "A bat"],
    answer: 3
  },
  {
    title: "How many men does Cotton claim to have killed in the war?",
    selections: ["100", "50", "1", "None"],
    answer: 1
  },
  {
    title: "What country are Khan, Mihn, and Connie from?",
    selections: ["Laos", "England", "China", "South Korea"],
    answer: 0
  },
  {
    title: "Which one of Luanne's boyfriends died in an explosion?",
    selections: ["Hank", "Buckley", "Bobby", "Buck"],
    answer: 1
  },
  {
    title: "What does Bill do for a living?",
    selections: ["Exterminator", "Accountant", "Principal", "Army Barber"],
    answer: 3
  },
  {
    title: "Who does Luanne's mother date when she comes to stay with the Hills?",
    selections: ["John", "Bill", "Buckley", "Joseph"],
    answer: 1
  },
  {
    title: "What is Hank's dogs name?",
    selections: ["Butterfree", "Duke", "Tom", "Ladybird"],
    answer: 3
  },
  {
    title: "Who developed gout as a result of overeating at a deli?",
    selections: ["Bill", "Buck", "Bobby", "Cotton"],
    answer: 2
  },
  {
    title: "Which of the following did Peggy work as?",
    selections: ["Bookkeeper", "Beekeeper", "Therapist", "Subsitute Teacher"],
    answer: 3
  },
  {
    title: "Who is Hank's boss?",
    selections: ["Buck", "Bobby", "Nancy", "Dooley"],
    answer: 0
  },
  {
    title: "What is Bill's ex-wife's name?",
    selections: ["Alliston", "Brandy", "Lanore", "Peggy"],
    answer: 2
  },
  {
    title: "What did Hank and Peggy do for their anniversary?",
    selections: ["Scuba dive", "Skydive", "Trip to Mexico", "Nothing"],
    answer: 1
  }
];
//contains array of objects for the side image 
let sidePicture = [{
  source: "images/hank.png",
  alt: "Hank Hill",
}, {
  source: "images/bill.png",
  alt: "Bill from King of the Hill"
}, {
  source: "images/boomhaur.png",
  alt: "Boomhaur from King of the Hill"
}, {
  source: "images/dale.png",
  alt: "Dale from King of the Hill"
}];

// function to start the quiz
$('.start-btn').on('click', function(e) {
  e.preventDefault();
  $('.start-page').hide();
  $('.question-page').show();
})
//listens for user to select an item on the label
$('.question-page form').on('click', '.selections', function() {
  $('.selected').removeClass('selected');
  $(this).addClass('selected');
  if ($(this).hasClass('selected')) {
    $(this).children('input').prop('checked', true);
  } else {
    $(this).children('input').removeProp('checked');
  }
});
// listens for user to submit selection
$('.submit-btn').click(function(e) {
  e.preventDefault();
  submitAnswer();
});
// listens for restart button
$('.final-page button').click(function(e) {
  e.preventDefault();
  restartQuiz();
  makeImage();
});
//listens for next button on the result pages 
$('.cont-btn').click(function(e) {
  e.preventDefault();
  $('.correct-page').hide();
  $('.incorrect-page').hide();
  if (currentQuestion < questions.length) {
    $('.question-page').show();
  }
})
//function to create and display current question
function showQuestion() {
  let question = questions[currentQuestion];
  $('.question-page form').html(`<h1 class="q-title">${question.title}</h1>`);
  $('.question-page form').append(`<div class="number-and-score"></div>`);
  for (let i = 0; i < question.selections.length; i++) {
    $('.question-page form').append(`<div class="selections">
        <input type="radio" id="${i}" name="question${currentQuestion}" required>
        <label for="${i}" id="${i}">${question.selections[i]}</label></div>`);
  }
  showScoreandNumber();
  makeImage();
}
//generates an image from the array to display a random character image
function makeImage() {
  $('.question-page .side-pic').html(`<img src=
    ${sidePicture[Math.floor(Math.random() * sidePicture.length)].source} 
    alt="King of the Hill character image" class="side-pic">`);
}
//stores answer chosen, and makes choosing an answer required
function submitAnswer() {
  if ($('.selections.selected').length) {
    let userChoice = parseInt($('.selections.selected').children('input').attr('id'));
    checkAnswer(userChoice);
  } else {
    alert("Please select an answer.");
  }
}
//function to check answer
function checkAnswer(userChoice) {
  let question = questions[currentQuestion];
  let currentAnswerNumber = question.answer;
  let currentAnswer = question.selections[currentAnswerNumber];
  if (question.answer === userChoice) {
    //displays correct answer, shows results page
    correctPage(currentAnswer);
    $('.question-page').hide();
    $('.correct-page').show();
    currentScore++;
  } else {
    //displays correct answer when wrong 
    incorrectPage(currentAnswer);
    $('.question-page').hide();
    $('.incorrect-page').show();
  }
  //continue to next question
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResults();
  } else {
    showQuestion();
  }
}
//render score and question number
function showScoreandNumber() {
  $('.question-page .number-and-score').html(`<h2>Score: ${currentScore}/${currentQuestion}</h2>
    <h2>Question: ${currentQuestion + 1}/${questions.length}</h2>`);
}
//function to render correct screen
function correctPage(currentAnswer) {
  $('correct-page h1').html('');
  $('.correct-page .correct-score-number').html(`<h2>Score: ${currentScore + 1}/${currentQuestion + 1}</h2>
    <h2>Question: ${currentQuestion + 1}/${questions.length}</h2>`);
  $('.correct-page h1').html(`<img src="images/right.png" class="icon" alt="checkmark">
    Correct!</h1><h1 class="main-response-text">The answer is ${currentAnswer}`);
}
//renders incorrect screen
function incorrectPage(currentAnswer) {
  $('incorrect-page h1').html('');
  $('.incorrect-page .incorrect-score-number').html(`<h2>Score: ${currentScore}/${currentQuestion + 1}</h2>
    <h2>Question: ${currentQuestion + 1}/${questions.length}</h2>`);
  $('.incorrect-page h1').html(`<img src="images/wrong.png" class="icon" alt="red x">
    Incorrect!</h1><h1 class="main-response-text">The answer is actually ${currentAnswer}`);
}
//changes final picture and text based on score
function determineGrade() {
  let finalGrade = currentScore / questions.length;
  if (finalGrade === 1) {
    $('.final-page .result-img').attr('src', 'images/perfect-score.png');
    $('.final-page h3').text("That's a perfect score!");
  } else if (finalGrade === 0) {
    $('.final-page .result-img').attr('src', 'images/worst-score.png');
    $('.final-page h3').text("That's literally the worst score possible.");
  } else if (finalGrade >= '.9') {
    $('.final-page .result-img').attr('src', 'images/a.jpg');
    $('.final-page h3').text("That's an A!");
  } else if (finalGrade >= '.8' && finalGrade < '.9') {
    $('.final-page .result-img').attr('src', 'images/b.jpg');
    $('.final-page h3').text("That's a B!");
  } else if (finalGrade >= '.7' && finalGrade < '.8') {
    $('.final-page .result-img').attr('src', 'images/c.jpg');
    $('.final-page h3').text("That's a C, I'll take it.");
  } else if (finalGrade >= '.6' && finalGrade < '.7') {
    $('.final-page .result-img').attr('src', 'images/d.png');
    $('.final-page h3').text("That's a D, maybe study up some.");
  } else {
    $('.final-page .result-img').attr('src', 'images/f.jpg');
    $('.final-page h3').text("That's an F, you can do better than that.");
  }
}
//function to render final score
function showResults() {
  $('.cont-btn').on('click', function() {
    //stops from displaying both result page and final page on the last question
    if (currentQuestion >= questions.length) {
      $('.correct-page').hide();
      $('.incorrect-page').hide();
      determineGrade();
      $('.final-page').show();
    } else {
      $('.final-page').hide();
    }
  });
  $('.question-page').hide();
  $('.final-page h2').html(`You got ${currentScore} out of ${questions.length} correct!`);
}
// function to restart the quiz
function restartQuiz() {
  $('.final-page').hide();
  $('.question-page').show();
  currentScore = 0;
  currentQuestion = 0;
  showQuestion();
}
// main function called to run the functions
function constQuiz() {
  showQuestion();
  showScoreandNumber();
}
//starting quiz on page load
$(constQuiz);