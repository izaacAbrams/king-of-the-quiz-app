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
      title: "Who is Hank",
      selections: ["Propane salesman", "Son of propane salesman"],
      answer: 0
  }
];

// function to start the quiz
function startQuiz(){
$('.start-btn').on('click', function(e){
    e.preventDefault();
    $(".start-page").hide();
    $(".question-page").show();
})

}
//listens for user to select an item on the label
$(".question-page form" ).on('click', 'input',function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    // $(this).closest('label').addClass('selected');
});

// listens for user to submit selection
function submitAnswer(){
$(".submit-btn").click(function(e){
    e.preventDefault();
    if($('input.selected').length){
        let userChoice = parseInt($('input.selected').attr('id'));
        console.log(userChoice);
        checkAnswer(userChoice);
    }else{
        console.log("no answer chosen")
    }
});
}

// listens for restart button

$('.final-page button').click(function(e){
    e.preventDefault();
    restartQuiz();
});
//function to display current question

function showQuestion(){
    let question = questions[currentQuestion];
    $('.question-page form').text(question.title);
    // $('.question-page form').html('');

    for(let i=0; i < question.selections.length; i++){
        $('.question-page form').append(`
        <br>
        <input type="radio" id="${i}" name="question${currentQuestion}"/>
        <label for="${i}" id="${i}">${question.selections[i]}</label>`);
    }
    // $('.question-page form').append('<br><button type="submit" class="btn submit-btn">Submit</button>')
}

//function to check answer
function checkAnswer(userChoice){
    let question = questions[currentQuestion];
    if (question.answer === userChoice){
        console.log("correct")
        currentScore++;

    }else{
        //displays correct answer when wrong 
        console.log("not correct")
    }
    //continue to next question
    currentQuestion++;
    if (currentQuestion >= questions.length){
        showResults();
    }else {
    showQuestion();   
    } 
}
//function to render final score
function showResults() {
    $('.question-page').hide();
    $('.final-page').show();
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
    startQuiz();
    showQuestion();
    submitAnswer();
}
//starting quiz on page load
$(constQuiz);