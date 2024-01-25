import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { ItemList } from 'src/sections/dashboard/file-manager/item-list';
import { ItemSearch } from 'src/sections/dashboard/file-manager/item-search';
import { StorageStats } from 'src/sections/dashboard/file-manager/storage-stats';
import type { Item } from 'src/types/file-manager';
import {db, auth} from 'src/libs/firebase';
import {onSnapshot, query, collection, deleteDoc,  doc, getDoc} from 'firebase/firestore';
import {useTranslation} from "react-i18next";
import {tokens} from "src/locales/tokens";

import { useRouter } from 'next/router'


// Get the current user
const user = auth.currentUser;


type View = 'grid' | 'list';

interface Filters {
  query?: string;
  folderId?: string;
}

type SortDir = 'asc' | 'desc';

interface ItemsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}




const useItemsSearch = (folderId?:string) => {
  const [state, setState] = useState<ItemsSearchState>({
    filters: {
      query: undefined,
      folderId,
    },
    page: 0,
    rowsPerPage: 9,
    sortBy: 'createdAt',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback((sortDir: SortDir): void => {
    setState((prevState) => ({
      ...prevState,
      sortDir,
    }));
  }, []);

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handleSortChange,

    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

interface ItemsStoreState {
  items: Item[];
  itemsCount: number;
}

const useItemsStore = (searchState: ItemsSearchState) => {
    useMounted();
    const [state, setState] = useState<ItemsStoreState>({
    items: [],
    itemsCount: 0,
  });



    useEffect(() => {
        if (user?.uid) {
            const userUID = user.uid;
            const q = query(collection(db, `users/${userUID}/folders`));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const documents = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })) as Item[];
                setState({ items: documents, itemsCount: documents.length });
            });

            return () => {
                unsubscribe();
            };
        }
    }, [searchState, setState]);



    const handleDelete = useCallback(
        async (itemId: string): Promise<void> => {
            const user = auth.currentUser;
            if (user) {
                await deleteDoc(doc(db, `users/${user.uid}/folders/${itemId}`));
            }
        } , [] );



    const handleFavorite = useCallback((itemId: string, value: boolean): void => {
    setState((prevState) => {
      return {
        ...prevState,
        items: prevState.items.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              isFavorite: value,
            };
          }

          return item;
        }),
      };
    });
  }, []);
    return {
        handleDelete,
        handleFavorite,
        ...state,
    };
};




const useCurrentItem = (items: Item[], itemId?: string): Item | undefined => {
  return useMemo((): Item | undefined => {
    if (!itemId) {
      return undefined;
    }

    return items.find((item) => item.id === itemId);
  }, [items, itemId]);
};




const Page: NextPage = () => {
  const router = useRouter()
  const folderIds = router.query?.folderId ?? [];
  const folderId = folderIds[folderIds.length -1]
    const { t } = useTranslation();
  const user = auth.currentUser;
  const uid = user ? user.uid : null;


  const settings = useSettings();
  const itemsSearch = useItemsSearch();
  const itemsStore = useItemsStore(itemsSearch.state);
  const [view, setView] = useState<View>('grid');
    useDialog();
    const detailsDialog = useDialog<string>();

  const currentItem = useCurrentItem(itemsStore.items, detailsDialog.data);
  const [userUrl, setUserUrl] = useState('');


    useEffect(() => {
        const fetchUserDetails = async () => {
            if (uid) {
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data && data.userUrl) {
                        setUserUrl(data.userUrl);
                    }
                }
            }
        };
        fetchUserDetails();
    }, [uid]);



    const handleItemOpen = (itemId: string) => {
        const clickedItem = itemsStore.items.find(item => item.id === itemId);
        if (clickedItem?.type === 'folder') {
            router.push(`/dashboard/${clickedItem?.name.toLowerCase()}`);
        } else {
            // other logic here
        }
    };







    const folderOrder = ['Videos', 'Fotos', 'Documentos'];

    const sortedItems = itemsStore.items.sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') {
            return -1;
        }
        if (a.type !== 'folder' && b.type === 'folder') {
            return 1;
        }
        if (a.type === 'folder' && b.type === 'folder') {
            return folderOrder.indexOf(a.name) - folderOrder.indexOf(b.name);
        }
        return 0;
    });



    usePageView();


    const handleDelete = useCallback(
        (itemId: string): void => {
            // This can be triggered from multiple places, ensure drawer is closed.
            detailsDialog.handleClose();
            itemsStore.handleDelete(itemId);
        },
        [detailsDialog, itemsStore]
    );




  return (
    <>
      <Seo title="Dashboard: File Manager" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                    <Typography variant="h4">{t(tokens.nav.fileManager)}</Typography>



                </div>

                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >

                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={8}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <ItemSearch
                  onFiltersChange={itemsSearch.handleFiltersChange}
                  onSortChange={itemsSearch.handleSortChange}
                  onViewChange={setView}
                  sortBy={itemsSearch.state.sortBy}
                  sortDir={itemsSearch.state.sortDir}
                  view={view}
                />





                <ItemList
                  count={itemsStore.itemsCount}
                  items={sortedItems}


                  onFavorite={itemsStore.handleFavorite}
                  onOpen={handleItemOpen}
                  onPageChange={itemsSearch.handlePageChange}
                  onRowsPerPageChange={itemsSearch.handleRowsPerPageChange}
                  page={itemsSearch.state.page}
                  rowsPerPage={itemsSearch.state.rowsPerPage}
                  view={view}
                />


              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <StorageStats />

            </Grid>
          </Grid>
        </Container>
      </Box>



     </>

  );

};




Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
