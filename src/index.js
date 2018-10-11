'use strict';

const $tagsInput = document.getElementById('tags-input');
const $tagsList = document.getElementById('tags-list');
const $tagsInput2 = document.getElementById('tags-input-2');
const $tagsList2 = document.getElementById('tags-list-2');
const tagsArr = {
  'tags-list': [],
  'tags-list-2': ['1', 'super tag']
};

$tagsInput.addEventListener('keyup', tagsInput);
$tagsInput2.addEventListener('keyup', tagsInput);

function tagsInput(event) {
  //console.log(event.target.value);
  const $elem = createElement(event.target.value);
  const inputTags = event.target.dataset.list;
  const $gettagsLists = document.getElementById(event.target.dataset.list);
  //console.log(inputTags);
  //console.log($gettagsLists);
  if (event.code === 'Enter' && event.target.value.trim()) {


    const isElement = tagsArr[inputTags].includes(event.target.value);

    if (!isElement) {
      tagsArr[inputTags].push(event.target.value);
      $gettagsLists.appendChild($elem);
      event.target.value = '';

    }
  }
}

[$tagsList, $tagsList2].forEach($currentTagsList => {
  $currentTagsList.addEventListener('click', event => {
    const isRemoveBtn = event.target.classList.contains('remove-btn');
    const $foo = event.target.parentElement.parentElement;
    const $tag = event.target.parentElement;
    //console.error($foo);
    //console.error($tag);
    if (isRemoveBtn) {
      $foo.removeChild($tag);
      const indexDeleteItem = tagsArr[$currentTagsList.id].indexOf(event.target.parentElement.firstChild.nextSibling.innerHTML);
      //console.log(indexDeleteItem);
      tagsArr[$currentTagsList.id].splice(indexDeleteItem, 1);
    }
  });
});


const createElement = content => {
  const $element = document.createElement('li');
  $element.className = 'tags-list-item';
  $element.innerHTML = `
  <span class="tag-name">${content}</span>
  <span class="remove-btn">x</span>
`;

  return $element;
};

const init = () => {
  tagsArr['tags-list-2'].forEach(tagValue => {
    const $el = createElement(tagValue);

    $tagsList2.appendChild($el);
  });
};

init();