import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';
import { selectFilter } from 'redux/filter/filterSelectors';
import { TextField, Container } from '@mui/material';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '20px',
        mb: '20px',
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="Find contacts by name"
        value={filter}
        variant="outlined"
        size="normal"
        sx={{ maxWidth: '700px' }}
        onChange={e => dispatch(setFilter(e.target.value))}
      />
    </Container>
  );
};
