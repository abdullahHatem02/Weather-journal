/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey ='93bd580191207ca6826944860f88ebe4';
 // Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

const userInfo = document.getElementById('userInfo');

// Event listener to add function to existing HTML DOM element
const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', action);

/* Function called by event listener */
function action(e) {
    e.preventDefault();

    //getting input
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        getData(baseUrl, zipCode, apiKey)
            .then(function(data) {
                // add data to POST request
                postData('/add', { temp: data.main.temp , date: newDate, content: content });
            }).then(function() {
                updateUI()
            }).catch(function(error) {
                console.log(error);
                alert('The zip code is invalid. Try again');

            });
        userInfo.reset();
    } else {
        generateButton.classList.add('invalid');
    }


}

/* Function to GET Web API Data*/
const getData = async(baseUrl, zipCode, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}&units=metric`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const Data = await request.json();
        console.log(Data);
        // update new entry values
        if (Data.date !== undefined && Data.temp !== undefined && Data.content !== undefined) {
            document.getElementById('date').innerHTML = Data.date;
            document.getElementById('temp').innerHTML = Data.temp + ' degree Celesius';
            document.getElementById('content').innerHTML = Data.content;
        }
    } catch (error) {
        console.log('error', error);
    }
};

function Celsius(c) {
  return c;
}