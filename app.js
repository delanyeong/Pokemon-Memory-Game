document.addEventListener('DOMContentLoaded', () => {

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

const startButton = document.querySelector('#startButton')
const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
const titleDisplay = document.querySelector('#title')
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
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      pb1.setValue(Math.floor(cardsWon.length*100/6))
      setTimeout(function() { alert('You found a match') }, 500)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry, try again')
    }

    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length + totalResult
    if  (cardsWon.length === cardArray.length/2) {
        titleDisplay.textContent = 'Congratulations! You caught ' + bossArray[bossId].name + '!'
    }
  }



//flip your card
function flipCard() {
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

  var myInterval = null;
  //timer
  function startTimer(duration, display) {
    clearInterval(myInterval);
    var timer = duration,
      minutes, seconds;
  
    myInterval = setInterval(function() {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
  
      if (--timer < 0) {
        timer = duration;
        
        // clear the interal
        clearInterval(myInterval);
        alert("Time's Up!")
      } else if (cardsWon.length === cardArray.length/2) {
        timer = duration;
        clearInterval(myInterval);
        setTimeout(function() { alert("Congrats!") }, 500)
        if (bossId === bossArray.length - 2) {
            startButton.textContent = 'Restart'
            boss.setAttribute('src', bossArray[bossArray.length-1].img) //so that last pic appears, before that no appearing
        } else {
            ++bossId
            boss.setAttribute('src', bossArray[bossId].img)
        } 
      }
    }, 1000);
  }

  function startGame() {
    startButton.textContent = 'Reset'
    if(startButton.textContent === 'Restart') {
        bossId = 0                                  //what start button after restart appears; start will reappear and score 0
        startButton.textContent = 'Reset'
        resultDisplay.textContent = 0
    }
    else if (bossId != 0 && cardsWon.length === cardArray.length/2) { //what start button do to go next level; but not allowing if not finished
        ++bossId
    } else if (cardsWon.length !== cardArray.length/2) {              //what start button do when want to reset halfway
        bossId = 0
        resultDisplay.textContent = 0
        time = 300
    }

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

    totalResult += cardsWon.length
    
    // Reset arrays
    cardsChosen = []
    cardsChosenId = []
    cardsWon = []

    // Reset title
    titleDisplay.textContent = "Who's that Pokemon?"

    // Reset progress bar
    pb1.setValue(Math.floor(cardsWon.length*100/6))

    // Reset timer
    var time = 300,
    display = document.querySelector('#time');
    startTimer(time, display)
  }

  function shuffle (array) {
    for(let i = array.length - 1; i > 0 ; i--) {
        let j = Math.floor(Math.random() * (i+1))
        [array[i], array[j]] = [array[j], array[i]]
    }
}
  
  startButton.addEventListener("click", startGame)
  
  createBoard();

})