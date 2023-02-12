import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { logout } from '../../../store/reducers/authorization';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  let firstLetterOfName;
  if(name !== null) {
    firstLetterOfName = name[0];
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar 
        sx={{ bgcolor: '#8158d3', cursor: 'pointer', marginLeft: '25px' }}
        id="user-avatar"
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        {firstLetterOfName}
      </Avatar>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-avatar',
        }}
      >
        <MenuItem>{name} ({email})</MenuItem>
        <MenuItem onClick={() => {
          navigate('/');
          dispatch(logout());
        }}>
          Выход
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu