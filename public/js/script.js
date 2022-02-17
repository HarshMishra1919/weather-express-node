console.log('client side js file is loaded!');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(searchInput.value);
    messageOne.textContent = "";
    messageTwo.textContent = "";
    // console.log('testing');
    messageOne.textContent = 'Loading...';
    fetch(`http://localhost:3000/weather?address=${searchInput.value}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error);
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                    console.log(data.location);
                    console.log(data.forecast);
                }
            });
        }
    );
});
