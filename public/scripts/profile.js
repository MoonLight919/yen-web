$('#alerts-in-ua').hide();
$('#iqair').hide();
$('#test-phone-number-loading').hide();
$('#alerts-in-ua-test-loading').hide();
$('#air-quality-test-loading').hide();
$('#air-temperature-test-loading').hide();
$('#atmospheric-pressure-test-loading').hide();
$('#humidity-test-loading').hide();
$('#wind-speed-test-loading').hide();
$('#weather-test-loading').hide();

$('#weather-test').on('click', (e) => {
  $('#weather-test').hide();
  $('#weather-test-loading').show();
  $(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/iqair/current-information/weather',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr) {
        console.error('Error:', xhr.responseJSON);
        if(xhr.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
        }
      },
      success: function(data) {
        $('#weather-test').show();
        $('#weather-test-loading').hide();
      }
    });
  });    
});

$('#wind-speed-test').on('click', (e) => {
  $('#wind-speed-test').hide();
  $('#wind-speed-test-loading').show();
  $(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/iqair/current-information/wind-speed',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr) {
        console.error('Error:', xhr.responseJSON);
        if(xhr.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
        }
      },
      success: function(data) {
        $('#wind-speed-test').show();
        $('#wind-speed-test-loading').hide();
      }
    });
  });    
});


$('#humidity-test').on('click', (e) => {
  $('#humidity-test').hide();
  $('#humidity-test-loading').show();
  $(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/iqair/current-information/humidity',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr) {
        console.error('Error:', xhr.responseJSON);
        if(xhr.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
        }
      },
      success: function(data) {
        $('#humidity-test').show();
        $('#humidity-test-loading').hide();
      }
    });
  });    
});

$('#atmospheric-pressure-test').on('click', (e) => {
  $('#atmospheric-pressure-test').hide();
  $('#atmospheric-pressure-test-loading').show();
  $(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/iqair/current-information/atmospheric-pressure',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr) {
        console.error('Error:', xhr.responseJSON);
        if(xhr.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
        }
      },
      success: function(data) {
        $('#atmospheric-pressure-test').show();
        $('#atmospheric-pressure-test-loading').hide();
      }
    });
  });    
});

$('#air-temperature-test').on('click', (e) => {
  $('#air-temperature-test').hide();
  $('#air-temperature-test-loading').show();
  $(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/iqair/current-information/air-temperature',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr) {
        console.error('Error:', xhr.responseJSON);
        if(xhr.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
        }
      },
      success: function(data) {
        $('#air-temperature-test').show();
        $('#air-temperature-test-loading').hide();
      }
    });
  });    
});

$('#air-quality-test').on('click', (e) => {
  $('#air-quality-test').hide();
  $('#air-quality-test-loading').show();
  $(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/iqair/current-information/air-quality',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr) {
        console.error('Error:', xhr.responseJSON);
        if(xhr.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
        }
      },
      success: function(data) {
        $('#air-quality-test').show();
        $('#air-quality-test-loading').hide();
      }
    });
  });    
});

$('#alerts-in-ua-test').on('click', (e) => {
  $('#alerts-in-ua-test').hide();
  $('#alerts-in-ua-test-loading').show();
  $(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/alerts-in-ua/current-information',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr) {
        console.error('Error:', xhr.responseJSON);
        if(xhr.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
        }
      },
      success: function(data) {
        $('#alerts-in-ua-test').show();
        $('#alerts-in-ua-test-loading').hide();
      }
    });
  });    
});

$('#btnradio1').on('change', (e) => {
    $('#general-information').show();
    $('#alerts-in-ua').hide();
    $('#iqair').hide
});

$('#btnradio2').on('change', (e) => {
    $('#general-information').hide();
    $('#alerts-in-ua').show();
    $('#iqair').hide();
});

$('#btnradio3').on('change', (e) => {
    $('#general-information').hide();
    $('#alerts-in-ua').hide();
    $('#iqair').show();
});

$('#btnradio4').on('change', (e) => {
    $('#general-information').hide();
    $('#alerts-in-ua').hide();
    $('#iqair').hide();
});

$('#test-phone-number').on('click', (e) => {
  $('#test-phone-number').hide();
  $('#test-phone-number-loading').show();
  $(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/twilio/test',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr) {
        console.error('Error:', xhr.responseJSON);
        if(xhr.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
        }
      },
      success: function(data) {
        $('#test-phone-number').show();
        $('#test-phone-number-loading').hide();
      }
    });
  });    
});