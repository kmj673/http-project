/*------start------------ generate random word -------------------- */
const link =
  "https://random-words5.p.rapidapi.com/getMultipleRandom?count=10&wordLength=5";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "random-words5.p.rapidapi.com",
    "x-rapidapi-key": "11c9d0aad2msh5e9b84b925c48abp13a7d3jsn79a559ddbd6f",
  },
};

let data;
let wordOfTheDay;

// const getData = async () => {
//   const fetchResult = await fetch(link, options);
//   const finalResult = await fetchResult.json();
//   // console.log(finalResult);
//   return finalResult;
// };

let myWords = [];

const generateBtn = document.querySelector("button");
const wordDom = document.querySelector("span");

const setGlobalData = async () => {
  const fetchResult = await fetch(link, options);
  const finalResult = await fetchResult.json();
  data = finalResult;
  wordOfTheDay = data[0];
  myWords = [...myWords, wordOfTheDay]; // add the words to an array
  updateLocalStorageForMyWords();
  wordDom.innerText = `"${wordOfTheDay}"`;
  console.log(myWords);
  renderMyWords(myWords);
  return wordOfTheDay;
};

// setGlobalData()

/*^^^^^^^^^^^^^^^^ end ^^^^^^^^^^^^^^^^^^^ generate random word */

/*------start------------ random word and get definitions  */

// let searchForm = document.querySelector("#search");
// let searchWord = searchForm.querySelector("input");
// let searchButton = searchForm.querySelector("button");

function getDefinition(e, searchWord) {
  e.preventDefault();
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      let meanings = json[0].meanings;
      console.log(`-----------------${json[0].word}----------------`);
      for (let defs of meanings) {
        console.log(defs.partOfSpeech);
        for (let def of defs.definitions) {
          console.log(def);

          meaningDom.innerText = `Definition: "${def.definition}"
          Example: "${def.example}"
          `;
        }
      }
      console.log(`--------------------------------------`);
    })
    .catch((err) => {
      console.error(err);
    });
}

// searchForm.addEventListener("submit", search);

generateBtn.addEventListener("click", (event) => {
  let todayWord = setGlobalData();
  todayWord.then((word) => {
    getDefinition(event, word);
  });
});

/*^^^^^^^^^^^^^^^^ end ^^^^^^^^^^^^^^^^^^^ random word and get definitions */

const meaningDom = document.querySelector(".meaning");
const myWordsDom = document.querySelector(".my-words");

function renderMyWords(array) {
  myWordsDom.innerHTML = "";
  array.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("list-of-my-words");
    div.textContent = element;
    myWordsDom.appendChild(div);
  });
}

myWordsDom.addEventListener("click", (e) => {
  let targetedWord = e.target.innerText;

  getDefinition(e, targetedWord);
  wordDom.innerText = `"${targetedWord}"`;
});

//localStorage

function updateLocalStorageForMyWords() {
  localStorage.setItem("myWords", JSON.stringify(myWords));
}

if (localStorage.getItem("myWords")) {
  myWords = JSON.parse(localStorage.getItem("myWords"));
  renderMyWords(myWords);
}

// filter array in dom myWords

function filterArrayInDom() {
  let array = [...myWords];

  let aZArray = array.sort();
  console.log(aZArray);
  renderMyWords(aZArray);
}

const checkboxAZ = document.querySelector("#checkbox");

checkboxAZ.addEventListener("click", (e) => {
  if (checkboxAZ.checked) {
    filterArrayInDom();
  } else {
    renderMyWords(myWords);
  }
});
