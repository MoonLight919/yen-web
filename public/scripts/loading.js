const currentUrl = window.location.href;
const url = new URL(currentUrl);
const code = url.searchParams.get("code");

if (!code) {
    window.location.href = "https://www.yenebezpeka.pp.ua";
}

$(document).ready(function() {
  $.ajax({
    url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/auth/authorize',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      code
    }),
    headers: {
      'X-API-Key': 'hIy56nPdlOFYLFlqkGDWt1AAgMWtS2cW'
    },
    success: function(data) {
      localStorage.setItem('access_token', data);
      $(document).ready(function() {
        $.ajax({
          url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/profile',
          type: 'GET',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          },
          success: function(user) {
            if(!user.default_region || !user.current_region){
              $.ajax({
                url: 'https://ipgeolocation.abstractapi.com/v1/?api_key=5eb6ef4c3b864eefac54dea464850087',
                type: 'GET',
                contentType: 'application/json',
                headers: {
                    'Content-Type': 'application/json',
                },
                success: function(geoData) {
                  const payload = {};
                  if(!user.default_region){
                    payload.default_region = geoData.region;
                  }
                  if(!user.current_region){
                    payload.current_region = geoData.region;
                  }
                  $(document).ready(function() {
                    $.ajax({
                      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/profile',
                      type: 'PATCH',
                      contentType: 'application/json',
                      data: JSON.stringify(payload),
                      headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                      },
                      success: function(data) {
                        setTimeout(function(){
                          window.location.href = "https://www.yenebezpeka.pp.ua";
                        }, 1000);
                      },
                      error: function(xhr, status, error) {
                        console.error('Error:', xhr.responseJSON);
                      }
                    });
                  });
                },
                error: function(xhr, status, error) {
                  console.error('Error:', xhr.responseJSON);
                }
              });
            } else {
              window.location.href = "https://www.yenebezpeka.pp.ua";
            }
          },
          error: function(xhr, status, error) {
            console.error('Error:', xhr.responseJSON);
          }
        });
      });
    },
    error: function(xhr, status, error) {
      console.error('Error:', xhr.responseJSON);
    }
  });
});
