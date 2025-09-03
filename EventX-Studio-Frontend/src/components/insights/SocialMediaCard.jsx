import React from "react";
import { Instagram, Facebook, Twitter, QrCode } from "lucide-react";

const SocialMediaCard = () => {
    const stats = [
        {
            icon: <Instagram className="text-pink-500 w-6 h-6" />, // icons bigger
            label: "Instagram Mentions",
            value: "5,200",
        },
        {
            icon: <Facebook className="text-blue-500 w-6 h-6" />,
            label: "Facebook Shares",
            value: "3,800",
        },
        {
            icon: <Twitter className="text-sky-500 w-6 h-6" />,
            label: "Twitter Tweets",
            value: "1,200",
        },
        {
            icon: <QrCode className="text-gray-600 w-6 h-6" />,
            label: "Event Check-ins (QR scans)",
            value: "9,500",
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-md p-10 w-96 h-[28rem]">
            {/* Header */}
            <h3 className="text-gray-800 font-semibold text-xl">
                Engagement & Social Media Reach
            </h3>
            <p className="text-gray-500 text-sm mb-6">
                📢 How attendees engaged with the event
            </p>

            {/* Stats List */}
            <div className="space-y-6">
                {stats.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between border-b pb-3 last:border-none"
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="text-gray-700 text-base">
                                {item.label}
                            </span>
                        </div>
                        <span className="text-teal-600 font-semibold text-base">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="pt-6 text-center font-semibold text-teal-600 text-base">
                TOTAL COUNT : 19,700
            </div>
        </div>
    );
};

export default SocialMediaCard;
