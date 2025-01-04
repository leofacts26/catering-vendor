import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import useFetchPhotoGallery from "../hooks/useFetchPhotoGallery";
import BrandedLogo from "../components/gallery/BrandedLogo";
import MainBannerLogo from "../components/gallery/MainBannerLogo";
import PackageMenuCards from "../components/gallery/PackageMenuCards";
import ServicePhotos from "../components/gallery/ServicePhotos";
import OtherPhotos from "../components/gallery/OtherPhotos";
import { v4 as uuidv4 } from 'uuid';
import { setMultiImageDelete } from "../features/user/userSlice";

const PhotoGallery = () => {
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  // const [gallery, setGallery] = useState([])
  const {
    gallery,

    // brand Logo
    onUploadBrandLogo,
    onReUploadBrandLogo,
    onHandleRemoveBrandLogo,

    // banner Logo
    onUploadBannerLogo,
    onReUploadBannerLogo,
    onHandleRemoveBannerLogo,

    // package / Menu 
    onUploadBannerPackageMenu,
    onReUploadPackageMenu,
    onHandleRemovePackageMenu,

    // service 
    onUploadService,
    onReUploadEditService,
    onHandleRemoveService,

    // other photos  
    onUploadOtherPhotos,
    onReUploadEditOtherPhotos,
    onHandleRemoveOtherPhotos,

  } = useFetchPhotoGallery()

  // console.log(gallery, "Gallery");

  return (
    <>
      <TopHeader title="Manage All Photos" description="Edit and Upload your Business photos below" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-5 py-4 mb-4'>

       
          <BrandedLogo />

         
          <MainBannerLogo />

          {/* Package / Menu Card Photos  */}
          <div className="mt-2">
            <p className='cuisines-title text-center'>Package / Menu Card Photos</p>
            <Divider
              className='mt-2 mb-4'
              variant="middle"
              style={{
                backgroundColor: '#c33332',
                margin: '0px',
                width: '35%',
                margin: '0px auto'
              }}
            />
            <Stack direction="row" justifyContent="start" flexWrap="wrap" alignItems="center" spacing={0}>
              {
                gallery['vendor-menu'] !== undefined ? (
                  <>
                    {gallery['vendor-menu'].map((item, index) => (
                      <div className="pg-shadow me-2">
                        <img key={uuidv4()} src={item?.image_name[0]?.medium} alt={`Package Menu ${uuidv4()}`} className="img-fluid pg-gallery-img" />

                        <div className="pg-img-icons">
                          <Stack direction="row" justifyContent="space-between" className="py-2 px-2">
                            <>
                              <input
                               accept="image/jpeg, image/png, image/webp"
                                id="onReUploadPackageMenu"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => onReUploadPackageMenu(e)}
                              />
                              <label htmlFor="onReUploadPackageMenu">
                                <span variant="contained" component="span" disabled={isLoading} onClick={()=> dispatch(setMultiImageDelete(item))}>
                                  {<EditIcon className="pg-img-icon" />}
                                </span>
                              </label>
                            </>

                            <span variant="contained" component="span" disabled={isLoading} onClick={() => {
                              onHandleRemovePackageMenu(item);
                            }}>
                              {<DeleteIcon className="pg-img-icon" />}
                            </span>
                          </Stack>
                        </div>
                      </div>
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


              <>
                <input
                 accept="image/jpeg, image/png, image/webp"
                  id="onUploadBannerPackageMenu"
                  multiple
                  type="file"
                  style={{ display: 'none' }}
                  onChange={onUploadBannerPackageMenu}
                />
                <label htmlFor="onUploadBannerPackageMenu">
                  <Button variant="contained" component="span" className="cuisines-list-white-btn" disabled={isLoading}>
                    {<AddIcon />}
                  </Button>
                </label>
              </>

            </Stack>
          </div>
          {/* <PackageMenuCards /> */}

          {/* Service Photos start */}
          <div className="mt-2">
            <p className='cuisines-title text-center'>Service Photos</p>
            <Divider
              className='mt-2 mb-4'
              variant="middle"
              style={{
                backgroundColor: '#c33332',
                margin: '0px',
                width: '35%',
                margin: '0px auto'
              }}
            />
            <Stack direction="row" justifyContent="start" flexWrap="wrap" alignItems="center" spacing={0}>
              {
                gallery['vendor-service'] !== undefined ? (
                  <>
                    {gallery['vendor-service'].map((item, index) => (
                      <div className="pg-shadow me-2">
                        <img key={index} src={item?.image_name[0]?.medium} alt={`Package Menu ${index}`} className="img-fluid pg-gallery-img" />
                        <div className="pg-img-icons">
                          <Stack direction="row" justifyContent="space-between" className="py-2 px-2">
                            <>
                              <input
                               accept="image/jpeg, image/png, image/webp"
                                id="onReUploadEditService"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => onReUploadEditService(e)}
                              />
                              <label htmlFor="onReUploadEditService">
                                <span variant="contained" component="span" disabled={isLoading} onClick={()=> dispatch(setMultiImageDelete(item))}>
                                  {<EditIcon className="pg-img-icon" />}
                                </span>
                              </label>
                            </>

                            <span variant="contained" component="span" disabled={isLoading} onClick={() => onHandleRemoveService(item)}>
                              {<DeleteIcon className="pg-img-icon" />}
                            </span>
                          </Stack>
                        </div>
                      </div>
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
              <>
                <input
                 accept="image/jpeg, image/png, image/webp"
                  id="onUploadService"
                  multiple
                  type="file"
                  style={{ display: 'none' }}
                  onChange={onUploadService}
                />
                <label htmlFor="onUploadService">
                  <Button variant="contained" component="span" className="cuisines-list-white-btn" disabled={isLoading}>
                    {<AddIcon />}
                  </Button>
                </label>
              </>

            </Stack>
          </div>
          {/* <ServicePhotos /> */}

          {/* Other Photos */}
        <div className="mt-2">
            <p className='cuisines-title text-center'>Other Photos</p>
            <Divider
              className='mt-2 mb-4'
              variant="middle"
              style={{
                backgroundColor: '#c33332',
                margin: '0px',
                width: '35%',
                margin: '0px auto'
              }}
            />
            <Stack direction="row" justifyContent="start" flexWrap="wrap" alignItems="center" spacing={0}>
              {
                gallery['vendor-other'] !== undefined ? (
                  <>
                    {gallery['vendor-other'].map((item, index) => (
                      <div className="pg-shadow me-2">
                        <img key={index} src={item?.image_name[0]?.medium} alt={`Package Menu ${index}`} className="img-fluid pg-gallery-img" />
                        <div className="pg-img-icons">
                          <Stack direction="row" justifyContent="space-between" className="py-2 px-2">
                            <>
                              <input
                               accept="image/jpeg, image/png, image/webp"
                                id="onReUploadEditOtherPhotos"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => onReUploadEditOtherPhotos(e, item)}
                              />
                              <label htmlFor="onReUploadEditOtherPhotos">
                                <span variant="contained" component="span" disabled={isLoading} onClick={()=> dispatch(setMultiImageDelete(item))}>
                                  {<EditIcon className="pg-img-icon" />}
                                </span>
                              </label>
                            </>

                            <span variant="contained" component="span" disabled={isLoading} onClick={() => onHandleRemoveOtherPhotos(item)}>
                              {<DeleteIcon className="pg-img-icon" />}
                            </span>
                          </Stack>
                        </div>
                      </div>
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
              <>
                <input
                 accept="image/jpeg, image/png, image/webp"
                  id="onUploadOtherPhotos"
                  multiple
                  type="file"
                  style={{ display: 'none' }}
                  onChange={onUploadOtherPhotos}
                />
                <label htmlFor="onUploadOtherPhotos">
                  <Button variant="contained" component="span" className="cuisines-list-white-btn" disabled={isLoading}>
                    {<AddIcon />}
                  </Button>
                </label>
              </>

            </Stack>
          </div> 
          {/* <OtherPhotos /> */}


        </div>
      </Container>
    </>
  )
}

export default PhotoGallery