var ToDo = require('./objects/ToDo.js').ToDo;

window.localStorage.clear();

if (window.localStorage.toDos != undefined) {
  var toDos = JSON.parse(window.localStorage.toDos);
} else {
  var toDos = [];
}

var otherButtonsBool = false;

$(document).ready(function(){
  var $window = $(window);
  var $body = $('body');
  var $toDoPrompt = $('#todo-prompt');
  var $toDoText = $('#todo-text');
  var $bottomButtons = $('#bottom-buttons');
  var $getToDoButton = $('#get-todo-button');
  var $finishToDoButton;
  var $deleteToDoButton;
  var $aboutButton = $('#about-button');
  var $overlay;

  function resize() {
    $toDoText.css('top', $window.height() - parseFloat($getToDoButton.css('height')) - parseFloat($toDoText.css('height')) - 5);
    for (var i = 1; i < $bottomButtons.children().length; i++) {
      $($bottomButtons.children()[i]).css('left', parseFloat($($bottomButtons.children()[i - 1]).css('width')) + parseFloat($($bottomButtons.children()[i - 1]).css('left')) + 5);
      $($bottomButtons.children()[i]).css('bottom', 5);
    }
  }

  function addToDo(ignoreBool) {
    $toDoPrompt[0].value = $toDoPrompt[0].value.replace(/(\r?\n|\r)/g, '');
    if (((event.code == 'Enter') || (!ignoreBool)) && ($toDoPrompt[0].value != '')) {
      toDos.push(new ToDo($toDoPrompt[0].value));
      window.localStorage.setItem('toDos', JSON.stringify(toDos));
      $toDoPrompt[0].value = '';
    }
  }

  function getToDo() {
    if (toDos.length > 0) {
      if (!otherButtonsBool) {
        otherButtonsBool = true;
        $getToDoButton.text('Get Another');
        $finishToDoButton = $('<button>').attr('id', 'finish-todo-button').text('Finish').appendTo($bottomButtons);
        $deleteToDoButton = $('<button>').attr('id', 'delete-todo-button').text('Delete').appendTo($bottomButtons);
      }
      var toDoNum = Math.floor(Math.random() * toDos.length);
      window.localStorage.setItem('lastToDoNum', toDoNum);
      $toDoText.text(toDos[toDoNum].text);
      resize();
    }
  }

  $toDoPrompt.focus();
  $window.keypress(addToDo);
  $window.resize(resize);
  $('#set-todo-button').click(function() {
    addToDo(false);
  });
  $aboutButton.click(function() {
    if ($overlay == undefined) {
      $overlay = $('<div>').attr('id', 'overlay').html('<p>LessToDo was created by <a target="_blank" href="https://twitter.com/TrampolineTales">Dan DiIorio</a> as a solution to his own anxiety with planning out projects. Diagnosed with an <a target="_blank" href="https://en.wikipedia.org/wiki/Anxiety_disorder">anxiety disorder</a> at the age of 15, Dan always had trouble reading to-do lists without getting anxious and overwhelmed. LessToDo solves this issue by only displaying one ToDo at a time, even if the amount of work that actually needs to get done would feel overwhelming when looked at all at once. Dan has been using LessToDo to work on his own personal projects, and hopes you find success with it as well!</p><p>LessToDo is released under the <a target="_blank" href="https://github.com/TrampolineTales/lesstodo/blob/master/LICENSE">GNU AGPLv3 License</a></p><a id="close-button" href="#">Close</a>');
      $overlay.appendTo($body);
      var $closeButton = $('#close-button');
      $closeButton.click(function() {
        $closeButton.off('click');
        $overlay.remove();
        $overlay = undefined;
      });
    }
  });
  $getToDoButton.click(getToDo);
});
