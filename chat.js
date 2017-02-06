var clients = [];

exports.subscribe = function(req, res){
    console.log("subscribe");
    clients.push(res);
    res.on('close', function() {
        clients.splice(clients.indexOf(res), 1);
    });
};

exports.publish = function(message){                                                                                    console.log("publish");
                                                                                                                        console.log("clients.length=", clients.length );
    clients.forEach(function(res){                                                                                      //console.log("publish to ",res.url);
        res.end(message);
    });
    clients =[];
};