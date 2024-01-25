import type { FC } from 'react';
import PropTypes from 'prop-types';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import { firebaseDelete } from "src/utils/firebaseDelete";
import Menu from '@mui/material/Menu';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';

interface ItemMenuProps {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  onDelete?: () => void;
  open?: boolean;
  uid: string | null;
  fileName: string;
  storage: any;
}

export const VideosMenu: FC<ItemMenuProps> = (props) => {
  const { anchorEl, onClose, open, onDelete, uid, fileName } = props;

  const deleteFile = async () => {
    if (uid === null || fileName === null) return;

    const storagePath = `${uid}/videos/${fileName}`;
    const collectionName = "yourFirestoreCollectionName"; // Replace with your Firestore collection name
    const documentId = fileName; // Assuming you use fileName as document ID in Firestore

    const { success, error } = await firebaseDelete(storagePath, collectionName, documentId);

    if (success) {
      console.log("File deleted successfully");
      // Refresh your UI here if needed
    } else {
      console.error("Error deleting file: ", error);
    }
  };

  let element = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        open={open || false}
        onClose={onClose}
        sx={{
          [`& .${menuItemClasses.root}`]: {
            fontSize: 14,
            '& svg': {
              mr: 1,
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <MenuItem
          onClick={() => {
            console.log("Delete clicked");
            deleteFile();
            onDelete?.();
          }}
          sx={{color: 'error.main'}}
        >
          <SvgIcon fontSize="small">
            <Trash02Icon/>
          </SvgIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );

  return element;
};

VideosMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool,
};
