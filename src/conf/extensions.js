import { getDirectoryByPath, extractPath, appendError } from "../components/bash/util";
import * as Util from '../components/bash/util';
import { Errors } from '../components/bash/const';

export const initial_history = [
    { value: 'Welcome to Maxi\'s bash CV.' },
    { value: 'Type \'help\' to see available commands.' },
    { value: 'Check the README.md file in the home for more info.' },
    { value: '' },
];

const help = `Available commands

Help:
  man      Prints command help
  help     Prints this text

System:
  whoami   Prints username
  hostname Prints the hostname
  printenv Prints environment variables
  date     Prints current datetime
  echo     Prints to stdout

Navigation:
  ls       List files
  cd       Changes current working directory
  mkdir    Creates a directory
  rm       Removes a file or directory
  tree     Prints file structure
  clear    Clear stdout
  cat      Prints file content
  pwd      Prints current working directory

Other:
  open     Open resource

Spells:
  lumos    Cast lumos spell
  nox      Cast nox spell
`

const open_man = `Usage: open [resources]

  Open external resources

Resources:
  github     Opens personal github account
  linkedin   Opens personal linkedin account
  html       Opens the static html version of the CV
  svg        Opens a svg version of the CV
  pdf        Opens the CV in PDF
`

export const extensions = {
    help: {
        exec: ({ structure, history, cwd }) => {
            const lines = help.split('\n').map(value => ({ value }))
            return {
                structure, cwd,
                history: history.concat(lines),
            };
        },
    },
    // randomjoke: {
    //     exec: async ({ structure, history, cwd }) => {
    //         const response = await fetch("https://icanhazdadjoke.com/", { headers: { 'Accept': 'application/json' } })
    //         const joke = await response.json()

    //         console.log(joke.joke)

    //         return { structure, cwd, history: history.concat({ value: joke.joke }) };
    //     },
    // },
    man: {
        exec: (state, { args }, commands) => {
            const command = args[0] || '';
            const { structure, history, cwd } = state

            if (!command) return commands["man"].exec({ structure, history, cwd }, { args: { 0: "man" } }, commands)
            if (!Object.keys(commands).includes(command)) return Util.appendError(state, Errors.COMMAND_NOT_FOUND, command);
            if (!commands[command]["man"]) return { ...state, history: state.history.concat({ value: `No manual available for ${command}` }) };

            const lines = commands[command]["man"].split('\n').map(value => ({ value }))
            return { ...state, history: state.history.concat(lines) };
        },
        man: `Usage: man [command]

  Prints manual for specified command`
    },
    date: {
        exec: ({ structure, history, cwd }) => {
            const date = new Date();
            return { structure, cwd, history: history.concat({ value: date.toUTCString() }) };
        },
        man: `Usage: date

  Print current datetime`
    },
    sudo: {
        exec: ({ structure, history, cwd }) => {
            console.log(test)
            return {
                structure, cwd,
                history: history.concat({ value: 'Access denied.' }),
            };
        },
        man: `Usage: sudo [command]

  Execute command as root`
    },
    open: {
        exec: ({ structure, history, cwd }, { args }, commands) => {
            const resource = args[0] || '';

            if (!(["github", "linkedin", "html", "pdf", "svg"].includes(resource))) return commands["man"].exec({ structure, history, cwd }, { args: { 0: "open" } }, commands)

            const resources = {
                github: "https://github.com/MaximilianoAguirre",
                linkedin: "https://www.linkedin.com/in/maximilianoaguirre/",
                html: "https://www.maximilianoaguirre.com",
                svg: "https://svg.maximilianoaguirre.com",
                pdf: "https://1drv.ms/w/s!ArUW7Y93QIqFrwsw5mz1yv4Ix9Mu",
            }

            window.open(resources[resource], '_blank').focus();

            return { structure, cwd, history: history.concat({ value: `Opening ${resource}...` }) };
        },
        man: open_man
    },
    clear: {
        exec: ({ structure, history, cwd }) => {
            return { structure, cwd, history: initial_history };
        },
        man: `Usage: clear

  Clear stdout`
    },
    tree: {
        exec: (state, { args }) => {
            const path = args[0] || '';
            const fullPath = extractPath(path, state.cwd);
            const { err, dir } = getDirectoryByPath(state.structure, fullPath);

            if (err) return appendError(state, err, path)

            const convert = (dir) => {
                const keys = Object.keys(dir)

                return keys.map(key => {
                    const response = {}

                    response['key'] = key
                    if (!('content' in dir[key]) && !('binary' in dir[key]) && Object.keys(dir[key]).length > 0) response['children'] = convert(dir[key])

                    return response
                })
            }

            const walk = (tree) => {
                var indent = 1;

                function innerWalk(tree) {
                    tree.forEach(function (node) {
                        state.history = state.history.concat({ value: `${'--' + Array(indent).join('--')} ${node.key}` })

                        if (node.children) {
                            indent++;
                            innerWalk(node.children);
                        }
                        if (tree.indexOf(node) === tree.length - 1) {
                            indent--;
                        }
                    })
                }

                innerWalk(tree);
            }

            if (fullPath) {
                let root = fullPath.split("/").pop()
                state.history = state.history.concat({ value: root })
            }
            else {
                state.history = state.history.concat({ value: "/" })
            }

            walk(convert(dir))

            return state
        },
        man: `Usage: tree [dir]

  Prints a tree representation of the directory structure starting on DIR. Current directory is used if no DIR is provided.`
    }
};
