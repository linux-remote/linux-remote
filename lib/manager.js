// Command: linux-remote setManager ${username}
const execSync = require('child_process');
// check members of group
// No special command line WTF
// https://linoxide.com/linux-command/linux-list-group-members-in-linux-terminal/
// use grep --color=never -m1 '^linux-remote' /etc/group

// linux-remote:x:998:
function geMembers(groupName){
  let stdout = execSync(`grep --color=never -m1 '^${linux-remote}' /etc/group`);

  stdout = result.trim();
  if(stdout){
    const i = stdout.lastIndexOf(':');
    let members = stdout.substr(i + 1);
    members = members.split(',');
    return members;
  }
}

// dw2:x:1001:dw2
function getNonOwnerMember(members, ownerName){ 
  return members.filter(memberName => memberName !== ownerName)
}

function _checkGroupAndGetNonGwnerMember(){
  let members = geMembers('linux-remote');
  if(Array.isArray(members)){
    return getNonOwnerMember(members, 'linux-remote');
  } else {
    // ??? 
    console.error('Error: not have group linux-remote.');
    return false;
  }
}

function setManager(username){
  let members = _checkGroupAndGetNonGwnerMember();
  if(members){

    if(username === 'root'){
      console.error('User root does not need to join the group');
      return;
    }

    

    // Adding users to the group.
    // execSync(`usermod -a -G linux-remote ${username}`);
    if(username.indexOf(',') !== -1){
      console.error(`Fail: Only one manager is allowed for safety.`);
      return;
    }
    // Set 
    execSync(`gpasswd --members ${username} linux-remote`);

    console.log(`Set manager "${username}" success!`);
  }
}

// WTF name of gpasswd
//  https://unix.stackexchange.com/questions/10852/whats-the-difference-between-sbin-nologin-and-bin-false

// 用户初始 group 不是 member.

function removeManager(members){
  members = members || _checkGroupAndGetNonGwnerMember();
  if(members){
    if(members.length){
      members.forEach(memberName => {
        execSync(`gpasswd -d ${memberName} linux-remote`);
      });
      console.log(`Remove manager success!`);
    } else {
      console.error(`Not set manager.`);
    }
  }
}
  
const username = process.argv[2];