function updateTime() {
    var date = new Date();
    var timeWrapper = document.getElementById("TimeWrapper");
    timeWrapper.innerHTML = date.toLocaleTimeString();
}
document.addEventListener("DOMContentLoaded", updateTime);
setInterval(updateTime, 1000);