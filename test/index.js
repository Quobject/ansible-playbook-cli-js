/**
* Copyright 2015 Matthias Ludwig
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/*global describe, it, before */
var AnsiblePlaybookCli = require('../lib/index.js');
var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var util = require('util');

var config = require('../my_config.json');



describe('AnsiblePlaybookCli run without modifications', function () {

  //it('should merge opts', function () {
  //  var ansiblePlaybookCli = new AnsiblePlaybookCli({ a: 'a' });
  //  assert.isNotNull(ansiblePlaybookCli);
  //  assert.equal(ansiblePlaybookCli.a, 'a');
  //});

  it('test1 should pass', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute

    var ansiblePlaybookCli = new AnsiblePlaybookCli({
      cwd: path.join(__dirname, 'test1')
    });

    assert.isNotNull(ansiblePlaybookCli);
    var failed = false;
    var err = null;


    ansiblePlaybookCli.command('playbook.yml -i hosts').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      assert.isNotNull(data);
    }).catch(function (error) {
      assert.isNotNull(error);
      err = error;
      failed = true;
      console.log('error = ', error);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });

  it('test1 should pass with callback', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute

    var ansiblePlaybookCli = new AnsiblePlaybookCli({
      cwd: path.join(__dirname, 'test1')
    });

    assert.isNotNull(ansiblePlaybookCli);


    ansiblePlaybookCli.command('playbook.yml --inventory-file hosts', function (err, data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      assert.isNotNull(data);
      done();
    });
  });



  it('test1 should fail', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute

    var ansiblePlaybookCli = new AnsiblePlaybookCli({
      cwd: path.join(__dirname, 'test1')
    });

    assert.isNotNull(ansiblePlaybookCli);
    var failed = false;
    var err = null;


    ansiblePlaybookCli.command('playbook1.yml --inventory-file hosts').then( function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      assert.isNotNull(data);
    }).catch(function (error) {
      assert.isNotNull(error);
      err = error;
      failed = true;
      console.log('error = ', error);
    }).finally(function () {
      //console.log('finally ');
      assert.isTrue(failed);
      assert.isNotNull(err);
      done();
    });
  }); 


  it('test1 should pass with options', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute

    var ansiblePlaybookCli = new AnsiblePlaybookCli({
      cwd: path.join(__dirname, 'test1')
    });

    assert.isNotNull(ansiblePlaybookCli);
    var failed = false;
    var err = null;


    ansiblePlaybookCli.command('playbook.yml', { 'inventory-file': 'hosts' }).then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      assert.isNotNull(data);
    }).catch(function (error) {
      assert.isNotNull(error);
      err = error;
      failed = true;
      console.log('error = ', error);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });
 
});


