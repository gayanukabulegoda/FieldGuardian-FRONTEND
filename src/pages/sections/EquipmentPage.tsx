import styles from '../../styles/sectionStyles/equipmentSection.module.css';

export const EquipmentPage = () => {
    return (
        <div className={styles.body}>
            <div className={styles.equipmentContainer}>
                <div className="equipment-header">
                    <h1 className="page-title">Equipment Details</h1>
                    <div className="header-buttons">
                        <button className="btn btn-popup-action" id="addBtn">Add</button>
                    </div>
                </div>

                <div className="search-section">
                    <div className="search-input">
                        <input type="text" placeholder="Search by name" id="searchName"/>
                        <img
                            src="/public/icons/search-icon.svg"
                            alt="search-icon"
                            className="search-icon"
                        />
                    </div>

                    <select className="filter-select" id="statusFilter">
                        <option value="" disabled selected hidden>Status</option>
                        <option value="AVAILABLE">Available</option>
                        <option value="IN_USE">In Use</option>
                        <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                    </select>

                    <button className="search-btn" id="searchBtn">Search</button>
                </div>

                <div className="table-container">
                    <div className="table-header">
                        <div className="th-name">Name</div>
                        <div className="th-type">Type</div>
                        <div className="th-status">Status</div>
                        <div className="th-field">Field</div>
                        <div className="th-action">Action</div>
                    </div>

                    <div className="table-body" id="equipmentTableBody">
                        {/*Table rows will be dynamically added here*/}
                    </div>
                </div>
            </div>

            {/*Delete confirmation popup*/}
            <div className="delete-popup" id="deleteConfirmationPopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img
                                src="/public/icons/delete-confirmation-popup-icon.svg"
                                alt="delete-icon"
                            />
                        </div>
                        <h1 className="header-title">Delete Confirmation</h1>
                    </div>
                    <button className="close-btn" id="closeDeletePopupBtn">
                        <img
                            src="/public/icons/close-icon-black.svg"
                            alt="close-icon"
                            className="close-icon"
                        />
                    </button>
                </div>
                <div className="popup-content">
                    <p className="confirmation-text">
                        Do you really want to delete these records?<br/>
                        This process cannot be undone.
                    </p>
                    <button className="confirm-btn" id="confirmDeleteBtn">CONFIRM</button>
                </div>
            </div>

            {/*Add/Update equipment popup*/}
            <div className="add-equipment-popup" id="addEquipmentPopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img
                                src="/public/icons/equipment-popup-icon.svg"
                                alt="equipment-icon"
                            />
                        </div>
                        <h1 className="header-title" id="popupTitle">Add Equipment</h1>
                    </div>
                    <button className="close-btn" id="closeBtn">
                        <img
                            src="/public/icons/close-icon-black.svg"
                            alt="close-icon"
                            className="close-icon"
                        />
                    </button>
                </div>
                <div className="popup-content">
                    <form id="equipmentForm" className="equipment-form">
                        <input type="hidden" id="actionType" value="add"/>
                        <input type="hidden" id="equipmentId" name="equipmentId"/>
                        <div className="form-group">
                            <input type="text" id="name" placeholder="Name" required/>
                        </div>
                        <div className="form-group">
                            <select id="type" required>
                                <option value="" disabled selected hidden>Type</option>
                            </select>
                            <img
                                src="/public/icons/drop-down-icon.svg"
                                alt="dropdown"
                                className="input-icon dropdown-icon"
                            />
                        </div>
                        <div className="form-group">
                            <select id="status" className="optional">
                                <option value="" disabled selected hidden>Status</option>
                            </select>
                            <img
                                src="/public/icons/drop-down-icon.svg"
                                alt="dropdown"
                                className="input-icon dropdown-icon"
                            />
                        </div>
                        <div className="form-group">
                            <select id="staff" className="optional">
                                <option value="" disabled selected hidden>
                                    Staff (Optional)
                                </option>
                            </select>
                            <img
                                src="/public/icons/drop-down-icon.svg"
                                alt="dropdown"
                                className="input-icon dropdown-icon"
                            />
                        </div>
                        <div className="save-btn-container">
                            <button type="submit" className="save-btn" id="saveBtn">SAVE</button>
                        </div>
                    </form>
                </div>
            </div>

            {/*View equipment popup*/}
            <div className="view-equipment-popup" id="viewEquipmentPopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img
                                src="/public/icons/equipment-popup-icon.svg"
                                alt="equipment-icon"
                            />
                        </div>
                        <h1 className="header-title">View Equipment</h1>
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
                    <div className="equipment-details">
                        <div className="details-row">
                            <label>Name :</label>
                            <span id="viewName"></span>
                        </div>
                        <div className="details-row">
                            <label>Type :</label>
                            <span id="viewType"></span>
                        </div>
                        <div className="details-row">
                            <label>Status :</label>
                            <span id="viewStatus"></span>
                        </div>
                        <div className="details-row">
                            <label>Staff :</label>
                            <span id="viewStaff"></span>
                        </div>
                        <div className="details-row">
                            <label>Field :</label>
                            <span id="viewField"></span>
                        </div>
                        <div className="button-container">
                            <button className="close-button" id="closeButton">CLOSE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};