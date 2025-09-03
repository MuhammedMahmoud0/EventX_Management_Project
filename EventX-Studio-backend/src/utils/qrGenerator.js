const QRCode = require("qrcode");

exports.generateQR = async (data) => {
    try {
        return await QRCode.toDataURL(data);
    } catch (err) {
        throw new Error("QR Code generation failed");
    }
};
