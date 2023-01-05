import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/contactsOperations';

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  ListItemSecondaryAction,
} from '@mui/material';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditModal } from 'components/EditModal/EditModal';

export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => toast.success('Contact deleted!'))
      .catch(() =>
        toast.error('Something went wrong...Try reloading the page')
      );
  };
  return (
    <>
      <ListItem
        sx={{
          backgroundColor: 'rgba(0, 138, 255, 0.16)',
          borderRadius: '4px',
          boxShadow: 4,
        }}
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              color: '#1976d2',
              backgroundColor: 'transparent',
            }}
          >
            <AccountBoxIcon sx={{ width: '30px', height: '30px' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={number} />

        <ListItemSecondaryAction
          sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}
        >
          <IconButton
            edge="end"
            aria-label="edit"
            sx={{
              '&:hover': { color: '#1976d2' },
              '&:focus': { color: '#1976d2' },
            }}
            onClick={handleOpenModal}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            edge="end"
            aria-label="delete"
            sx={{
              '&:hover': { color: '#1976d2' },
              '&:focus': { color: '#1976d2' },
            }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {isOpen && (
        <EditModal
          isOpen={isOpen}
          handleClose={handleCloseModal}
          id={id}
          name={name}
          number={number}
        />
      )}
    </>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
