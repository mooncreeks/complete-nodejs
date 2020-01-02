const socket = io();

// Elements
$messageForm = document.querySelector('#message-form');
$messageFormInput = document.querySelector('input');
$messageFormButton = document.querySelector('button');
$sendLocationButton = document.querySelector('#send-location');
$messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageRemplate = document.querySelector('#location-message-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('message', message => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', message => {
    console.log(message);
    const html = Mustache.render(locationMessageRemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', e => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, error => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            console.log('Bad word detected!');
        }

        console.log('Message delivered!');
    });
});

$sendLocationButton.addEventListener('click', e => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!');
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
});

socket.emit('join', { username, room });