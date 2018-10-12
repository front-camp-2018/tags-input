'use strict';


function  tagsMechanics(i, defaultArr = []) {

  const $tagsInput = document.getElementById('tags-input-' + i);
  const $tagsList = document.getElementById('tags-list-' + i);
  const $button = document.getElementById('button-' + i);
  const $warning = document.getElementById('warning');

  $tagsInput.addEventListener('keyup', ({key,target}) =>AddElemement(key, target));

  $tagsList.addEventListener('click', () => RemoveBtn(event));

  $button.addEventListener('click', () => sortTags($tagsList));

  const sortTags = $tagsList => {
    $tagsList.innerHTML = '';
    defaultArr.sort();
    defaultArr.forEach(item => {
      const $el = createTagElement(item);
      $tagsList.appendChild($el);
    });
  };

  const AddElemement = (key, target) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = defaultArr.includes(target.value);

      if (!isElementExist) {
        $tagsList.appendChild($el);
        defaultArr.push(target.value);
        target.value = '';
        if (defaultArr.length > 10) $button.hidden = false;
      } else {
        $warning.className = 'show';
        setTimeout(function () {
          $warning.className = $warning.className.replace('show', '');
        }, 3000);
      }
    }
  };

  const RemoveBtn = event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $tagGrandpa = target.parentElement.parentElement;
    const $tag = target.parentElement;

    if (isRemoveBtn) {
      const deleteIndex = defaultArr.indexOf($tag.firstElementChild.textContent);
      defaultArr.splice(deleteIndex, 1);
      if (defaultArr.length < 20) $button.hidden = true;
      $tagGrandpa.removeChild($tag);
    }
  };

  const createTagElement = content => {
    const $li = document.createElement('li');

    $li.className = 'tags-list-item';
    $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>`;
    return $li;
  };

  function init() {
    defaultArr.forEach(tagValue => {
      const $el = createTagElement(tagValue);
      $tagsList.appendChild($el);
    });
  }

  init();
}

tagsMechanics(1);
tagsMechanics(2, ['1', 'some long tag', 'the last tag']);
