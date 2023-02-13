import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { useState } from 'react'

type Props = {
  open: boolean
  anchorEl: null | HTMLElement
  closeMenu: () => void
}

const TaskMenu = ({ open, anchorEl, closeMenu }: Props) => {
  const [openC, setOpenC] = useState(false)
  const [openK, setOpenK] = useState(false)
  const [openS, setOpenS] = useState(false)
  const handleClickExpandStatus = () => {
    setOpenC(!openC)
  }
  const handleClickExpandStatusK = () => {
    setOpenK(!openK)
  }
  const handleClickExpandStatusS = () => {
    setOpenS(!openS)
  }
  return (
    <Menu
      id='card-menu'
      // anchorOrigin={{
      //   vertical: 'bottom',
      //   horizontal: 'right',
      // }}
      // transformOrigin={{
      //   vertical: 'top',
      //   horizontal: 'right',
      // }}
      anchorEl={anchorEl}
      open={open}
      onClose={closeMenu}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <ListItemButton onClick={handleClickExpandStatus}>
        <ListItemText primary='Статус' />
        {openC ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openC} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='не начиналось' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='в работе' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='отложено' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='сделано' />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickExpandStatusK}>
        <ListItemText primary='Категория' />
        {openK ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openK} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Здоровье' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Бизнес' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Семья' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Путешествия' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Хобби' />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickExpandStatusS}>
        <ListItemText primary='Метки' />
        {openS ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openS} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Срочно' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Важно' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Не срочно' />
          </ListItemButton>
        </List>
      </Collapse>
    </Menu>
  )
}

export default TaskMenu
