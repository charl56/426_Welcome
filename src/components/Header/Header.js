import './Header.css'

function Intro() {

    const title = "Studi0426"

    return (
        <div className='header-div'>
            <p className='header-title'>{title}</p>
            <p className='header-description'>Bienvenu dans le studio, voici quelques projets réalisés</p>
        </div>
    )
}

export default Intro