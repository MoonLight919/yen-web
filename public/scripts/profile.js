$('#alerts-in-ua').hide();
$('#iqair').hide();

$('#btnradio1').on('change', (e) => {
    $('#general-information').show();
    $('#alerts-in-ua').hide();
    $('#iqair').hide();
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
