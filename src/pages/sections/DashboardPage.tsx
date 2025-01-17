import {useEffect, useState} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
// import DashboardService from '../../services/dashboardService';
// import FieldService from '../../services/fieldService';
import styles from '../../styles/sectionStyles/dashboardSection.module.css';

ChartJS.register(ArcElement, Tooltip);

interface DashboardStats {
    systemUsers: number;
    staffMembers: number;
    crops: number;
    vehicles: number;
    equipment: number;
}

interface Field {
    name: string;
    extentSize: number;
    fieldImage1: string;
}

interface TopField {
    fieldName: string;
    monitoringCount: number;
}

const topFieldSet = [
    {fieldName: 'Field A', monitoringCount: 15},
    {fieldName: 'Field B', monitoringCount: 10},
    {fieldName: 'Field C', monitoringCount: 8},
    {fieldName: 'Field D', monitoringCount: 5},
    {fieldName: 'Field E', monitoringCount: 3}
];

const fieldSet = [
    {
        name: 'Field A',
        fieldImage1: '/public/images/temp-image.jpg',
        extentSize: 1500,
    },
    {
        name: 'Field B',
        fieldImage1: '/public/images/temp-image.jpg',
        extentSize: 2000,
    },
    {
        name: 'Field C',
        fieldImage1: '/public/images/temp-image.jpg',
        extentSize: 2500,
    },
    {
        name: 'Field D',
        fieldImage1: '/public/images/temp-image.jpg',
        extentSize: 3000,
    },
    {
        name: 'Field E',
        fieldImage1: '/public/images/temp-image.jpg',
        extentSize: 3500,
    },
];

const statTitles = {
    systemUsers: 'System Users',
    staffMembers: 'Staff Members',
    crops: 'Crops',
    vehicles: 'Vehicles',
    equipment: 'Equipment'
};

const statSubtitles = {
    systemUsers: 'Total registered users in FieldGuardian',
    staffMembers: 'Current number of active staff members',
    crops: 'Total crop types registered in the system',
    vehicles: 'Total available vehicles for field operations',
    equipment: 'Total equipment available for agricultural tasks'
};

export const DashboardPage = () => {
    const [stats, setStats] = useState<DashboardStats>({
        systemUsers: 0,
        staffMembers: 0,
        crops: 0,
        vehicles: 0,
        equipment: 0
    });
    const [topFields, setTopFields] = useState<TopField[]>([]);
    const [fields, setFields] = useState<Field[]>([]);

    const formatNumber = (num: number): string => {
        if (num > 999999) return '999,999+';
        return num.toString().padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const truncateText = (text: string, limit: number): string => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [
                    systemUsers,
                    staffMembers,
                    crops,
                    vehicles,
                    equipment,
                    topFieldsData,
                    fieldsData
                ] = await Promise.all([
                    // DashboardService.getTotalUsers(),
                    100,
                    // DashboardService.getTotalActiveStaff(),
                    30,
                    // DashboardService.getTotalActiveCrops(),
                    40,
                    // DashboardService.getTotalActiveVehicles(),
                    65,
                    // DashboardService.getTotalActiveEquipment(),
                    400,
                    // DashboardService.getTopMonitoredFields(),
                    topFieldSet,
                    // FieldService.getAllFields()
                    fieldSet
                ]);

                setStats({systemUsers, staffMembers, crops, vehicles, equipment});
                setTopFields(topFieldsData);
                setFields(fieldsData);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            }
        };

        loadDashboardData();
    }, []);

    const chartData = {
        labels: topFields.map(field => field.fieldName),
        datasets: [{
            data: topFields.map(field => field.monitoringCount),
            backgroundColor: ['#2E7D32', '#4CAF50', '#1C5B1F', '#548957', '#587C5A'],
            borderWidth: 0
        }]
    };

    const chartOptions = {
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className={styles.body}>
            <div className={styles.dashboardContainer}>
                {/* Stats Column */}
                <div className={styles.statsColumn}>
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className={styles.statCard}>
                            <div className={styles.statInfo}>
                                <div className={styles.statTitle}>
                                    {statTitles[key as keyof DashboardStats]}
                                </div>
                                <div className={styles.statSubtitle}>
                                    {statSubtitles[key as keyof DashboardStats]}
                                </div>
                            </div>
                            <div className={styles.statValue}>{formatNumber(value)}</div>
                        </div>
                    ))}
                    <div className={styles.quoteSection}>
                        <div className={styles.quoteContainer}>
                            <img
                                src="/public/images/fieldguardian-logo-green-mini.png"
                                alt="FieldGuardian Logo"
                                className={styles.quoteLogo}
                            />
                            <p className={styles.quoteText}>
                                Empowering Green Shadow with precision, insight, and control...<br/>
                                FieldGuardian at your service.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className={styles.chartSection}>
                    <h2 className={styles.chartTitle}>Most Monitored Fields</h2>
                    <div className={styles.chartOuterContainer}>
                        <div className={styles.chartContainer}>
                            <Doughnut data={chartData} options={chartOptions}/>
                            <img
                                src="/images/fieldguardian-logo-green-mini.png"
                                alt="FieldGuardian Logo"
                                className={styles.chartLogo}
                            />
                        </div>
                        <div className={styles.chartLegend}>
                            {topFields.map((field, index) => (
                                <div key={field.fieldName} className={styles.legendItem}>
                                    <div
                                        className={styles.legendColor}
                                        style={{backgroundColor: chartData.datasets[0].backgroundColor[index]}}
                                    />
                                    <span className={styles.legendText}>{field.fieldName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fields List */}
                <div className={styles.rightColumn}>
                    <div className={styles.cultivationAreas}>
                        <h2 className={styles.areasTitle}>Cultivation Areas</h2>
                        <div className={styles.areasList}>
                            {fields.map(field => (
                                <div key={field.name} className={styles.areaItem}>
                                    <img
                                        // src={`data:image/jpeg;base64,${field.fieldImage1}`}
                                        src={field.fieldImage1}
                                        alt={field.name}
                                        className={styles.areaImage}
                                    />
                                    <div className={styles.areaInfo}>
                                        <div className={styles.areaName}>
                                            {truncateText(field.name, 17)}
                                        </div>
                                        <div className={styles.areaExtent}>
                                            Extent: {field.extentSize} sq. m
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.quoteSection}>
                        <div className={styles.quoteContainer}>
                            <img
                                src="/public/images/fieldguardian-logo-green-mini.png"
                                alt="FieldGuardian Logo"
                                className={styles.quoteLogo}
                            />
                            <p className={styles.quoteText}>
                                "FieldGuardian"<br/>
                                empowering precision, insight,<br/>
                                and efficiency in every acre managed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};