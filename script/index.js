// console.log("this is connected")

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) // promise of json data
    .then((json) => displayLesson(json.data));
}

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord=(id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn)
      clickBtn.classList.add("active"); // add active class
    displayLevelWord(data.data)
  })
}

// {
//     "word": "Hesitate",
//     "meaning": "দ্বিধা করা",
//     "pronunciation": "হেজিটেট",
//     "level": 2,
//     "sentence": "Don't hesitate to ask questions in class.",
//     "points": 2,
//     "partsOfSpeech": "verb",
//     "synonyms": [
//         "pause",
//         "waver",
//         "doubt"
//     ],
//     "id": 8
// }

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails (details.data);
}
const displayWordDetails = (word) => {
  console.log(word); 
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div>
          <h2 class=" text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:
          ${word.pronunciation})</h2>
        </div>
        <div>
          <h2 class="font-bold">meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h2 class="font-bold">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
          <span class="btn">syn 1</span>
          <span class="btn">syn 2</span>
          <span class="btn">syn 3</span>
        </div>
  `;
  document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
    <img class="mx-auto" src="./assets/alert-error.png"/>
      <p class="text-xl font-medium text-gray-500 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bold text-5xl">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    return
  }

//   {
//     "id": 102,
//     "level": 2,
//     "word": "Night",
//     "meaning": "রাত্রি",
//     "pronunciation": "নাইট"
// }

  words.forEach(word => {
    const card = document.createElement('div');
    card.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
      <h2 class="font-bold text-xl">${word.word? word.word : "শব্দ পাওয়া যায় নি"}</h2>
      <p class="font-se">Meaning /Pronounciation</p>
      <div class="font-medium text-2xl font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ?word.pronunciation :"পাওয়া যায় নি"}"</div>
      <div class="flex justify-between items-center">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#96ccff2e] hover:bg-[#609ad0cd]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#96ccff2e] hover:bg-[#54a3eecd]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    `
    wordContainer.append(card)
  })
}

const displayLesson = (lessons) => {
  // 1.get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2.get into the lessons
  for (let lesson of lessons) {
    // 3.create element 
    console.log(lesson)
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `
    // 4.append into container 
    levelContainer.append(btnDiv);
  }

}

loadLessons();