import { Apps } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemDecorator, Typography } from '@mui/joy'
import { WorkItemCost } from '../model/work_item'
import { SetStateAction } from 'react'

interface CostListProps {
	selectedCost: WorkItemCost,
	setSelectedCost: React.Dispatch<SetStateAction<WorkItemCost>>;
}

const CostList: React.FC<CostListProps> = (props) => {
	const handleSelected = (value: WorkItemCost) => {
		props.setSelectedCost(value)
	}
	return (
		<Box sx={theme => ({ borderRight: .3, borderRightColor: theme.palette.neutral[300], height: '100%', width: "100%" })}>
			<Typography
				id="decorated-list-demo"
				level="body-xs"
				textTransform="uppercase"
				fontWeight="lg"
				sx={{ p: 2 }}
			>
				Costs
			</Typography>
			<List
				sx={{
				}}
			>
				<ListItem>
					<ListItemButton selected={props.selectedCost == WorkItemCost.manpower} onClick={() => handleSelected(WorkItemCost.manpower)}>
						<ListItemDecorator>
							<Apps />
						</ListItemDecorator>
						Manpower
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton selected={props.selectedCost == WorkItemCost.material} onClick={() => handleSelected(WorkItemCost.material)}>
						<ListItemDecorator>
							<Apps />
						</ListItemDecorator>
						Material
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton selected={props.selectedCost == WorkItemCost.equipment} onClick={() => handleSelected(WorkItemCost.equipment)}>
						<ListItemDecorator>
							<Apps />
						</ListItemDecorator>
						Equipment
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	)
}

export default CostList