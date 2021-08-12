//-------pomodoro functions-------
var num_poms = 0;
var count = 3;
let is_break = false;
var break_length = 5;
var state = 'Working';

function pom_complete()
{
  num_poms += 1;
  resetTimer();
  state = 'Break';
  var rest = confirm("Pomodoro Complete, start break?");
  stoptime = !rest;
  is_break = true;
  count -= 1;
}

function break_complete()
{
  if ((num_poms % 4) == 0)
  {

    break_length = 20;
    count = 3;
  }
  state = 'Working';
  resetTimer();
  confirm("Break Complete! Pomodoro Starting");
  stoptime = false;
  is_break = false;
}

//--------timer code-------------
const timer = document.getElementById("stopwatch");
const pom_counter = document.getElementById("pom_counter");
const break_counter = document.getElementById("break_counter");
const status = document.getElementById("status");

var hr = 0;
var min = 25;
var sec = 0;
var stoptime = true;

function startTimer()
{
  if (stoptime == true)
  {
    stoptime = false;
    timerCycle();
  }
}

function stopTimer()
{
  if (stoptime == false)
  {
    stoptime = true;
  }
}

function timerCycle()
{
  if (stoptime == false)
  {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    if (sec == 0)
    {
      min -= 1;
      sec = 59;
    }
    if (min == 0)
    {
      hr -= 1;
      min = 59;
      sec = 0;
    }

    if (sec < 10 || sec == 0)
    {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0)
    {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0)
    {
      hr = '0' + hr;
    }
    //complete 1 pomodoro
    if(sec == 0)
    {
      pom_complete();
    }

    sec -= 1;
    if(is_break == true && sec == break_length){
      break_complete();
    }

    status.innerHTML = state;
    timer.innerHTML = min + ':' + sec;
    pom_counter.innerHTML = 'complete: ' + num_poms;
    break_counter.innerHTML =  'next 20min break in: ' + count + " pomodoros";

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer()
{
  timer.innerHTML = '00:00';
  stoptime = true;
  if(is_break)
  {
    hr = 0;
    sec = 0;
    min = break_length;
  }
  else
  {
    hr = 0;
    sec = 0;
    min = 25;
  }
}

//--------clock code-------------
let a;
let time;
setInterval(() => {
  a = new Date();
  if(a.getHours() > 12)
  {
    hours = (a.getHours() - 12);
    typography = 'pm';
  }
  else
  {
    hours = (a.getHours());
    typography = 'am';
  }
  time = hours + ':' + a.getMinutes() + ':' + a.getSeconds() + ' ' + typography;
  document.getElementById('time').innerHTML = time;
}, 1000);

//--------document appending test--------
var i = 0;
function create()
{
  //prompt for task description
  var description = prompt("Enter task");
  if (description == '')
  {
    return;
  }
  //create div for entry
  var element = document.createElement("DIV");
  element.setAttribute("id", ("entry" + i));
  document.getElementById("JournalEntries").appendChild(element);
  var text = document.createElement("P");
  text.innerHTML = description;
  document.getElementById("entry" + i).appendChild(text);

  //create div for buttons
  var right = document.createElement("DIV");
  right.setAttribute("id", "right-side-button" + i);
  document.getElementById("entry" + i).appendChild(right);

  //create remove button
  var button_remove = document.createElement("BUTTON");
  button_remove.setAttribute("id", "remove");
  button_remove.setAttribute("onclick", "remove(" + i + ")");
  button_remove.innerHTML = "-";
  document.getElementById("right-side-button" + i).appendChild(button_remove);

  //create prioritize button
  var button_prioritize = document.createElement("BUTTON");
  button_prioritize.setAttribute("id", "prioritize");
  button_prioritize.setAttribute("onclick", "prioritize(" + i + ")");
  button_prioritize.innerHTML = "Prioritize";
  document.getElementById("right-side-button" + i).appendChild(button_prioritize);
  i++;
}

function remove(i)
{
  var element = document.getElementById("entry" + i);
  element.remove();
}

function prioritize(i)
{
  document.getElementById("JournalEntries").prepend(document.getElementById("entry" + i));
}
