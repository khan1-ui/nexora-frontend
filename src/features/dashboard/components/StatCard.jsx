/**
 * StatCard Component
 *
 * Reusable dashboard metric card
 *
 * Props:
 * - title (string)
 * - value (string | number)
 * - badge (string | number | optional)
 * - trend (number | optional)
 * - trendPositive (boolean | optional)
 *
 * Fully responsive
 * Dark mode safe
 * No business logic inside
 */

import PropTypes from "prop-types";

const StatCard = ({
  title,
  value,
  badge,
  trend,
  trendPositive = true,
}) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-950
        p-6 rounded-3xl
        shadow-lg hover:shadow-xl
        transition-all duration-300
        border border-gray-100
        dark:border-slate-800
      "
    >
      {/* Title */}
      <p className="text-sm text-app-muted-light dark:text-app-muted-dark">
        {title}
      </p>

      {/* Value + Badge / Trend */}
      <div className="flex items-center justify-between mt-3">

        {/* Main Value */}
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {value}
        </h3>

        {/* Right Side Indicator */}
        <div className="flex items-center gap-2">

          {/* Optional Badge */}
          {badge && (
            <span
              className="
                bg-indigo-100 text-indigo-600
                dark:bg-indigo-500/20 dark:text-indigo-400
                px-3 py-1 rounded-full
                text-xs font-medium
              "
            >
              {badge}
            </span>
          )}

          {/* Optional Trend */}
          {typeof trend === "number" && (
            <span
              className={`text-xs font-medium ${
                trendPositive
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {trendPositive ? "▲" : "▼"} {trend}%
            </span>
          )}

        </div>

      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  badge: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  trend: PropTypes.number,
  trendPositive: PropTypes.bool,
};

export default StatCard;