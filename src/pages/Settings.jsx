
import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useGetVendor from "../hooks/useGetVendor";
import { useSelector } from "react-redux";
import useFetchPhotoGallery from "../hooks/useFetchPhotoGallery";
import GstnNumber from "../components/settings/GstnNumber";
import Avatar from '@mui/material/Avatar';
import ResetPasswordSettings from "../components/settings/ResetPasswordSettings";
import FssaiPhoto from "../components/gallery/FssaiPhoto";
import PanCard from "../components/gallery/PanCard";
import { api, BASE_URL } from "../api/apiConfig";

const Settings = () => {
  const { accessToken } = useSelector((state) => state.user)
  const vendorBusinessProfile = useGetVendor();
  const { isLoading } = useSelector((state) => state.user);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    settings,

    // Aadhar card 
    onUploadAdharCard,
    onReUploadAdharCard,

    onUploadAdharCardBack,
    onReUploadAdharCardBack,

    // Pan card
    onUploadPancard,
    onReUploadPancard,

    // Fssai Licence
    onUploadFssai,
    onReUploadFssai

  } = useFetchPhotoGallery()

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #F0F1F3',
      },
      '&:hover fieldset': {
        border: '2px solid #F0F1F3',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #c33332',
      },
    },
    '& input': {
      border: 'none',
      fontSize: '16px',
      padding: '10px 20px',
    },
  }));

  // console.log(settings, "gallery gallery gallery");  


  return (
    <>
      <TopHeader title="Settings" description="Manage all your personal settings here" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-5 py-4 mb-4'>
          <div className='mt-3 bg-primary'>
          </div>
          <Grid container spacing={2} className='box-negative'>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className="ct-box ct-box-padding">
                <div className="px-4">

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2}>
                      {/* <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg" className="settings-profile-img" alt="" /> */}
                      <Avatar sx={{ bgcolor: '#C33332' }}>{vendorBusinessProfile?.vendor_service_name?.slice(0, 1)}</Avatar>
                      <div>
                        <h3 className="settings-user-name"> {vendorBusinessProfile?.vendor_service_name} </h3>
                        <p className="settings-user-number"> {vendorBusinessProfile?.phone_number} </p>
                      </div>
                    </Stack>
                    <EditIcon style={{ color: '#c33332', fontSize: '18px' }} />
                  </Stack>

                  <h2 className="company-id mt-3">Company ID - {vendorBusinessProfile?.company_id} </h2>
                  <p className="company-change-password mt-2 mb-3">Change Login Password below</p>

                  <ResetPasswordSettings />

                  <Divider
                    className='mt-3'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px'
                    }}
                  />

                  <p className="company-change-password mt-3 mb-3">Documents</p>

                  <div>
                    <Accordion className="faq-bg" >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Aadhar Card </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack direction="row" spacing={2} flexDirection="row">
                          <div>
                            {/* <p className="settings-small mb-1">Front</p> */}
                            {
                              settings['vendor-enca'] !== undefined ? (
                                <>
                                  {settings['vendor-enca']?.map((logo, index) => (
                                    <img
                                      className="img-fluid mx-auto"
                                      style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px' }}
                                      key={logo?.id}
                                      src={logo?.image_name[0]?.medium}
                                      alt={`Brand Logo ${index}`}
                                    />
                                  ))}
                                </>
                              ) : (
                                <>
                                  <Stack direction="row" justifyContent="center">
                                    <img
                                      style={{ width: '200px' }}
                                      src={'https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg'}
                                      alt={`Brand Logo`}
                                    />
                                  </Stack>
                                </>
                              )
                            }
                            {/* <p className="settings-small mt-1">Back</p> */}

                            <div className="mt-3 text-center">
                              {settings['vendor-enca']?.length && settings['vendor-enca']?.length > 0 ? (
                                <>
                                  <input
                                    accept="image/*"
                                    id="onReUploadAdharCard"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={onReUploadAdharCard}
                                  />
                                  <label htmlFor="onReUploadAdharCard">

                                    <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                      <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />  Re Upload Front</Button>
                                  </label>
                                </>
                              ) : (
                                <>
                                  <input
                                    accept="image/*"
                                    id="onUploadAdharCard"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={onUploadAdharCard}
                                  />
                                  <label htmlFor="onUploadAdharCard">
                                    <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                      <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />Upload Front</Button>
                                  </label>
                                </>
                              )}

                            </div>
                          </div>

                          <div>
                            {/* <p className="settings-small mb-1">Front</p> */}
                            {
                              settings['vendor-enca-back'] !== undefined ? (
                                <>
                                  {settings['vendor-enca-back']?.map((logo, index) => (
                                    <img
                                      className="img-fluid mx-auto"
                                      style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px' }}
                                      key={logo?.id}
                                      src={logo?.image_name[0]?.medium}
                                      alt={`Brand Logo ${index}`}
                                    />
                                  ))}
                                </>
                              ) : (
                                <>
                                  <Stack direction="row" justifyContent="center">
                                    <img
                                      style={{ width: '200px' }}
                                      src={'https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg'}
                                      alt={`Brand Logo`}
                                    />
                                  </Stack>
                                </>
                              )
                            }
                            {/* <p className="settings-small mt-1">Back</p> */}

                            <div className="mt-3 text-center">
                              {settings['vendor-enca-back']?.length && settings['vendor-enca-back']?.length > 0 ? (
                                <>
                                  <input
                                    accept="image/*"
                                    id="onReUploadAdharCardBack"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={onReUploadAdharCardBack}
                                  />
                                  <label htmlFor="onReUploadAdharCardBack">

                                    <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                      <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />  Re Upload Back </Button>
                                  </label>
                                </>
                              ) : (
                                <>
                                  <input
                                    accept="image/*"
                                    id="onUploadAdharCard"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={onUploadAdharCardBack}
                                  />
                                  <label htmlFor="onUploadAdharCard">
                                    <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                      <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />Upload Back</Button>
                                  </label>
                                </>
                              )}

                            </div>
                          </div>


                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  {/* <div>
                    <Accordion className="faq-bg" >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> PAN Card </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        {
                          settings['vendor-encp'] !== undefined ? (
                            <>
                              {settings['vendor-encp']?.map((logo, index) => (
                                <img
                                  className="img-fluid mx-auto"
                                  style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                  key={logo?.id}
                                  src={logo?.image_name[0]?.medium}
                                  alt={`Brand Logo ${index}`}
                                />
                              ))}
                            </>
                          ) : (
                            <>
                              <Stack direction="row" justifyContent="center">
                                <img
                                  style={{ width: '200px' }}
                                  src={'https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg'}
                                  alt={`Brand Logo`}
                                />
                              </Stack>
                            </>
                          )
                        }

                        <p className="settings-small mt-1">Upload PAN Card</p>

                        <div className="mt-3 text-center">
                          {settings['vendor-encp']?.length && settings['vendor-encp']?.length > 0 ? (
                            <>
                              <input
                                accept="image/*"
                                id="onReUploadPancard"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={onReUploadPancard}
                              />
                              <label htmlFor="onReUploadPancard">

                                <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                  <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />  Re Upload </Button>
                              </label>
                            </>
                          ) : (
                            <>
                              <input
                                accept="image/*"
                                id="onUploadPancard"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={onUploadPancard}
                              />
                              <label htmlFor="onUploadPancard">
                                <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                  <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />Upload</Button>
                              </label>
                            </>
                          )}
                        </div>

                      </AccordionDetails>
                    </Accordion>
                  </div> */}

                  <PanCard />

                  <GstnNumber />

                  {/* <div>
                    <Accordion className="faq-bg" >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> FSSAI Licence </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        {
                          settings['vendor-encf'] !== undefined ? (
                            <>
                              {settings['vendor-encf']?.map((logo, index) => (
                                <img
                                  className="img-fluid mx-auto"
                                  style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                  key={logo?.id}
                                  src={logo?.image_name[0]?.medium}
                                  alt={`Brand Logo ${index}`}
                                />
                              ))}
                            </>
                          ) : (
                            <>
                              <Stack direction="row" justifyContent="center">
                                <img
                                  style={{ width: '200px' }}
                                  src={'https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg'}
                                  alt={`Brand Logo`}
                                />
                              </Stack>
                            </>
                          )
                        }

                        <p className="settings-small mt-1">Upload FSSAI Licence</p>

                        <div className="mt-3 text-center">
                          {settings['vendor-encf']?.length && settings['vendor-encf']?.length > 0 ? (
                            <>
                              <input
                                accept="image/*"
                                id="onReUploadFssai"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={onReUploadFssai}
                              />
                              <label htmlFor="onReUploadFssai">

                                <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                  <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />  Re Upload </Button>
                              </label>
                            </>
                          ) : (
                            <>
                              <input
                                accept="image/*"
                                id="onUploadFssai"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={onUploadFssai}
                              />
                              <label htmlFor="onUploadFssai">
                                <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                  <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />Upload</Button>
                              </label>
                            </>
                          )}
                        </div>

                      </AccordionDetails>
                    </Accordion>
                  </div> */}

                  <FssaiPhoto />

                  <Divider
                    className='mt-3'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px'
                    }}
                  />

                  <p className="company-change-password mt-3 mb-3">Links</p>

                  <Link to="/dashboard/about-us" className="text-decoration-none">
                    <Stack className="setting-link-box" direction="row" justifyContent="space-between" alignItems="center">
                      <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}>About Us</p>
                      <KeyboardArrowRightIcon style={{ fontSize: '18px', color: '#57636c' }} />
                    </Stack>
                  </Link>

                  <Link to="/dashboard/faq" className="text-decoration-none">
                    <Stack className="setting-link-box mt-3" direction="row" justifyContent="space-between" alignItems="center">
                      <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}>FAQ's</p>
                      <KeyboardArrowRightIcon style={{ fontSize: '18px', color: '#57636c' }} />
                    </Stack>
                  </Link>

                  <Divider
                    className='mt-3'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px'
                    }}
                  />

                  <p className="company-change-password mt-3 mb-3">Help Desk / Support</p>

                  <Link to="/dashboard/raise-ticket">
                    <Button variant="contained" className="cuisines-list-btn" style={{ width: '100%', fontWeight: '500' }}> Raise a Ticket </Button>
                  </Link>

                </div>
              </div>
            </Grid>
          </Grid>
        </div>

      </Container>
    </>
  )
}

export default Settings