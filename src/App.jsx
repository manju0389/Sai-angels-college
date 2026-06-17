import { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('https://sai-angels-college.onrender.com/')
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return <h1>Frontend Running</h1>;
}

export default App;
