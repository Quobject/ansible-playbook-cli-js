import * as _ from 'lodash';
import nodeify from 'nodeify-ts';
import * as child_process from 'child_process';
import * as os from 'os';
const exec = child_process.exec;


const extractResult = function (result) {
  let i, line, recap_line;

  try {
    result.lines = result.raw.split(os.EOL);
    //console.log('result.lines=', result.lines);

    for (i = 0; i < result.lines.length; i++) {
      line = String(result.lines[i]);
      //console.log('line = ',i, line);
      if (line && _.startsWith(line, 'PLAY RECAP *') && i + 1 < result.lines.length) {
        recap_line = result.lines[i + 1];
        break;
      }
    }

    if (recap_line) {

      const extractValue = function (strp, re) {
        let m;

        if ((m = re.exec(strp)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
        }

        return (m && m[1]) ? parseInt(m[1], 10) : null;
      };

      result.object = {
        changed: extractValue(recap_line, /\s*changed=(\d*)/g),
        failed: extractValue(recap_line, /\s*failed=(\d*)/g),
        host: function (strp) {
          const re = /^(.*)\s*:/g;
          let m;

          if ((m = re.exec(strp)) !== null) {
            if (m.index === re.lastIndex) {
              re.lastIndex++;
            }
            // View your result using the m-constiable.
            // eg m[0] etc.
          }
          if (m && m[1]) {
            return m[1].trim();
          }
          return null;
        } (recap_line),
        ok: extractValue(recap_line, /:\s*ok=(\d*)/g),
        unreachable: extractValue(recap_line, /\s*unreachable=(\d*)/g),
      };
    }
  } catch (e) {
    result.object = e;
  }

  return result;
};

export class AnsiblePlaybook {

  constructor(private options: IOptions = {
    currentWorkingDirectory: null,
  }) { }

  public command(command: string, callback?: (err, data) => void) {
    let ansiblePlaybook = this;
    let execCommand = 'ansible-playbook ' + command;

    const promise = Promise.resolve().then(function () {
      //console.log('execCommand =', execCommand);

      let execOptions = {
        cwd: ansiblePlaybook.options.currentWorkingDirectory,
        env: {
          DEBUG: '',
          HOME: process.env.HOME,
          PATH: process.env.PATH,
        },
        maxBuffer: 200 * 1024 * 1024,
      };

      //console.log('exec options =', execOptions);

      return new Promise(function (resolve, reject) {
        exec(execCommand, execOptions, (error, stdout, stderr) => {
          if (error) {
            const message = `error: '${error}' stdout = '${stdout}' stderr = '${stderr}'`;
            console.error(message);
            reject(message);
          }
          //console.log(`stdout: ${stdout}`);
          resolve({ stderr: stderr, stdout: stdout });
        });
      });
    }).then(function (data: { stderr: string, stdout: string }) {

      let result = {
        command: execCommand,
        error: data.stderr,
        raw: data.stdout,
      };
      return extractResult(result);
    });

    return nodeify(promise, callback);
  }
}


export interface IOptions {
  currentWorkingDirectory?: string;
}

export class Options implements IOptions {
  public constructor(public currentWorkingDirectory?: string) { }
}

