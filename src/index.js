import tagsApp from './tags.js';

new tagsApp(
  document.getElementById('simple-tags-input'),
  document.getElementById('simple-tags-list')
);
new tagsApp(
  document.getElementById('default-tags-input'),
  document.getElementById('default-tags-list'),
  ['1', 'super tag']
);