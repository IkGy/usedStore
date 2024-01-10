import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Main from './components/mainpage/main';
import Footer from './components/footer/footer';
import Detail from './components/detail/intex';
import Sale from './components/sale/sale';
import Regi from './components/sale/regi';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/detail' element={<Detail />}></Route>
        <Route path='/sale' element={<Sale />}></Route>
        <Route path='/sale/regi' element={<Regi />}></Route>
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
