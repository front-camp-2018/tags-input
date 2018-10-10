'use strict';

const ERROR_ClASS_NAME = 'invalid-value';

const createTagElement = content => {
  const $li = document.createElement('li');
  
  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;
  
  return $li;
};

const createInputBlock = (inputTitle, countNumber) => {
  const inputBlock = document.createElement('div');
  
  inputBlock.className = 'input-block';
  inputBlock.innerHTML = `
    <h2 class="title-level-2">${inputTitle}:</h2>
    <input
      id=${`input-${countNumber}`}
      class="tags-input "
      type="text"
      placeholder="type your tags..."
    />
    <ul id=${`list-${countNumber}`} class="tags-list"></ul>
  `;
  
  return inputBlock;
};

const initDefaultTags = (tags, $tagsList) => tags.forEach(tagValue => {
  const $el = createTagElement(tagValue);
  
  $tagsList.appendChild($el);
});

const validateInputValue = ($input, isValueUniq) => {
  if (isValueUniq) {
    $input.className = `${$input.className} ${ERROR_ClASS_NAME}`;
    return;
  }
  
  $input.classList.remove(ERROR_ClASS_NAME);
};

const onInputKeyUp = ($tagsList, tagsArr) => ({ key, target }) => {
  const isValueExist = tagsArr.includes(target.value);
  
  validateInputValue(target, isValueExist);
  
  if (key === 'Enter' && target.value.trim()) {
    if (!isValueExist) {
      const $el = createTagElement(target.value);
      
      $tagsList.appendChild($el);
      tagsArr.push(target.value);
      target.value = '';
    }
  }
};

const onTagRemove = tagsArr => ({ target }) => {
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;
  
  if (isRemoveBtn) {
    $foo.removeChild($tag);
    
    tagsArr.splice(tagsArr.indexOf($tag.firstElementChild.innerHTML), 1);
  }
};

const createInput = () => {
  let inputs = 0;
  
  return (inputTitle, ...defaultValues) => {
    const currentInput = inputs++;
    
    const input = createInputBlock(inputTitle, currentInput);
    document.getElementById('app').appendChild(input);
    
    const $tagsInput = document.getElementById(`input-${currentInput}`);
    const $tagsList = document.getElementById(`list-${currentInput}`);
    const tagsArr = defaultValues.map(value => value.toString());
    
    initDefaultTags(tagsArr, $tagsList);
    
    $tagsInput.addEventListener('keyup', onInputKeyUp($tagsList, tagsArr));
    $tagsList.addEventListener('click', onTagRemove(tagsArr));
    
    return input;
  };
};

const initInput = createInput();


document.addEventListener('DOMContentLoaded', () => {
  initInput('Simple Input');
  initInput('Input with default tags', 234, 23222);
});

