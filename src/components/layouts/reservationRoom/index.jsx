import Body from './body.component';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer.component';
export default function Payment({ setLoading }) {
  return (
    <>
      <NavBar />
      <Body setLoading={setLoading} />
      <Footer />
    </>
  );
}
