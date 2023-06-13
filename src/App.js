import { useState } from 'react';

import Terminal from 'components/bash/index';
import styles from 'components/bash/styles';

import { structure } from 'conf/structure';
import { extensions, initial_history } from 'conf/extensions';
import { FloatingButtons } from "components/FloatingButtons"

function App() {
  const [theme, setTheme] = useState("dark");

  const extra_extensions = {
    lumos: {
      exec: (state) => {
        setTheme("light")
        return state
      },
      man: `Usage: lumos

  Casts 'lumos' spell!`
    },
    nox: {
      exec: (state) => {
        setTheme("dark")
        return state
      },
      man: `Usage: nox

  Casts 'nox' spell!`
    }
  }

  return (
    <>
      <Terminal
        history={initial_history}
        extensions={{...extensions, ...extra_extensions}}
        structure={structure}
        theme={theme}
        prefix="guest@pc-maxi"
        home="/home/guest"
      />

      <FloatingButtons
        baseStyle={{
          backgroundColor: styles[theme].body.color,
          color: styles[theme].body.backgroundColor,
        }}
      />
    </>
  );
}

export default App;
