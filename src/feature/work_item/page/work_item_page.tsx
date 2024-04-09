import {
  Box, Button, Input, Sheet, Stack, Typography,

} from "@mui/joy";
import { useEffect, useState } from "react";
import ScheduleShell from "../component/schedule_shell";
import CostList from "../component/cost_list";
import { WorkItemCost } from "../model/work_item";
import { useNavigate } from "react-router-dom";
import { Add, Check } from "@mui/icons-material";
import SelectLookup from "../../lookup/components/select_lookup";
import { Lookup, LookupType } from "../../lookup/model/lookup";
import { useCreateEquipmentCostMutation, useCreateManpowerCostMutation, useCreateMaterialCostMutation, useLazyGetEquipmentCostQuery, useLazyGetManPowerCostQuery, useLazyGetMaterialCostQuery } from "../api/work_item_endpoints";
import { Material } from "../../material/model/material";
import SelectMaterial from "../../material/component/select_material";

const WorkItemPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [materialUnit, setMaterialUnit] = useState<Lookup | null>(null);
  const [labour, setLabour] = useState<Lookup | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [equipment, setEquipment] = useState<Lookup | null>(null);
  const [selectedCost, setSelectedCost] = useState<
    WorkItemCost
  >(WorkItemCost.manpower);


  const handleClick = () => {
    setShowForm(!showForm);
  };
  const [fetchManPowerCost, { data: manPowerCosts }] = useLazyGetManPowerCostQuery();
  const [fetchMaterialCost, { data: materialCost }] = useLazyGetMaterialCostQuery();
  const [fetchEquipmentCost, { data: equipmentCost }] = useLazyGetEquipmentCostQuery();
  useEffect(() => {
    if (selectedCost == WorkItemCost.manpower)
      fetchManPowerCost({
        params: {
          workItemId: "82e6478c-c859-4567-a218-f69e8e70f4d2"
        }
      });
    if (selectedCost == WorkItemCost.material)
      fetchMaterialCost({
        params: {
          workItemId: "82e6478c-c859-4567-a218-f69e8e70f4d2"
        }
      });
    if (selectedCost == WorkItemCost.equipment)
      fetchEquipmentCost({
        params: {
          workItemId: "82e6478c-c859-4567-a218-f69e8e70f4d2"
        }
      });
  }, [selectedCost])

  const navigate = useNavigate();
  const [createManPower] = useCreateManpowerCostMutation();
  const [createMaterialCost] = useCreateMaterialCostMutation();
  const [createEquipmentCost] = useCreateEquipmentCostMutation();
  const handleManPower = async (form: any) => {
    console.log(labour?.id);
    try {
      await createManPower({
        body: {
          labourId: labour?.id,
          count: parseInt(form?.count),
          unitFactor: parseInt(form?.unitFactor),
          hourlyIndex: parseInt(form?.hourlyIndex),
          workItem: "82e6478c-c859-4567-a218-f69e8e70f4d2"
        }
      });
      setShowForm(false);
    } catch (e) {

    }
    console.log(form);
  }

  const handleMaterial = async (form: any) => {

    try {
      await createMaterialCost({
        body: {
          materialId: material?.id,
          unitOfMeasureId: materialUnit?.id,
          quantity: parseInt(form?.quantity),
          rate: parseInt(form?.rate),
          costPerUnit: parseInt(form?.costPerUnit),
          workItemId: "82e6478c-c859-4567-a218-f69e8e70f4d2"
        }
      });
      setShowForm(false);
    } catch (e) {

    }
    console.log(form);
  }

  const handleEquipment = async (form: any) => {

    try {
      await createEquipmentCost({
        body: {
          equipmentId: equipment?.id,
          count: parseInt(form?.count),
          unitFactor: parseInt(form?.unitFactor),
          hourlyRental: parseInt(form?.hourlyRental),
          workItem: "82e6478c-c859-4567-a218-f69e8e70f4d2"
        }
      });
      setShowForm(false);
    } catch (e) {

    }
    console.log(form);
  }

  return (
    <ScheduleShell title="Task" handleBack={() => { navigate(-1) }}>
      <Box display="flex" height="100%">
        <Box width="20%" height="100%">
          <CostList selectedCost={selectedCost} setSelectedCost={setSelectedCost} />
        </Box>
        <Box display='flex' flex={1} p={2} alignItems="start" justifyContent="center">
          <Box display='flex' flexDirection="column" gap={2} width="60%" >

            {selectedCost === WorkItemCost.manpower &&
              <Box>
                {manPowerCosts?.map(manPowerCost => (
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography>{manPowerCost.labour.name}</Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography>Count: {manPowerCost.count}</Typography>
                      <Typography>Unit Factor: {manPowerCost.hourlyIndex}</Typography>
                      <Typography>Hourly Index: {manPowerCost.unitFactor}</Typography>
                      <Typography>Hourly Rate: {manPowerCost.unitFactor * manPowerCost.hourlyIndex}</Typography>
                    </Box>
                  </Box>
                ))}

                <Sheet variant="soft" sx={{ borderRadius: 8, p: showForm ? 1 : 0, display: 'flex' }}>
                  {showForm ? (
                    <form
                      style={{ width: "100%" }}
                      onSubmit={(event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        handleManPower(formJson)
                        alert(JSON.stringify(formJson));
                      }}
                    >
                      <Stack spacing={1} direction="row" width="100%" display="flex" flex={1} alignItems="center" gap={.4}>
                        <SelectLookup title={"Select Labour"} lookupType={LookupType.Labour} setLookup={setLabour} /> <b>:</b>

                        <Input size="sm" placeholder="Count" name="count" fullWidth />
                        <Input size="sm" placeholder="Unit Factor" name="unitFactor" fullWidth /><b>:</b>
                        <Input size="sm" placeholder="Index Hourly Cost" name="hourlyIndex" fullWidth />
                        <Button type="submit" size="sm" startDecorator={<Check />} color="neutral" variant="solid"></Button>
                      </Stack>
                    </form>
                  ) : <Button variant="plain" color="neutral" fullWidth startDecorator={<Add />} onClick={handleClick}>Add Man Power</Button>}
                </Sheet>
              </Box>
            }
            {selectedCost === WorkItemCost.material &&
              <Box>
                {materialCost?.map(manPowerCost => (
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography>{manPowerCost.material.name}</Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography>Unit : {manPowerCost.unitOfMeasure.name}</Typography>
                      <Typography>Quantity : {manPowerCost.quantity}</Typography>
                      <Typography>Rate: {manPowerCost.rate}</Typography>
                      <Typography>Hourly Rate: {manPowerCost.rate * manPowerCost.costPerUnit}</Typography>
                    </Box>
                  </Box>
                ))}
                <Sheet variant="soft" sx={{ borderRadius: 8, p: showForm ? 1 : 0, display: 'flex' }}>
                  {showForm ? (
                    <form
                      style={{ width: "100%" }}
                      onSubmit={(event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        handleMaterial(formJson)
                        alert(JSON.stringify(formJson));
                      }}
                    >
                      <Stack spacing={1} direction="row" width="100%" display="flex" flex={1} alignItems="center" gap={.4}>
                        <SelectMaterial title={"Select Material"} setMaterial={setMaterial} /> <b>:</b>
                        <SelectLookup title={"Select Unit Of Measure"} lookupType={LookupType.UnitOfMeasure} setLookup={setMaterialUnit} lookup={material?.unitOfMeasure} />
                        <Input size="sm" placeholder="Quantity" name="quantity" fullWidth />
                        <Input size="sm" placeholder="Rate" name="rate" fullWidth /><b>:</b>
                        <Input size="sm" placeholder="Cost Per Hour" name="costPerUnit" fullWidth />
                        <Button type="submit" size="sm" startDecorator={<Check />} color="neutral" variant="solid"></Button>
                      </Stack>
                    </form>
                  ) : <Button variant="plain" color="neutral" fullWidth startDecorator={<Add />} onClick={handleClick}>Add Material</Button>}
                </Sheet>
              </Box>}
            {selectedCost === WorkItemCost.equipment &&
              <Box>
                {equipmentCost?.map(manPowerCost => (
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography>{manPowerCost.equipment.name}</Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography>Count: {manPowerCost.count}</Typography>
                      <Typography>Unit Factor: {manPowerCost.unitFactor}</Typography>
                      <Typography>Hourly Rental: {manPowerCost.hourlyRental}</Typography>
                      <Typography>Hourly Rate: {manPowerCost.unitFactor * manPowerCost.hourlyRental}</Typography>
                    </Box>
                  </Box>
                ))}
                <Sheet variant="soft" sx={{ borderRadius: 8, p: showForm ? 1 : 0, display: 'flex' }}>
                  {showForm ? (
                    <form
                      style={{ width: "100%" }}
                      onSubmit={(event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        handleEquipment(formJson);
                        alert(JSON.stringify(formJson));
                      }}
                    >
                      <Stack spacing={1} direction="row" width="100%" display="flex" flex={1} alignItems="center" gap={.4}>
                        <SelectLookup title={"Select Equipment"} lookupType={LookupType.Equipment} setLookup={setEquipment} /> <b>:</b>

                        <Input size="sm" placeholder="Count" name="count" fullWidth />
                        <Input size="sm" placeholder="Unit Factor" name="unitFactor" fullWidth /><b>:</b>
                        <Input size="sm" placeholder="Index Hourly Cost" name="hourlyRental" fullWidth />
                        <Button type="submit" size="sm" startDecorator={<Check />} color="neutral" variant="solid"></Button>
                      </Stack>
                    </form>
                  ) : <Button variant="plain" color="neutral" fullWidth startDecorator={<Add />} onClick={handleClick}>Add Equipment</Button>}
                </Sheet>
              </Box>}
          </Box>
        </Box>
      </Box>
    </ScheduleShell>
  );
};

export default WorkItemPage;
