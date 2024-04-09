import { Button, Input, Stack, Typography } from '@mui/joy';
import React from 'react';
import ImageUpload from '../../../core/ui/image_upload';
import { Delete } from '@mui/icons-material';

export type EquipmentReportData = {
    name: string;
    workHour: number;
    idleHour: number;
    image?: File | null;
};

export interface EquipmentReportProps {
    data: EquipmentReportData;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, key: keyof EquipmentReportData) => void;
    onImageChange: (file: File, binaryStr: ArrayBuffer | null) => void;
    onRemove: () => void;
}

const EquipmentReportComponent: React.FC<EquipmentReportProps> = ({ data, onChange, onImageChange, onRemove }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof EquipmentReportData) => {
        onChange(event, key);
    };

    return (
        <Stack spacing={2}>
            <Typography>Equipment Report</Typography>
            <Input 
                type="text"
                name="name"
                value={data.name}
                onChange={e => handleInputChange(e, 'name')}
                placeholder="Equipment Name"
            />
            <Input 
                type="number"
                name="workHour"
                value={data.workHour ?? 0}
                onChange={e => handleInputChange(e, 'workHour')}
                placeholder="Work Hour"
            />
            <Input 
                type="number"
                name="idleHour"
                value={data.idleHour ?? 0}
                onChange={e => handleInputChange(e, 'idleHour')}
                placeholder="Idle Hour"
            />
            <ImageUpload onImageChange={onImageChange} />
            <Button type="button" onClick={onRemove} color="danger" startDecorator={<Delete />}>Remove Equipment</Button>
        </Stack>
    );
}

export default EquipmentReportComponent;
