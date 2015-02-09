var msg = document.createElement("span");
msg.innerText = 'Executing script 3...';
document.body.appendChild(msg);

(function (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
})(3000);

msg.innerText = msg.innerText + 'Done with script 3 !!';
