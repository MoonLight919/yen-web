const code = localStorage.getItem('access_token');
if (!code) {
    window.location.href = "https://www.yenebezpeka.pp.ua/authorize";
}

$('#logout').on('click', (e) => {
    localStorage.removeItem('access_token');
});