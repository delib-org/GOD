import Button from '@mui/material/Button';
import { handleSecret, handleLogout } from '../../../controlers/user/user';

function Ready() {
    return (<div>
      <h1>Ready</h1>
      <Button onClick={handleSecret}>Get Secret</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>)
  }

  export default Ready;