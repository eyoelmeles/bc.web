// MaterialReportComponent.tsx
import React from 'react';
import ImageUpload from '../../../core/ui/image_upload';
import { Button, Input, Stack, Typography } from '@mui/joy';
import { Delete } from '@mui/icons-material';

export type MaterialReportData = {
    name: string;
    quantity: number | null;
    image?: File | null;
};

export interface MaterialReportProps {
    data: MaterialReportData;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, key: keyof MaterialReportData) => void;
    onImageChange: (file: File, binaryStr: ArrayBuffer | null) => void;
    onRemove: () => void;
}

const MaterialReportComponent: React.FC<MaterialReportProps> = ({ data, onChange, onImageChange, onRemove }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof MaterialReportData) => {
        onChange(event, key);
    };

    return (
        <Stack spacing={2}>
            <Typography>Mateiral Report</Typography>
            <Input 
                type="text"
                name="name"
                value={data.name}
                onChange={e => handleInputChange(e, 'name')}
                placeholder="Material Name"
            />
            <Input 
                type="number"
                name="quantity"
                value={data.quantity ?? 0}
                onChange={e => handleInputChange(e, 'quantity')}
                placeholder="Quantity"
                />
            <ImageUpload onImageChange={onImageChange} />
            <Button type="button" onClick={onRemove} color="danger" startDecorator={<Delete />}>Remove Material</Button>
        </Stack>
    );
}

export default MaterialReportComponent;
