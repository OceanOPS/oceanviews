import {
    Home as HomeIcon,
    Public as MapIcon,
    Assessment as AssessmentIcon
  } from '@mui/icons-material';
  import BuildIcon from '@mui/icons-material/Build';
  import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
  import WaterIcon from '@mui/icons-material/Water';
  import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
  import SailingIcon from '@mui/icons-material/Sailing';
  import TimelineIcon from '@mui/icons-material/Timeline';
  import ContactMailIcon from '@mui/icons-material/ContactMail';
  import LoginIcon from '@mui/icons-material/Login';
  import AddIcon from '@mui/icons-material/Add';
  import AutoGraphIcon from '@mui/icons-material/AutoGraph';
  import ImportExportIcon from '@mui/icons-material/ImportExport';
  
  export type SidebarOption = 
    | 'Home'
    | 'Interactive Map'
    | 'Summary'
    | 'Implementation'
    | 'Instrumentation'
    | 'Platforms'
    | 'Cruises'
    | 'Ships'
    | 'Lines'
    | 'Contacts'
    | 'Login'
    | 'Cruise Planning'
    | 'Create Dashboard'
    | 'Monthly Analysis'
    | 'Create Report';
  
  export const iconMapping: Record<SidebarOption, JSX.Element> = {
    "Home": <HomeIcon />,
    "Interactive Map": <MapIcon />,
    "Summary": <AssessmentIcon />,
    "Implementation": <BuildIcon />,
    "Instrumentation": <SettingsInputComponentIcon />,
    "Platforms": <WaterIcon />,
    "Cruises": <DirectionsBoatIcon />,
    "Ships": <SailingIcon />,
    "Lines": <TimelineIcon />,
    "Contacts": <ContactMailIcon />,
    "Login": <LoginIcon />,
    "Cruise Planning": <ImportExportIcon />,
    "Create Dashboard": <AddIcon />,
    "Monthly Analysis": <AutoGraphIcon />,
    "Create Report": <AddIcon />,
  };
  