# Bitcoin playgraind

Testing and checking functionality

As usual a lot of usefull information you can find here: [Bitcoin StackExchange - RegTest](http://bitcoin.stackexchange.com/search?q=regtest)

## Instal bitcoin core

Download [bitcoin core](https://bitcoin.org/en/download) and extract it anywhere, for example here `/usr/local/bin/bitcoind/bin/bitcoind`


## Create new .bitcoin folder

This folder will be authomatically created for you, but in any case you'll need

```
~ $ mkdir .bitcoin && cd .bitcoin && vim bitcoin.conf
```

```
rpcpassword=change_this_to_a_long_random_password
regtest=1
```

```
chmod 0600 bitcoin.conf
```


## Regtest server

Start server
```
/usr/local/bin/bitcoind/bin/bitcoind -regtest -daemon
```

Stop server
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest stop
```


## Generate first bitcoins

* [Developer examples](https://bitcoin.org/en/developer-examples)
* [bitcoin-cli commands](https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list)

Generate 101 block
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest generate 101
```

Get available balance
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest getbalance
```

Should be `50.00`


## Performing transactions and retrieving balance

Example of custom key pare:
* *Pivate:* cQ3JdUMMbtUW8ibfLXWXZhRp6HFBBLk3Nqog5QssekY7df8y8ZUk
* *Public:* msxMqjP2bzBSdi5sg8zhFNxduK7FZvteEG

Send bitcoins from pull to the address
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest sendtoaddress [..publicKey..] 10.00
```

Get amount of bitcoin address
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest getbalance [..publicKey..]
```

Returns array of unspent transaction inputs in this wallet
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest listunspent
```

This list will output only confirmed transactions. Therefore it will be empty now, to get list of unconfirmed transactions use same command with 0:

```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest listunspent 0
```

Import private key to the wallet:
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest importprivkey [..privateKey..]
```

In order to confirm last transactions we need to generate new block:
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest generate 1
```


## RAW transactions

Decode transaction
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest decoderawtransaction [..raw..]
```

Send raw transaction
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest sendrawtransaction [..raw..]
```


## Run multiple bitcoind instances in regtest to simulate multiple nodes

@[source](http://bitcoin.stackexchange.com/a/39168)

Creating separate bitcoin data directory

```
~ $ mkdir .bitcoin2 && cd .bitcoin2 && vim bitcoin.conf
```

Add following to you `bitcoin.conf` file:

```
regtest=1
rpcpassword=change_this_to_a_long_random_password_2
rpcuser=rt
rpcuser=rt
port=12340
rpcport=10340
discover=0
```

Now you need to connect your first node with your 2nd node by sending a `addnode` over the RPC interface (server [should be running](https://github.com/artemdemo/bitcoin-playground#regtest-server))

```
/usr/local/bin/bitcoind/bin/bitcoin-cli addnode 127.0.0.1:10340 onetry
```

You can than distinct between both nodes with the `-datadir` argument while calling `bitcoin-cli`.

```
/usr/local/bin/bitcoind/bin/bitcoin-cli -datadir=/home/artem/.bitcoin2 getinfo
```