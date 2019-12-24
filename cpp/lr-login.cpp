#include <iostream>
#include <string>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <string.h>
using namespace std;
int main(int argc, char* argv[])
{
        setuid(0);
        int i;
        string args = "";

        for(i = 1; i < argc; i++){
                args = args + " " + argv[i];
        }
        
        args = "login" + args;
        
        system(args.c_str());
        return 0;
}