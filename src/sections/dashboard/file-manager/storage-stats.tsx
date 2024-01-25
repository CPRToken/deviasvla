import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import Lightning01Icon from '@untitled-ui/icons-react/build/esm/Lightning01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { Chart } from 'src/components/chart';
import { FileIcon } from 'src/components/file-icon';
import { bytesToSize } from 'src/utils/bytes-to-size';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {  ref,  listAll, getMetadata } from "firebase/storage";
import { auth , storage } from 'src/libs/firebase';
import { tokens } from 'src/locales/tokens';


const useChartOptions = (usage: string): ApexOptions => {
  const theme = useTheme();






  return {
    chart: {
      background: 'transparent',
      redrawOnParentResize: false,
      redrawOnWindowResize: false,
    },
    colors: [theme.palette.primary.main],
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      padding: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
    },
    labels: [usage],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            color: theme.palette.text.primary,
            fontSize: '24px',
            fontWeight: 500,
            show: true,
            offsetY: -15,
          },
          value: {
            show: false,
          },
        },
        endAngle: 90,
        hollow: {
          size: '60%',
        },
        startAngle: -90,
        track: {
          background:
              theme.palette.mode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
          strokeWidth: '100%',
        },
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
    theme: {
      mode: theme.palette.mode,
    },
  };
};

type ChartSeries = number[];

interface Total {
  extension: 'jpeg' | 'jpg' | 'mp4' | 'pdf' | 'png' | 'doc' | 'docx' | null;
  itemsCount: number;
  label: string;
  size: number;
}


export const StorageStats: FC = () => {
  const [currentUsageBytes, setCurrentUsageBytes] = useState<number>(0);
  const [totals, setTotals] = useState<Total[]>([]);
  const TOTAL_STORAGE = 10 * (10 ** 9);  // Changing from 5 GB to 20 GB

  const currentUsage = `${(currentUsageBytes / (10 ** 9)).toFixed(2)} GB`;  // Fixed the divisor to 10 ** 9
  const currentUsagePercentage = (currentUsageBytes / TOTAL_STORAGE) * 100;  // No change here, it's correct.

  useEffect(() => {
    const fetchStorageData = async () => {
      let totalSize = 0;
      let totalVideos = 0;
      let totalPDFs = 0;
      let totalPDFSize = 0;
      let totalJPGs = 0;
      let totalJPGSize = 0;
      let totalPNGs = 0;
      let totalPNGSize = 0;
        let totalDOCs = 0;
        let totalDOCSize = 0;


      if (auth.currentUser) {
      // For Videos
      const videoStorageRef = ref(storage, `/${auth.currentUser.uid}/videos`);
      let listResults = await listAll(videoStorageRef);
      let promises = listResults.items.map((itemRef) => getMetadata(itemRef));
      let metadataResults = await Promise.all(promises);

      metadataResults.forEach((metadata) => {
        totalSize += metadata.size;
        totalVideos++;
      });

      // For PDFs
      const pdfStorageRef = ref(storage, `/${auth.currentUser.uid}/documentos`);
      listResults = await listAll(pdfStorageRef);
      promises = listResults.items.map((itemRef) => getMetadata(itemRef));
      metadataResults = await Promise.all(promises);

      metadataResults.forEach((metadata) => {
        if (metadata.name.endsWith('.docx') || metadata.name.endsWith('.doc')) {
          totalDOCSize += metadata.size;
          totalDOCs++;
        } else {
          totalPDFSize += metadata.size;
          totalPDFs++;
        }
      });


      const imageStorageRef = ref(storage, `/${auth.currentUser.uid}/fotos`);
      listResults = await listAll(imageStorageRef);
      promises = listResults.items.map((itemRef) => getMetadata(itemRef));
      metadataResults = await Promise.all(promises);

      metadataResults.forEach((metadata) => {
        if (metadata.contentType === 'image/jpeg') {
          totalJPGSize += metadata.size;
          totalJPGs++;
        } else if (metadata.contentType === 'image/png') {
          totalPNGSize += metadata.size;
          totalPNGs++;
        }
      });
      } else {
        // Handle the case where currentUser is null
      }


      setCurrentUsageBytes(totalSize); // Set the total storage used
      setTotals([
        { extension: 'mp4', itemsCount: totalVideos, label: 'MP4', size: totalSize },
        { extension: 'pdf', itemsCount: totalPDFs, label: 'PDF', size: totalPDFSize },
        { extension: 'jpg', itemsCount: totalJPGs, label: 'JPG', size: totalJPGSize },
        { extension: 'png', itemsCount: totalPNGs, label: 'PNG', size: totalPNGSize },
          { extension: 'docx', itemsCount: totalDOCs, label: 'DOC', size: totalDOCSize },

      ]);
    };

    fetchStorageData();
  }, []);



  const chartOptions = useChartOptions(currentUsage);
  const chartSeries: ChartSeries = [currentUsagePercentage];

  const { t } = useTranslation();

  return (
      <Card>
        <CardHeader
            title={t(tokens.headings.storageHeader)}
            subheader={t(tokens.headings.upgradeSubheader)}
        />
        <CardContent>
          <Stack alignItems="center">
            <Box
                sx={{
                  height: 260,
                  mt: '-48px',
                  mb: '-100px',
                }}
            >
              <Chart

                  width={260}
                  height={260}
                  options={chartOptions}
                  series={chartSeries}
                  type="radialBar"
              />
            </Box>

            <Typography
                color="text.secondary"
                variant="body2"
            >
              Has usado {currentUsagePercentage.toFixed(2)}% de su almacenamiento disponible.
            </Typography>
            <Typography
                color="text.secondary"
                variant="body2"
            >


            </Typography>
          </Stack>
          <List
              disablePadding
              sx={{ mt: 2 }}
          >
            {totals.map((total) => {
              const size = bytesToSize(total.size);

              return (
                  <ListItem
                      disableGutters
                      key={total.extension}
                  >
                    <ListItemIcon>
                      <Box sx={{ color: 'primary.main' }}>
                        <FileIcon extension={total.extension} />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="caption">{total.label}</Typography>}
                        secondary={
                          <Typography
                              color="text.secondary"
                              variant="body2"
                          >
                            {size} • {total.itemsCount} {t(tokens.headings.items)}
                          </Typography>
                        }
                    />
                  </ListItem>
              );
            })}
          </List>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
              endIcon={
                <SvgIcon fontSize="small">
                  <Lightning01Icon />
                </SvgIcon>
              }
              size="small"
              variant="contained"
          >
            Upgrade Plan
          </Button>
        </CardActions>
      </Card>
  );
};
