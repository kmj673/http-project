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

const generateBtn = document.querySelector("button");
const wordDom = document.querySelector("span");

const setGlobalData = async () => {
  const fetchResult = await fetch(link, options);
  const finalResult = await fetchResult.json();
  data = finalResult;
  wordOfTheDay = data[0];
  wordDom.innerText = `"${wordOfTheDay}"`;
  return data;
};

// setGlobalData()

/*^^^^^^^^^^^^^^^^ end ^^^^^^^^^^^^^^^^^^^ generate random word */

/*------start------------ random word and get definitions  */

// let searchForm = document.querySelector("#search");
// let searchWord = searchForm.querySelector("input");
// let searchButton = searchForm.querySelector("button");

function search(e, searchWord) {
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
  let array10Words = setGlobalData();
  array10Words
    .then((response) => {
      let todayWord = response[0];
      return todayWord;
    })
    .then((response) => {
      search(event, response);
    });
});

/*^^^^^^^^^^^^^^^^ end ^^^^^^^^^^^^^^^^^^^ random word and get definitions */
