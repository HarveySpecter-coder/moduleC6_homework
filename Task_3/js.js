const wbURL = 'wss://echo-ws-service.herokuapp.com'

let websocket;
const button_1 = document.getElementById('openSocket');
const button_2 = document.getElementById('closeSocket');
const sendMsg = document.querySelector('input');
const getButton = document.querySelector('#geo');

button_1.addEventListener('click', ()=>{
    websocket = new WebSocket(wbURL);
    websocket.onopen = function(e){

    }
    websocket.onclose = function(e){

    }
    websocket.onmessage = function(e){
        message('echo', e.data);
    }
    websocket.onerror = function(e){
    console.log('Error!');
    }
})

button_2.addEventListener('click', ()=>{
    websocket.close();
    websocket = null;
})

sendMsg.addEventListener('click', ()=>{
    message('user', userInput.value);
    const userMsg = userInput.value;
    if (websocket != undefined) websocket.send(userMsg);
})
function message(who, text){
    let msg = ''
    if (who === 'user'){
        msg = `<div class="message-box-holder">
                <div class="message-box">
                    ${text}
                </div>
            </div>`
    }

    if (who === 'echo'){
        msg = `<div class="message-box-holder">
                <div class="message-sender">
                    Echo
                </div>
                <div class="message-box message-partner">
                    ${text}
                </div>
            </div>`
    }
    chat.insertAdjacentHTML('beforeend', msg);
}

function geoMessage(latitude, longitude) {
    const msg = `<div class="message-box-holder">
                <div class="message-box">
                    <a href="https://www.openstreetmap.org/#map=10/${latitude}/${longitude}" target="_blank">Ваше местоположение</a>
                </div>
            </div>`
    chat.insertAdjacentHTML('beforeend', msg);
}

getButton.addEventListener('click', ()=>{
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            geoMessage(coords.latitude, coords.longitude);
        })}
    else{
         message('user', 'Не удалось определить Ваше местоположение');
        }

})
