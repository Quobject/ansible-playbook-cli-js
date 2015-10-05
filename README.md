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
  cwd: 'test1'
});

ansiblePlaybookCli.command('playbook.yml -i hosts').then(function (data) {
  console.log('data = ', data); 
});


//data = {
//  command: 'ansible-playbook playbook.yml -i hosts ',
//  raw: '["\\nPLAY [create test dir] ******************************************************** \\n\\nGATHERING FACTS *************************************************************** \\nok: [127.0.0.1]\\n\\nTASK: [create tmp2 dir] ******************************************************* \\nok: [127.0.0.1]\\n\\nPLAY RECAP ******************************************************************** \\n127.0.0.1                  : ok=2    changed=0    unreachable=0    failed=0   \\n\\n",""]',
//  lines:
//   ['',
//     'PLAY [create test dir] ******************************************************** ',
//     '',
//     'GATHERING FACTS *************************************************************** ',
//     'ok: [127.0.0.1]',
//     '',
//     'TASK: [create tmp2 dir] ******************************************************* ',
//     'ok: [127.0.0.1]',
//     '',
//     'PLAY RECAP ******************************************************************** ',
//     '127.0.0.1                  : ok=2    changed=0    unreachable=0    failed=0   ',
//     '',
//     ''],
//  object: { host: '127.0.0.1', ok: 2, changed: 0, unreachable: 0, failed: 0 }
//}

```

With callback:

```js

ansiblePlaybookCli.command('playbook.yml --inventory-file hosts', function (err, data) {
  console.log('data = ', data);
});

//data = {
//  command: 'ansible-playbook playbook.yml --inventory-file hosts ',
//  raw: '["\\nPLAY [create test dir] ******************************************************** \\n\\nGATHERING FACTS *************************************************************** \\nok: [127.0.0.1]\\n\\nTASK: [create tmp2 dir] ******************************************************* \\nok: [127.0.0.1]\\n\\nPLAY RECAP ******************************************************************** \\n127.0.0.1                  : ok=2    changed=0    unreachable=0    failed=0   \\n\\n",""]',
//  lines:
//   ['',
//     'PLAY [create test dir] ******************************************************** ',
//     '',
//     'GATHERING FACTS *************************************************************** ',
//     'ok: [127.0.0.1]',
//     '',
//     'TASK: [create tmp2 dir] ******************************************************* ',
//     'ok: [127.0.0.1]',
//     '',
//     'PLAY RECAP ******************************************************************** ',
//     '127.0.0.1                  : ok=2    changed=0    unreachable=0    failed=0   ',
//     '',
//     ''],
//  object: { host: '127.0.0.1', ok: 2, changed: 0, unreachable: 0, failed: 0 }
//}

```


With options

```js
ansiblePlaybookCli.command('playbook.yml', { 'inventory-file': 'hosts' }).then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'ansible-playbook playbook.yml --inventory-file hosts ',
//  raw: '["\\nPLAY [create test dir] ******************************************************** \\n\\nGATHERING FACTS *************************************************************** \\nok: [127.0.0.1]\\n\\nTASK: [create tmp2 dir] ******************************************************* \\nok: [127.0.0.1]\\n\\nPLAY RECAP ******************************************************************** \\n127.0.0.1                  : ok=2    changed=0    unreachable=0    failed=0   \\n\\n",""]',
//  lines:
//   ['',
//     'PLAY [create test dir] ******************************************************** ',
//     '',
//     'GATHERING FACTS *************************************************************** ',
//     'ok: [127.0.0.1]',
//     '',
//     'TASK: [create tmp2 dir] ******************************************************* ',
//     'ok: [127.0.0.1]',
//     '',
//     'PLAY RECAP ******************************************************************** ',
//     '127.0.0.1                  : ok=2    changed=0    unreachable=0    failed=0   ',
//     '',
//     ''],
//  object: { host: '127.0.0.1', ok: 2, changed: 0, unreachable: 0, failed: 0 }
//}

```


