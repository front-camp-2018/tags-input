'use strict';

const $tagsInput = document.getElementById('tags-input');
const $tagsDefaultInput = document.getElementById('tags-input-2');
const $tagsList = document.getElementsByTagName('ul');
const tagsArr = ['1', 'super tag'];


$tagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArr.includes(target.value);
    const listNumb = target.getAttribute('numb');
      
    if (!isElementExist) {
      $tagsList[listNumb].appendChild($el);
      tagsArr.push(target.value);
      target.value = '';
    }
  }
});

$tagsDefaultInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArr.includes(target.value);
    const listNumb = target.getAttribute('numb');
      
    if (!isElementExist) {
      $tagsList[listNumb].appendChild($el);
      tagsArr.push(target.value);
      target.value = '';
    }
  }
});

$tagsList[0].addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);
    tagsArr.splice(tagsArr.indexOf($tag.children[0].innerText));;
  }
});

$tagsList[1].addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);
    tagsArr.splice(tagsArr.indexOf($tag.children[0].innerText));
  }
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

    $tagsList[1].appendChild($el);
  });
};

init();
