/*jslint node: true */
/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var os = require('os');
var niceware = require('niceware');

/* GET home page. */
router.get('/api/echo', function(req, res) {
    const responseObject = createResponse();    

    res.set('Content-Type', 'application/json');
    console.log('Sending response HUSTON ', responseObject);
    res.status(200).send(responseObject);
});

router.get('/', function(req, res){
    const responseObject = createResponse();    

    res.set('Content-Type', 'application/json');
    console.log('Sending response HUSTON ', responseObject);
    res.status(200).send(responseObject);
});

router.get('/healthz', function(req, res){
    res.status(200).send();
});

function createResponse(){
    const password = createRandomPassword();
    const passphrase = createRandomNicewarePassword();

    return {
        'RADIX_APP': (process.env.RADIX_APP || 'empty'),
        'RADIX_COMPONENT': (process.env.RADIX_COMPONENT || 'empty'),
        'RADIX_ENVIRONMENT': (process.env.RADIX_ENVIRONMENT || 'empty'),
        'HOSTNAME': (os.hostname() || 'empty'),
        'HOSTPLATFORM': (os.platform() || '0'),
        'PASSWORD': password,
        'PASSPHRASE': passphrase
    };
}

function createRandomNicewarePassword(){
    const passphrase = niceware.generatePassphrase(8);
    return passphrase.reduce((a,b)=> a + ' ' + b);
}

function createRandomPassword(){
    const randomstring = Math.random().toString(36).slice(-11);
    return randomstring;
}

module.exports = router;
