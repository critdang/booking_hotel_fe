import ProfileBody from './profile-body.component';
import NavBar from '../navbar/navbar';

export default function ResetPasswod({ setLoading }) {
  return (
    <>
      <NavBar />
      <ProfileBody setLoading={setLoading} />
    </>
  );
}
