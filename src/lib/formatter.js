export const monthAndyearFormatter = (date) => {
    let dateObj = new Date(date);
    let month = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    return `${month[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};

export const formatToRupiah = (number) => {
    number = parseInt(number);
    if (isNaN(number)) {
        return null; // Return null if the input is not a valid number
    }

    return "Rp " + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
