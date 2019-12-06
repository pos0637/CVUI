import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

render((
    <MemoryRouter>
        <Switch>
        </Switch>
    </MemoryRouter>
), document.getElementById('root'));