import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';

const App = () => {
    return (
        <React.Fragment>
            <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
            <Toaster />
        </React.Fragment>
    );
};

export default App;
