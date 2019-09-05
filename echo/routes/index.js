/*jslint node: true */
/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var os = require('os');
const maxIterations = 10000000;

/* GET home page. */
router.get('/api/echo', function(req, res) {
    const pi = calcPiGregoryLeibniz();
    const pi2 = calcPiNilakantha();

    var responseObject = {
        'RADIX_APP': (process.env.RADIX_APP || 'empty'),
        'RADIX_CLUSTERNAME': (process.env.RADIX_CLUSTERNAME || 'empty'),
        'RADIX_COMPONENT': (process.env.RADIX_COMPONENT || 'empty'),
        'RADIX_ENVIRONMENT': (process.env.RADIX_ENVIRONMENT || 'empty'),
        'HOSTNAME': (os.hostname() || 'empty'),
        'HOSTPLATFORM': (os.platform() || '0'),
        'MATH_PI': Math.PI,
        'PI_GREGORY_LEIBNIZ': pi,
        'PI_NILAKATHAN': pi2,
    };

    res.set('Content-Type', 'application/json');
    console.log('Sending response HUSTON ', responseObject);
    res.status(200).send(responseObject);
});

router.get('/healthz', function(req, res){
    res.status(200).send();
});

function calcPiGregoryLeibniz(){
    var pi = 0;
    var piQuarter = 0;
    var operator = 1;    
    for (var i=1; pi !== Math.PI && i < maxIterations;i++){
        var divisor = i * 2 - 1;
        piQuarter += operator * (1/divisor);
        operator *= -1;
        pi = piQuarter * 4;
    }
    return pi;
}

function calcPiNilakantha(){
    var pi = 3;
    var operator = 4;
    var i = 1;
    for(i = 1; pi !== Math.PI && i< maxIterations;i++){
        var firstNumber = i*2;
        var divisor = firstNumber * (firstNumber+1)*(firstNumber+2);
        pi += operator / (divisor);
        operator *= -1;
    }
    console.log('nrIterations: ' + i);
    return pi;
}

module.exports = router;
