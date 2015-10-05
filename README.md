# ansible-playbook-cli-js
A node.js wrapper for the [ansible-playbook](http://linux.die.net/man/1/ansible-playbook) command

[![NPM](https://nodei.co/npm/ansible-playbook-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ansible-playbook-cli-js/)
[![NPM](https://nodei.co/npm-dl/ansible-playbook-cli-js.png?months=6&height=3)](https://nodei.co/npm/ansible-playbook-cli-js/)

## Installation

### Step 1: Prerequisites

The aws command line interface must be installed and accessible in the path

### Step 2: Installation
    
    npm install ansible-playbook-cli-js
    
Then:

```js
var AnsiblePlaybookCli = require('ansible-playbook-cli-js');
```

## Usage

With promise

```js
var ansiblePlaybookCli = new AnsiblePlaybookCli({
});

ansiblePlaybookCli.command('??').then(function (data) {
  console.log('data = ', data); 
});

//data = {

```

With callback:

```js

ansiblePlaybookCli.command('??', function (err, data) {
  console.log('data = ', data);
});

//data = {

```

* ??

```js
ansiblePlaybookCli.command('?? --instance-ids i-789b3ba7').then(function (data) {
  console.log('data = ', data); 
});


//


```
or with options

```js
ansiblePlaybookCli.command('??', { 'instance-ids': 'i-789b3ba7' }).then(function (data) {
  console.log('data = ', data); 
});

```


