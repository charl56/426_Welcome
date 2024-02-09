import Map from './Map/Map';
import Map33 from './Map33/Map33';
import MusicPlayer from './MusicPlayer/MusicPlayer';


function App() {

    // Disable right click
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    return (
        <div className="App">
            <Map33 />
            {/* <MusicPlayer /> */}
        </div>
    );
}

export default App;
