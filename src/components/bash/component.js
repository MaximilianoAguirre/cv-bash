import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bash from './bash';
import Styles from './styles';
import './index.css'

const CTRL_CHAR_CODE = 17;
const L_CHAR_CODE = 76;
const C_CHAR_CODE = 67;
const UP_CHAR_CODE = 38;
const DOWN_CHAR_CODE = 40;
const TAB_CHAR_CODE = 9;
const noop = () => {};

export default class Terminal extends Component {

    constructor({ history, structure, extensions, prefix, home }) {
        super();
        this.Bash = new Bash(extensions);
        this.ctrlPressed = false;
        this.state = {
            settings: { user: { username: prefix.split('@')[0], hostname: prefix.split('@')[1] } },
            history: history.slice(),
            structure: Object.assign({}, structure),
            cwd: home ? home.slice(1) : '',
            home: home ? home : '/',
        };
        this.home=home ? home : '/';
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount() {
        this.refs.input.focus();
    }

    // componentWillReceiveProps({ extensions, structure, history }) {
    //     const updatedState = {};
    //     if (structure) {
    //         updatedState.structure = Object.assign({}, structure);
    //     }
    //     if (history) {
    //         updatedState.history = history.slice();
    //     }
    //     if (extensions) {
    //         this.Bash.commands = Object.assign({}, extensions, BaseCommands);
    //     }
    //     this.setState(updatedState);
    // }

    /*
     * Utilize immutability
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (this.state !== nextState) || (this.props !== nextProps);
    }

    /*
     * Keep input in view on change
     */
    componentDidUpdate() {
        this.refs.input.scrollIntoView();
    }

    /*
     * Forward the input along to the Bash autocompleter. If it works,
     * update the input.
     */
    attemptAutocomplete() {
        const input = this.refs.input.value;
        const suggestion = this.Bash.autocomplete(input, this.state);
        if (suggestion) {
            this.refs.input.value = suggestion;
        }
    }

    /*
     * Handle keydown for special hot keys. The tab key
     * has to be handled on key down to prevent default.
     * @param {Event} evt - the DOM event
     */
    handleKeyDown(evt) {
        if (evt.which === CTRL_CHAR_CODE) {
            this.ctrlPressed = true;
        } else if (evt.which === TAB_CHAR_CODE) {
            // Tab must be on keydown to prevent default
            this.attemptAutocomplete();
            evt.preventDefault();
        }
    }

    /*
     * Handle keyup for special hot keys.
     * @param {Event} evt - the DOM event
     *
     * -- Supported hot keys --
     * ctrl + l : clear
     * ctrl + c : cancel current command
     * up - prev command from history
     * down - next command from history
     * tab - autocomplete
     */
    handleKeyUp(evt) {
        if (evt.which === L_CHAR_CODE) {
            if (this.ctrlPressed) {
                this.setState(this.Bash.execute('clear', this.state));
            }
        } else if (evt.which === C_CHAR_CODE) {
            if (this.ctrlPressed) {
                this.setState({
                    ...this.state,
                    history: this.state.history.concat({
                        value: this.refs.input.value + '^C',
                        cwd: this.state.cwd
                    })
                })
                this.refs.input.value = '';
            }
        } else if (evt.which === UP_CHAR_CODE) {
            if (this.Bash.hasPrevCommand()) {
                this.refs.input.value = this.Bash.getPrevCommand();
            }
        } else if (evt.which === DOWN_CHAR_CODE) {
            if (this.Bash.hasNextCommand()) {
                this.refs.input.value = this.Bash.getNextCommand();
            } else {
                this.refs.input.value = '';
            }
        } else if (evt.which === CTRL_CHAR_CODE) {
            this.ctrlPressed = false;
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();

        // Execute command
        const input = evt.target[0].value;
        const newState = this.Bash.execute(input, this.state);
        this.setState(newState);
        this.refs.input.value = '';
    }

    getPath(path) {
        if (this.home) return path.replace(this.home, '~')
        else return path
    }

    getPrefixComponent(cwd) {
        const { styles, theme } = this.props;
        const style = Object.assign({}, Styles[theme] || Styles.light, styles);

        return <span><span style={style.prefix}>{`${this.props.prefix}:${this.getPath(`/${cwd}`)}`}</span> $</span>
    }

    renderHistoryItem() {
        const { styles, theme } = this.props;
        const style = Object.assign({}, Styles[theme] || Styles.light, styles);

        return (item, key) => {
            const prefix = item.hasOwnProperty('cwd') ? 
                this.getPrefixComponent(item.cwd)
            :
                undefined;

            return <div style={style.output} data-test-id={`history-${key}`} key={key} >
                {prefix}
                {item.value ? <span style={prefix && style.inner_output}>{item.value}</span> : <br/>}
            </div>;
        };
    }

    render() {
        const { styles, theme } = this.props;
        const { history, cwd } = this.state;
        const style = Object.assign({}, Styles[theme] || Styles.light, styles);

        return (
            <div style={style.main}>
                <div
                    style={style.body}
                    onClick={() => this.refs.input.focus()}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        navigator.clipboard.readText().then(text => this.refs.input.value = this.refs.input.value + text)
                        this.refs.input.focus();
                    }}
                >
                    {history.map(this.renderHistoryItem())}
                    <form onSubmit={evt => this.handleSubmit(evt)} style={style.form}>
                        {this.getPrefixComponent(cwd)}
                        <input
                          autoComplete="off"
                          onKeyDown={this.handleKeyDown}
                          onKeyUp={this.handleKeyUp}
                          ref="input"
                          id="input"
                          style={style.input}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

Terminal.Themes = {
    LIGHT: 'light',
    DARK: 'dark',
};

Terminal.propTypes = {
    extensions: PropTypes.object,
    history: PropTypes.array,
    onClose: PropTypes.func,
    onExpand: PropTypes.func,
    onMinimize: PropTypes.func,
    prefix: PropTypes.string,
    structure: PropTypes.object,
    styles: PropTypes.object,
    theme: PropTypes.string,
};

Terminal.defaultProps = {
    extensions: {},
    history: [],
    onClose: noop,
    onExpand: noop,
    onMinimize: noop,
    prefix: 'hacker@default',
    structure: {},
    styles: {},
    theme: Terminal.Themes.LIGHT,
};