const $tagsInputSimple = document.getElementById('tags-input-simple');
const $tagsListSimple = document.getElementById('tags-list-simple');
const $tagsInputWithDefault = document.getElementById('tags-input-with-default');
const $tagsListWithDefault = document.getElementById('tags-list-with-default');
const tagsArrSimple = [];
const tagsArrWithDefault = ['1', 'some tag',];

const addTagEventHandler = (event, outputElement, localArr) => {
  const { key, target } = event;
  
  if (key === 'Enter' && target.value) {
    const $el = createTagElement(target.value);
    const doesElementExist = localArr.includes(target.value);

    if (!doesElementExist) {
      outputElement.appendChild($el);
      localArr.push(target.value);
      target.value = '';
    }
  }
};

const removeTagEventHandler = (event, localArr) => {
  const { target } = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $parentElement = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $parentElement.removeChild($tag);
    localArr.splice(tagsArrSimple.indexOf($tag.children[0].innerText), 1);
  }
};

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
  
  const populateDefaultTags = () => {
    tagsArrWithDefault.forEach(tagValue => {
      const $el = createTagElement(tagValue);
      $tagsListWithDefault.appendChild($el);
    });
  };

  populateDefaultTags();

  $tagsInputSimple.addEventListener('keyup', event => {
    addTagEventHandler(event, $tagsListSimple, tagsArrSimple);
  });
  $tagsInputWithDefault.addEventListener('keyup', event => {
    addTagEventHandler(event, $tagsListWithDefault, tagsArrWithDefault);
  });
  $tagsListSimple.addEventListener('click', event => {
    removeTagEventHandler(event, tagsArrSimple);
  });
  $tagsListWithDefault.addEventListener('click', event => {
    removeTagEventHandler(event, tagsArrWithDefault);
  });

};

init();

