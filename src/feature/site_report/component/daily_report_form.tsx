import React, { SetStateAction, useState } from 'react'
import DefaultDialog from '../../../core/ui/default_dialog';
import { useCreateDailyReportMutation } from '../api/site_report_endpoint';
import EquipmentReportForm, { EquipmentReportData } from './equipment_report';
import MaterialReportForm, { MaterialReportData } from './material_report';
import MaterialReportComponent from './material_report';
import { Box, Button, Stack } from '@mui/joy';
import StaffOnSiteForm, { StaffOnSiteData } from './staff_on_site_form';

interface DailyReportFormProps {
    open: boolean;
    onClose: () => void;
}


interface DailyReportData {
    date: Date;
    workHour: number;
    interruptedHour: number;
    weather: string;
    // ... other fields ...
    materialReports: MaterialReportData[];
    equipmentReports: EquipmentReportData[];
    staffOnSiteReports: StaffOnSiteData[];
}

const DailyReportForm: React.FC<DailyReportFormProps> = (props) => {
    const [reportData, setReportData] = useState<DailyReportData>({
        date: new Date(),
        workHour: 0,
        interruptedHour: 0,
        weather: '',
        materialReports: [{ name: '', quantity: null, image: null }],
        equipmentReports: [{ idleHour: 0, name: '', workHour: 0, image: null}],
        staffOnSiteReports: [{ name: '', count: 0}]
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof DailyReportData) => {
        setReportData((prevData: any) => ({
            ...prevData,
            [key]: event.target.value
        }));
    };

    const handleMaterialChange = (index: number, updatedMaterial: MaterialReportData) => {
        const updatedMaterials = [...reportData.materialReports];
        updatedMaterials[index] = updatedMaterial;
        setReportData(prevData => ({
            ...prevData,
            materialReports: updatedMaterials
        }));
    };

    const addMaterialReport = () => {
        setReportData(prevData => ({
            ...prevData,
            materialReports: [...prevData.materialReports, { name: '', quantity: 0 }]
        }));
    };

    const removeMaterialReport = (index: number) => {
        const updatedMaterials = [...reportData.materialReports];
        updatedMaterials.splice(index, 1);
        setReportData(prevData => ({
            ...prevData,
            materialReports: updatedMaterials
        }));
    };

    const handleEquipmentChange = (index: number, updatedEquipment: EquipmentReportData) => {
    const updatedEquipments = [...reportData.equipmentReports];
    updatedEquipments[index] = updatedEquipment;
    setReportData(prevData => ({
        ...prevData,
        equipmentReports: updatedEquipments
    }));
};

const addEquipmentReport = () => {
    setReportData((prevData: any) => ({
        ...prevData,
        equipmentReports: [...prevData.equipmentReports, { name: '', workHour: 0, idleHour: 0, image: '' }]
    }));
};

const removeEquipmentReport = (index: number) => {
    const updatedEquipments = [...reportData.equipmentReports];
    updatedEquipments.splice(index, 1);
    setReportData(prevData => ({
        ...prevData,
        equipmentReports: updatedEquipments
    }));
};

    const handleStaffOnSiteChange = (index: number, updateStaffOnSite: StaffOnSiteData) => {
    const updateStaffOnSites = [...reportData.staffOnSiteReports];
    updateStaffOnSites[index] = updateStaffOnSite;
    setReportData(prevData => ({
        ...prevData,
        staffOnSite: updateStaffOnSites
    }));
};

const addStaffOnSiteReport = () => {
    setReportData((prevData: any) => ({
        ...prevData,
        staffOnSite: [...prevData.staffOnSite, { count: 0, name: '' }]
    }));
};

const removeStaffOnSiteReport = (index: number) => {
    const updatedStaffOnSite = [...reportData.staffOnSiteReports];
    updatedStaffOnSite.splice(index, 1);
    setReportData(prevData => ({
        ...prevData,
        staffOnSite: updatedStaffOnSite 
    }));
};

    const [createDailyReport] = useCreateDailyReportMutation();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Here you would make an API call to send formData to the backend.
        // try {
        //     createDailyReport({
        //         body: {
        //             Date: formData.date,
        //             workHour: formData.workHour,
        //             interruptedHour: formData.interruptedHour,
        //             weather: formData.weather,
        //             createdBy: "25beca4a-7f54-4428-81f5-fbd84ee2a4a8",
        //             siteId: "3659a55d-f26a-49f1-950f-472ca5706845",
        //             materialReports: formData.materialReports,
        //             equipmentReports: formData.equipmentReports,
        //             labourForce: formData.labourForces,
        //             staffOnSite: formData.staffOnSites,
        //         }
        //     })
        // } catch(e){

        // };
    };
    
    
    return (
    <DefaultDialog open={props.open} onClose={props.onClose} title={'Add DailyReport'} description={`Date: ${Date.now().toLocaleString()}`}>
<form onSubmit={handleSubmit}>
    <Stack direction="row" spacing={2}>
<Box>
            {/* ... main fields ... */}
            {/* <input type="date" name="date" value={formData.date} onChange={handleInputChange} /> */}

            {/* Dynamic sections */}
            {/* {formData.staffOnSites.map((staff, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="position"
                        value={staff.position}
                        onChange={(e) => handleDynamicInputChange('staffOnSites', index, e)}
                        placeholder="Position"
                    />
                    <input
                        type="number"
                        name="count"
                        value={staff.count}
                        onChange={(e) => handleDynamicInputChange('staffOnSites', index, e)}
                        placeholder="Count"
                    />
                    <input
                        type="file"
                        onChange={(e) => handleFileChange('staffOnSites', index, e)}
                    />
                    <button type="button" onClick={() => removeSection('staffOnSites', index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={() => addSection('staffOnSites')}>Add Staff</button> */}

            {/* Repeat similar structure for labourForces, materialReports, and equipmentReports */}
{reportData.staffOnSiteReports.map((staffOnSite, index) => (
                <StaffOnSiteForm
                    key={index}
                    data={staffOnSite}
                    onChange={(e, key) => {
                        const updateStaffOnSite = { ...staffOnSite, [key]: e.target.value };
                        handleStaffOnSiteChange(index, updateStaffOnSite);
                    }}
                    onRemove={() => removeStaffOnSiteReport(index)}
                />
            ))}
            <Button type="button" onClick={addMaterialReport}>Add Material Report</Button>
{reportData.materialReports.map((material, index) => (
                <MaterialReportComponent
                    key={index}
                    data={material}
                    onChange={(e, key) => {
                        const updatedMaterial = { ...material, [key]: e.target.value };
                        handleMaterialChange(index, updatedMaterial);
                    }}
                    onImageChange={(file, binaryStr) => {
                        const updatedMaterial = { ...material, image: file, binaryStr };
                        handleMaterialChange(index, updatedMaterial);
                    }}
                    onRemove={() => removeMaterialReport(index)}
                />
            ))}
            <Button type="button" onClick={addMaterialReport}>Add Material Report</Button>
{reportData.equipmentReports.map((equipment, index) => (
                <EquipmentReportForm
                    key={index}
                    data={equipment}
                    onChange={(e, key) => {
                        const updateEquipment = { ...equipment, [key]: e.target.value };
                        handleEquipmentChange(index, updateEquipment);
                    }}
                    onImageChange={(file, binaryStr) => {
                        const updateEquipment = { ...equipment, image: file };
                        handleEquipmentChange(index, updateEquipment);
                    }}
                    onRemove={() => removeEquipmentReport(index)}
                />
            ))}
            <Button type="button" onClick={addEquipmentReport}>Add Equipment Report</Button>
            <Button type="submit">Submit</Button>
            </Box>
            <Box>
            </Box>
    </Stack>
        </form>
    </DefaultDialog>
)}


export default DailyReportForm