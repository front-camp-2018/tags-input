/* 
  ED - edited code
  NEW - new code

  Improvements:
  - added Input with default tags
  - made separated logic  for user and default tags, to make it more obvious
  - modified isElementExist check
  - additional check isNotOperator 
  - added limitation for the max length of input value 
*/
'use strict';

const $tagsInput = document.getElementById('tags-input');
const $tagsList = document.getElementById('tags-list');
const $tagsInputDefault = document.getElementById('default-tags-input');//NEW
const $tagsListDefault = document.getElementById('default-tags-list');//NEW
const tagsArr = []; //ED - epmpty array for user tags
const tagsArrDefault = ['some', 'default', 'tags']; //NEW - for default tags 

function isNotOperator(arr) { //NEW - additional check for operators
  if(arr.includes('-') || arr.includes('+') 
    || arr.includes('=') || arr.includes('%') || arr.includes('*')
    || arr.includes('$') || arr.includes('#') || arr.includes('^')
    || arr.includes('@') || arr.includes('!') || arr.includes('&')
    || arr.includes('(') || arr.includes(')') || arr.includes(',')
    || arr.includes('.') || arr.includes('>') || arr.includes('<')
    || arr.includes('_') || arr.includes('?') || arr.includes('|')
    || arr.includes(';') || arr.includes(':') || arr.includes("'")
    || arr.includes('"') || arr.includes('`') || arr.includes('~')) {
      return false;
  }
  else {
      return true;
  }
}

$tagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = (tagsArr.includes(target.value) || tagsArrDefault.includes(target.value)); //ED - added check for new default tags array  
    const check = target.value.split('');//NEW - additional check
    
    if (!isElementExist && isNotOperator(check)) {
      $tagsList.appendChild($el);
      tagsArr.push(target.value);
      target.value = '';
    }
  }
});

$tagsInputDefault.addEventListener('keyup', ({key, target}) => { // NEW - Event Listener for input with default tags
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = (tagsArr.includes(target.value) || tagsArrDefault.includes(target.value)); //ED - check for new default tags array  
    const check = target.value.split('');//NEW - additional check

    if (!isElementExist && isNotOperator(check)) {
      $tagsListDefault.appendChild($el);
      tagsArrDefault.push(target.value);
      target.value = '';
    }
  }
});

$tagsList.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $list= target.parentElement.parentElement;
  const $tag = target.parentElement;
  
  if (isRemoveBtn) {
    $list.removeChild($tag);
    tagsArr.splice(tagsArr.indexOf($tag.value), 1);//NEW - delete element from array
  }
});

$tagsListDefault.addEventListener('click', event => { //NEW - added new event listener for removing default tags
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $list= target.parentElement.parentElement;
  const $tag = target.parentElement;
  
  if (isRemoveBtn) {
    $list.removeChild($tag);
    tagsArrDefault.splice(tagsArrDefault.indexOf($tag.value), 1);//NEW - delete element from array
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

    $tagsList.appendChild($el);
  });
  tagsArrDefault.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsListDefault.appendChild($el);
  });
};

init();
