const access_token = localStorage.getItem(access_token);
if(!access_token){
    window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
}

$(document).ready(function() {
    $.ajax({
      url: 'https://yen-api-7d8c3d9f30f7.herokuapp.com/v1/auth/validate-token',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        code
      }),
      headers: {
        'X-API-Key': 'hIy56nPdlOFYLFlqkGDWt1AAgMWtS2cW',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      error: function(xhr, status, error) {
        localStorage.removeItem('access_token');
        window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
      }
    });
  });
