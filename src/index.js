'use strict';

const $app = document.getElementById('app');
const $tagsList = document.getElementById('initial-list');
const defaultTags = ['tag1','some awesome tag'];
var simpleInputTags = [];
var inputTagsWithDefaul = defaultTags.slice();

$app.addEventListener('click', ({target}) => {
  const isRemoveBtn = target.classList.contains('remove-btn');

  if (isRemoveBtn) {
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;
      if (confirm('Are you sure want to delete this super tag?')) {
        var tag = '';
        const isSimpleInputTags = checkIsSimpleInputTags($foo);

        $tag.childNodes.forEach(node => {
          if(node.classList && node.classList.contains('tag-name')){
            tag = node.innerText;

            return false;
          }
        });

        if(isSimpleInputTags){
          simpleInputTags.splice(simpleInputTags.indexOf(tag), 1);

        }else{
          inputTagsWithDefaul.splice(inputTagsWithDefaul.indexOf(tag), 1);
        }

        taggeleErrorMessage($foo.parentElement.childNodes, 'none');
        $foo.removeChild($tag);
      } else {
        return;
      }
  } else if(target.classList.contains('reset-to-default-btn')) {
    const $children = target.parentElement.childNodes;
    $children.forEach(child => {
      if(child.classList && child.classList.contains('tags-wrapper')){
        child.childNodes.forEach(tagWrapper => {
          if(tagWrapper.classList && tagWrapper.classList.contains('tags-list')){
            tagWrapper.innerHTML = '';
            simpleInputTags = [];
            if(tagWrapper.id === 'initial-list'){
              init();

              inputTagsWithDefaul = defaultTags.slice();

              clearInputsAndErrors();
            }
          }
        });
      }
    });
  } else if(target.classList.contains('clear-btn')){
    taggeleErrorMessage(target.parentElement.parentElement.childNodes, 'none');

      target.parentElement.childNodes.forEach(node => {
        if(node.classList && node.classList.contains('tags-input')){
          node.value= '';
        }
      });
  }
});

$app.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.classList.contains('tags-input') && target.value.trim()) {
    const $el = createTagElement(target.value);
    const $children = target.parentElement.parentElement.childNodes;
    var isElementExist = false;

    $children.forEach(child => {
      if(child.classList && child.classList.contains('tags-list')) {
        const isSimpleInputTags = checkIsSimpleInputTags(child);
        const isValid = validate(isSimpleInputTags, target.value);

        if(isValid){
          if(isSimpleInputTags){
            simpleInputTags.push(target.value);
          }else{
            inputTagsWithDefaul.push(target.value);
          }

          taggeleErrorMessage(target.parentElement.parentElement.childNodes, 'none');

          child.appendChild($el);
          target.value = '';
        } else {
          taggeleErrorMessage(target.parentElement.parentElement.childNodes, 'block');
        }
      }
    });
  }
});

const taggeleErrorMessage = (nodes, display) => {
  nodes.forEach(node => {
    if(node.classList && node.classList.contains('error-message')){
      if(node.style.display !== display){
        node.style.display = display;
      }
    }
  });
}

const clearInputsAndErrors = () => {
  const $tagsInput = document.getElementsByClassName('tags-input');
  for (var i = 0; i < $tagsInput.length; i++) {
    $tagsInput[i].value = '';
  }

  const $errorMessage = document.getElementsByClassName('error-message');
  for (var i = 0; i < $errorMessage.length; i++) {
    $errorMessage[i].style.display = 'none';
  }
}

const checkIsSimpleInputTags = (child) => {
  return child.id === 'initial-list' ? false : true;
}
const validate = (isSimpleInputTags, value) => {
  return isSimpleInputTags
    ? !simpleInputTags.includes(value)
    : !inputTagsWithDefaul.includes(value);
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
      defaultTags.forEach(tagValue => {
        const $el = createTagElement(tagValue);

        $tagsList.appendChild($el);
      });
}

init();
