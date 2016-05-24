/* tslint:disable:no-shadowed-variable */
/* tslint:disable:no-unused-variable */
import test = require('blue-tape');
import * as path from 'path';
import * as util from 'util';
import { AnsiblePlaybook, Options } from './index';

test('ansible-playbook-cli-js', t => {

  t.test('playbook.yml -i hosts', t => {
    const options = new Options(
      /* currentWorkingDirectory */ path.join(__dirname, '..', 'test', 'test1')
    );

    const ansiblePlaybook = new AnsiblePlaybook(options);

    return ansiblePlaybook.command('playbook.yml -i hosts').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
      t.ok(data.object.ok);
    });

  });


});
