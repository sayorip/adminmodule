var database = require('./database');
var hashmap = require('hashmap');

exports.list = function(req, res){
  res.send('respond with a resource');
};

exports.charts = function(req, res){
	  res.render('charts', {title:"Charts"});
	};

exports.tables = function(req, res){
	  res.render('tables', {title:"Tables"});
	};

exports.forms = function(req, res){
	  res.render('forms', {title:"Forms"});
	};

//Get Sensor Data////////////////////////////////////////////////
exports.getCoupons = function(req, res){
    console.log("Inside getCoupons");
    database.allDocs(function(err, results) {
        var res_dict = [];
        if (err) {
            console.log("Unable to get Coupon data");
            res.send({
                "status" : 100
            });
        } else {
            console.log("Printing sensor data in loop");
            results.rows.forEach(function(doc){

            	console.log(doc["doc"].data);
                var dattime = doc["doc"].date;  //datetime
                dattime = dattime.replace(/\//g, '-');

                res_dict.push({
                    "id":doc["doc"]._id,
                    "date":dattime,
                    "desc":doc["doc"].description,
                    "location":doc["doc"].location
                });
            });

            res.send(res_dict);
        }
    }, "coupons");

};

//Get Sensor Data////////////////////////////////////////////////
exports.getGraph = function(req, res){
    console.log("Inside Coupon Graph");
    database.allDocs(function(err, results) {
        var res_dict = [];
          var map = {};
        if (err) {
            console.log("Unable to get sensor data");
            res.send({
                "status" : 100
            });
        } else {
            console.log("Printing sensor data in loop");
            results.rows.forEach(function(doc){

                var count  = 0 ;   
                console.log(doc["doc"].data);
                var dattime = doc["doc"].date;  //datetime
                dattime = dattime.replace(/\//g, '-');
                var desc = doc["doc"].description;
                // if (map[dattime]) = map
                // if (map[dattime] in map){
                //     count = count + 1;
                // }
                // map[dattime] = count;
                
                // map[dattime] = desc;
                
                    res_dict.push({
                    "id":doc["doc"]._id,
                    "date":dattime,
                    "desc":doc["doc"].description,
                    "location":doc["doc"].location
                });
                    // count = count(res_dict[dattime]);
                    var c = res_dict.reduce(function(n, p){
                        return n + (p.dattime == res_dict[dattime])
                    },0 );

                    // alert(c);

                    map[dattime] = c;

            });     

            res.send(map);

        }
    }, "coupons");

};

	





