function imageErrorHandler({ target }) {
  target.remove();
}

function imageLoadHandler({ target: { dataset: { id } }, target }) {
  document.getElementById(`wrapper${id}`).append(target);
}