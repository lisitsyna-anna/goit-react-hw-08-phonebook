import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/contactsSelectors';
import { fetchContacts } from 'redux/contacts/contactsOperations';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { FadeLoader } from 'react-spinners';

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);

  const showEmptyPhoneBook = contacts.length === 0 && !isLoading && !error;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <Filter />
      {isLoading && (
        <FadeLoader
          color="#1976d2"
          cssOverride={{
            display: 'block',
            margin: '0 auto',
          }}
        />
      )}
      {contacts.length > 0 && <ContactList />}
      {showEmptyPhoneBook && (
        <Typography
          sx={{ m: '4px auto 0 auto', width: { xs: '90%', sm: '500px' } }}
          variant="h6"
          component="div"
        >
          Your phonebook is empty. Please add contact.
        </Typography>
      )}
      {error && (
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Something went wrong...Try reloading the page
        </Typography>
      )}
    </div>
  );
};

export default Contacts;
