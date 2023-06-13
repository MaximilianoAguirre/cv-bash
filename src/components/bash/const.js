export const IS_SERVER = typeof window === 'undefined';

export const BACK_REGEX = /\/?\.?[\w-_]+\/\.\./;

export const Errors = {
    COMMAND_NOT_FOUND: '-bash: $1: command not found',
    FILE_EXISTS: 'mkdir: $1: File exists',
    NO_SUCH_FILE: '-bash: $1: No such file or directory',
    NOT_A_DIRECTORY: '-bash: $1: Not a directory',
    IS_A_DIRECTORY: 'cat: $1: Is a directory',
    IS_BINARY: 'cat: $1: Is a binary file'
};

export const EnvVariables = {
    SHELL:'/bin/bash',
    USER: state => state.settings.user.username,
    PATH: state => `/bin:/usr/bin:${state.home}`,
    PWD: state => `/${state.cwd}`,
    LANG: () => {
        return !IS_SERVER ? `${navigator.language.replace('-', '_')}.UTF-8` : 'en_US.UTF-8';
    },
    HOME: state => state.home,
    LOGNAME: state => state.settings.user.username,
    OLDPWD: '/',
};
