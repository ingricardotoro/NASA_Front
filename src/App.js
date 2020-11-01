import {Provider} from 'react-redux'

import Navbar from './components/Navbar';
import PictureBox from './components/PictureBox';

import './css/picturebox.css';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          {<Navbar /> }
          {<PictureBox />}
          
      </div>
    </Provider>
  );
}

export default App;
