import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AccountSettingsForm = ({
  profile,
  setProfile,
  updateProfile,
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div
      className="bg-white dark:bg-slate-950 
                 rounded-2xl shadow-lg 
                 border dark:border-slate-800 
                 p-6 space-y-5"
    >
      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        value={profile.name || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            name: e.target.value,
          })
        }
        className="w-full px-4 py-2 rounded-xl border 
                   bg-gray-50 dark:bg-slate-900
                   dark:border-slate-800"
      />

      {/* Password with Toggle */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={profile.password || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              password: e.target.value,
            })
          }
          className="w-full px-4 py-2 pr-12 rounded-xl border 
                     bg-gray-50 dark:bg-slate-900
                     dark:border-slate-800"
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={updateProfile}
        className="bg-indigo-600 hover:bg-indigo-700 
                   text-white px-4 py-2 rounded-xl"
      >
        Update Profile
      </button>
    </div>
  );
};

export default AccountSettingsForm;