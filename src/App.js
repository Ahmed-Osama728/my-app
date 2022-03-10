import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CustomersList from './components/CustomersList';
import Header from './components/Header';
import VisitsList from './components/VisitsList';
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const showVisitsBtn = true;
  return (
    <Router>
      <Header setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <Switch>
        <Route exact path='/'>
          <CustomersList
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            showVisitsBtn={showVisitsBtn}
          />
        </Route>
        <Route path='/customer/:id'>
          <VisitsList setModalOpen={setModalOpen} modalOpen={modalOpen} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
