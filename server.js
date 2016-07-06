var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var firebase = require('firebase');
//var methodOverride = require('method-override');

// app.use(require('express-jquery')('/jquery.js'));

firebase.initializeApp({
    serviceAccount: {
        projectId: "jobs-portal-43e85",
        clientEmail: "jobportal@jobs-portal-43e85.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCUjBDp2BYp3PWi\noflDmTGWmphsDiQQ6R7vm8BP5jSwodvrU/MPddF3L4VCEgqGld23oHaGGz07y57M\ndCKef03woDZJzTTx50NtZfPTsROJdPHT2cwx3Plv7322uem2XWcSCTl217mydLeD\nukXJMUMP4Q8ehXC6zy9jD/Kvw7UCGzea3eBw+PCP35pZHIoRpFOthlV6SYr/FIBG\nSx9K7g7kO+tGJYYHt4kwX5dojYjm6tTJ1t6R7lr87U/7zKAyor/lFpml5QbWPV4w\nX4FZ8XKiIa45RxDbXbrEv3G31rsSUi0b1GysK5gaxGxGvQhVU7kby08RyXn8/UC1\nnJqqwsyjAgMBAAECggEAZN5vpbrb4fVuvs6qCmL+LzwvAEDh8LG8Fgx3HEo/wSlH\nwpaw1/CzGfGk1WaWyyj883H8ybe5bt8np8G8uE/NxvWjp522tATL3n96gGcf0xkc\nFTUx2TIqFv5TKT85GmJ2WOL2qGJ4cFudOc/FD4dp+GBk+d6228NQdD4iF4QXZ6O2\nI8vf+Kxm6Y+yWqjVFRe5bEv3HfEIL/RE1ZHYZfO7R1kYbL0bRl4RkQO0ty97XftJ\nejafeKIXFdTwgpT0/yofdIn/eCsXB2wX5AVDHYJzTsVeqizOZwEslUVhhTVdwNEg\ndh3E9CLAqaeS4aYqgYMdn1liIF/3YLrXc6alq3N74QKBgQDR0xlCPrpb5QQVYsfd\nlrmjUbTF9PPP0XkUimjVA06Gf+UbV9P98i7jJhNvXB/4p+l8RJUjg7c6zV/LfKA2\n/M4brzgGA6LRVpuks+LNF57ZJtpq+lTjQTJTLJh5X5tXl5RM24C4yGiFoZn+WXPu\nRLQoytBdWTfg7kPPV1VLDqZ7CwKBgQC1PMZbR4nKvdlSiIffeJ9ikpMr/aGhK8OA\nBLIhRtoBkafSKfO97lb1XJYOJTtaHiGkymzC9rxnBeprVn6YJn/YZM1I06KjSe5U\nWCLJBXaSP9PeqM63UcJF/zQgm+81MYG1XVdsl9dufR9EMNxJIlfkVd030qxcM/oF\nGjmubDszyQKBgQCqFTgwXrCptOaufzgMAxXPsXebz4ejOeWwJNH9eYS5ugp5M6SA\nAUTIlCDE8CRqZ5H4TY+nDioE3F1+kTM934cjIdGD7oaYsl/QDpEWNsNouvnqJamR\n3VNx4IBoQnulcRWhh3y8TJeNWwV9C/3RcpenSV/Fi4CkL/9/nwdgpCuHKQKBgG7M\nou+3ApSCEFSWx4plcfuPZI4mVyPzX2fqdwRFDo6a/6BKqYraJSuH2Oz48hocBbF7\nV5axxWiugyvwCyD1mH8w0RfO2sU9M4k5ALsord6nSt37EbWdNEoaxUGSU2GPzJ6W\nXBY1li0kLXNA88t6RYWAwOeZ0mnkFNv9tnneDSuRAoGAXs0tT+jwtSLqHi6q/BXs\nk9YT1C9Ad8NVcsvQFm7ibUnXWuIFQgAXCJQG2nzDOsnquFZIYdhfCTrQpOJ2FiMf\nNuj5+SY0U1zwXAbOjydlA5SncG3l2rm3vEzSfWSLLgo6Ayp7LccPAD627JgqoCq/\nI1fcbl3BfpYggTmfOhaRxfk=\n-----END PRIVATE KEY-----\n"
    },
    databaseURL: "https://jobs-portal-43e85.firebaseio.com/"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8070; // set our port

// ROUTES FOR OUR API
var router = express.Router(); // get an instance of the express Router

//USERS
//List
router.get('/:name', function(req, res) {
    var senddata = [];
    firebase.database().ref(req.params.name).once('value', function(snapshot) {
        for (var k in snapshot.val()) {
            if (typeof snapshot.val()[k] !== 'function') {
            	var s = snapshot.val()[k] 
            	s.id = k;
                senddata.push(s);
            }
        }
        res.json(senddata);
    });
});

//CREATE
router.post('/:name', function(req, res) {    
	firebase.database().ref().child(req.params.name).push(req.body);
	res.json("Successfully Added");    
});

//DETAIL
router.get('/:name/:id', function(req, res) {
    firebase.database().ref(req.params.name +'/' + req.params.id).once('value', function(snapshot) {
        res.json(snapshot.val());
    });
});

//UPDATE
router.put('/:name/:id', function(req, res) {
    firebase.database().ref().child( req.params.name+'/' + req.params.id).set(req.body);
    res.json("Successfully Updated");
});

//DELETE
router.delete('/:name/:id', function(req, res) {    
    firebase.database().ref().child(  req.params.name+'/' + req.params.id).remove(); 
});


// //JOBSCATEGORY
// //List
// router.get('/JobsCategory', function(req, res) {
//     var senddata = [];
//     firebase.database().ref('JobsCategory').once('value', function(snapshot) {
//         for (var k in snapshot.val()) {
//             if (typeof snapshot.val()[k] !== 'function') {
//             	var s = snapshot.val()[k] 
//             	s.id = k;
//                 senddata.push(s);
//             }
//         }
//         res.json(senddata);
//     });
// });

// //CREATE
// router.post('/JobsCategory', function(req, res) {    
// 	firebase.database().ref().child('JobsCategory').push(req.body);
// 	res.json("Successfully Added");    
// });

// //DETAIL
// router.get('/JobsCategory/:id', function(req, res) {
//     firebase.database().ref('JobsCategory/' + req.params.id).once('value', function(snapshot) {
//         res.json(snapshot.val());
//     });
// });

// //UPDATE
// router.put('/JobsCategory/:id', function(req, res) {
//     firebase.database().ref().child('JobsCategory/' + req.params.id).set(req.body);
//     res.json("Successfully Updated");
// });

// //DELETE
// router.delete('/JobsCategory/:id', function(req, res) {    
//     firebase.database().ref().child('JobsCategory/' + req.params.id).remove(); 
// });


// //QUALIFICATION
// //List
// router.get('/Qualification', function(req, res) {
//     var senddata = [];
//     firebase.database().ref('Qualification').once('value', function(snapshot) {
//         for (var k in snapshot.val()) {
//             if (typeof snapshot.val()[k] !== 'function') {
//             	var s = snapshot.val()[k] 
//             	s.id = k;
//                 senddata.push(s);
//             }
//         }
//         res.json(senddata);
//     });
// });

// //CREATE
// router.post('/Qualification', function(req, res) {    
// 	firebase.database().ref().child('Qualification').push(req.body);
// 	res.json("Successfully Added");    
// });

// //DETAIL
// router.get('/Qualification/:id', function(req, res) {
//     firebase.database().ref('Qualification/' + req.params.id).once('value', function(snapshot) {
//         res.json(snapshot.val());
//     });
// });

// //UPDATE
// router.put('/Qualification/:id', function(req, res) {
//     firebase.database().ref().child('Qualification/' + req.params.id).set(req.body);
//     res.json("Successfully Updated");
// });

// //DELETE
// router.delete('/Qualification/:id', function(req, res) {    
//     firebase.database().ref().child('Qualification/' + req.params.id).remove(); 
// });


// //STATUS
// //List
// router.get('/Status', function(req, res) {
//     var senddata = [];
//     firebase.database().ref('Status').once('value', function(snapshot) {
//         for (var k in snapshot.val()) {
//             if (typeof snapshot.val()[k] !== 'function') {
//             	var s = snapshot.val()[k] 
//             	s.id = k;
//                 senddata.push(s);
//             }
//         }
//         res.json(senddata);
//     });
// });

// //CREATE
// router.post('/Status', function(req, res) {    
// 	firebase.database().ref().child('Status').push(req.body);
// 	res.json("Successfully Added");    
// });

// //DETAIL
// router.get('/Status/:id', function(req, res) {
//     firebase.database().ref('Status/' + req.params.id).once('value', function(snapshot) {
//         res.json(snapshot.val());
//     });
// });

// //UPDATE
// router.put('/Status/:id', function(req, res) {
//     firebase.database().ref().child('Status/' + req.params.id).set(req.body);
//     res.json("Successfully Updated");
// });

// //DELETE
// router.delete('/Status/:id', function(req, res) {    
//     firebase.database().ref().child('Status/' + req.params.id).remove(); 
// });




app.use('/', router);
app.listen(port);
console.log('running in ' + port);
