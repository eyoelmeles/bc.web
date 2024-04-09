import React from 'react'
import DefaultPage from '../../../core/shell/default_page/default_page'
import { useGetRFIsQuery } from '../api/rfi_endpoint'
import { useSelector } from 'react-redux';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box, Typography, accordionSummaryClasses } from '@mui/joy';
import { Add } from '@mui/icons-material';

const RFIPage = () => {
	const site = useSelector((state: any) => state.site);
	const { data: rfis, isLoading } = useGetRFIsQuery({
		params: {
			siteId: site?.id,
		}
	});
	return (
		<DefaultPage title="RFI">

			<AccordionGroup
				sx={{
					[`& .${accordionSummaryClasses.indicator}`]: {
						transition: '0.2s',
					},
					[`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
						transform: 'rotate(45deg)',
					},
				}}
			>
				{rfis?.map(rfi => (
					<Accordion key={rfi.id}>
						<AccordionSummary indicator={<Add />}>
							<Box display="flex" flex={1} justifyContent="space-between">
								<Typography>{rfi.title}</Typography>
								<Box>
									{rfi.status === 0 ? (
										<Typography sx={{ backgroundColor: '#FFC107', py: .4, px: 2, borderRadius: 20, fontSize: 12 }}>Pending</Typography>
									) : rfi.status === 1 ? (
										<Typography sx={{ backgroundColor: '#198754', py: .4, px: 2, borderRadius: 20, fontSize: 12, color: '#fff' }}>Resolved</Typography>
									) : (
										<Typography sx={{ backgroundColor: '#DC3545', py: .4, px: 2, borderRadius: 20, fontSize: 12, color: '#fff' }}>Declined</Typography>
									)}
								</Box>
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							{rfi.description}
						</AccordionDetails>
					</Accordion>
				))}
			</AccordionGroup>
		</DefaultPage>
	)
}

export default RFIPage