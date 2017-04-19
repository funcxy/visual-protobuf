import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Index from './index';

injectTapEventPlugin();

class Root extends React.Component<null, null> {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Index/>
            </MuiThemeProvider>
        );
    }
}

export default Root;