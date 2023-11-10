import {useEffect, useState} from 'react';
import {
  Button, Chip,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle, Stack, TextField, useMediaQuery,
} from '@mui/material';
import {Meal} from '@/app/lib/Meal';
import ImageSearchClient from '@/app/components/ImageSearchClient';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import {
  DescriptionOutlined,
  NoFoodOutlined,
} from '@mui/icons-material';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/system';

interface NewMealDialogProps {
  meal?: Meal;
  handleClose: any;
  handleChange: (meal?: Meal) => void;
  open: boolean;
}

const NewMealDialog = ({
  meal,
  handleClose,
  open,
  handleChange,
}: NewMealDialogProps) => {
  const [newMeal, setNewMeal] = useState<Partial<Meal> | undefined>({...meal});
  useEffect(() => {
    setNewMeal({...meal});
  }, [meal]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const handleImageChoose = (image: { url: string, alt: string }) => {
    if (newMeal) {
      setNewMeal({
        ...newMeal,
        image: image,
        name: newMeal.name ?? image.alt,
        description: newMeal.description ?? '',
      });
    } else {
      setNewMeal({image: image, name: image.alt, description: ''});
    }
  };
  return (
      <Dialog
          open={open}
          maxWidth={'sm'}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {newMeal ? 'Update this meal?' : 'Add a new meal'}
        </DialogTitle>
        <DialogContent>
          {newMeal?.image ?
              <Stack direction={isMobile ? 'column' : 'row'}
                     justifyContent={'space-around'} alignItems={'center'}
                     spacing={1}>
                <IconButton
                    sx={{height: 200, width: 200}}
                    onClick={() => {
                      setNewMeal({...newMeal, image: undefined});
                    }}>
                  <Image
                      height={200}
                      width={200}
                      src={newMeal.image.url}
                      alt={newMeal.image.alt}
                  />
                </IconButton>
                <Stack direction={'column'} spacing={1}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                    padding: 1,
                  }}>
                    <NoFoodOutlined
                        sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField
                        label="Meal name"
                        autoFocus
                        error={newMeal.name === undefined}
                        variant="standard" fullWidth
                        placeholder="What is it?"
                        defaultValue={newMeal.name}
                        onChange={(event) => {
                          setNewMeal({
                            ...newMeal,
                            name: event.target.value == ''
                                ? undefined
                                : event.target.value,
                          });
                        }}/>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: '100%',
                    padding: 1,
                  }}>
                    <DescriptionOutlined
                        sx={{color: 'action.active', mr: 1, mt: 2}}/>
                    <TextField
                        label="Little description ?"
                        variant="outlined" fullWidth
                        placeholder="A little tip to know why you want it?"
                        multiline
                        rows={3}
                        defaultValue={newMeal.description}
                        onChange={(event) => {
                          setNewMeal({
                            ...newMeal,
                            description: event.target.value,
                          });
                        }}/>
                  </Box>
                </Stack>
              </Stack>
              :
              <ImageSearchClient
                  onImageSelected={handleImageChoose}/>
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {handleChange(undefined);}}>
            Delete
          </Button>
          <Button onClick={() => {
            if (
                typeof newMeal?.name !== 'undefined'
                && typeof newMeal?.image !== 'undefined'
                && typeof newMeal?.description !== 'undefined') {
              handleChange(newMeal as Meal);
            }
          }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>);
};
export default NewMealDialog;