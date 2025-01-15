import styles from '../../styles/sectionStyles/fieldSection.module.css';

export const FieldPage = () => {
    return (
        <div className={styles.body}>
            <div className={styles.fieldContainer}>
                <div className="field-header">
                    <h1 className="page-title">Field Details</h1>
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

                    <select className="filter-select" id="landSizeFilter">
                        <option value="" disabled selected hidden>Land Size</option>
                        <option value="SMALL">Small (&lt; 50 sq. m)</option>
                        <option value="MEDIUM">Medium (50-150 sq. m)</option>
                        <option value="LARGE">Large (&gt; 150 sq. m)</option>
                    </select>

                    <button className="search-btn" id="searchBtn">Search</button>
                </div>

                <div className="table-container">
                    <div className="table-header">
                        <div className="th-image">
                            <img src="/public/icons/image-icon.svg" alt="image-icon"/>
                        </div>
                        <div className="th-name">Name</div>
                        <div className="th-location">Location</div>
                        <div className="th-extent">Extent size (sq. m)</div>
                        <div className="th-action">Action</div>
                    </div>

                    <div className="table-body" id="fieldTableBody">
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

            {/*Add or update field popup*/}
            <div className="add-field-popup" id="addFieldPopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img src="/public/icons/field-popup-icon.svg" alt="field-icon"/>
                        </div>
                        <h1 className="header-title" id="popupTitle">Add Field</h1>
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
                    <form id="addFieldForm" className="field-form">
                        <input type="hidden" id="actionType" value="add"/>
                        <input type="hidden" id="fieldCode" name="fieldCode"/>
                        <div className="form-container">
                            <div className="form-fields">
                                <div className="form-group">
                                    <input type="text" id="name" placeholder="Name" required/>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        id="extentSize"
                                        placeholder="Extent size (sq. m)"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="location"
                                        placeholder="Location (Paste google map url)"
                                        required
                                    />
                                </div>
                                <div className="image-upload-section">
                                    <div className="image-upload-container">
                                        <input
                                            type="file"
                                            id="fieldImage1"
                                            accept=".png,.jpg,.jpeg"
                                            className="file-input"
                                        />
                                        <div className="upload-area" id="uploadArea1">
                                            <div className="upload-content">
                                                <img
                                                    src="/public/icons/add-image-icon.svg"
                                                    alt="add-image"
                                                    className="upload-icon"
                                                />
                                                <p className="upload-text">Select your file</p>
                                                <p className="upload-subtext">png, jpg, jpeg accepted</p>
                                                <p className="upload-size">(Maximum file size : 10MB)</p>
                                            </div>
                                            <div className="preview-container" id="previewContainer1">
                                                <img id="imagePreview1" src="" alt="preview"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image-upload-container">
                                        <input
                                            type="file"
                                            id="fieldImage2"
                                            accept=".png,.jpg,.jpeg"
                                            className="file-input"
                                        />
                                        <div className="upload-area" id="uploadArea2">
                                            <div className="upload-content">
                                                <img
                                                    src="/public/icons/add-image-icon.svg"
                                                    alt="add-image"
                                                    className="upload-icon"
                                                />
                                                <p className="upload-text">Select your file</p>
                                                <p className="upload-subtext">png, jpg, jpeg accepted</p>
                                                <p className="upload-size">(Maximum file size : 10MB)</p>
                                            </div>
                                            <div className="preview-container" id="previewContainer2">
                                                <img id="imagePreview2" src="" alt="preview"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="selection-fields">
                                <div className="selection-section">
                                    <h2 className="section-title" id="staffSelectionTitle">
                                        Select Staff (Optional)
                                    </h2>
                                    <div className="selection-container" id="staffContainer">
                                        {/*Staff rows will be dynamically added here*/}
                                    </div>
                                </div>
                                <div className="selection-section">
                                    <h2 className="section-title" id="equipmentSelectionTitle">
                                        Select Equipments (Optional)
                                    </h2>
                                    <div className="selection-container" id="equipmentContainer">
                                        {/*Equipment rows will be dynamically added here*/}
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

            {/*View field popoup*/}
            <div className="view-field-popup" id="viewFieldPopup">
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
        </div>
    );
};