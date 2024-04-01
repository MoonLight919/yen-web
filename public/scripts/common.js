$('#logout').on('click', (e) => {
    localStorage.removeItem('access_token');
});