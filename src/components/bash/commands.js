import * as Util from './util';
import { Errors } from './const';

export const ls = {
    exec: (state, { flags, args }) => {
        const path = args[0] || '';
        const fullPath = Util.extractPath(path, state.cwd);
        const { err, dir } = Util.getDirectoryByPath(state.structure, fullPath);

        if (err) {
            return Util.appendError(state, err, path);
        } else {
            let content = Object.keys(dir);
            if (!flags.a) {
                content = content.filter(name => name[0] !== '.');
            }
            else {
                content.unshift("..")
                content.unshift(".")
            }
            if (flags.l) {
                return Object.assign({}, state, {
                    history: state.history.concat(content.map(value => {
                        return { value };
                    })),
                });
            } else {
                return Object.assign({}, state, {
                    history: state.history.concat({ value: content.join(' ') }),
                });
            }
        }
    },
    man: `Usage: ls [options] [dir]

  Prints list of files and directories in DIR.  The default DIR is current working directory.
  
  Options:
    -l   Prints each item in a new line
    -a   Prints hidden elements`
};

export const cat = {
    exec: (state, { args }) => {
        const path = args[0];
        if (!path) return Util.appendError(state, Errors.NO_SUCH_FILE, '');

        const relativePath = path.split('/');
        const fileName = relativePath.pop();
        const fullPath = Util.extractPath(relativePath.join('/'), state.cwd);
        const { err, dir } = Util.getDirectoryByPath(state.structure, fullPath);
        if (err) {
            return Util.appendError(state, err, path);
        } else if (!dir[fileName]) {
            return Util.appendError(state, Errors.NO_SUCH_FILE, path);
        } else if (dir[fileName].hasOwnProperty('binary')) {
            return Util.appendError(state, Errors.IS_BINARY, path);
        } else if (!dir[fileName].hasOwnProperty('content')) {
            return Util.appendError(state, Errors.IS_A_DIRECTORY, path);
        } else {
            const content = dir[fileName].content.replace(/\n$/, '');
            const lines = content.split('\n').map(value => ({ value }));
            return Object.assign({}, state, {
                history: state.history.concat(lines),
            });
        }
    },
};

export const mkdir = {
    exec: (state, { args }) => {
        const path = args[0];
        const relativePath = path.split('/');
        const newDirectory = relativePath.pop();
        const fullPath = Util.extractPath(relativePath.join('/'), state.cwd);
        const deepCopy = JSON.parse(JSON.stringify(state.structure));
        const { dir } = Util.getDirectoryByPath(deepCopy, fullPath);

        if (dir[newDirectory]) {
            return Util.appendError(state, Errors.FILE_EXISTS, path);
        } else {
            dir[newDirectory] = {};
            return Object.assign({}, state, { structure: deepCopy });
        }
    },
};

export const cd = {
    exec: (state, { args }) => {
        const path = args[0];
        const envVariables = Util.getEnvVariables(state);

        if (!path) return Object.assign({}, state, { cwd: envVariables.HOME !== '/' ? envVariables.HOME.slice(1) : envVariables.HOME });
        if (path === '/') return Object.assign({}, state, { cwd: '' });
        // if (path === '-') return Object.assign({}, state, { cwd: '' });

        const fullPath = Util.extractPath(path, state.cwd);
        const { err } = Util.getDirectoryByPath(state.structure, fullPath);

        if (err) {
            return Util.appendError(state, err, path);
        } else {
            return Object.assign({}, state, { cwd: fullPath });
        }
    },
    man: `Usage: cd [dir]

  Change the current directory to DIR.  The default DIR is the value of the HOME shell variable.`
};

export const pwd = {
    exec: (state) => {
        const directory = `/${state.cwd}`;
        return Object.assign({}, state, {
            history: state.history.concat({ value: directory }),
        });
    },
    man: `Usage: pwd

  Prints current working directory`
};

export const echo = {
    exec: (state, { input }) => {
        const ECHO_LENGTH = 'echo '.length;
        const envVariables = Util.getEnvVariables(state);
        const value = input.slice(ECHO_LENGTH).replace(/(\$\w+)/g, key => {
            return envVariables[key.slice(1)] || '';
        });
        return Object.assign({}, state, {
            history: state.history.concat({ value }),
        });
    },
};

export const printenv = {
    exec: (state) => {
        const envVariables = Util.getEnvVariables(state);
        const values = Object.keys(envVariables).map(key => {
            return { value: `${key}=${envVariables[key]}` };
        });
        return Object.assign({}, state, {
            history: state.history.concat(values),
        });
    },
    man: `Usage: printenv

  Prints current environment variables`
};

export const whoami = {
    exec: (state) => {
        const value = state.settings.user.username;
        return Object.assign({}, state, {
            history: state.history.concat({ value }),
        });
    },
    man: `Usage: whoami

  Prints current username`
};

export const hostname = {
    exec: (state) => {
        const value = state.settings.user.hostname;
        return Object.assign({}, state, {
            history: state.history.concat({ value }),
        });
    },
    man: `Usage: hostname

  Prints current hostname`
};

export const rm = {
    exec: (state, { flags, args }) => {
        const path = args[0];
        const relativePath = path.split('/');
        const file = relativePath.pop();
        const fullPath = Util.extractPath(relativePath.join('/'), state.cwd);
        const deepCopy = JSON.parse(JSON.stringify(state.structure));
        const { dir } = Util.getDirectoryByPath(deepCopy, fullPath);

        if (dir[file]) {
            // folder deletion requires the recursive flags `-r` or `-R`
            if (!Util.isFile(dir[file]) && !(flags.r || flags.R)) {
                return Util.appendError(state, Errors.IS_A_DIRECTORY, path);
            }
            delete dir[file];
            return Object.assign({}, state, { structure: deepCopy });
        } else {
            return Util.appendError(state, Errors.NO_SUCH_FILE, path);
        }
    },
};
