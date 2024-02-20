var path = require('path');

exports.sendPage = function(response, page){
    response.sendFile(path.resolve('.') + '/public/pages/' + page + '.html');
};
