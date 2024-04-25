$('#alerts-in-ua').hide();
$('#iqair').hide();
$('#radiation').hide();
$('#test-phone-number-loading').hide();
$('#alerts-in-ua-test-loading').hide();
$('#air-quality-test-loading').hide();
$('#air-temperature-test-loading').hide();
$('#atmospheric-pressure-test-loading').hide();
$('#humidity-test-loading').hide();
$('#wind-speed-test-loading').hide();
$('#weather-test-loading').hide();
$('#radiation-test-loading').hide();
$('#save-alerts-in-ua-loading').hide();
$('#save-air-quality-loading').hide();
$('#save-air-temperature-loading').hide();
$('#save-atmospheric-pressure-loading').hide();
$('#save-humidity-loading').hide();
$('#save-wind-speed-loading').hide();
$('#save-weather-loading').hide();
$('#save-radiation-loading').hide();

const categoriesAndURLs = {
  'weather': '/iqair/current-information/weather',
  'wind-speed': '/iqair/current-information/wind-speed',
  'humidity': '/iqair/current-information/humidity',
  'atmospheric-pressure': '/iqair/current-information/atmospheric-pressure',
  'air-temperature': '/iqair/current-information/air-temperature',
  'air-quality': '/iqair/current-information/air-quality',
  'radiation': '/save-eco-bot/current-information',
  'alerts-in-ua': '/alerts-in-ua/current-information',
};

Object.keys(categoriesAndURLs).forEach(category => {
  $(`#${category}-test`).on('click', (e) => {
    $(`#${category}-test`).hide();
    $(`#${category}-test-loading`).show();
    $(document).ready(function() {
      $.ajax({
        url: `https://yen-api-7d8c3d9f30f7.herokuapp.com/v1${categoriesAndURLs[category]}`,
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
          $(`#${category}-test`).show();
          $(`#${category}-test-loading`).hide();
        }
      });
    });    
  });

  $(`#save-${category}`).on('click', (e) => {
    $(`#save-${category}`).hide();
    $(`#save-${category}-loading`).show();
    const payload = {
      type: category,
      default_location: $(`#default-location-${category}`).prop('checked') ?? false,
      active: $(`#${category}-notification`).prop('checked'),
    };
    if($(`#${category}-notification-trigger-value`)) {
      payload.trigger_value = $(`#${category}-notification-trigger-value`).val()
    }
    let url = 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/notification-details';
    let type = 'POST';
    const detail = notificationDetails.find(detail => detail.type === category);
    if(detail) {
      url += `/${detail.id}`;
      type = 'PATCH'
    }
    $(document).ready(function() {
      $.ajax({
        url,
        type,
        contentType: 'application/json',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
        data: JSON.stringify(payload),
        error: function(xhr) {
          console.error('Error:', xhr.responseJSON);
          if(xhr.status === 401) {
              localStorage.removeItem('access_token');
              window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
          }
        },
        success: function(data) {
          $(`#save-${category}`).show();
          $(`#save-${category}-loading`).hide();
        }
      });
    });
  });
});

let notificationDetails;

$(document).ready(function() {
  $.ajax({
    url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/notification-details',
    type: 'GET',
    contentType: 'application/json',
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
    success: function(response) {
      notificationDetails = response.data;
      
      Object.keys(categoriesAndURLs).forEach(category => {
        const detail = notificationDetails.find(detail => detail.type === category);
        if(detail) {
          $(`#${category}-notification`).prop('checked', detail.active);
          $(`#current-location-${category}`).prop('checked', !detail.default_location);
          $(`#default-location-${category}`).prop('checked', detail.default_location);
          if($(`#${category}-notification-trigger-value`)){
            $(`#${category}-notification-trigger-value`).val(detail.trigger_value);
          }
        }
      });
    }
  });
});

$('#btnradio1').on('change', (e) => {
    $('#general-information').show();
    $('#alerts-in-ua').hide();
    $('#iqair').hide();
    $('#radiation').hide();
});

$('#btnradio2').on('change', (e) => {
    $('#general-information').hide();
    $('#alerts-in-ua').show();
    $('#iqair').hide();
    $('#radiation').hide();
});

$('#btnradio3').on('change', (e) => {
    $('#general-information').hide();
    $('#alerts-in-ua').hide();
    $('#iqair').show();
    $('#radiation').hide();
});

$('#btnradio4').on('change', (e) => {
    $('#general-information').hide();
    $('#alerts-in-ua').hide();
    $('#iqair').hide();
    $('#radiation').show();
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