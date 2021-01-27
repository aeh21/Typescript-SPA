import * as React from 'react';
import { render } from 'react-dom';

import { App } from './my-app';

const rootElement = document.querySelector('#root');
render(<App />, rootElement);
