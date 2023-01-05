import { Box, Modal, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import { validationSchemaAddContact } from 'constants/validtionSchemas';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateContact } from 'redux/contacts/contactsOperations';
import { selectIsLoading } from 'redux/contacts/contactsSelectors';

const styledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '400px' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const EditModal = ({ isOpen, handleClose, id, name, number }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, { resetForm }) => {
    if (
      name.trim().toLowerCase() === values.name.trim().toLowerCase() &&
      number === values.number
    ) {
      toast.error('The same values');
      return;
    }
    dispatch(updateContact({ id, values }))
      .unwrap()
      .then(() => {
        toast.success('Contact edited!');
        handleClose();
      })
      .catch(() =>
        toast.error('Something went wrong...Try reloading the page')
      );
    resetForm();
  };
  const formik = useFormik({
    initialValues: {
      name,
      number,
    },
    validationSchema: validationSchemaAddContact,
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-edit-contact"
        aria-describedby="modal-edit-contact"
      >
        <Box sx={styledModal}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="tel"
                  required
                  fullWidth
                  id="number"
                  label="Number"
                  name="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  error={formik.touched.number && Boolean(formik.errors.number)}
                  helperText={formik.touched.number && formik.errors.number}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
              loadingPosition="end"
              endIcon={<EditIcon />}
            >
              Edit
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
