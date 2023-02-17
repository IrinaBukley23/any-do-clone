import { TextField, IconButton, Stack } from '@mui/material'

import DownloadDoneIcon from '@mui/icons-material/DownloadDone'
import CancelIcon from '@mui/icons-material/Cancel'
import React, { useState } from 'react'
type Props = {
  dataName: string
  label: string
  value: string
  onAprove: (type: string, value: string) => void
  onCancel: (type: string) => void
}

const TextFieldEdit = ({ dataName, label, value, onAprove, onCancel }: Props) => {
  const [text, setText] = useState(value)

  const handleAprove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.name) onAprove(e.currentTarget.dataset.name, text)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.name) onCancel(e.currentTarget.dataset.name)
  }
  return (
    <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
      <TextField fullWidth label={label} onChange={handleChange} value={text}></TextField>
      <IconButton data-name={dataName} color='success' onClick={handleAprove}>
        <DownloadDoneIcon />
      </IconButton>
      <IconButton data-name={dataName} color='error' onClick={handleCancel}>
        <CancelIcon />
      </IconButton>
    </Stack>
  )
}

export default TextFieldEdit
