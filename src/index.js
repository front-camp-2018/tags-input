'use strict';

const $tagsInputFirst = document.getElementById('tags-input-1');
const $tagsInputSecond = document.getElementById('tags-input-2');
const $tagsList = document.getElementsByClassName('tags-list');
const $modal = document.getElementById('question'); // modal window
const $btnsInModal = $modal.getElementsByClassName('btn');  // buttons Remove and Close in modal window
const $btnCloseInModal = document.getElementById('close-btn');  // span-button to close modal window
const tagsArrFirst = [];  // array for first input
const tagsArrSecond = ['tag1', 'some awesome tag'];   // array for second input

$tagsInputFirst.addEventListener('keyup', ({key, target}) => {  // event for first input
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArrFirst.includes(target.value);

    if (!isElementExist) {
      $tagsList[0].appendChild($el);
      tagsArrFirst.push(target.value);
      target.value = '';
    }
  }
});

$tagsInputSecond.addEventListener('keyup', ({key, target}) => {  // event for second input
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArrSecond.includes(target.value);

    if (!isElementExist) {
      $tagsList[1].appendChild($el);
      tagsArrSecond.push(target.value);
      target.value = '';
    }
  }
});

$tagsList[0].addEventListener('click', event => {  // event for first tags
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;  
  
  if (isRemoveBtn) {
    const tagName = $tag.getElementsByClassName('tag-name')[0].innerHTML; // tag's name 
    const indexOfItem = tagsArrFirst.indexOf(tagName);  // tag's index in array
    questionToggle(tagName);  // open modal window
    $btnsInModal[0].addEventListener('click', () => { // event for Remove button in modal
      $foo.removeChild($tag); // remove selected(clicked) tag
      tagsArrFirst.splice(indexOfItem,1); // remove tag's name from array
      questionToggle();   // close modal window
    });    
  }
});

$tagsList[1].addEventListener('click', event => {  // event for second tags
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;  
  
  if (isRemoveBtn) {
    const tagName = $tag.getElementsByClassName('tag-name')[0].innerHTML; // tag's name
    const indexOfItem = tagsArrSecond.indexOf(tagName);  // tag's index in array
    questionToggle(tagName);  // open modal window
    $btnsInModal[0].addEventListener('click', () => { // event for Remove button in modal
      $foo.removeChild($tag); // remove selected(clicked) tag
      tagsArrSecond.splice(indexOfItem,1); // remove tag's name from array
      questionToggle(); // close modal window
    });
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

const init = ($tag, arr) => {
  arr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tag.appendChild($el);
  });
};

init($tagsList[0], tagsArrFirst);
init($tagsList[1], tagsArrSecond);

$btnsInModal[1].addEventListener('click', () => {  // event for button Cancel in modal wimdow
  questionToggle('');
});

$btnCloseInModal.addEventListener('click', () => {  // event for span-button Close in modal wimdow
  questionToggle('');
});

const questionToggle = text => {    //  function to open/close modal window.   
  const $p = document.getElementById('alert-msg');
  
  $p.innerHTML = `
  <span>Tag "${text}" will be remove.<br>Are you sure?</span>  
  `;  //  created question for user
  $modal.className === 'hidden' ? $modal.className = 'visible' : $modal.className = 'hidden';
};


