import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined'
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined'
import PausePresentationIcon from '@mui/icons-material/PausePresentation'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { TypeStatusTask } from '../../types/enum'

const GetIcon = ({ status }: { status: TypeStatusTask }) => {
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
  }
}
export default GetIcon
