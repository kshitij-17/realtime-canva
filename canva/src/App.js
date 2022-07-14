import './App.css';
import Toolbox from './component/userinputs';
import Canvas from './component/canva';
import React from 'react';
import Store from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={Store}>
    <>
    <div className='toolbox1'>
    <Toolbox/>
    </div>
    <div className="App">
    
      <Canvas  Bcolor="red"/>
    </div>
    </>
    </Provider>
  );
}

export default App;


