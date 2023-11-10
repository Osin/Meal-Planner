import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Image from 'next/image';
import Box from '@mui/material/Box';
import {
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import {useTheme} from '@mui/system';
import {ImageSearchOutlined} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const unsplashApiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;

interface ImageSearchClientProps {
  onImageSelected: (image: {url: string, alt: string}) => void;
}

const ImageSearchClient = ({onImageSelected}: ImageSearchClientProps) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const imagePerPage = isMobile ? 8 : 12;
  const height = isMobile ? 150 : 200;
  const width = isMobile ? 150 : 200;
  const searchImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos',
          {
            params: {
              query: query,
              per_page: imagePerPage,
              orientation: 'squarish',
            },
            headers: {
              Authorization: `Client-ID ${unsplashApiKey}`,
            },
          });

      if (response.status === 200) {
        setImages(response.data.results);
      } else {
        console.error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images: ', error);
    }
  };

  useEffect(() => {
    if (query && query.length > 2) {
      searchImages();
    }
  }, [query]);

  return (
      <Box>
        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
          <ImageSearchOutlined sx={{color: 'action.active', mr: 1, my: 0.5}}/>
          <TextField
              fullWidth
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Please fill name of your meal, drink, toasts, etc..."
              label={'Search for images to illustrate your meal'}
              value={query}
              variant={'standard'}
          />
        </Box>
        <ImageList sx={{justifyItems:'center'}} cols={2}>
          {images.map((image: {
            id: string,
            urls: { small: string },
            alt_description: string
          }) => (
              <ImageListItem key={image.id}>
                <IconButton
                    sx={{height, width}}
                    onClick={() => {
                      onImageSelected({url: image.urls.small, alt: image.alt_description});
                    }}>
                  <Image
                      height={height}
                      width={width}
                      src={image.urls.small}
                      alt={image.alt_description}
                  />
                </IconButton>
              </ImageListItem>
          ))}
        </ImageList>
      </Box>
  );
};

export default ImageSearchClient;
