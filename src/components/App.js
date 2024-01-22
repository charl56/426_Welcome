// import Background from './Background/Background';
// import User from './User/User';
import Map from './Map/Map';
import MusicPlayer from './MusicPlayer/MusicPlayer';


function App() {

    // Disable right click
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    return (
        <div className="App">
            <Map />
            <MusicPlayer />
        </div>
    );
}

export default App;
