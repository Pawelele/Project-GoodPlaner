const addEventBtn = document.querySelector('.add-event');
const eventPopup = document.querySelector('.event-popup');

const eventName = document.querySelector('#event-name');
const eventDay = document.querySelector('#event-day');
const eventMonth = document.querySelector('#event-month');
const eventYear = document.querySelector('#event-year');

const eventSaveBtn = document.querySelector('.event-popup-buttons .save');
const eventCancelBtn = document.querySelector('.event-popup-buttons .cancel');

const eventError = document.querySelector('.event-popup .error');

// Unassigned variables because event-widget dosn't exist yet
let daysCount;
let hoursCount;
let minutesCount;
let secondsCount;

let userTime;
let eventTime;
let eventWidget;

const handlePopup = () => {
    eventPopup.classList.toggle('active');
}

const checkData = () => {
    if(eventName.value=='' || eventDay.value=='' || eventMonth.value=='' || eventYear.value=='')
    {
        eventError.style.visibility = "visible";
    }
    else{
        eventError.style.visibility = "hidden";
        createEvent();
        eventPopup.classList.remove('active');
    }
}

const createEvent = () => {
    eventWidget = createEventWidget();
    daysCount = eventWidget.querySelector('.days-counter');
    hoursCount = eventWidget.querySelector('.hours-counter');
    minutesCount = eventWidget.querySelector('.minutes-counter');
    secondsCount = eventWidget.querySelector('.seconds-counter');

    // .raplace added, because standard version don't work on Safari.
    eventTime = new Date(`${eventMonth.value}-${eventDay.value}-${eventYear.value}`.replace(/-/g, "/"));
    console.log(eventTime);

    countTime();
    setInterval(countTime,1000)
    document.body.append(eventWidget);
}

const countTime = (eventWidget) => {
    userTime = new Date();

    const dif = eventTime-userTime;

    const days = dif/1000/60/60/24;
    const hours = dif/1000/60/60 % 24;
    const minutes = dif/1000/60 % 60;
    const seconds = dif/1000 % 60;

    daysCount.textContent = Math.floor(days);
    hoursCount.textContent = Math.floor(hours);
    minutesCount.textContent = Math.floor(minutes);
    secondsCount.textContent = Math.floor(seconds);
}

const createEventWidget = () => {
    const eventWidget = document.createElement('div');
    eventWidget.classList.add('event-widget');

    eventWidget.innerHTML = `<h4 class="event-widget-name">${eventName.value}</h4>
    <h5 class="event-widget-name">Pozostało:</h5>
    <div class="counter">
        <div class="time">
            <p class="days-counter number">1</p>
            <p class="number-description">Dni</p>
        </div>
        <div class="time">
            <p class="hours-counter number">15</p>
            <p class="number-description">Godzin</p>
        </div>
        <div class="time">
            <p class="minutes-counter number">1</p>
            <p class="number-description">Minut</p>
        </div>
        <div class="time">
            <p class="seconds-counter number">1</p>
            <p class="number-description">Sekund</p>
        </div>
    </div>`;

    return eventWidget;
}

// EventListeners

addEventBtn.addEventListener('click', handlePopup);
eventSaveBtn.addEventListener('click', checkData);
eventCancelBtn.addEventListener('click', () => {
    eventPopup.classList.remove('active');
    eventName.textContent = '';
    eventDay.textContent = '';
    eventMonth.textContent = '';
    eventYear.textContent = '';
})