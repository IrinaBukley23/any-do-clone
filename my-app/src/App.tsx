import './App.css';
import { Avatar, Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Button color='primary' variant="contained" disabled>Text</Button>
      <Button color='primary' variant="contained">Text</Button>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" color='secondary' />
    </div>
  );
}

export default App;
