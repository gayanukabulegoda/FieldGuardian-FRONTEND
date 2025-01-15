import styles from '../../styles/sectionStyles/cropSection.module.css';

export const CropPage = () => {
    return (
        <div className={styles.body}>
            <div className={styles.cropContainer}>
                <div className="crop-header">
                    <h1 className="page-title">Crop Details</h1>
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

                    <select className="filter-select" id="fieldFilter">
                        <option value="" disabled selected hidden>Field</option>
                    </select>

                    <button className="search-btn" id="searchBtn">Search</button>
                </div>

                <div className="table-container">
                    <div className="table-header">
                        <div className="th-common">Common Name</div>
                        <div className="th-scientific">Scientific Name</div>
                        <div className="th-category">Category</div>
                        <div className="th-season">Season</div>
                        <div className="th-action">Action</div>
                    </div>

                    <div className="table-body" id="cropTableBody">
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

            {/*Add or Update crop popup*/}
            <div className="add-crop-popup" id="addCropPopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img src="/public/icons/crop-popup-icon.svg" alt="crop-icon"/>
                        </div>
                        <h1 className="header-title" id="popupTitle">Add Crop</h1>
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
                    <form id="addCropForm" className="crop-form">
                        <input type="hidden" id="actionType" value="add"/>
                        <input type="hidden" id="cropCode" name="cropCode"/>
                        <div className="form-container">
                            <div className="form-fields">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="commonName"
                                        placeholder="Common name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="scientificName"
                                        placeholder="Scientific name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select id="field" required>
                                        <option value="" disabled selected hidden>Field</option>
                                    </select>
                                    <img
                                        src="/public/icons/drop-down-icon.svg"
                                        alt="dropdown"
                                        className="input-icon dropdown-icon"
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
                                    <select id="season" required>
                                        <option value="" disabled selected hidden>Season</option>
                                    </select>
                                    <img
                                        src="/public/icons/drop-down-icon.svg"
                                        alt="dropdown"
                                        className="input-icon dropdown-icon"
                                    />
                                </div>
                            </div>
                            <div className="image-upload-container">
                                <input
                                    type="file"
                                    id="cropImage"
                                    accept=".png,.jpg,.jpeg"
                                    className="file-input"
                                />
                                <div className="upload-area" id="uploadArea">
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
                                    <div className="preview-container" id="previewContainer">
                                        <img id="imagePreview" src="" alt="preview"/>
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

            {/*View crop popup*/}
            <div className="view-crop-popup" id="viewCropPopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img src="/public/icons/crop-popup-icon.svg" alt="crop-icon"/>
                        </div>
                        <h1 className="header-title">View Crop</h1>
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
                    <div className="crop-details">
                        <div className="details-container">
                            <div className="details-section">
                                <div className="details-row">
                                    <label>Common name :</label>
                                    <span id="viewCommonName"></span>
                                </div>
                                <div className="details-row">
                                    <label>Scientific name :</label>
                                    <span id="viewScientificName"></span>
                                </div>
                                <div className="details-row">
                                    <label>Category :</label>
                                    <span id="viewCategory"></span>
                                </div>
                                <div className="details-row">
                                    <label>Season :</label>
                                    <span id="viewSeason"></span>
                                </div>
                                <div className="details-row">
                                    <label>Assigned Field :</label>
                                    <span id="viewField"></span>
                                </div>
                            </div>
                            <div className="image-section">
                                <div className="preview-container" id="previewContainer">
                                    <img id="viewCropImage" src="" alt="crop"/>
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