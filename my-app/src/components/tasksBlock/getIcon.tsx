import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined'
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined'
import PausePresentationIcon from '@mui/icons-material/PausePresentation'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { TypeStatusCommon } from '../../types/enum'

export const GetIcon = ({ status }: { status: TypeStatusCommon }) => {
  switch (status) {
    case TypeStatusCommon.notStart:
      return <CheckBoxOutlineBlankIcon />
    case TypeStatusCommon.start:
      return <SlideshowOutlinedIcon />
    case TypeStatusCommon.pause:
      return <PausePresentationIcon />
    case TypeStatusCommon.cancel:
      return <DisabledByDefaultOutlinedIcon />
    case TypeStatusCommon.done:
      return <CheckBoxOutlinedIcon />

    default:
      return <SlideshowOutlinedIcon />
  }
}
