import { Switch, Route } from 'react-router-dom';

import { AppHeader } from './cmps/AppHeader';
import { Favorites } from './pages/Favorites';
import { Home } from './pages/Home';
import './assets/styles/styles.scss';

function App() {

  
  return (
    <div className="app">
      <AppHeader />
      <Switch>
        <Route path="/favorites" component={Favorites}></Route>
        <Route path="/" exact component={Home}></Route>
      </Switch>
    </div>
  );
}

export default App;
