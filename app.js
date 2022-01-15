document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name:'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name:'hotdog',
            img:'images/hotdog.png'
        },
        {
            name:'ice-cream',
            img:'images/ice-cream.png'  
        },
        {
            name:'ice-cream',
            img:'images/ice-cream.png'
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
        }
    ]

    //card options
    const bossArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name:'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name:'ice-cream',
            img:'images/ice-cream.png'  
        },
        {
            name:'milkshake',
            img:'images/milkshake.png'
        },
        {
            name:'pizza',
            img:'images/pizza.png'
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
    const cards = document.querySelectorAll('img')
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
      resultDisplay.textContent = 'Congratulations! You found ' + bossArray[bossId].name + '!'
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
        } else {
            ++bossId
            boss.setAttribute('src', bossArray[bossId].img)
        } 
      }
    }, 1000);
  }

  function startGame() {
    if(startButton.textContent === 'Restart') {
        bossId = 0
        startButton.textContent = 'Start'
        totalResult = 0
    }
    else if (bossId != 0) {
        ++bossId
    }

    //cardArray.sort(() => 0.5 - Math.random()) //to reset and mix up the positions END
    // Random the cards
    shuffle(cardArray)

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