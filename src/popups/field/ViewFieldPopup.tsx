import {Field, FieldStaff, FieldEquipment} from '../../types/field';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/popupStyles/view/viewFieldPopup.module.css';

interface ViewFieldPopupProps {
    isOpen: boolean;
    onClose: () => void;
    field: Field;
    staffMembers?: FieldStaff[];
    equipment?: FieldEquipment[];
}

export const ViewFieldPopup = ({
                                   isOpen,
                                   onClose,
                                   field,
                                   staffMembers = [],
                                   equipment = []
                               }: ViewFieldPopupProps) => {
    if (!isOpen) return null;

    const extractCoordinates = (location: string) => {
        const regex = /Point \[x=(-?\d+\.\d+), y=(-?\d+\.\d+)\]/;
        const match = location.match(regex);
        if (match) {
            return {lat: match[1], lng: match[2]};
        }
        return null;
    };

    const coordinates = extractCoordinates(field.location);
    const googleMapsLink = coordinates
        ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
        : "#";

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.viewFieldPopup} id="viewFieldPopup">
            <div className="popup-header">
                <div className="header-content">
                    <div className="header-icon">
                        <img src="/public/icons/field-popup-icon.svg" alt="field-icon"/>
                    </div>
                    <h1 className="header-title">View Field</h1>
                </div>
                <button className="close-btn" id="closeViewBtn">
                    <img
                        src="/public/icons/close-icon-black.svg"
                        alt="close-icon"
                        className="close-icon"
                    />
                </button>
            </div>
            <div className="popup-content">
                <div className="field-details">
                    <div className="details-container">
                        <div className="details-section">
                            <div className="details-row">
                                <label>Name :</label>
                                <span id="viewName"></span>
                            </div>
                            <div className="details-row">
                                <label>Extent size (sq. m) :</label>
                                <span id="viewExtentSize"></span>
                            </div>
                            <div className="details-row">
                                <label>Location :</label>
                                <a
                                    href="#"
                                    id="viewLocation"
                                    target="_blank"
                                    className="location-link"
                                >Click to open in map ↗</a
                                >
                            </div>
                            <div className="image-section">
                                <div className="preview-container" id="previewViewContainer1">
                                    <img id="viewFieldImage1" src="" alt="field"/>
                                </div>
                                <div className="preview-container" id="previewViewContainer2">
                                    <img id="viewFieldImage2" src="" alt="field"/>
                                </div>
                            </div>
                        </div>
                        <div className="selection-section">
                            <div className="selection-group">
                                <h2 className="section-title">Staff Members</h2>
                                <div className="selection-container" id="staffViewContainer">
                                    {/*Staff rows will be dynamically added here*/}
                                </div>
                            </div>
                            <div className="selection-group">
                                <h2 className="section-title">Equipments</h2>
                                <div className="selection-container" id="equipmentViewContainer">
                                    {/*Equipment rows will be dynamically added here*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="close-button" id="closeButton">CLOSE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};