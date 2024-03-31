$('#alerts-in-ua').hide();
$('#iqair').hide();
$('#test-phone-number-loading').hide();

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
})