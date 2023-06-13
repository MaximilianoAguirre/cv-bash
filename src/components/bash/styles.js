const BaseStyles = {};

BaseStyles.main = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '\'Inconsolata\', monospace',
    fontSize: '13px',
    fontWeight: '400',
    overflow: 'hidden',
    textAlign: 'left',
    height: '100vh',
    cursor: 'default',
    userSelect: 'none',
    width: '100vw'
};

BaseStyles.body = {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '10px',
    transition: 'background-color .5s',
    paddingRight: '70px'
};

BaseStyles.form = {
    display: 'flex',
};

BaseStyles.input = {
    background: 'none',
    border: 'none',
    color: 'inherit',
    flexGrow: '1',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    outline: 'none !important',
    padding: 0,
    cursor: 'default',
    appearance: 'none',
    marginLeft: '5px'
};

BaseStyles.prefix = {
    cursor: 'default',
};

BaseStyles.output = {
    whiteSpace: 'pre-wrap'
};

BaseStyles.inner_output = {
    marginLeft: '5px'
};

const styles = {
    light: Object.assign({}, BaseStyles, {
        body: Object.assign({}, BaseStyles.body, {
            backgroundColor: '#fff',
            color: '#5D5D5D',
        }),
        header: Object.assign({}, BaseStyles.header, {
            backgroundColor: '#eee',
        }),
        prefix: Object.assign({}, BaseStyles.prefix, {
            color: '#5b65fb',
        }),
    }),
    dark: Object.assign({}, BaseStyles, {
        body: Object.assign({}, BaseStyles.body, {
            backgroundColor: '#000',
            color: '#d0d0d0',
        }),
        header: Object.assign({}, BaseStyles.header, {
            backgroundColor: '#dcdbdb',
        }),
        prefix: Object.assign({}, BaseStyles.prefix, {
            color: '#16a130',
        }),
    }),
};

export default styles;
