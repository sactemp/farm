import client from './lib/client';

import App from './components/App/App';
import reducers from './redux/reducers';

client(App, reducers);
