'use strict';

const $tagsInput = document.getElementsByClassName('tags-input');
let index = 0;

const createTagElement = content => {
  const $li = document.createElement('li');
  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;
  return $li;
};

[...$tagsInput].forEach(function (input) {
  let tagsArr = [];
  const $tagsList = document.getElementById(`tags-list-${index += 1}`);
  if ($tagsList.getAttribute('data-default') !==null) {
    const isDefaultTag = $tagsList.getAttribute('data-default').split(' ');
    tagsArr = isDefaultTag;
    isDefaultTag.forEach(tagValue => {
      const $el = createTagElement(tagValue);
      $tagsList.appendChild($el);
    });
  }

  input.addEventListener('keyup', ({key, target}) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = tagsArr.includes(target.value);
      if (!isElementExist) {
        $tagsList.appendChild($el);
        tagsArr.push(target.value);
        target.value = '';
      }
      else{
        alert('Item already exists!');
        target.value = '';
      }
    }
  });

  $tagsList.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;

    if (isRemoveBtn) {
      const tagName = target.previousSibling.previousSibling.innerText;
      $foo.removeChild($tag);
      tagsArr.splice(tagsArr.indexOf(tagName,1));
    }
  });
});
