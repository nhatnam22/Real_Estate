export const totalDate = (combo, date) => {
    const newDate = new Date(date); // Tạo bản sao của đối tượng date
    switch (combo) {
        case "7 ngày":
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        case "10 ngày":
            newDate.setDate(newDate.getDate() + 10);
            return newDate;
        case "15 ngày":
            newDate.setDate(newDate.getDate() + 15);
            return newDate;
        default:
            return newDate;
    }
};
// Hàm định dạng ngày thành dd/MM/yyyy
export const formatDate = (date) => {
    if (!date) return "Chọn ngày";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
export const formatDateTime = (date) => {
    if (!date) return "Chọn ngày";
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
