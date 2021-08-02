const flashBox = document.getElementById("alertBox");
const flashMsg = document.getElementById("flash-message");

setTimeout(function () {
  flashBox.classList.add("hide");
  flashMsg.innerHTML = "";
}, 2000);
