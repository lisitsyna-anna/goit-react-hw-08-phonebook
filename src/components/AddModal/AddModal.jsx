import { Box, Modal, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addContact } from 'redux/contacts/contactsOperations';
import {
  selectContacts,
  selectIsLoading,
} from 'redux/contacts/contactsSelectors';
import { validationSchemaAddContact } from 'constants/validtionSchemas';

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

export const AddModal = ({ isOpen, handleClose }) => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const isNameAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isNumberAdded = contacts.some(contact => contact.number === number);

    if (isNameAdded) {
      toast.error(`${name} is alredy in contacts`);
      return;
    } else if (isNumberAdded) {
      toast.error(`${number} is alredy in contacts`);
      return;
    }

    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => {
        toast.success('Contact added!');
        handleClose();
      })
      .catch(() =>
        toast.error('Something went wrong...Try reloading the page')
      );
    resetForm();
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: validationSchemaAddContact,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-add-contact"
        aria-describedby="modal-add-contact"
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
              endIcon={<PersonAddIcon />}
            >
              Add contact
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </>
  );
};
