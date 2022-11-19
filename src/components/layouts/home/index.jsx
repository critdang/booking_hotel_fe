import HeaderHome from './header-home.component';
import HotSalesBanner from './hot-sales-banner.component';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer.component';
import SpeedDialCart from '../speedDial/speed-dial-cart.component';
import SearchRoom from '../search/search-room.component';
import Amenities from './amenities.component';
import HostelPolicies from './hostel-policies.component';
import HomeLocation from './home-location.component';
import AllRoom2 from './all-room2.component';

export default function HomePage() {
  return (
    <>
      {/* <HeaderHome /> */}
      <NavBar />
      <SearchRoom />
      <HotSalesBanner />
      <Amenities />
      <HostelPolicies />
      <AllRoom2 />
      <HomeLocation />
      <Footer />
      {/* <SpeedDialCart /> */}
      {/* <ScrollTop /> */}
    </>
  );
}
