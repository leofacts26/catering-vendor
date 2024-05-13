import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Cancel } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const DeleteModal = ({ DeleteModalopen, handleDeleteModalClose, onHandleRemoveModalLogo }) => {
    const { isLoading } = useSelector((state) => state.user);

    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleBrandClickOpen}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleDeleteModalClose}
                aria-labelledby="customized-dialog-title"
                open={DeleteModalopen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                   <h2>User Confirmation Needed</h2>
                </DialogTitle>
                {/* <IconButton
                    aria-label="close"
                    onClick={handleDeleteModalClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton> */}
                <DialogContent dividers>
                    <h3 className='delete-gallery-image mt-2'> Are You Sure You Want To Delete This Image? </h3>
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<Cancel />}
                            onClick={() => handleDeleteModalClose()}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type='submit'
                            variant="contained"
                            startIcon={<DeleteForeverIcon />}
                            onClick={onHandleRemoveModalLogo}
                        >
                            {isLoading ? 'Loading...' : 'Delete'}
                        </Button>
                    </Box>

                    {/* <Button autoFocus onClick={handleDeleteModalClose}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={onHandleRemoveModalLogo}>
                        Delete
                    </Button> */}
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    )
}

export default DeleteModal