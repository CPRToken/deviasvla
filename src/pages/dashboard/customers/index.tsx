import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';

import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { tokens } from 'src/locales/tokens';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import {Profile} from 'src/types/social';
import { usePageView } from 'src/hooks/use-page-view';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { CustomerListSearch } from 'src/sections/dashboard/customer/customer-list-search';
import { CustomerListTable } from 'src/sections/dashboard/customer/customer-list-table';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../libs/firebase";

import {useRouter} from "next/router";
import {Seo} from "../../../components/seo";





interface Filters {
  query?: string;
  hasAcceptedMarketing?: boolean;
  isProspect?: boolean;
  isReturning?: boolean;
}


interface UsersSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

const useUsersSearch = () => {
  const [state, setState] = useState<UsersSearchState>({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'updatedAt',
    sortDir: 'desc',
  });




  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback(
      (sort: { sortBy: string; sortDir: 'asc' | 'desc' }): void => {
        setState((prevState) => ({
          ...prevState,
          sortBy: sort.sortBy,
          sortDir: sort.sortDir,
        }));
      },
      []
  );

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





interface UserStoreState {
  users: Profile[];
  usersCount: number;
}







const Page: NextPage = () => {

  const usersSearch = useUsersSearch();
  const usersSelection = useSelection();
    const { t } = useTranslation();

  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(fetchedUsers);
    }

    fetchUsers();
  }, []);





  usePageView();

  return (
      <>
        <Seo title="Dashboard: Customer List" />
        <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
        >
          <Container maxWidth="xl">
            <Stack spacing={4}>
              <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">{t(tokens.nav.customers)}</Typography>

                  <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                  >
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={
                          <SvgIcon>
                            <Upload01Icon />
                          </SvgIcon>
                        }
                    >
                      Import
                    </Button>
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={
                          <SvgIcon>
                            <Download01Icon />
                          </SvgIcon>
                        }
                    >
                      Export
                    </Button>
                  </Stack>
                </Stack>

              </Stack>
              <Card>
                <CustomerListSearch
                    onFiltersChange={usersSearch.handleFiltersChange} // Update this function to filter users
                    onSortChange={usersSearch.handleSortChange}  // Update this function to sort users
                    sortBy={usersSearch.state.sortBy}  // Update this state variable
                    sortDir={usersSearch.state.sortDir}  // Update this state variable
                />
                <CustomerListTable
                    count={users.length}
                    items={users}


                    onPageChange={usersSearch.handlePageChange}
                    onRowsPerPageChange={usersSearch.handleRowsPerPageChange}
                    onSelectAll={usersSelection.handleSelectAll}
                    onSelectOne={usersSelection.handleSelectOne}
                    page={usersSearch.state.page}
                    rowsPerPage={usersSearch.state.rowsPerPage}
                />
              </Card>
            </Stack>
          </Container>
        </Box>
      </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
