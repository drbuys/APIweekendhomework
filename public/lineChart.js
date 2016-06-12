//Line Chart container

var LineChart = function(temps, date) {

    var container = document.getElementById('lineChart');

    var chart = new Highcharts.Chart( {
        chart: {
            type: 'line',
            renderTo: container,
            height: 500
        },
        title: {
            text: '2 Day Temperature Forecast'
        },
        series: [
            {
                name: 'Temperature',
                data: temps
            }
        ],
        xAxis: {
            categories: [date[0], '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', date[1], '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        },
        yAxis: {
            title: {
                text: "Temperature ℃"
            }
        }

    });
};
