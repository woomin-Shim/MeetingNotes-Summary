// bootstrap install : npm install react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './components/Routes';

function App() {
  return (
    <div className='App'>
      <AppRouter />
    </div>
  );
}

export default App;