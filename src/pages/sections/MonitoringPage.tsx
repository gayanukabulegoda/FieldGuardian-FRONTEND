import styles from '../../styles/sectionStyles/monitoringLogSection.module.css';

export const MonitoringPage = () => {
    return (
        <div className={styles.body}>
            <div className={styles.monitoringContainer}>
                <div className="monitoring-header">
                    <h1 className="page-title">Monitoring Logs</h1>
                    <div className="header-buttons">
                        <button className="btn btn-popup-action" id="addBtn">Add</button>
                    </div>
                </div>

                <div className="search-section">
                    <div className="search-input">
                        <input type="text" placeholder="Search by field" id="searchField"/>
                        <img
                            src="/public/icons/search-icon.svg"
                            alt="search-icon"
                            className="search-icon"
                        />
                    </div>

                    <div className="date-input">
                        <input type="date" id="dateFilter"/>
                        <img
                            src="/public/icons/calendar-icon.svg"
                            alt="calendar-icon"
                            className="calendar-icon"
                        />
                    </div>

                    <button className="search-btn" id="searchBtn">Search</button>
                </div>

                <div className="table-container">
                    <div className="table-header">
                        <div className="th-image">
                            <img src="/public/icons/image-icon.svg" alt="image-icon"/>
                        </div>
                        <div className="th-date">Date</div>
                        <div className="th-field">Field</div>
                        <div className="th-staff">Staff Count</div>
                        <div className="th-action">Action</div>
                    </div>

                    <div className="table-body" id="monitoringTableBody">
                        {/*Table rows will be dynamically added here*/}
                    </div>
                </div>
            </div>

            {/*Add or update monitoring-log popup*/}
            <div className="add-monitoring-popup" id="addMonitoringPopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img
                                src="/public/icons/monitoring-log-popup-icon.svg"
                                alt="monitoring-icon"
                            />
                        </div>
                        <h1 className="header-title" id="popupTitle">Add Monitoring Log</h1>
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
                    <form id="addMonitoringForm" className="monitoring-form">
                        <input type="hidden" id="actionType" value="add"/>
                        <input type="hidden" id="logCode" name="logCode"/>
                        <div className="form-container">
                            <div className="form-fields">
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
                <textarea
                    id="observation"
                    placeholder="Add your observation..."
                    maxLength={400}
                    required
                ></textarea>
                                    <div className="char-count">
                                        <span id="currentCount">0</span>/400
                                    </div>
                                </div>
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        id="monitoringImage"
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
                            <div className="selection-fields">
                                <div className="selection-section">
                                    <h2 className="section-title">Select Staff</h2>
                                    <div className="selection-container" id="staffContainer">
                                        {/*Staff rows will be dynamically added here*/}
                                    </div>
                                </div>
                                <div className="selection-section">
                                    <h2 className="section-title">Select Crops</h2>
                                    <div className="selection-container" id="cropContainer">
                                        {/*Crop rows will be dynamically added here*/}
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

            {/*View monitoring-log popup*/}
            <div className="view-monitoring-popup" id="viewMonitoringPopup">
                <div className="popup-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <img
                                src="/public/icons/monitoring-log-popup-icon.svg"
                                alt="monitoring-icon"
                            />
                        </div>
                        <h1 className="header-title">View Monitoring Log</h1>
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
                    <div className="monitoring-details">
                        <div className="details-container">
                            <div className="details-section">
                                <div className="details-row">
                                    <label>Field :</label>
                                    <span id="viewField"></span>
                                </div>
                                <div className="details-row observation-row">
                                    <label>Observation :</label>
                                    <textarea
                                        id="viewObservation"
                                        placeholder="No observation recorded..."
                                        readOnly
                                    ></textarea>
                                </div>
                                <div className="image-section">
                                    <div className="preview-container" id="previewViewContainer">
                                        <img id="viewMonitoringImage" src="" alt="monitoring"/>
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
                                    <h2 className="section-title">Crops</h2>
                                    <div className="selection-container" id="cropViewContainer">
                                        {/*Crop rows will be dynamically added here*/}
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