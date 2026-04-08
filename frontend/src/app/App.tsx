import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';
import Header from '../shared/components/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header/>
      <main className="min-h-[80vh]">
        <Outlet/>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        toastClassName="custom-toast"
        progressClassName="custom-toast-progress"
      />
    </>
  );
};

export default App;
