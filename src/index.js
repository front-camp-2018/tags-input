"use strict";

const DEFAULT_TAGS = [
  {
    text: "tag1",
    key: Date.now() + 1
  },
  {
    text: "same awesame tag",
    key: Date.now() + 2
  }
];

const $app = document.getElementById('app');
const $errorMassage = document.getElementsByClassName("error-massage");
const $tagsList = document.getElementsByClassName("tags-list");
const tagsArr = [
  [],
  [...DEFAULT_TAGS]
];

$app.addEventListener('keyup',({key, target}) => {
  if (target.classList.value.indexOf('tags-input') !== -1) {
    const tag = target.value.trim();
    const indexElement = target.getAttribute('data-ind');

    $errorMassage[indexElement].style.display = "none";
    
    if (key === "Enter" && tag) {
        target.value = "";

        const isElementExist = tagsArr[indexElement].find(el => el.text === tag);

        if (isElementExist) {
          $errorMassage[indexElement].style.display = "block";
          return;
        }
        
        const $el = createTagElement(tag, indexElement);
        $tagsList[indexElement].appendChild($el);
        tagsArr[indexElement].push({ text: tag, key: $el.getAttribute("data-key") });
    }
  }
});

$app.addEventListener("click", event => {
  let target = event.target;
  if(target.classList.value.indexOf('remove-btn') !== -1) {
    const $li = target.closest('li');
    tagsArr[$li.getAttribute("data-index")].splice(tagsArr.findIndex(el => el.key === $li.getAttribute("data-key")), 1);
    target.closest('ul').removeChild($li)
  }
});


const createTagElement = (content, index) => {
  const $li = document.createElement("li");

  $li.className = "tags-list-item";
  $li.dataset.index = index;
  $li.dataset.key = Date.now();
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;

  return $li;
};

const init = () => {
  tagsArr[1].forEach(tagValue => {
    const $el = createTagElement(tagValue.text,1);
    $tagsList[1].appendChild($el);
  });
};

init();
