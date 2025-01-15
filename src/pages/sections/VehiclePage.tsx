import styles from '../../styles/sectionStyles/vehicleSection.module.css';

export const VehiclePage = () => {
    return (
        <div className={styles.div}>
            <div className={styles.vehicleContainer}>
                <div className="vehicle-header">
                    <h1 className="page-title">Vehicle Details</h1>
                    <div className="header-buttons">
                        <button className="btn btn-popup-action" id="addBtn">Add</button>
                    </div>
                </div>

                <div className="search-section">
                    <div className="search-input">
                        <input
                            type="text"
                            placeholder="Search by license plate no"
                            id="searchName"
                        />
                        <img
                            src="/public/icons/search-icon.svg"
                            alt="search-icon"
                            className="search-icon"
                        />
                    </div>

                    <select className="filter-select" id="categoryFilter">
                        <option value="" disabled selected hidden>Category</option>
                    </select>

                    <select className="filter-select" id="statusFilter">
                        <option value="" disabled selected hidden>Status</option>
                        <option value="AVAILABLE">Available</option>
                        <option value="IN_USE">In Use</option>
                        <option value="OUT_OF_SERVICE">Out of Service</option>
                    </select>

                    <button className="search-btn" id="searchBtn">Search</button>
                </div>

                <div className="table-container">
                    <div className="table-header">
                        <div className="th-plate">License Plate No</div>
                        <div className="th-category">Category</div>
                        <div className="th-status">Status</div>
                        <div className="th-fuel">Fuel Type</div>
                        <div className="th-action">Action</div>
                    </div>

                    <div className="table-body" id="vehicleTableBody">
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

            {/*Add or update vehicle popup*/}
            <div className="add-vehicle-popup" id="addVehiclePopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img
                                src="/public/icons/vehicle-popup-icon.svg"
                                alt="vehicle-icon"
                            />
                        </div>
                        <h1 className="header-title" id="popupTitle">Add Vehicle</h1>
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
                    <form id="addVehicleForm" className="vehicle-form">
                        <input type="hidden" id="actionType" value="add"/>
                        <input type="hidden" id="vehicleCode" name="vehicleCode"/>
                        <div className="form-container">
                            <div className="form-fields">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="licensePlateNumber"
                                        placeholder="License plate number"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select id="category" required>
                                        <option value="" disabled selected hidden>Category</option>
                                    </select>
                                    <img
                                        src="/public/icons/drop-down-icon.svg"
                                        alt="dropdown"
                                        className="input-icon dropdown-icon"
                                    />
                                </div>
                                <div className="form-group">
                                    <select id="fuelType" required>
                                        <option value="" disabled selected hidden>Fuel type</option>
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
                            </div>
                            <div className="remark-field">
                                <div className="form-group">
                <textarea
                    id="remark"
                    placeholder="Add your remark..."
                    maxLength={400}
                    required
                ></textarea>
                                    <div className="char-count">
                                        <span id="currentCount">0</span>/400
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="save-btn-container">
                            <button type="submit" className="save-btn" id="saveBtn">SAVE</button>
                        </div>
                    </form>
                </div>
            </div>

            {/*View vehicle popup*/}
            <div className="view-vehicle-popup" id="viewVehiclePopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img
                                src="/public/icons/vehicle-popup-icon.svg"
                                alt="vehicle-icon"
                            />
                        </div>
                        <h1 className="header-title">View Vehicle</h1>
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
                    <div className="vehicle-details">
                        <div className="details-container">
                            <div className="details-section">
                                <div className="details-row">
                                    <label>License plate no :</label>
                                    <span id="viewLicensePlateNumber"></span>
                                </div>
                                <div className="details-row">
                                    <label>Category :</label>
                                    <span id="viewCategory"></span>
                                </div>
                                <div className="details-row">
                                    <label>Fuel type :</label>
                                    <span id="viewFuelType"></span>
                                </div>
                                <div className="details-row">
                                    <label>Staff Member :</label>
                                    <span id="viewStaff"></span>
                                </div>
                                <div className="details-row">
                                    <label>Status :</label>
                                    <span id="viewStatus"></span>
                                </div>
                            </div>
                            <div className="remark-field">
                                <div className="details-row remark-row">
                                    <label>Remark :</label>
                                    <textarea
                                        id="viewRemark"
                                        placeholder="No remark recorded..."
                                        readOnly
                                    ></textarea>
                                </div>
                            </div>
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