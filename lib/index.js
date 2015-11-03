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
'use strict';

var Promise = require("bluebird");
var exec = Promise.promisify(require('child_process').exec);
var debug = require('debug')('ansible-playbook-cli-js:lib/index.js');
var os = require('os');
var util = require('util');
var _ = require('lodash');

var AnsiblePlaybookCli = function (opts) {
  if (!(this instanceof AnsiblePlaybookCli)) {
    return new AnsiblePlaybookCli(opts);
  }

  _.merge(this, opts);
};

AnsiblePlaybookCli.prototype.command = function (command, options, callback) {
  var self = this;
  var exec_command = 'ansible-playbook ';

  if (!callback) {
    if (typeof options === 'function') {
      callback = options;
      options = null;
    }
  }

  return Promise.resolve().then(function () {

    var env_vars = ('HOME PATH  ' +
        ' ' +
        '').split(' ');

    //console.log('env_vars =', JSON.stringify(env_vars));


    var env = _.reduce(env_vars, function (result, value) {
      if (process.env[value]) {
        result[value] = process.env[value];
      }
      return result;
    }, {});

    //console.log('env =', env);

    //if (self.aws_access_key_id) {
    //  env.AWS_ACCESS_KEY_ID = self.aws_access_key_id;
    //}

    //if (self.aws_secret_access_key) {
    //  env.AWS_SECRET_ACCESS_KEY = self.aws_secret_access_key;
    //}


    var params = _.reduce(options, function (result, value, key) {
      result += util.format('--%s %s ', key, value);
      return result;
    }, '');

    exec_command += command + ' ' + params;
    //console.log('exec_command =', exec_command);

    var exec_options = {
      env: env
    };
    if (self.cwd) {
      exec_options.cwd = self.cwd;
    }
    //console.log('exec options =', exec_options);

    //return exec(exec_command, exec_options);




    return new Promise(function (resolve, reject) {

      //exec_command = 'ls#';
      var child = exec(exec_command, exec_options, function (error, stdout, stderr) {
        console.log('stdout', stdout);
        if (error) {
          console.log('error', error);
          console.log('stderr', stderr);
          reject(error);
          return;
        }
        resolve(stdout);
      });
    })


  }).then(function (data) {

    var result = {
      command: exec_command,
      raw: JSON.stringify(data)
    };
    //return result;
    return extractResult(result);

  }).nodeify(callback);
};

module.exports = AnsiblePlaybookCli;

var extractResult = function (result) {
  var i, obj, line, recap_line;

  try {
    obj = JSON.parse(result.raw);
    result.obj = obj;
    result.lines1 = result.raw.split(os.EOL);
    result.lines = obj[0].split(os.EOL);
    //console.log('result.lines=', result.lines);

    for (i = 0; i < result.lines.length; i++) {
      line = String(result.lines[i]);
      //console.log('line = ',i, line);
      if (line && _.startsWith(line,'PLAY RECAP *') && i+1 < result.lines.length) {
        recap_line = result.lines[i + 1];
        break;
      }
    }

    if (recap_line) {

      var extractValue = function (strp, re) {
        var m;

        if ((m = re.exec(strp)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
        }

        return (m && m[1]) ? parseInt(m[1]) : null;
      };

      result.object = {
        host: function (strp) {
          var re = /^(.*)\s*:/g;
          var m;

          if ((m = re.exec(strp)) !== null) {
            if (m.index === re.lastIndex) {
              re.lastIndex++;
            }
            // View your result using the m-variable.
            // eg m[0] etc.
          }
          if (m && m[1]) {
            return m[1].trim();
          }
          return null;
        }(recap_line),
        ok: extractValue(recap_line, /:\s*ok=(\d*)/g),
        changed: extractValue(recap_line, /\s*changed=(\d*)/g),
        unreachable: extractValue(recap_line, /\s*unreachable=(\d*)/g),
        failed: extractValue(recap_line, /\s*failed=(\d*)/g)

      };
    }


  } catch (e) {
    result.object = e;
  }





  return result;
};
