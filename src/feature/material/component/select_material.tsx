import React, { SetStateAction } from "react";
import { Autocomplete, CircularProgress } from "@mui/joy";
import { LiveTv } from "@mui/icons-material";
import { Material } from "../model/material";
import { useGetMaterialsQuery } from "../api/material_endpoint";
import { useSelector } from "react-redux";

interface SelectMaterialProps {
	title: string;
	material?: Material;
	setMaterial: React.Dispatch<SetStateAction<Material | null>>;

}

const SelectMaterial: React.FC<SelectMaterialProps> = (props) => {
	const site = useSelector((state: any) => state.site);
	const { data: materials, isLoading: loading } = useGetMaterialsQuery({
		params: {
			siteId: site?.id,
		},
	});

	return (
		<Autocomplete<Material>
			size="sm"
			sx={{ width: '100%' }}
			startDecorator={<LiveTv />}
			placeholder={props.title}
			value={props.material}
			options={materials ?? []}
			isOptionEqualToValue={(option, value) => option.name.toLowerCase() === value.name.toLowerCase()}
			getOptionLabel={(option) => option.name}
			onChange={(_, newValue) => {
				props.setMaterial(newValue);
			}}
			loading={loading}
			endDecorator={
				loading ? (
					<CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
				) : null
			}
		/>
	);
};

export default SelectMaterial;
