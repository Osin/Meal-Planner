import React from 'react';
import {
  Button, Chip,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle, Stack, TextField, useMediaQuery,
} from '@mui/material';
import {Meal, Tag} from '@/app/lib/Meal';
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
  fullScreen: boolean;
  meal?: Meal;
  handleClose: any;
  handleChange: (meal?: Meal) => void;
  open: boolean;
}

const newMealDialog = ({
  meal,
  handleClose,
  open,
  fullScreen,
  handleChange,
}: NewMealDialogProps): React.ReactElement => {
  const [newMeal, setNewMeal] = React.useState<Partial<Meal> | undefined>(meal);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  console.log('newMealDialog', newMeal);
  const handleImageChoose = (image: { url: string, alt: string }) => {
    if (newMeal) {
      setNewMeal({...newMeal, image: image, name: newMeal.name ?? image.alt});
    } else {
      setNewMeal({image: image, name: image.alt});
    }
  };
  return (
      <Dialog
          fullScreen={fullScreen}
          open={open}
          maxWidth={'sm'}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {meal ? 'Update this meal?' : 'Add a new meal'}
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
                            description: event.target.value == ''
                                ? undefined
                                : event.target.value,
                          });
                        }}/>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    {
                      Object.keys(Tag).map((tag, index) => (
                          <Chip key={index} label={tag}
                                color={newMeal.tags?.includes(tag)
                                    ? 'primary'
                                    : 'default'} onClick={() => {
                            if (newMeal.tags && newMeal.tags.includes(tag)) {
                              setNewMeal({
                                ...newMeal,
                                tags: newMeal.tags.filter(t => t !== tag),
                              });
                            } else {
                              setNewMeal({
                                ...newMeal,
                                tags: [...newMeal.tags ?? [], tag],
                              });
                            }
                          }}/>
                      ))}
                  </Stack>
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
          <Button onClick={() => handleChange(meal)} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>);
};
export default newMealDialog;