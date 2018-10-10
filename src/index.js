'use strict';
//create constants
const $tagsInput = document.getElementById('tags-input');
const $tagsInput2 = document.getElementById('tags-input-with-default');
const $tagsList = document.getElementById('tags-list');
const $tagsList2 = document.getElementById('tags-list-with-default');
const tagsArr = [];
const tagsArr2 = ['tag1', 'some awesome tag'];
const $modal = document.getElementById('modal-box');
const $closeModal = document.getElementsByClassName('close-modal')[0];

//functions
function eventListenerOnAdding(input, list, tags) {
  input.addEventListener('keyup', ({key, target}) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = tags.includes(target.value);

      if (!isElementExist) {
        list.appendChild($el);
        tags.push(target.value);
        target.value = '';
      } else {
        $modal.style.display = "block";
      }
    }
  });
}

$closeModal.addEventListener('click', () => {
  $modal.style.display = "none";
});

function eventListenerOnRemoval(element, tags) {
  element.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;

    if (isRemoveBtn) {
      $foo.removeChild($tag);
      tags.splice(tags.indexOf(target.previousElementSibling.innerHTML));
    }
  });
}

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
  tagsArr2.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsList2.appendChild($el);
  });
};

//call all the functions:
init();
eventListenerOnAdding($tagsInput, $tagsList, tagsArr);
eventListenerOnRemoval($tagsList, tagsArr);
eventListenerOnAdding($tagsInput2, $tagsList2, tagsArr2);
eventListenerOnRemoval($tagsList2, tagsArr2);
