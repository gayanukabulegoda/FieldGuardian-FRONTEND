import {MonitoringLogDTO, MonitoringLog} from '../../types/monitoringLog.ts';
import {Field} from '../../types/field.ts';
import {Staff} from '../../types/staff.ts';
import {Crop} from '../../types/crop.ts';

interface AddEditMonitoringLogPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (monitoringLogData: MonitoringLogDTO) => void;
    log?: MonitoringLog;
    fields: Field[];
    staff: Staff[];
    crops: Crop[];
}

export const AddEditMonitoringLogPopup = ({
                                              isOpen,
                                              onClose,
                                              log,
                                              fields,
                                              staff,
                                              crops
                                          }: AddEditMonitoringLogPopupProps) => {
    return (
        <div onClick={onClose}>
            {isOpen}
            <div>
                <div>
                    <h2>{log ? 'Edit' : 'Add'} Monitoring Log</h2>
                    <button onClick={onClose}>Close</button>
                </div>
                <div>
                    <form>
                        <div>
                            <label>Field</label>
                            <select>
                                {fields.map((field) => (
                                    <option key={field.code} value={field.code}>
                                        {field.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Details</label>
                            <textarea></textarea>
                        </div>
                        <div>
                            <label>Observed Image</label>
                            <input type="file" accept="image/*"/>
                        </div>
                        <div>
                            <label>Staff</label>
                            {staff.map((s) => (
                                <div key={s.id}>
                                    <input type="checkbox" value={s.id}/>
                                    <label>{s.firstName}</label>
                                </div>
                            ))}
                        </div>
                        <div>
                            <label>Crops</label>
                            {crops.map((crop) => (
                                <div key={crop.code}>
                                    <input type="checkbox" value={crop.code}/>
                                    <label>{crop.commonName}</label>
                                </div>
                            ))}
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};