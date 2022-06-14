let alarmString = null;

const alarmAudio = document.getElementById("alarm-audio");

const createAlarm = document.querySelector(".create-alarm");

const activeAlarm = document.getElementById("active-alarm");

const alarmText = (time) => `Alarm set at time ${time}`;

let allAlarms = [
    { hour: 9, minute: 15, period: 'PM', played: false },
];
alarmAudio.src = "alarm.mp3";
alarmAudio.load();


function addAlarm() {
    const hour = parseInt(document.forms[0][0].value);
    const min = parseInt(document.forms[0][1].value);
    const zone = document.forms[0][2].value;

    document.forms[0].reset();
    if (hour === "" || min === "" || zone === "") return;
    allAlarms.push({ hour: hour, minute: min, period: zone, played: false });
    renderAlarm(hour, min, zone);
}


function renderAlarm(hour, minute, period) {
    let newAlarm = document.createElement("div");
    newAlarm.innerText = getTimeString({ hours: hour, minutes: minute, zone: period });
    activeAlarm.append(newAlarm);
}

// Function to check if alarm needs to be triggered
function checkAlarm(hour, min, zone) {
    allAlarms.forEach((e) => {
        if (e.hour === hour && e.minute === min && e.period === zone && e.played === false) {
            alarmAudio.play();
            e.played = true;
        }
    });
};

// Function to convert time to string value
const getTimeString = ({ hours, minutes, zone }) => {
    if (minutes / 10 < 1) {
        minutes = "0" + minutes;
    }
    return `${hours}:${minutes} ${zone}`;
};

// Function to display current time on screen
function renderClock() {
    var currentTime = document.getElementById("clock");
    const currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var zone = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
        hours = hours % 12;
    }
    checkAlarm(hours, minutes, zone);
    currentTime.innerHTML = getTimeString({ hours, minutes, zone });
};

// Update time every second
setInterval(renderClock, 1000);

// show all initial alarms
allAlarms.forEach(element => renderAlarm(element.hour, element.minute, element.period));
