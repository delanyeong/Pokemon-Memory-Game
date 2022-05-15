document.addEventListener('DOMContentLoaded', () => {

    const splash = document.querySelector('.splash')
    
    splash.addEventListener("click", function() {
        splash.classList.add('display-none')
    }
    )

    const buttons = document.querySelectorAll('a');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {

            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripples = document.createElement('hi');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove()
            }, 1000);
        })
    })

    //card options
    const cardArray = [
        {
            name: 'greenball',
            img: 'images/greenball.png'
        },
        {
            name: 'greenball',
            img: 'images/greenball.png'
        },
        {
            name: 'heartball',
            img: 'images/heartball.png'
        },
        {
            name: 'heartball',
            img: 'images/heartball.png'
        },
        {
            name:'pinkball',
            img: 'images/pinkball.png'
        },
        {
            name:'pinkball',
            img:'images/pinkball.png'
        },
        {
            name:'bredball',
            img:'images/bredball.png'  
        },
        {
            name:'bredball',
            img:'images/bredball.png'
        },
        {
            name:'blackball',
            img:'images/blackball.png'
        },
        {
            name:'blackball',
            img:'images/blackball.png'
        },
        {
            name:'blueball',
            img:'images/blueball.png'
        },
        {
            name:'blueball',
            img:'images/blueball.png'
        }
    ]

    //card options
    const bossArray = [
        {
            name: 'Gyarados',
            img: 'images/shgyarados.png'
        },
        {
            name: 'Gyarados',
            img: 'images/gyarados.png'
        },
        {
            name:'Bruxish',
            img: 'images/shbruxish.png'
        },
        {
            name:'Bruxish',
            img:'images/bruxish.png'  
        },
        {
            name:'Loudred',
            img:'images/shloudred.png'
        },
        {
            name:'Loudred',
            img:'images/loudred.png'
        },
        {
            name:'Gastly',
            img:'images/shgastly.png'
        },
        {
            name:'Gastly',
            img:'images/gastly.png'
        },
        {
            name:'Quagsire',
            img:'images/shquagsire.png'
        },
        {
            name:'Quagsire',
            img:'images/quagsire.png'
        },
        {
            name:'Gastly again!',
            img:'images/shgastly2.png'
        },
        {
            name:'Gastly again!',
            img:'images/gastly2.png'
        },
        {
            name:'Psyduck',
            img:'images/shpsyduck.png'
        },
        {
            name:'Psyduck',
            img:'images/psyduck.png'
        }
    ]

    //Constructor for Healthbar
class ProgressBar {
    constructor (element, initialValue = 0) {
        this.valueElem = element.querySelector('.progress-bar-value');
        this.fillElem = element.querySelector('.progress-bar-fill');

        this.setValue(initialValue);
    }

    setValue (newValue) {
        if (newValue < 0) {
            newValue = 0
        }

        if (newValue > 100) {
            newValue = 100;
        }
        this.value = newValue
        this.update();
      }

      update() {
          const percentage = this.value + '%';

          this.fillElem.style.width = percentage;
          this.valueElem.textContent = percentage;
      }

}

var bgMusic = new Audio('audio/instrumental.mp3')
bgMusic.loop = true

var whoThat = new Audio('audio/whothat.mp3')

var cardSound = new Audio ('audio/cardpress2.mp3')
// cardSound.playbackRate = 1.6

var pokeFound = new Audio ('audio/found2.mp3')

var volume = document.querySelector("#volume-control");
volume.defaultValue = 10
volume.addEventListener("input", function(e) {
    bgMusic.volume = e.currentTarget.value / 100;
})
volume.dispatchEvent(new Event('input'))

const startButton = document.querySelector('#startButton')
const resetButton = document.querySelector('#resetButton')
let gameReset = false;
const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
const titleDisplay = document.querySelector('#title')
const alertDisplay = document.querySelector('#alert')
let totalResult = 0;
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []
const pb1 = new ProgressBar(document.querySelector('.progress-bar'), Math.floor(cardsWon.length*100/6))
const boss = document.querySelector('.mugshot')
let bossId = 0;
boss.setAttribute('src', bossArray[bossId].img)

//create your board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        card.setAttribute('src', 'images/white.png')
        card.setAttribute('data-id', i)
        grid.appendChild(card)
    }
}


//check for matches
function checkForMatch() {
    const cards = grid.children
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alertDisplay.textContent = 'You have clicked the same image!'
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      pb1.setValue(Math.floor(cardsWon.length*100/6))
      setTimeout(function() { alertDisplay.textContent = 'You found a match' }, 500)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alertDisplay.textContent = 'Sorry, try again'
    }

    cardsChosen = []
    cardsChosenId = []
    // resultDisplay.textContent = cardsWon.length + totalResult
    if  (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = cardsWon.length/6 + totalResult
        titleDisplay.textContent = 'Congratulations! You caught ' + bossArray[bossId].name + '!'
    }
  }



//flip your card
function flipCard() {
    if (cardsChosen.length < 2) {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        cardSound.play()
    }
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
        setTimeout(function() {alertDisplay.textContent = "Gotta Catch 'em All!"}, 1500)
    }
}


//TIMER
  var myInterval = null;
  
  function startTimer(duration, display) {
    clearInterval(myInterval);
    display.style.color = "#FFFFFF"
    display.style.visibility = 'visible'
    var timer = duration,
      minutes, seconds;
  
    myInterval = setInterval(function() {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;

      if (timer <= 30){
        display.style.color = "#FF0000"
        display.style.visibility = 'visible'
        if(timer > 0 && cardsWon.length < cardArray.length/2)
            setTimeout(function(){ display.style.visibility = 'hidden' }, 800)
      }

      
  
      if (--timer < 0) {
        timer = duration;
        
        // Time Stop when time is up
        clearInterval(myInterval);
        alertDisplay.textContent = "Time's Up!"
        startButton.textContent = 'Restart'
        congratulations()
        display.style.visibility = 'visible'
      } 
      else if (cardsWon.length === cardArray.length/2) { //stop the time when board is cleared (level won)
        startButton.textContent = "Next Level"
        timer = duration;
        clearInterval(myInterval);
        setTimeout(function() { alertDisplay.textContent = "Congrats!" }, 500)
        ++totalResult

        if (bossId === bossArray.length - 2) { //stop the time when round is won + change button to restart when all boards are cleared
            startButton.textContent = 'Restart'
            boss.setAttribute('src', bossArray[bossArray.length-1].img) //so that last pic appears, before that no appearing
            pokeFound.play()
            congratulations()
            display.style.visibility = 'visible'
        } else {                              //stop the time when round is won + if condt not true -> next level
            ++bossId
            boss.setAttribute('src', bossArray[bossId].img)
            pokeFound.play()
        } 
      }
    }, 1000); //timer function repeat every second to reflect a timer
  }
  //END OF TIMER

  //START GAME
  function startGame() {
    alertDisplay.textContent = "Gotta Catch 'em All!"
    if(startButton.textContent === 'Restart' || gameReset) { //gameReset(linked to reset game) so that dont have to hard code the startGame function. if no gameReset condt it will not execute bc only restart condt
        bossId = 0                                  //what start button after restart appears; start will reappear and score 0
        startButton.textContent = 'Start'
        totalResult = 0
        whoThat.play()
    }
    else if (bossId != 0 && cardsWon.length === cardArray.length/2) { //what start button do to go next level; but not allowing if not finished
        ++bossId
        whoThat.play()
    }
    else if (bossId === 0) {
        bgMusic.play()
        whoThat.play()
    }

    resultDisplay.textContent = totalResult

    cardArray.sort(() => 0.5 - Math.random()) //to reset and mix up the positions END
    // Random the cards
    //shuffle(cardArray)

    // Set cards on grid to default
    const cards = grid.children
    for(let i = 0; i < cards.length; i++) {
        cards[i].setAttribute('src', 'images/blank.png')
        cards[i].addEventListener('click', flipCard) //invoke flipcard function
    }

    boss.setAttribute('src', bossArray[bossId].img)
    
    // Reset arrays
    cardsChosen = []
    cardsChosenId = []
    cardsWon = []

    // Reset title
    titleDisplay.textContent = "Who's that Pokemon?"

    // Reset progress bar
    pb1.setValue(Math.floor(cardsWon.length*100/6))

    // Reset timer
    var time = 90 - (bossId*5)
    display = document.querySelector('#time')
    startTimer(time, display)
  }
  //END OF START GAME

  //RESET GAME
  function resetGame () {
    gameReset = true
    startGame()
    gameReset = false
  }
  //END OF RESET GAME

  //SHUFFLE CARDS
  function shuffle (array) {
    for(let i = array.length - 1; i > 0 ; i--) {
        let j = Math.floor(Math.random() * (i+1))
        [array[i], array[j]] = [array[j], array[i]]
    }
  }
//END OF SHUFFLE CARDS
let closeicon = document.querySelector(".close");
const modal = document.querySelector("#popup1")
const congratsMsg = document.querySelector(".content-1")

function congratulations() {
    congratsMsg.textContent = "Congratulations! You caught " + totalResult + " out of " + bossArray.length / 2 + " Pokemon!"

    // show congratulations modal
    modal.classList.add("show");
  
    //closeicon on modal
    closeModal();
  }
  
  // @description close icon on modal
  function closeModal() {
    closeicon.addEventListener("click", function (e) {
      modal.classList.remove("show");
    });
  }
  
  startButton.addEventListener("click", startGame)
  resetButton.addEventListener("click", resetGame)
  
  createBoard()
})

//testing2