'use strict';

const $tagsInput = document.getElementById('tags-input');
const $tagsList = document.getElementById('tags-list');
const $errorMes = document.getElementById('error-mes');

const $tagsInputSimple = document.getElementById('tags-input-simple');
const $tagsListSimple = document.getElementById('tags-list-simple');
const $errorMesSimple = document.getElementById('error-mes-simple');
var $body = document.getElementsByTagName('body')[0];

var tagsArr = ['1', 'super tag'];
var tagArrSimple = [];

$tagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter') {
    if (validateValue(target, tagsArr)) {
      const $el = createTagElement(target.value);

      $tagsList.appendChild($el);
      tagsArr.push(target.value);
      target.value = '';
      $errorMes.innerText = '';

    }
    else {
      $errorMes.innerText = 'Invalid input';
    }
  }
});

$tagsList.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;
  const isCopyBtn = target.classList.contains('copy-tag');

  if (isRemoveBtn) {
    $foo.removeChild($tag);

    const deleteIndex = tagsArr.find(value => {
      return value === $tag.innerText;
    });
    console.log('Delete index', deleteIndex);

    tagsArr.splice(deleteIndex, 1);
  }
  else if (isCopyBtn) {
    console.log('copy', $tag.innerText);
    copyToClip($tag.innerText);
  }
});

$tagsInputSimple.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter') {
    if (validateValue(target, tagArrSimple)) {
      const $el = createTagElement(target.value);

      $tagsListSimple.appendChild($el);
      tagArrSimple.push(target.value);
      target.value = '';
      $errorMesSimple.innerText = '';

    }
    else {
      $errorMesSimple.innerText = 'Invalid input';
    }
  }
});
$tagsListSimple.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const isCopyBtn = target.classList.contains('copy-tag');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);

    const deleteIndex = tagArrSimple.find(value => {
      console.log('Equals', value + ' ' + $tag.innerText);

      return value === $tag.innerText;
    });
    console.log('Delete index', deleteIndex);

    tagArrSimple.splice(deleteIndex, 1);
  }
  else if (isCopyBtn) {
    console.log('copy', $tag.innerText);
    copyToClip($tag.innerText);
  }
});

function copyToClip(innerText) {
  var $tempInput = document.createElement('INPUT');
  $tempInput.setAttribute('display', 'none');
  $body.appendChild($tempInput);
  $tempInput.setAttribute('value', innerText);
  $tempInput.select();
  document.execCommand('copy');
  $body.removeChild($tempInput);
}


function validateValue(target, arr) {
  const isElementExist = arr.includes(target.value);
  return target.value.trim() && !isElementExist;
}


const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `<span class="tag-name">${content}</span>
<span class="remove-btn"></span><span class="copy-tag"></span>`;

  return $li;
};

const init = () => {
  tagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsList.appendChild($el);
  });
};

init();
