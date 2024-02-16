
function Question(qText) {

    this.questionText = qText;
}
const question1 = new Question("JavaScript Supports");
const question2 = new Question("Which language is used for styling web pages?");
const question3 = new Question("Which is not a javascript framework? ");
const question4 = new Question("Which is used for connect to Database ?");
const question5 = new Question("Javascript is a  ");

function AnswerOption(aText) {

    this.answerText = aText;

}

// Options for all Questions

const answerOptionFunctions = new AnswerOption("Functions");
const answerOptionXHTML = new AnswerOption("XHTML");
const answerOptionCSS = new AnswerOption("CSS");
const answerOptionHTML = new AnswerOption("HTML");
const answerOptionJquery = new AnswerOption("JQuery");
const answerOptionXML = new AnswerOption("XML");
const answerOptionPythonScript = new AnswerOption("PythonScript");
const answerOptionDjango = new AnswerOption("Django");
const answerOptionNodeJs = new AnswerOption("Node Js");
const answerOptionPHP = new AnswerOption("PHP");
const answerOptionJs = new AnswerOption("Js");
const answerOptionAll = new AnswerOption("All");
const answerOptionLanguage = new AnswerOption("Language");
const answerOptionProgrammingLanguage = new AnswerOption("Programming Language");
const answerOptionDevelopment = new AnswerOption("Development");



function QuestionAnswerOptionsPair(question, answerOptions, correctAnswer) {
    this.question = question;
    this.answerOptions = answerOptions;

    this.correctAnswer = correctAnswer;
    // support for correct answer functionality
    this.isCorrectAnswer = function (userSuppliedAnswer) {
        if (userSuppliedAnswer == this.correctAnswer.answerText) {
            
            return true;
        }
        else
            return false;
        
    }
}

// question answer options - 1
const answerOptionsQ1 = [answerOptionFunctions, answerOptionXHTML, answerOptionCSS, answerOptionHTML];

const questionAnswerOptionsPair1 = new QuestionAnswerOptionsPair(question1, answerOptionsQ1, answerOptionFunctions);

// question answer options - 2 
const answerOptionsQ2 = [answerOptionHTML, answerOptionJquery, answerOptionCSS, answerOptionXML];

const questionAnswerOptionsPair2 = new QuestionAnswerOptionsPair(question2, answerOptionsQ2, answerOptionCSS);

// question answer options - 3 
const answerOptionsQ3 = [answerOptionPythonScript, answerOptionJquery, answerOptionDjango, answerOptionNodeJs];

const questionAnswerOptionsPair3 = new QuestionAnswerOptionsPair(question3, answerOptionsQ3, answerOptionPythonScript);

// question answer options - 4 
const answerOptionsQ4 = [answerOptionPHP, answerOptionHTML, answerOptionJs, answerOptionAll];

const questionAnswerOptionsPair4 = new QuestionAnswerOptionsPair(question4, answerOptionsQ4, answerOptionPHP);

// question answer options - 5 
const answerOptionsQ5 = [answerOptionLanguage, answerOptionProgrammingLanguage, answerOptionDevelopment,
    answerOptionAll];

const questionAnswerOptionsPair5 = new QuestionAnswerOptionsPair(question5, answerOptionsQ5, answerOptionProgrammingLanguage);


// Creation of Quiz Application

function QuizApplication(qaOptionsPairArray) {
    this.qaOptionsPairArray = qaOptionsPairArray;

    this.score = 0;
    this.pageIndex = 0;
    this.init = function () {

        this.applicationInit();
    }
    this.applicationInit = function () {
        this.pageIndex = 0;
        this.addListeners();
        this.displayQuizPage();
    }

    this.getScore = function () {
        return this.score;
    }

    this.incrementScore = function () {
        this.score++;
    }

    this.calculateScorePercentage = function () {
        let percentage = (this.score / this.qaOptionsPairArray.length) * 100
        console.log(percentage);
        return percentage;
    }
    this.isLastQAPair = function () {

        if (this.pageIndex == (this.qaOptionsPairArray.length - 1))
            return true;
        else
            return false;
    }

    this.addListeners = function () {



        for (let index = 0; index < 4; index++) {

            let buttonId = "btn" + index;

            const answerOptionButton = document.getElementById(buttonId);
            let currentQuizAppObject = this;
            answerOptionButton.onclick = function (event) {
                const eventTarget = event.currentTarget;

                console.log("Button Clicked");
                console.log(eventTarget);

                const userSuppliedAnswer = eventTarget.children[0].innerHTML;
                console.log("userSuppliedAnswer");
                console.log(this);
                const qaOptionsPair = currentQuizAppObject.qaOptionsPairArray
                [currentQuizAppObject.pageIndex];
                const outcome =
                    qaOptionsPair.isCorrectAnswer(userSuppliedAnswer);
                if (outcome) {
                    console.log("correct answer");
                    currentQuizAppObject.incrementScore();
                }
                else {
                    console.log("Incorrect answer");
                }
                currentQuizAppObject.next();

            }
        }
    }
    this.next = function () {
        if (this.isLastQAPair()) {
            this.displayTheResultPage();
        }
        else {
            this.initNextPage();
        }
    }
    this.initNextPage = function () {
        this.pageIndex ++;
        this.addListeners();
        this.displayQuizPage();

    }
    this.displayQuizPage = function () {
        this.displayQASection();
        this.displayFooter();
    }
    
    this.displayQASection = function () {
        const qaOptionsPair = this.qaOptionsPairArray[this.pageIndex];

        const questionHTMLElement = document.getElementById("question");
        questionHTMLElement.innerHTML = qaOptionsPair.question.questionText;
        for (let index = 0; index < 4; index++) {
            let answerChoiceButtonId = "choice" + index;
            const answerChoiceHTMLButtonElement = document.getElementById(answerChoiceButtonId);
            answerChoiceHTMLButtonElement.innerHTML = qaOptionsPair.answerOptions[index].answerText;
        }
    }
    this.displayFooter = function () {
        const progressHtmlElement = document.getElementById("progress");
        progressHtmlElement.innerHTML = `Question ${this.pageIndex + 1} of 
           ${this.qaOptionsPairArray.length}`
    }
    this.displayTheResultPage = function () {
        const finalScoreHtmlFragment =
        `<h1>Result</h1>
        <h2 id='score'>Your scores: ${this.getScore()}. Percentage is ${this.calculateScorePercentage()}</h2>         
        `
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = finalScoreHtmlFragment;
    }


}

const qaOptionsPairArray = [questionAnswerOptionsPair1, questionAnswerOptionsPair2, questionAnswerOptionsPair3,
    questionAnswerOptionsPair4, questionAnswerOptionsPair5]

const quizApp = new QuizApplication(qaOptionsPairArray);
quizApp.init();


