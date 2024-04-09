import React, { SetStateAction, useEffect, useState } from 'react'
import { User } from '../model/user';
import { useGetUsersBySiteQuery } from '../api/user.api';
import { Autocomplete, CircularProgress } from '@mui/joy';
import { LiveTv } from '@mui/icons-material';

interface SelectUserProps {
    title: string;
    user?: User | null;
    siteId: string;
    setUser: React.Dispatch<SetStateAction<User | null>>;
    multiple?: boolean;
}

const SelectUser: React.FC<SelectUserProps> = (props) => {
    const [selectUser, setSelectUser] = useState<User | null>(null)
    const { data: users, isLoading: loading } = useGetUsersBySiteQuery({
        params: {
            siteId: props.siteId,
        },
    });

    useEffect(() => {
        if (users && props.user) {
            setSelectUser(props.user)
        }
    }, [users, props.user])

    return (
        <Autocomplete<User>
            size="sm"
            sx={{ width: '100%' }}
            startDecorator={<LiveTv />}
            placeholder={props.title}
            value={selectUser ?? props.user}
            options={users ?? []}
            isOptionEqualToValue={(option, value) => option.fullName.toLowerCase() === value.fullName.toLowerCase()}
            getOptionLabel={(option) => option.fullName}
            onChange={(_, newValue) => {
                props.setUser(newValue);
            }}
            loading={loading}
            endDecorator={
                loading ? (
                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                ) : null
            }
        />
    );
}

export default SelectUser