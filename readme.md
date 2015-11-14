# Bitcoin playgraind

Testing and checking functionality


## Instal bitcoin core

Download [bitoicn core](https://bitcoin.org/en/download) and extract it anywhere, for example here `/usr/local/bin/bitcoind/bin/bitcoind`


## Create new .bitcoin folder

This folder will be authomatically created for you, but in any case you'll need

```
~ $ mkdir .bitcoin && cd .bitcoin && vim bitcoin.conf
```

```
rpcpassword=change_this_to_a_long_random_password
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

[Developer examples](https://bitcoin.org/en/developer-examples)

[bitcoin-cli commands](https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list)

Generate 101 block
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest generate 101
```

Get available balance
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest getbalance
```

Should be `50.00`


## Transaction and get balance

Send bitcoins from pull to the address
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest sendtoaddress msxMqjP2bzBSdi5sg8zhFNxduK7FZvteEG 10.00
```

Get amount of bitcoin address
```
/usr/local/bin/bitcoind/bin/bitcoin-cli -regtest getbalance msxMqjP2bzBSdi5sg8zhFNxduK7FZvteEG
```