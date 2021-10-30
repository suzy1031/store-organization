import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StoreOrganization from './ui/Sm/StoreOrganization';
import CommonLayout from './ui/Common/CommonLayout';
import SvAreaOrganization from './ui/Sv/SvAreaOrganization';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Route path="/sm" component={StoreOrganization} />
      <Route
        exact
        path="/"
        render={() => <CommonLayout pageTitle={'これはレポートです'} />}
      />
      <Route
        path="/todo"
        render={() => <CommonLayout pageTitle={'これはTodoです'} />}
      />
      <Route
        path="/clip"
        render={() => <CommonLayout pageTitle={'これはクリップです'} />}
      />
      <Route path="/sv" component={SvAreaOrganization} />
    </Router>
  );
}

export default App;
