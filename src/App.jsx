import { useEffect } from 'react';

const API = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    fetch(`${API}/`)
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return <h1>Frontend Running</h1>;
}

export default App;
