import { Menu, MenuItem } from '@mui/material'
import React from 'react'
import { MenuItemType, Project } from '../../types/types'

type Props = {
  open: boolean
  anchorEl: null | HTMLElement
  values: MenuItemType[]
  closeMenu: () => void
  aceptMenu: (value?: string) => void
}

const TaskMenu = ({ open, anchorEl, values, closeMenu, aceptMenu }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    aceptMenu(e.currentTarget.dataset.value)
  }

  return (
    <Menu
      id='card-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={closeMenu}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {values.map((value) => (
        <MenuItem key={value.id} onClick={handleClick} data-value={value.id}>
          {value.value}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default TaskMenu
