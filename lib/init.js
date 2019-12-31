const fs = require('fs');
const {exec, execSync} = require('child_process');
const crypto = require('crypto');
const { DIR, secretPath } = require('./const');

function install(cBuildTpl){
  
  fs.stat(DIR, function(err){
    if(!err){
      console.error('Installation failed: ' + DIR + ' already exists.');
    } else {
      if(err.code !== 'ENOENT'){
        console.error('Installation failed: ', err);
        return;
      }
      // /usr/sbin/nologin or /bin/nologin? /bin/false
      execSync('useradd linux-remote --system -m --base-dir=/opt --shell=/bin/false');
      execSync('cp -r '+ path.join(__dirname, '../tpl') + '/. ' + DIR);

      // uuid/v4 just use randomBytes(16), we use 26.
      const secret = crypto.randomBytes(26).toString('base64');

      // used for session
      fs.writeFileSync(secretPath, secret);
      execSync('chmod 700 ' + secretPath);
      execSync('chown linux-remote ' + secretPath);

      cBuildTpl = cBuildTpl || 'gcc {{src}} -o {{out}}';
      const cSrc = path.join(__dirname, '../c/lr-login.c');
      const buildOut = DIR + '/bin/lr-login';
      let buildCmd = cBuildTpl.replace('{{src}}', "'" + cSrc + "'")
      buildCmd = buildCmd.replace('{{out}}', "'" + buildOut + "'");

      execSync(buildCmd);
      execSync('chown root ' + buildOut);
      execSync('chmod 750 ' + buildOut);
      execSync('chmod u+s ' + buildOut);

      console.log('\nlinux-remote init success!\n');
    }
  });
}


module.exports = install;