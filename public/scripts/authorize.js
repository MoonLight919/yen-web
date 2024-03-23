$('#authorize').on('click', (e) => {
    e.preventDefault();
    var button = this;
    button.disabled = true;
    var passwordlessOptions = {
        allowedConnections: ['sms'],
        passwordlessMethod: 'code',
        auth: {
            redirectUrl: 'https://www.yenebezpeka.pp.ua',
            audience: "https://yen-api",
        }
    }
    var lockPasswordless = new Auth0LockPasswordless(
        'JkpFqGpDOoiwVJv0iEgTcBjKZPIClRR8',
        'dev-h5mzz0nq5zepl1tt.us.auth0.com',
        passwordlessOptions
    );

    lockPasswordless.show();
});