import { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import Loader from './components/Loader';

function App() {
  const [loading,setLoading] = useState(false);
  const [loadingMessage,setLoadingMessage] = useState(null);


  return (
    <Layout>
      {loading && <Loader {...loadingMessage}/>}
    </Layout>
  );
}

export default App;
