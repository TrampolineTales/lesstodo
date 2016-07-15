var toDos = [];

$(document).ready(function(){
  var $window = $(window);
  var $toDoPrompt = $('#todo-prompt');

  function addToDo() {
    $toDoPrompt[0].value = $toDoPrompt[0].value.replace(/(\r?\n|\r)/g, '');
    if (event.code == 'Enter') {
      $toDoPrompt[0].value = '';
    }
  }

  $toDoPrompt.focus();
  $window.keypress(addToDo);
});
