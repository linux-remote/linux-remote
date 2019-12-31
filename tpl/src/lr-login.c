// login: Cannot possibly work without effective root.
#include <unistd.h>

int main(int argc, char* argv[])
{
        setuid(0);
        execvp("login", argv);
        return 0;
}