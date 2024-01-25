import type { FC } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

export interface Schedule {
    id?: string;
    title?: string;
    contentType?: string;

    description: string;
    createdAt: Date;
    scheduleDate: Date;
    to?: string;
}

interface NewOverviewScheduleProps {
    schedules: Schedule[];
}

const ScheduledEmails: FC<NewOverviewScheduleProps> = (props) => {
    const { schedules } = props;


    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader title={<h3>{t(tokens.headings.scheduledEmails)}</h3>} style={{ padding: '0px 10px' }} />



            <List disablePadding>
                <ListItem style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                    <div style={{ width: '15%', paddingRight: '5px', textAlign: 'left' }}>
                        <Typography variant="caption" style={{ fontSize: '15px' }}>{t(tokens.headings.createdOn)}</Typography>
                    </div>

                    <div style={{ width: '27%', paddingRight: '5px', textAlign: 'center' }}>
                        <Typography variant="caption" style={{ fontSize: '15px' }}>{t(tokens.headings.description)}</Typography>
                    </div>
                    <div style={{ width: '30%', paddingRight: '5px', textAlign: 'center' }}>
                        <Typography variant="caption" style={{ fontSize: '15px' }}>{t(tokens.headings.to)}</Typography>
                    </div>
                    <div style={{ width: '15%', textAlign: 'right' }}>
                        <Typography variant="caption" style={{ fontSize: '15px' }}>{t(tokens.headings.scheduled)}</Typography>
                    </div>
                </ListItem>

                {schedules.map((message) => {
                    const createdDate = new Date((message.createdAt as any).seconds * 1000);
                    const scheduledDate = new Date((message.scheduleDate as any).seconds * 1000);
                    return (
                        <ListItem key={message.id} style={{ display: 'flex', padding: '10px' }}>
                            <ListItemText style={{ width: '15%', paddingRight: '5px', textAlign: 'left' }}
                                          secondary={<Typography variant="caption" color="textSecondary">{` ${createdDate}`}</Typography>}
                            />

                            <ListItemText style={{ width: '30%', paddingRight: '5px', textAlign: 'center' }}
                                          secondary={<Typography variant="body2" color="textSecondary">{message.contentType} de {message.title} {message.description}</Typography>}
                            />
                            <ListItemText style={{ width: '35%', paddingRight: '5px', textAlign: 'center' }}
                                          secondary={<Typography variant="body2" color="textSecondary">{` ${message.to}`}</Typography>}
                            />
                            <ListItemText
                                style={{ width: '15%', display: 'flex', justifyContent: 'flex-end', padding: '0', textAlign: 'center' }}
                                secondary={
                                    <Typography variant="caption" style={{ margin: '0', padding: '0' }} color="textSecondary">
                                        {` ${scheduledDate}`}
                                    </Typography>
                                }
                            />

                        </ListItem>


                    );
                })}
            </List>
            <div style={{ paddingBottom: '15px' }}></div>  {/* Padding at the bottom */}
        </Card>
    );
};

export default ScheduledEmails;


ScheduledEmails.propTypes = {
    schedules: PropTypes.array.isRequired,
};
