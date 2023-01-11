var url_domain = window.location.host;
var config_url = '';

if (url_domain == 'localhost:8080') {
    config_url = 'http://appb.oteroweb.test/api/1.0/';
} else if (url_domain == 'app.medical.com.ar') {
    config_url = 'https://appb.medical.com.ar/api/1.0/';
}
console.log('Backend Conected: ' + config_url);
export const apiPath = config_url;
