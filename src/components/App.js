import MyMap from './MyMap/MyMap';

function App() {

    // Disable right click
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    return (
        <div className="App">
            <MyMap />
        </div>
    );
}

export default App;
