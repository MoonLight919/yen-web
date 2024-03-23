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
        window.location.href = "https://www.yenebezpeka.pp.ua";
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });
