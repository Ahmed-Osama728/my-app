import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomersList from './components/CustomersList';
import Header from './components/Header';
import VisitsList from './components/VisitsList';
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const showVisitsBtn = true;
  return (
    <Router>
      <Header setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <ToastContainer />

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
