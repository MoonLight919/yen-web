$.ajax({
    url: 'https://ipgeolocation.abstractapi.com/v1/?api_key=5eb6ef4c3b864eefac54dea464850087',
    type: 'GET',
    contentType: 'application/json',
    headers: {
        'Content-Type': 'application/json',
    },
    success: function(data) {
        if($('#air-quality-map')){
            $('#air-quality-map')
            .attr('src', `https://www.iqair.com/air-quality-map?lat=${data.latitude}&lng=${data.longitude}&zoomLevel=10`);
        }
        if($('#save-eco-bot-map')){
            $('#save-eco-bot-map')
            .attr('src', `https://www.saveecobot.com/radiation-maps#12/${data.latitude}/${data.longitude}&gamma`);
        }
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    }
});