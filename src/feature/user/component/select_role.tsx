import React, { SetStateAction, useEffect, useState } from 'react'
import { Roles } from '../model/role';
import { useGetAllRolesQuery } from '../api/user.api';
import { Autocomplete, CircularProgress } from '@mui/joy';
import { NoteOutlined } from '@mui/icons-material';


interface SelectRoleProps {
	title: string;
	role?: Roles | null;
	setRole: React.Dispatch<SetStateAction<Roles | null>>;
}

const SelectRole: React.FC<SelectRoleProps> = (props) => {
	const [selectRole, setSelectRole] = useState<Roles | null>(null)
	const { data: roles, isLoading: loading } = useGetAllRolesQuery({
	});

	useEffect(() => {
		if (roles && props.role) {
			setSelectRole(props.role)
		}
	}, [roles, props.role])

	return (
		<Autocomplete
			size="sm"
			sx={{ width: '100%' }}
			startDecorator={<NoteOutlined />}
			placeholder={props.title}
			value={selectRole ?? props.role}
			options={roles ?? []}
			isOptionEqualToValue={(option, value) => option === value}
			getOptionLabel={(option) => option}
			onChange={(_, newValue) => {
				props.setRole(newValue);
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

export default SelectRole