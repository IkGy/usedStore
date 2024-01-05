import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Main from './components/mainpage/main';
import Footer from './components/footer/footer';
import Detail from './components/detail/intex';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/detail' element={<Detail />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
