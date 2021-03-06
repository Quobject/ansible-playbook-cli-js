# ansible-playbook-cli-js
A node.js wrapper for the [ansible-playbook](http://linux.die.net/man/1/ansible-playbook) command

[![NPM](https://nodei.co/npm/ansible-playbook-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ansible-playbook-cli-js/)
[![NPM](https://nodei.co/npm-dl/ansible-playbook-cli-js.png?months=6&height=3)](https://nodei.co/npm/ansible-playbook-cli-js/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

### Step 1: Prerequisites

Ansible must be installed and accessible in the path

### Step 2: Installation
    
    npm install ansible-playbook-cli-js
    
Then:

```js
var ansiblePlaybookCli = require('ansible-playbook-cli-js');
```

## Usage

With promise

```js
var Options = ansiblePlaybookCli.Options;
var AnsiblePlaybook = ansiblePlaybookCli.AnsiblePlaybook;

var options = new Options(
    /* currentWorkingDirectory */ 'test'
);

var ansiblePlaybook = new AnsiblePlaybook(options);


ansiblePlaybook.command('playbook.yml -i hosts').then(function (data) {
  console.log('data = ', data); 
});


//data = {
//  command: 'ansible-playbook playbook.yml -i hosts ',
//  raw: '\\nPLAY [create test dir] ******************************************************** \\n\\nGATHERING FACTS *************************************************************** \\nok: [127.0.0.1]\\n\\nTASK: [create tmp2 dir] ******************************************************* \\nok: [127.0.0.1]\\n\\nPLAY RECAP ******************************************************************** \\n127.0.0.1                  : ok=2    changed=0    unreachable=0    failed=0   \\n\\n',
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

ansiblePlaybook.command('playbook.yml --inventory-file hosts', function (err, data) {
  console.log('data = ', data);
});


```


Typescript:

```js
import { AnsiblePlaybook, Options } from 'ansible-playbook-cli-js';

const options = new Options(
  /* currentWorkingDirectory */ 'test'
);

const ansiblePlaybook = new AnsiblePlaybook(options);

ansiblePlaybook.command('playbook.yml --inventory-file hosts').then(function (data) {
  console.log('data = ', data);
});

```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/ansible-playbook-cli-js.svg?style=flat
[npm-url]: https://npmjs.org/package/ansible-playbook-cli-js
[downloads-image]: https://img.shields.io/npm/dm/ansible-playbook-cli-js.svg?style=flat
[downloads-url]: https://npmjs.org/package/ansible-playbook-cli-js




