import type { FC } from 'react';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';
import { storage } from "src/libs/firebase";
import Box from '@mui/material/Box';
import { usePopover } from 'src/hooks/use-popover';
import type { Item } from 'src/types/file-manager';
import { VideosMenu } from '../videos/videos-menu';
import PropTypes from "prop-types";

interface VideoThumbnailCardProps {
  item: Item;
  videoUrl?: string;
  onDelete?: (itemId: string) => void;
}

export const VideoThumbnailCard: FC<VideoThumbnailCardProps> = (props) => {
  const { videoUrl, item, onDelete } = props;
  const uid = item.uid;
  const popover = usePopover<HTMLButtonElement>();

  const handleDelete = (): void => {
    popover.handleClose();
    onDelete?.(item.id);
  };

  return (
    <>
      <Card
        key={item.id}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={3}
        >
          {videoUrl && (
            <video
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              controls
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </Stack>
        <Box>
          <IconButton
            onClick={popover.handleOpen}
            ref={popover.anchorRef}
          >
            <SvgIcon fontSize="small">
              <DotsVerticalIcon />
            </SvgIcon>
          </IconButton>
        </Box>
      </Card>
      <VideosMenu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        onDelete={handleDelete}
        open={popover.open}
        uid={uid}
        fileName={item.name}
        storage={storage}
      />


    </>
  );
};

VideoThumbnailCard.propTypes = {
    // @ts-ignore
    item: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onFavorite: PropTypes.func,
    onOpen: PropTypes.func,
};
