$('#alerts-in-ua').hide();
$('#iqair').hide();
$('#radiation').hide();
$('#test-phone-number-loading').hide();

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
  $(`#${category}-test-loading`).hide();
  $(`#save-${category}-loading`).hide();
  $(`#${category}-alert`).hide();

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
    $(`#${category}-alert`).hide();
    const payload = {
      type: category,
      default_location: $(`#default-location-${category}`).prop('checked') ?? false,
      active: $(`#${category}-notification`).prop('checked'),
    };
    if($(`#${category}-notification-trigger-value`).length) {
      payload.trigger_value = $(`#${category}-notification-trigger-value`).val()
    }
    if($(`#${category}-notification-upper-border-trigger-value`).length) {
      payload.upper_border = $(`#${category}-notification-upper-border-trigger-value`).val()
    }
    if($(`#${category}-notification-lower-border-trigger-value`).length) {
      payload.lower_border = $(`#${category}-notification-lower-border-trigger-value`).val()
    }
    if($(`#${category}-notification-upper-border`).length) {
      payload.upper_border_active = $(`#${category}-notification-upper-border`).is(':checked');
    }
    if($(`#${category}-notification-lower-border`).length) {
      payload.lower_border_active = $(`#${category}-notification-lower-border`).is(':checked');
    }
    let url = 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/notification-details';
    let type = 'POST';
    const detail = notificationDetails.find(detail => detail.type === category);

    const updatedDetail = {
      ...detail,
      ...payload,
    };
    if(updatedDetail.active) {
      if(
        $(`#${category}-notification-upper-border-trigger-value`).length && 
        updatedDetail.upper_border_active &&
        !updatedDetail.upper_border
      ) {
        $(`#${category}-alert`).text('You can not activate upper border trigger without setting a trigger value');
        $(`#${category}-alert`).show();
        $(`#save-${category}`).show();
        $(`#save-${category}-loading`).hide();
        return;
      } else if(
        $(`#${category}-notification-lower-border-trigger-value`).length && 
        updatedDetail.lower_border_active &&
        !updatedDetail.lower_border
      ) {
        $(`#${category}-alert`).text('You can not activate lower border trigger without setting a trigger value');
        $(`#${category}-alert`).show();
        $(`#save-${category}`).show();
        $(`#save-${category}-loading`).hide();
        return;
      } else if(
        $(`#${category}-notification-lower-border-trigger-value`).length && 
        $(`#${category}-notification-upper-border-trigger-value`).length && 
        !updatedDetail.lower_border_active &&
        !updatedDetail.upper_border_active
      ) {
        $(`#${category}-alert`).text('You have to either set lower or upper border trigger values');
        $(`#${category}-alert`).show();
        $(`#save-${category}`).show();
        $(`#save-${category}-loading`).hide();
        return;
      }
    }

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
          if($(`#${category}-notification-trigger-value`).length){
            $(`#${category}-notification-trigger-value`).val(detail.trigger_value);
          }
          if($(`#${category}-notification-lower-border-trigger-value`).length){
            $(`#${category}-notification-lower-border-trigger-value`).val(detail.lower_border);
          }
          if($(`#${category}-notification-upper-border-trigger-value`).length){
            $(`#${category}-notification-upper-border-trigger-value`).val(detail.upper_border);
          }
          if($(`#${category}-notification-lower-border`).length){
            $(`#${category}-notification-lower-border`).prop('checked', detail.lower_border_active);
          }
          if($(`#${category}-notification-upper-border`).length){
            $(`#${category}-notification-upper-border`).prop('checked', detail.upper_border_active);
          }
        }
      });
    }
  });
});

$(document).ready(function() {
  $.ajax({
    url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/profile',
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
      $('#phone-number-display').text(response.phone_number);
      $('#default-coordinates-display').text(`${response.default_latitude}, ${response.default_longitude}`);
      $('#default-location-display').text(`${response.default_city}, ${response.default_country}`);
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