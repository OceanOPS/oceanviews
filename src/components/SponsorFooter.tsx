import React, { useState } from 'react';
import { Box, Typography, Button, Modal, Grid } from '@mui/material';

interface Sponsor {
  name: string;
  url: string;
  imgSrc: string;
}

const sponsors: Sponsor[] = [
  { name: "NOAA", url: "https://www.noaa.gov/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/noaa.png" },
  { name: "WMO", url: "https://public.wmo.int/en", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/logo-wmo.png" },
  { name: "Horizon 2020", url: "https://www.horizon2020.gouv.fr/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/h2020.png" },
  { name: "Société des Exploration de Monaco", url: "https://www.monacoexplorations.org/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/monaco.png" },
  { name: "EMODNET", url: "https://emodnet.ec.europa.eu/en", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/emodnet2.png" },
  { name: "EUMETNET", url: "https://www.eumetnet.eu/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/eumetnet.png" },
  { name: "IFREMER", url: "https://wwz.ifremer.fr/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/ifremer-logo.png" },
  { name: "CLS", url: "https://www.cls.fr/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/cls.png" },
  { name: "SOA", url: "https://www.soalliance.org/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/soa.png" },
  { name: "IOC-UNESCO", url: "https://ioc.unesco.org/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/logo_ioc_unesco.png" },
  { name: "Environment and Climate Change Canada", url: "https://www.canada.ca/en/environment-climate-change.html", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/logo_canada_env.jpg" },
  { name: "MetOffice", url: "https://www.metoffice.gov.uk/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/log_met_office.png" },
  { name: "CSIRO", url: "https://www.csiro.au/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/csiro.png" },
  { name: "INCOIS", url: "https://incois.gov.in/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/incois.png" },
  { name: "JAMSTEC", url: "https://www.jamstec.go.jp/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/jamstec.png" },
  { name: "GOOS", url: "https://www.goosocean.org", imgSrc: "//ocean-ops.org/static/images/goos/logos/goos-xs.png" },
  { name: "Euro-Argo ERIC", url: "https://www.euro-argo.eu/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/euroargo.png" },
  { name: "BSH", url: "https://www.bsh.de/EN/Home/home_node.html", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/bsh.png" },
  { name: "OGS", url: "https://www.ogs.it/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/ogs.png" },
  { name: "IMOS", url: "https://imos.org.au/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/imos-logo.png" },
  { name: "South African Weather Service", url: "https://www.weathersa.co.za/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/South_African_logo.png" },
  { name: "GEOMAR", url: "https://www.geomar.de/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/geomar.png" },
  { name: "NIOT", url: "https://www.niot.res.in/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/NIOT.webp" },
  { name: "New Zealand MetService", url: "https://www.metservice.com/", imgSrc: "//ocean-ops.org/static/images/goos/logos/sponsors/metservice_logo.png" },
];

const SponsorFooter: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Box sx={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', background: 'none', padding: '10px 0', zIndex: 1000 }}>
      <Button onClick={handleModalOpen} sx={{ marginBottom: 2, color: '#555' }}>See All Sponsors</Button>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '100%', overflowX: 'hidden' }}>
        {sponsors.slice(0, 12).map((sponsor) => (
          <Box
            key={sponsor.name}
            component="a"
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${sponsor.name}`}
            sx={{
              margin: '0 10px',
              transition: 'filter 0.3s ease',
              '&:hover': { filter: 'none' },
            }}
          >
            <Box
              component="img"
              src={sponsor.imgSrc}
              alt={`${sponsor.name} logo`}
              sx={{
                height: '40px',
                filter: 'grayscale(100%)',
                '&:hover': { filter: 'none' },
              }}
            />
          </Box>
        ))}
      </Box>

      <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby="sponsor-modal-title">
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '90vw',
            maxHeight: '80vh',
            overflowY: 'auto',
            margin: '40px auto',
            outline: 'none',
          }}
        >
          <Typography variant="h6" id="sponsor-modal-title" gutterBottom>Sponsors</Typography>
          <Grid container spacing={2}>
            {sponsors.map((sponsor) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={sponsor.name}>
                <Box
                  component="a"
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${sponsor.name}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    transition: 'filter 0.3s ease',
                    '&:hover img': { filter: 'none' },
                  }}
                >
                  <Box
                    component="img"
                    src={sponsor.imgSrc}
                    alt={`${sponsor.name} logo`}
                    sx={{
                      height: '72px',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default SponsorFooter;
