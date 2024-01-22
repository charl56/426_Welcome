import './Banner.css'

function Banner(props) {

    const imagePath = require(`../../assets/banners/${props.name}.png`);

    return (
        <section>
            <div className="banner__content">
                <img src={imagePath} alt='Description' className='banner-img' />
            </div>
        </section>
    );
}

export default Banner