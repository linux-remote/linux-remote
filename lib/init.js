const path = require('path');
const {execSync} = require('child_process');

const DIR = '/opt/linux-remote';

function init(cBuildTpl){
  // '/usr/sbin/nologin' or '/bin/nologin'? used '/bin/false'
  execSync('useradd linux-remote --system -m --base-dir=/opt --skel=tpl --shell=/bin/false', {cwd: path.join(__dirname, '../')});
  // execSync('mkdir ' + DIR);
  // execSync('cp -r '+ path.join(__dirname, '../tpl') + '/. ' + DIR);
  // execSync('chown -R linux-remote ' + DIR);

  cBuildTpl = cBuildTpl || 'gcc {{src}} -o {{out}}';

  const cSrc = DIR + '/src/lr-login.c';
  const buildOut = DIR + '/bin/lr-login';
  let buildCmd = _cmdRender(cBuildTpl, {src: cSrc, out: buildOut});
  execSync(buildCmd);

  execSync('chmod 750 ' + buildOut);
  // Only 'linux-remote' group can be exec.
  execSync('chgrp linux-remote ' + buildOut);
  execSync('chmod u+s ' + buildOut);

  console.log('\nlinux-remote init success!\n');
}

function _cmdRender(tpl, {src, out}){
  return tpl.replace('{{src}}', "'" + src + "'")
  .replace('{{out}}', "'" + out + "'");
}


(function(){
  const param = process.argv[2];
  let ccBuildTpl;
  if(param){
    const flag = 'cBuildTpl=';
    if(param.indexOf(flag) === 0){
      ccBuildTpl = param.substr(flag + 1);
    }
  }
  init(ccBuildTpl);
})();

// module.exports = init;