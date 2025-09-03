import QRCode from "qrcode";

export const generateQR = async (data) => QRCode.toDataURL(data);
