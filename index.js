// sets the default values for the quiz
let currentScore = 0;
let currentQuestion = 0;
// array where all questions and answers are stored
let questions = [
  {
    title: "What is the name of Dale's main alter ego?",
    selections: ["Dusty Paddleford", "Rusty Shackleford", "John Redcorn",
    "Who said Dale isn't the alter ego?"],
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
      title: "How many men does Cotten claim to have killed in the war?",
      selections: ["100", "50", "1", "None"],
      answer: 1
  },
  {
      title: "What country are Khan, Mihn, and Connie from?",
      selections: ["Laos", "England", "China", "South Korea"],
      answer: 0
  }
];
// function to start the quiz
$('.start-btn').on('click', function(e){
    e.preventDefault();
    $('.start-page').hide();
    $('.question-page').show();
})
//listens for user to select an item on the label
$(".question-page form" ).on('click', 'input', function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
});
// listens for user to submit selection
$(".submit-btn").click(function(e){
    e.preventDefault();
    submitAnswer();
});
// listens for restart button
$('.final-page button').click(function(e){
    e.preventDefault();
    restartQuiz();
});
$('.cont-btn').click(function(e){
    e.preventDefault();
    $('.correct-page').hide();
    $('.incorrect-page').hide();
    if (currentQuestion < questions.length){
    $('.question-page').show();
    }
})
//function to display current question

function showQuestion(){
    let question = questions[currentQuestion];
    $('.question-page form').text(question.title);
    for(let i=0; i < question.selections.length; i++){
        $('.question-page form').append(`
        <br>
        <input type="radio" id="${i}" name="question${currentQuestion}" required>
        <label for="${i}" id="${i}">${question.selections[i]}</label>`);
    }
}

function submitAnswer(){
    if($('input.selected').length){
        let userChoice = parseInt($('input.selected').attr('id'));
        console.log(userChoice);
        checkAnswer(userChoice);
     }else{
     alert("Please select an answer.")
     }
}
//function to check answer
function checkAnswer(userChoice){
    let question = questions[currentQuestion];
    if (question.answer === userChoice){
        console.log("correct");
        resultsPage("correct");
        $('.question-page').hide();
        $('.correct-page').show();
        currentScore++;
    }else{
        //displays correct answer when wrong 
        console.log("not correct");
        resultsPage("incorrect");
        $('.question-page').hide();
        $('.incorrect-page').show();
    }
    //continue to next question
    currentQuestion++;
    if (currentQuestion >= questions.length){
        showResults();
    }else {
    showQuestion();   
    } 
}

//function to render correct/incorrect screens 
function resultsPage(result){
    if (result === "correct"){

    }
}
//function to render final score
function showResults() {
    // if($('.correct-page').is(':visible')){
        $('.cont-btn').click(function(){
            $('.correct-page').hide();
            $('.incorrect-page').hide();
            $('.final-page').show();
        })
    // }
    $('.question-page').hide();
    // $('.final-page').show();
    $('.final-page h2').html(`You got ${currentScore} out of ${questions.length} correct!`)

}

// function to restart the quiz

function restartQuiz(){
    
    $('.final-page').hide();
    $('.question-page').show();
    currentScore = 0;
    currentQuestion = 0;
    showQuestion();
}

// main function called to run the functions
function constQuiz(){
    showQuestion();
}
//starting quiz on page load
$(constQuiz);