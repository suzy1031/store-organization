import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StoreOrganization from './components/StoreOrganization';
import SideMenu from './components/SideMenu';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Route exact path='/' component={StoreOrganization} />
      <Route
        path='/report'
        render={() => <SideMenu pageTitle={'これはレポートです'} />}
      />
      <Route
        path='/todo'
        render={() => <SideMenu pageTitle={'これはTodoです'} />}
      />
      <Route
        path='/clip'
        render={() => <SideMenu pageTitle={'これはクリップです'} />}
      />
    </Router>
  );
}

export default App;
