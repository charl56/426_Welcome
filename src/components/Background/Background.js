import Header from '../Header/Header'
import Banner from "../Banners/Banner";

function Background() {


    return (
        <div className='background'>
            <Header />
            <Banner name={"route1"} />
            <Banner name={"route2"} />
            <Banner name={"route3"} />
            <Banner name={"route4"} />
            <Banner name={"route5"} />
            <Banner name={"route6"} />
        </div>
    );
}

export default Background