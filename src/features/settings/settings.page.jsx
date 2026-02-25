/**
 * SettingsPage
 *
 * Feature Entry Point
 */

import { useState } from "react";
import { useSettings } from "./hooks/useSettings";
import SettingsHeader from "./components/SettingsHeader";
import SettingsTabs from "./components/SettingsTabs";
import CompanySettingsForm from "./components/CompanySettingsForm";
import AccountSettingsForm from "./components/AccountSettingsForm";
import SettingsSkeleton from "./components/SettingsSkeleton";

const SettingsPage = () => {
  const {
    company,
    setCompany,
    profile,
    setProfile,
    updateCompany,
    updateProfile,
    loading,
  } = useSettings();

  const [activeTab, setActiveTab] =
    useState("company");

  if (loading) return <SettingsSkeleton />;

  return (
    <div className="space-y-8">

      <SettingsHeader />

      <SettingsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "company" ? (
        <CompanySettingsForm
          company={company}
          setCompany={setCompany}
          updateCompany={updateCompany}
        />
      ) : (
        <AccountSettingsForm
          profile={profile}
          setProfile={setProfile}
          updateProfile={updateProfile}
        />
      )}

    </div>
  );
};

export default SettingsPage;