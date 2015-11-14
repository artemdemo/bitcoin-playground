/**
 * 1 BTC = 100 000 000 Satoshi
 * 0.1 BTC = 10 000 000 Satoshi
 * 0.01 BTC = 1 000 000 Satoshi
 * 0.001 BTC = 100 000 Satoshi
 * 0.0001 BTC = 10 000 Satoshi
 */

var bitcoin = require('bitcoinjs-lib');
var $ = require('jquery-browserify');

// Testnet main network
var network = bitcoin.networks.testnet;
var keyPair = bitcoin.ECPair.makeRandom({ network: network });

// Bitcoin main network
// var keyPair = bitcoin.ECPair.makeRandom();

listLog('Private key (WIF): ' + keyPair.toWIF());
listLog('Public key: ' + keyPair.getAddress());

/*
 * Test keys:
 * 1.
 * cQ3JdUMMbtUW8ibfLXWXZhRp6HFBBLk3Nqog5QssekY7df8y8ZUk
 * msxMqjP2bzBSdi5sg8zhFNxduK7FZvteEG
 * 
 * 2.
 * cMwRn7qSPTAAFKC9zCE2k9TADqaeDVhNje33q8RxTqJxxYA2ytzT
 * mqbFSc11N4wyYtNRQRcQSVkxsWULSCCKdc
 *
 */

$('.create-transaction').click(function(){
    var network = bitcoin.networks.testnet;
    var mainKeyPair = bitcoin.ECPair.fromWIF('cQ3JdUMMbtUW8ibfLXWXZhRp6HFBBLk3Nqog5QssekY7df8y8ZUk', network);
    var tx = new bitcoin.TransactionBuilder(network);

    var changeKey = mainKeyPair.getAddress();

    // Add the input (who is paying) of the form [previous transaction hash, index of the output to use]
    tx.addInput('32e1c22063b980e244ec18509fe4e082e65d3b3237178e7713e89757085d5738', 0);

    // Add the output (who to pay to) of the form [payee's address, amount in satoshis]
    tx.addOutput('mqbFSc11N4wyYtNRQRcQSVkxsWULSCCKdc', btcToSatoshi(7));

    // Change will be sen here
    // tx.addOutput(changeKey, btcToSatoshi(3));

    // Sign the first input with the new key
    tx.sign(0, mainKeyPair);

    // Print transaction serialized as hex
    listLog('Transaction: ' + tx.build().toHex());
});

/**
 * Convert BTC to satoshi
 * 1 BTC = 100,000,000 satoshi
 *
 */
function btcToSatoshi (btc) {
    return btc * 100000000
}

function listLog (message) {
    var $message = $(document.createElement('li')).text(message);
    $('.bitcoin-app__list-results').append($message);
}