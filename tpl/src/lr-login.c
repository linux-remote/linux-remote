
// Authorize linux-remote user to using login shell.
// Unlike SSH use custom command, 
// Like rlogind, telnetd:  We use system login command to get user pty. 
// And more simple. Not '-f' option, Only '-f' option is worth noting.
// So you just need trust linux-remote to get the right IP of user.
// The out bin premiss shold set 700 and limit it by 'setfacl -m u:linux-remote:rx'
// Then we don't need exec with root user.
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(int argc, char* argv[])
{
        int i;
        for ( i = 0; i < argc; i++ ){
                // strcmp https://stackoverflow.com/a/4239305/4790016
                if(strcmp(argv[i], "-f") == 0){
                     // For the safe: don't allow -f.
                      return -1;
                }
                
        }
        // printf("hello world\n");
        setuid(0);
        execvp("login", argv);
        return 0;
}