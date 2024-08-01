import dayjs from "dayjs";
import "dayjs/locale/id";

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

export const formatTanggalMulaiSelesai = (startIso, endIso) => {
    const startDate = dayjs(startIso).locale("id");
    const endDate = dayjs(endIso).locale("id");

    const startDay = startDate.date();
    const endDay = endDate.date();
    const startMonth = startDate.format("MMMM");
    const endMonth = endDate.format("MMMM");
    const year = startDate.year();

    if (startMonth === endMonth) {
        return `${startDay} - ${endDay} ${startMonth} ${year}`;
    } else {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    }
};

export const capitalizeFirstLetterOfEachWord = (sentence) => {
    return sentence
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
