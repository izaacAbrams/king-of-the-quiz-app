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
//listens for user to select an item
$(".question-page form" ).on('click', 'label', function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
});

//function to display current question

function showQuestion(){
    let question = questions[currentQuestion];
    $('.question-page .form-questions').text(question.title);
    // $('.question-page form').html('');
    for(let i=0; i < question.selections.length; i++){
        $('.question-page form').append(`
        <br>
        <input type="radio" id="${i}" name="question${currentQuestion}">
        <label for=${i}>${question.selections[i]}</label>`)
    }
}

//function to sumbit answer


//function to render current score

//function to check if answer was correct

//function to continue to next question

//function to render results page


// function to restart the quiz
// main function called to run the functions
function constQuiz(){
    startQuiz();
    showQuestion();
}
//starting quiz on page load
$(constQuiz);