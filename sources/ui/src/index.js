import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Application from '~/components/application';
import FlowDesigner from '~/components/flowDesigner';

const designer = () => <Application currentLocale='ZH-CN'><FlowDesigner /></Application>;

render((
    <MemoryRouter>
        <Switch>
            <Route path='/' exact alwaysLive component={designer} />
        </Switch>
    </MemoryRouter>
), document.getElementById('root'));
