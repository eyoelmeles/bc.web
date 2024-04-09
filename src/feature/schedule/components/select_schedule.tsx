import React, { SetStateAction } from 'react'
import { Schedule } from '../model/schedule'
import { Select, Option } from '@mui/joy';
import { useGetAllSchedulesQuery } from '../api/schedule_endpoint';
import { useSelector } from 'react-redux';

interface SelectScheduleProps {
    schedule?: Schedule;
    setSelectedSchedule: React.Dispatch<SetStateAction<Schedule>>;
}

const SelectSchedule: React.FC<SelectScheduleProps> = (props) => {
    const site = useSelector((state: any) => state.site);
    const { data: schedules } = useGetAllSchedulesQuery({
        params: { siteId: site?.id },
    });
    const handleChange = (_: React.SyntheticEvent | null,
        newValue: string | null,) => {
        if (schedules && newValue)
            props.setSelectedSchedule(schedules?.filter(schedule => schedule.id == newValue)?.[0] ?? []);
    }
    return (
        <Select
            placeholder="Choose Work Item…"
            onChange={handleChange}
            sx={{ width: 300 }}
        >
            {schedules?.map((schedule, index) => (
                <Option key={index} value={schedule.id}>
                    {schedule.name}
                </Option>
            ))}
        </Select>
    )
}

export default SelectSchedule;