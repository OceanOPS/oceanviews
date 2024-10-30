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
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
  import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
  import AutoGraphIcon from '@mui/icons-material/AutoGraph';
  import ImportExportIcon from '@mui/icons-material/ImportExport';
  import NotificationsIcon from '@mui/icons-material/Notifications';
  
  export type SidebarOption = 
    | 'Home'
    | 'Notifications'
    | 'Indicators'
    | 'Static Maps'
    | 'GOOS'
    | 'Argo'
    | 'Summary'
    | 'Implementation'
    | 'Instrumentation'
    | 'Platforms'
    | 'Cruises'
    | 'Ships'
    | 'Lines'
    | 'Contacts'
    | 'Cruise Planning'
    | 'Create Dashboard';
  
  export const iconMapping: Record<SidebarOption, JSX.Element> = {
    "Home": <HomeIcon />,
    "Notifications": <NotificationsIcon />,
    "GOOS": <SpaceDashboardIcon />,
    "Summary": <AssessmentIcon />,
    "Implementation": <BuildIcon />,
    "Instrumentation": <SettingsInputComponentIcon />,
    "Platforms": <WaterIcon />,
    "Cruises": <DirectionsBoatIcon />,
    "Ships": <SailingIcon />,
    "Lines": <TimelineIcon />,
    "Contacts": <ContactMailIcon />,
    "Indicators": <AutoGraphIcon />,
    "Cruise Planning": <ImportExportIcon />,
    "Create Dashboard": <DashboardCustomizeIcon />,
    "Argo": <DashboardIcon />,
    "Static Maps": <MapIcon />,
  };
  