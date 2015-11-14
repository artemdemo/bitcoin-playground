/**
 * 1 BTC = 100 000 000 Satoshi
 * 0.1 BTC = 10 000 000 Satoshi
 * 0.01 BTC = 1 000 000 Satoshi
 * 0.001 BTC = 100 000 Satoshi
 * 0.0001 BTC = 10 000 Satoshi
 */

var bitcoin = require('bitcoinjs-lib');
var $ = require('jquery-browserify');

console.log(bitcoin.networks);

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
 * 10.00
 * transaction hash: f25f1d169385772179de01a37d534a9ab1c30c4fdae53cf7a7de4195d6d26af7
 * 
 * 2.
 * cMwRn7qSPTAAFKC9zCE2k9TADqaeDVhNje33q8RxTqJxxYA2ytzT
 * mqbFSc11N4wyYtNRQRcQSVkxsWULSCCKdc
 *
 */

$('.create-transaction').click(function(){
    var network = bitcoin.networks.testnet;
    var mainKeyPair = bitcoin.ECPair.fromWIF('cQbLrQzkB7cZTJUJ2LQAuyTjDGebRcDGxuZPxQhdkWbLhzkmpa66', network);
    var tx = new bitcoin.TransactionBuilder(network);

    var changeKey = mainKeyPair.getAddress();

    // Add the input (who is paying) of the form [previous transaction hash, index of the output to use]
    tx.addInput('65a5a4f351fa390561bd73ca6696cdda544d76e1f9f3ee22241a50c1431bae8b', 0);

    // Add the output (who to pay to) of the form [payee's address, amount in satoshis]
    tx.addOutput('n1GxASqueyxzKtj1XM55MmYH37XPq1TtbZ', 7000);

    // Change will be sen here
    tx.addOutput(changeKey, 3000);

    // Sign the first input with the new key
    tx.sign(0, mainKeyPair);

    // Print transaction serialized as hex
    listLog('Transaction: ' + tx.build().toHex());
});

function listLog (message) {
    var $message = $(document.createElement('li')).text(message);
    $('.bitcoin-app__list-results').append($message);
}