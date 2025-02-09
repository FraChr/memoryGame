// Krav
// Spillet skal ha et rutenett med kort (f.eks 4x4)
// Kortene skal være synlige når de klikkes på, og skjules hvis de ikke matcher
// Kortene skal inneholde bilder av (søte) dyr
// Når alle parene er matchet skal det vises en melding om at spillet er over

// 1. make function to look for clicks
// 2. show function based on clicked square{
//    set base img to at start.
//    dynamicly set img to card if clicked
// }
// 3. hide function if img not same{
//    dynamicly reset clicked img to base img if not equal
//    if equal make img presistent
// }
// 4. keep showing img that are same

let currentId;
let clickedIds = [];
let counter = 1;
let imgNames = [
  "Bolla-gjeip",
  "bolla",
  "lexi",
  "liam",
  "lucifer",
  "Simba",
  "simba2",
  "lexi-gjeip",
];
document.addEventListener("DOMContentLoaded", () => {
  drawGame();
});

function drawGame() {
  let elementIds = createImgId(16);
  let cardElements = makeCards(elementIds, imgNames);
  let shuffledElements = shuffleElements(cardElements);
  // document.getElementById("app").innerHTML = shuffledElements.join("");
  let app = document.getElementById("app");
  app.innerHTML = shuffledElements.join("");
}

function makeCards(ids, imgs) {
  let cardElements = [];
  for (let i = 0; i < imgs.length * 2; i++) {
    let index = Math.floor(i / 2);
    cardElements.push(makeCardHtml(ids[i], imgs[index]));
  }
  return cardElements;
}

function makeCardHtml(id, img) {
  return /*html*/ `
        <div id="${id}" class="card" ><img id="${img}" style="box-shadow: 7px 8px 9px;" src="/img/front.png"/></div>
    `;
}

function listener(app) {
  app.forEach((e) => {
    e.addEventListener("click", () => {
      let clickedId = e.id;
      revealCard(clickedId);
      console.log("listener return id: ", e.id);
    });
  });
}

function revealCard(id, imgFileName) {
  // imageElement = /*html*/ `
  //   <img style="box-shadow: 7px 8px 9px;" src="/img/${imgFileName}.jpg"/>
  // `;
  document.getElementById(id).innerHTML = /*html*/ `
    <img style="box-shadow: 7px 8px 9px;" src="/img/${imgFileName}.jpg"/>
  `;
  currentId = id;
  console.log("id in revealCard", id);
  equalityImgCheck(id);
  // drawGame();
}

function equalityImgCheck(id) {
  // timeOutLength set in ms
  let timeOutLength = 1100;
  let boardClearedTimer = 500;

  clickedIds.push(id);
  for (let i = 0; i < clickedIds.length; i++) {
    if (clickedIds.length == 2) {
      let className = clickedIds[0].slice(0, 2);
      let className2 = clickedIds[1].slice(0, 2);

      if (className != className2) {
        setTimeout(() => {
          turnWrongPair();
          clickedIds = [];
        }, timeOutLength);
      } else {
        setTimeout(() => {
          const ids = [...clickedIds];
          console.log("clickedIds", clickedIds);
          console.log("ids", ids);
          document.getElementById(ids[0]).style.opacity = 0.5;
          document.getElementById(ids[1]).style.opacity = 0.5;

          counter++;

          // document.getElementById(
          //   clickedIds[0]
          // ).innerHTML = '';
          // document.getElementById(
          //   clickedIds[1]
          // ).innerHTML = '';

          clickedIds = [];
        }, timeOutLength);
      }
      if (counter == 8) {
        setTimeout(() => {
          document.getElementById("text").innerHTML = /*html*/ `
            <h2>Gratulerer du er ferdig!</h2>
           `;
          document.getElementById("app").innerHTML = /*html*/ ``;
        }, boardClearedTimer);
      }
    }
  }
}

function turnWrongPair() {
  clickedIds.forEach((element) => {
    document.getElementById(element).innerHTML = /*html*/ `
        <img style="box-shadow: 7px 8px 9px;" src="/img/front.png"/>
        `;
  });
}

function createImgId(amount) {
  let num = 1;
  let arr = [];
  for (let i = 0; i < amount; i++) {
    let num2 = (i % 2) + 1;
    if (num2 === 1 && i > 0) {
      num++;
    }
    arr.push(`c${num}-${num2}`);
  }
  return arr;
}

// Fisher-Yates Shuffle
function shuffleElements(elements) {
  let newElements = [...elements];
  for (let i = newElements.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    let temp = newElements[i];
    newElements[i] = newElements[j];
    newElements[j] = temp;
  }
  return newElements;
}
