// Authorize linux-remote group to login shell.
#include <unistd.h>

int main(int argc, char* argv[])
{
        setuid(0);
        execvp("login", argv);
        return 0;
}