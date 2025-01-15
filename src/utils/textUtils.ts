export const truncateText = (text: string, limit: number): string => {
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    }
    return text;
};

export const formatDesignationText = (text: string): string => {
    return text
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};