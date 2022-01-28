import React, { FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//functions
import { handleLogin, handleSecret } from '../../../controlers/user/user';

//components
import Message from '../../popups/message/Message';

//message types
import { ERROR } from '../../popups/types'



const Login: FC = () => {
    return (
        <div className="page">
            <Box onSubmit={handleLogin}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}

            >
                <div className='form__inputs--flex'>
                    < TextField id="standard-basic" label="User name" variant="standard" type="text" name='username' />
                    < TextField id="standard-basic" label="Password" variant="standard" type="text" name='password' />
                </div>
                <Button variant="outlined" type='submit'>Outlined</Button>

                <Button variant="outlined" onClick={handleSecret} >Get Secret</Button>

                <Message type={ERROR} message='hi' />
            </Box>
            <a href="http://localhost:4000/auth">Google</a>
        </div>
    );
}
export default Login;




