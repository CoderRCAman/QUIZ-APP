

const  quizDB = [
    {
        question: "Q1: The working principle of a washing machine is",
        a: "Reverse osmosis",
        b: "Diffusion",
        c: "Centrifugation",
        d: "Dialysis",
        ans: "ans3"
    },
    {
        question: " Q2: Nuclear sizes are expressed in a unit named",
        a: "Fermi",
        b: "Angstrom",
        c: "Newton",
        d: "Tesla",
        ans: "ans1"
    },

    {
        question: " Q3: The speed of light will be minimum while passing through",
        a: "Water",
        b: "Vacum",
        c: "Air",
        d: "Glass",
        ans: "ans4"
    },{
        question: "Q4: Which of the following is not a vector quantity",
        a: "Speed",
        b: "Velocity",
        c: "Torque",
        d: "Displacement",
        ans: "ans1"
    }
];


const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');
const answers = document.querySelectorAll('.answer');
const showScore = document.querySelector('#showScore');

let questionCount = 0;
let score = 0


const loadQuestion = () => {
    
    const questionList = quizDB[questionCount];

    question.innerText = questionList.question;
    
    option1.innerText = questionList.a;
    option2.innerText = questionList.b;
    option3.innerText = questionList.c;
    option4.innerText = questionList.d;

}

const deselectAll = () => {
    answers.forEach(currCheckedAns => currCheckedAns.checked = false);
}


loadQuestion();

const getCheckAnswer = () => {

    let answer;

    answers.forEach(curAnsElem => {
        if(curAnsElem.checked) {
            answer = curAnsElem.id
        }
    })

    return answer;

}


submit.addEventListener('click', () => {
   
        const checkedAnswer = getCheckAnswer();
        console.log(checkedAnswer);

        if (checkedAnswer === quizDB[questionCount].ans) {
            score++;
        }
        // else{
        //     console.log("no");
        // }

        questionCount++;
        deselectAll();

        if (questionCount < quizDB.length) {
            loadQuestion();
       
        } else {
            showScore.innerHTML = `
            <h3> You scored ${score}/${quizDB.length} ✌</h3>

            <button class="btn" onclick="location.reload()">Play Again</button>
        `;

            showScore.classList.remove('scoreArea');
            //TO DO
            //update score to datbase 
            const { email } = Qs.parse(location.search, {
                ignoreQueryPrefix: true
            });
            axios({
                method: 'post',
                url: '/updatescore',
                data: {
                    score: score,
                    email:email
                }
              });
              
        }
});

//redirect profile route
