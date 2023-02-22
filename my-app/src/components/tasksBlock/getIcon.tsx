import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined'
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined'
import PausePresentationIcon from '@mui/icons-material/PausePresentation'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { TypeStatusTask, TypeStatusTaskEn } from '../../types/enum'

export const GetIcon = ({ status }: { status: unknown }) => {
  switch (status) {
    case TypeStatusTask.notStart:
      return <CheckBoxOutlineBlankIcon />
    case TypeStatusTask.start:
      return <SlideshowOutlinedIcon />
    case TypeStatusTask.pause:
      return <PausePresentationIcon />
    case TypeStatusTask.cancel:
      return <DisabledByDefaultOutlinedIcon />
    case TypeStatusTask.done:
      return <CheckBoxOutlinedIcon />
    case TypeStatusTaskEn.notStart:
      return <CheckBoxOutlineBlankIcon />
    case TypeStatusTaskEn.start:
      return <SlideshowOutlinedIcon />
    case TypeStatusTaskEn.pause:
      return <PausePresentationIcon />
    case TypeStatusTaskEn.cancel:
      return <DisabledByDefaultOutlinedIcon />
    case TypeStatusTaskEn.done:
      return <CheckBoxOutlinedIcon />
    default:
      return <SlideshowOutlinedIcon />
  }
}

