
import './css/picturebox.css';

import Navbar from './components/Navbar';
import PictureBox from './components/PictureBox';


function App() {
  return (
    
    <div className="App">
        {<Navbar /> }
        {<PictureBox />}
        {/**{Favorites} */}
    </div>
  );
}

export default App;
