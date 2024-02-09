import Map from './Map/Map';
import Map33 from './Map33/Map33';
import MapDrag from './MapDrag/MapDrag';
import MusicPlayer from './MusicPlayer/MusicPlayer';


function App() {

    // Disable right click
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    return (
        <div className="App">
            <Map33 />
            {/* <MapDrag /> */}
            {/* <MusicPlayer /> */}
        </div>
    );
}

export default App;
