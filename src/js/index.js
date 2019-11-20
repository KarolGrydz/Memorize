import '../styles/index.scss';
import '../styles/index.scss';

const colors = [
  'green',
  'green',
  'yellow',
  'yellow',
  'red',
  'red',
  'blue',
  'blue',
  'orange',
  'orange',
  'purple',
  'purple',
  'pink',
  'pink',
  'cyan',
  'cyan',
  'brown',
  'brown'
];

let getCards = document.querySelectorAll('div');

let allCards = [...getCards];

let activeCard;
const activeCards = [];

const gamePairs = allCards.length / 2;
let gameResult = 0;

let getFieldTime = document.querySelector('.time');
let sec = 0,
  milisec = 0,
  milimilisec = 0;

const clickCard = function() {
  activeCard = this;

  if (activeCard == activeCards[0]) return;

  activeCard.classList.remove('hidden');

  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    allCards.forEach(card => card.removeEventListener('click', clickCard));
    activeCards[1] = activeCard;

    setTimeout(function() {
      if (activeCards[0].className === activeCards[1].className) {
        activeCards.forEach(card => card.classList.add('off'));
        gameResult++;
        allCards = allCards.filter(card => !card.classList.contains('off'));
        if (gameResult == gamePairs) {
          alert(`Brawo! Koniec gry, Twój czas to ${sec} sekund`);
          location.reload();
        }
      } else {
        activeCards.forEach(card => card.classList.add('hidden'));
      }

      activeCard = '';
      activeCards.length = 0;

      allCards.forEach(card => card.addEventListener('click', clickCard));
    }, 500);
  }
};

const init = function() {
  allCards.forEach(card => {
    card.removeEventListener('click', init);
    card.classList.remove('hidden');
  });

  for (let card of allCards) {
    let color = Math.floor(Math.random() * colors.length);
    card.classList.add(colors[color]);
    colors.splice(color, 1);
  }

  setTimeout(() => {
    allCards.forEach(card => {
      card.classList.add('hidden');
      card.addEventListener('click', clickCard);
    });
  }, 1000);

  setInterval(function() {
    milimilisec++;
    if (milimilisec == 10) {
      milimilisec = 0;
      milisec++;
    }

    if (milisec == 10) {
      milisec = 0;
      sec++;
    }
    getFieldTime.innerHTML = `Twój czas to ${sec}:${milisec}${milimilisec} sekund`;
  }, 10);
};

allCards.forEach(card => {
  card.classList.add('hidden');
  card.addEventListener('click', init);
});
