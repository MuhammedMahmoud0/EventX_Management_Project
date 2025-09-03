import { Calendar, Users, MapPin, Music, Target } from "lucide-react";

export default function AnalyticsCards() {
    const cards = [
        {
            title: "ATTENDEE AGE",
            mainText: "18 -24 Years",
            value: "2345",
            change: "30% Increase",
            isPositive: true,
            icon: Calendar,
        },
        {
            title: "ATTENDEE GENDER",
            mainText: "Male",
            value: "3345",
            change: "18% Increase",
            isPositive: true,
            icon: Users,
        },
        {
            title: "ATTENDEE LOCATION",
            mainText: "Colombo",
            value: "845",
            change: "15% decrease",
            isPositive: false,
            icon: MapPin,
        },
        {
            title: "ATTENDEE INTERESTS",
            mainText: "EDM Music",
            value: "123",
            change: "63% Increase",
            isPositive: true,
            icon: Music,
        },
        {
            title: "TOTAL ENGAGEMENT",
            mainText: "FaceBook ADS",
            value: "21",
            change: "21% decrease",
            isPositive: false,
            icon: Target,
        },
    ];

    return (
        <div className="w-120 space-y-4">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-gray-500 tracking-wide uppercase">
                            {card.title}
                        </h3>
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <card.icon className="w-4 h-4 text-gray-600" />
                        </div>
                    </div>

                    <div className="mb-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {card.mainText}
                        </h2>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                {card.isPositive ? (
                                    <svg
                                        className="w-4 h-4 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-4 h-4 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                        />
                                    </svg>
                                )}
                                <span
                                    className={`text-sm font-medium ${
                                        card.isPositive
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {card.change}
                                </span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">
                                {card.value}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
