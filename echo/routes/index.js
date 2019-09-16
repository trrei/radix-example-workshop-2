/*jslint node: true */
/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var os = require('os');
var niceware = require('niceware');

/* GET home page. */
router.get('/api/echo', function(req, res) {
    doResponse(res, createResponse());
});

router.get('/', function(req, res){
    doResponse(res, createResponse());
});

router.get('/healthz', function(req, res){
    res.status(200).send();
});

function doResponse(res, body){
    console.log('reponse: ', body);

    res.set('Content-Type', 'application/json');
    res.status(200).send(body);
}

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
    const randomstring = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return randomstring;
}

module.exports = router;
