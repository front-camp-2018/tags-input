'use strict';

const $tagsInput = document.getElementById('tags-input');
const $tagsList = document.getElementById('tags-list');
const $clearBtn = document.getElementById('clear-btn');
const myStorage = window.localStorage;
const tagsArr = myStorage.getItem('tags') ? myStorage.getItem('tags').split(',') : ['singularity'];

$tagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArr.includes(target.value);

    if (!isElementExist) {
      $tagsList.appendChild($el);
      tagsArr.push(target.value);
      myStorage.setItem('tags', tagsArr);
      target.value = '';
    }
  }
});

$tagsList.addEventListener('click', event => {
  const {target} = event;
  const sib = target.previousSibling.previousSibling.innerText;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $removeList = target.parentElement.parentElement;
  const $tag = target.parentElement;
  const index = tagsArr.indexOf(sib);

  if (isRemoveBtn) {
    $removeList.removeChild($tag);
    tagsArr.splice(index, 1);
    if(tagsArr.length === 0){
      myStorage.removeItem('tags');
    }else {
      myStorage.setItem('tags', tagsArr);
    }
    // TODO: remove element from array
    // tagsArr.splice();
  }
});

$clearBtn.addEventListener('click', () => {
  myStorage.removeItem('tags');
  $tagsList.innerHTML = '';
});

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;

  return $li;
};

const init = () => {
  tagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsList.appendChild($el);
  });
};

init();
