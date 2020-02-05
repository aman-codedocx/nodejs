console.log('---->>>>')

const URL = 'http://localhost:3000';
//const URL = ''

const form = document.querySelector('form.find-location')
const searchInput = document.querySelector('.find-location input#search')
const msgOne = document.querySelector('.messageOne')
const forecastContainer = document.querySelector('.forecast-container')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    var location = searchInput.value

    //msgOne.textContent = 'Loading...'
    forecastContainer.innerHTML = '<h3 class="loading-weather">Loading...</h3>'

    var html = '';

    fetch(URL+'/weather?city='+location).then((response) => {
        response.json().then(data => {
            //console.log(data)
            if(data.error) {
                forecastContainer.innerHTML = data.error;
            } else {

                var today = new Date();
                
                var days = new Array(7);
                days[0] = "Sunday";
                days[1] = "Monday";
                days[2] = "Tuesday";
                days[3] = "Wednesday";
                days[4] = "Thursday";
                days[5] = "Friday";
                days[6] = "Saturday";

                var abbr_months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                //console.log('---------------------->>')
                //console.log(days)
                //console.log(data.weather.data.body.daily.data)
                //var r = days[today.getDay()];

                var i = 0;
                console.log(data)
                var length = (data) ? data.weather.data.body.daily.data.length : 0;
                data.weather.data.body.daily.data.forEach(function (element) {
                    var newdate = new Date(today);
                    var weekday = newdate.getDay();

                    if(i == 0) {
                        console.log(element)
                        console.log('--------------')

                        html = html+'<div class="today forecast">'
                        + '<div class="forecast-header">'
                        + '<div class="day">'+days[weekday]+'</div>'
                        + '<div class="date">'+newdate.getDate()+' '+abbr_months[newdate.getMonth()]+'</div>'
                        + '</div> <!-- .forecast-header -->'
                        + '<div class="forecast-content">'
                        + '<div class="location">'+location+'</div>'
                        + '<div class="degree">'
                        + '<div class="num">'+Math.round(element.temperatureHigh)+'<sup>o</sup>C</div>'
                        + '<div class="forecast-icon">'
                        + '<img src="images/icons/icon-1.svg" alt="" width=90>'
                        + '</div>'
                        + '</div>'
                        + '<span title="Humidity"><i class="fas fa-tint"></i> '+(element.humidity).toFixed(2)+' %</span>'
                        + '<span title="Wind Speed"><i class="fas fa-wind"></i> '+(element.windSpeed).toFixed(2)+' mph</span>'
                        + '<span title="Visibility"><i class="fas fa-eye"></i> '+(element.visibility).toFixed(2)+' mi</span>'
                        + '</div>'
                        + '</div>';

                    } else if(i == length - 1) {
                        console.log('last')
                        html = html+'';
                    } else {
                        console.log(element)
                        newdate.setDate(newdate.getDate() + i);
                        var weekday = newdate.getDay();

                        var dd = newdate.getDate();
                        var mm = newdate.getMonth() + 1;
                        var y = newdate.getFullYear();

                        console.log(mm + '/' + dd + '/' + y);

                        html = html+'<div class="forecast">'
                        + '<div class="forecast-header">'
                        + '<div class="day">'+days[weekday]+'</div>'
                        + '</div> <!-- .forecast-header -->'
                        + '<div class="forecast-content">'
                        + '<div class="forecast-icon">'
                        + '<img src="images/icons/icon-3.svg" alt="" width=48>'
                        + '</div>'
                        + '<div class="degree">'+Math.round(element.temperatureHigh)+'<sup>o</sup>C</div>'
                        + '<small>'+Math.round(element.temperatureLow)+'<sup>o</sup></small>'
                        + '</div>'
                        + '</div>';
                    }
                    
                    i++;
                 })
                 forecastContainer.innerHTML = html;
            }
        })
    })

})
