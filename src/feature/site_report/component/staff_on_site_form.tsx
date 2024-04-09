import { Button, Input, Stack, Typography } from '@mui/joy'
import ImageUpload from '../../../core/ui/image_upload'
import { Delete } from '@mui/icons-material';

export type StaffOnSiteData = {
    name: string;
    count: number;
};

export interface MaterialReportProps {
    data: StaffOnSiteData;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, key: keyof StaffOnSiteData) => void;
    onRemove: () => void;
}


const StaffOnSiteForm: React.FC<MaterialReportProps> = ({ data, onChange, onRemove }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof StaffOnSiteData) => {
        onChange(event, key);
    };


  return (
        <Stack spacing={2}>
            <Typography>Staff on Site</Typography>
            <Input 
                type="text"
                name="name"
                value={data.name}
                onChange={e => handleInputChange(e, 'name')}
                placeholder="Staff on Site"
            />
            <Input 
                type="number"
                name="count"
                value={data.count ?? 0}
                onChange={e => handleInputChange(e, 'count')}
                placeholder="Count"
                />
            <Button type="button" onClick={onRemove} color="danger" startDecorator={<Delete />}>Remove Material</Button>
        </Stack>
  )
}

export default StaffOnSiteForm