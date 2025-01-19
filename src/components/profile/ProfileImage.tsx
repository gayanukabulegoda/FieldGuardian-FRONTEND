import React from 'react';
import styles from '../../styles/popupStyles/updatePasswordPopup.module.css';

interface ProfileImageProps {
    gender: 'MALE' | 'FEMALE';
    size?: 'small' | 'medium' | 'large';
}

export const ProfileImage: React.FC<ProfileImageProps> = ({gender, size = 'medium'}) => {
    const imageSrc = gender === 'FEMALE'
        ? '/images/default_female_user_profile_pic.jpg'
        : '/images/default_male_user_profile_pic.jpg';

    const sizeClass = {
        small: styles.profileImageSmall,
        medium: styles.profileImage,
        large: styles.profileImageLarge
    }[size];

    return (
        <div className={sizeClass}>
            <img src={imageSrc} alt="Profile" className={styles.roundedCircle}/>
        </div>
    );
};