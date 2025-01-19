function PersonToFollow({ Name, UserName, Score, ImageLink }) {
    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors rounded-lg group">
            <div className="flex items-center space-x-3">
                {/* Profile Image with fallback */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                    <img
                        src={ImageLink}
                        alt={`${Name}'s profile`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/48"; // Fallback image
                        }}
                    />
                </div>

                {/* User Info */}
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 hover:underline cursor-pointer">
                        {Name}
                    </span>
                    <div className="flex items-center justify-around gap-x-1">
                        <span className="text-xs text-gray-600">@{UserName}</span>
                        <span className="p-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                            {Score}
                        </span>
                    </div>
                </div>
            </div>

            {/* Visit Button */}
            <button className="hidden xl:flex items-center p-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                VISIT
            </button>
        </div>
    );
}

function WhotoFollow() {
    const topUsers = [
        {
            Name: "Elon Musk",
            Score: "98",
            UserName: "elonmusk",
            ImageLink: "https://pbs.twimg.com/profile_images/1849727333617573888/HBgPUrjG_400x400.jpg"
        },
        {
            Name: "Gyan Dev",
            Score: "90",
            UserName: "gyandev",
            ImageLink: "https://pbs.twimg.com/profile_images/1791002277685428224/MK3cZ88K_bigger.jpg"
        },
        {
            Name: "Navneet Bharadwaj",
            Score: "87",
            UserName: "navneet",
            ImageLink: "https://pbs.twimg.com/profile_images/1257381512498077696/ACJBYZ-n_normal.jpg"
        }
    ].sort((a, b) => b.Score - a.Score); // Sort by social score

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"

                    >
                        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <span>Top Social Scores</span>
                </h2>
            </div>

            {/* User List */}
            <div className="divide-y divide-gray-100">
                {topUsers.map((user, index) => (
                    <PersonToFollow
                        key={index}
                        Name={user.Name}
                        UserName={user.UserName}
                        Score={user.Score}
                        ImageLink={user.ImageLink}
                    />
                ))}
            </div>


        </div>
    );
}

export default WhotoFollow;