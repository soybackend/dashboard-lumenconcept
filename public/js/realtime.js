var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

var color = Chart.helpers.color;

var temConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Temperatura',
      backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
      borderColor: chartColors.red,
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'realtime',
        display: true,
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      streaming: {
        duration: 60000
      }
    }
  }
};

var humConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Humedad',
      backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
      borderColor: chartColors.orange,
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'realtime',
        display: true,
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      streaming: {
        duration: 60000
      }
    }
  }
};

var soundConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Sonido',
      backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
      borderColor: chartColors.blue,
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'realtime',
        display: true,
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      streaming: {
        duration: 60000
      }
    }
  }
};

var monConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Monóxido',
      backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
      borderColor: chartColors.green,
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'realtime',
        display: true,
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      streaming: {
        duration: 60000
      }
    }
  }
};

var ligiConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Luz Interior',
      backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
      borderColor: chartColors.purple,
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'realtime',
        display: true,
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      streaming: {
        duration: 60000
      }
    }
  }
};

var ligeConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Luz Exterior',
      backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
      borderColor: chartColors.grey,
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'realtime',
        display: true,
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      streaming: {
        duration: 60000
      }
    }
  }
};

var socket = io.connect('http://localhost:3000', { 'forceNew': true });
socket.on('iot', function(data) {
  var measurements = JSON.parse(data.value).measurements;
  tempChart.chart.data.datasets[0].data.push({
    x: moment(),
    y: measurements[0].value
  });

  humChart.chart.data.datasets[0].data.push({
    x: moment(),
    y: measurements[1].value
  });

  soundChart.chart.data.datasets[0].data.push({
    x: moment(),
    y: measurements[2].value
  });

  monChart.chart.data.datasets[0].data.push({
    x: moment(),
    y: measurements[3].value
  });

  ligiChart.chart.data.datasets[0].data.push({
    x: moment(),
    y: measurements[4].value
  });

  ligeChart.chart.data.datasets[0].data.push({
    x: moment(),
    y: measurements[5].value
  });

  $("#tempValue").html(measurements[0].value);
  $("#humValue").html(measurements[1].value);
  $("#soundValue").html(measurements[2].value);
  $("#monValue").html(measurements[3].value);
  $("#ligiValue").html(measurements[4].value);
  $("#ligeValue").html(measurements[5].value);
});

window.onload = function() {
  var tempChartCtx = document.getElementById('tempChartCanvas').getContext('2d');
  window.tempChart = new Chart(tempChartCtx, temConfig);

  var humChartCtx = document.getElementById('humChartCanvas').getContext('2d');
  window.humChart = new Chart(humChartCtx, humConfig);

  var soundChartCtx = document.getElementById('soundChartCanvas').getContext('2d');
  window.soundChart = new Chart(soundChartCtx, soundConfig);

  var monChartCtx = document.getElementById('monChartCanvas').getContext('2d');
  window.monChart = new Chart(monChartCtx, monConfig);

  var ligiChartCtx = document.getElementById('ligiChartCanvas').getContext('2d');
  window.ligiChart = new Chart(ligiChartCtx, ligiConfig);

  var ligeChartCtx = document.getElementById('ligeChartCanvas').getContext('2d');
  window.ligeChart = new Chart(ligeChartCtx, ligeConfig);
}
