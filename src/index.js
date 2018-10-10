'use strict';

/**
 * @const @attributes (HTML elements attributes configuration)
 * @type {{}}
 */
const $attributes = {
  input: {
    class: 'tags-input',
    idPrefix: 'tags-input',
    placeholder: 'type your tags...',
    type: 'text'
  },
  list: {
    class: 'tags-list',
    idPrefix: 'tags-list'
  },
  listItem: {
    class: 'tags-list-item'
  },
  title: {
    class: 'title-level-2'
  }
};

/**
 * @const $components (Components list with parameters)
 * @type {*[]}
 */
const $components = [
  {
    id: 1,
    data: [],
    title: 'Simple Input:'
  },
  {
    id: 2,
    data: ['tag-1', 'some-awesome-tag'],
    title: 'Input with default tags:'
  }
];

/**
 * @const $mainApp (Parent main HTML element)
 * @type {HTMLElement}
 */
const $mainApp = document.getElementById('app');

/**
 * @function render HTML element in DOM
 * @param elem (New HTML element)
 * @param type (Type of HTML element attributes)
 * @param parent (Parent HTML element)
 */
const renderElementInDOM = (elem, type, parent = $mainApp) => {
  setElementAttributes(elem, type);
  parent.appendChild(elem);
};

/**
 * @function create input element and render him in DOM
 * @param params (HTML component parameters)
 */
const createInputElement = params => {
  const $type = 'input';
  const $id = setIdAttribute(params.id, $type);
  const $input = document.createElement($type);

  renderElementInDOM($input, $type);
  params.input = document.getElementById($id);
};

/**
 * @function create list element and render him in DOM
 * @param params (HTML component parameters)
 */
const createListElement = params => {
  const $type = 'list';
  const $id = setIdAttribute(params.id, $type);
  const $ul = document.createElement('ul');

  renderElementInDOM($ul, $type);
  params.list = document.getElementById($id);
  params.data.forEach(content => {
    createListItemElement(params, content);
  });
};

/**
 * @function create list item element and render him in DOM
 * @param params (HTML component parameters)
 * @param content (List item content)
 */
const createListItemElement = (params, content) => {
  const $li = document.createElement('li');

  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span id="${content}" class="remove-btn">x</span>
  `;
  renderElementInDOM($li, 'listItem', params.list);
};

/**
 * @function create list item element from DOM
 * @param params (HTML component parameters)
 * @param event (Mouse click event)
 */
const removeListItemElement = (params, event) => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $listItem = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    const $data = params.data;
    const index = $data.indexOf(target.id);

    $data.splice(index, 1);
    $listItem.removeChild($tag);
  }
};

/**
 * @function create title element and render him in DOM
 * @param params (HTML component parameters)
 */
const createTitleElement = params => {
  const $h = document.createElement('h2');
  const $text = document.createTextNode(params.title);

  $h.appendChild($text);
  renderElementInDOM($h, 'title');
};

/**
 * @function create application event listeners
 * @param params (HTML component parameters)
 */
const addEventListeners = params => {
  params.input.addEventListener('keyup', ({key, target}) => validateInput(params, key, target));
  params.list.addEventListener('click', event => removeListItemElement(params, event));

};

/**
 * @function create HTML element attributes
 * @param elem (HTML element)
 * @param type (Type of HTML element attributes)
 */
const setElementAttributes = (elem, type) => {
  const $config = $attributes[type];

  Object.keys($config).forEach(key => elem.setAttribute(key, $config[key]));
};

/**
 * @function create ID element attribute
 * @param id (ID value)
 * @param type (Type of HTML element attributes)
 * @return {string}
 */
const setIdAttribute = (id, type) => {
  const $config = $attributes[type];

  return $config.id = `${$config.idPrefix}-${id}`;
};

/**
 * @function validate input event value
 * @param params (HTML component parameters)
 * @param key (Event key)
 * @param target (Event target)
 */
const validateInput = (params, key, target) => {
  const $content = target.value;

  if (key === 'Enter' && $content.trim()) {
    const isElementExist = params.data.includes($content);

    if (!isElementExist) {
      createListItemElement(params, $content);
      params.data.push($content);
      target.value = '';
    }
  }
};

/**
 * @function initialization first run apllication state
 */
const init = () => {
  $components.forEach(params => {
    createTitleElement(params);
    createInputElement(params);
    createListElement(params);
    addEventListeners(params);
  });
};

init();
