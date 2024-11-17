"use client";

import {
    candidateOnboardFormControls,
    initialCandidateAccountFormData,
    initialCandidateFormData,
    initialEmployerFormData,
    employerOnboardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

function AccountInfo({ profileInfo }) {
    const [candidateFormData, setCandidateFormData] = useState(
        initialCandidateAccountFormData
    );
    const [employerFormData, setEmployerFormData] = useState(
        initialEmployerFormData
    );

    useEffect(() => {

        if (profileInfo?.role === "employer") {
            const updatedEmployerData = {
                ...initialEmployerFormData,
                ...profileInfo?.employerInfo,
            };
            setEmployerFormData(updatedEmployerData);
        }

        if (profileInfo?.role === "candidate") {
            const updatedCandidateData = {
                ...initialCandidateAccountFormData,
                ...profileInfo?.candidateInfo,
            };
            setCandidateFormData(updatedCandidateData);
        }
    }, [profileInfo]);



    console.log(profileInfo, "candidateFormData", profileInfo);

    async function handleUpdateAccount() {
        await updateProfileAction(
            profileInfo?.role === "candidate"
                ? {
                    _id: profileInfo?._id,
                    userId: profileInfo?.userId,
                    email: profileInfo?.email,
                    role: profileInfo?.role,
                    isPremiumUser: profileInfo?.isPremiumUser,
                    memberShipType: profileInfo?.memberShipType,
                    memberShipStartDate: profileInfo?.memberShipStartDate,
                    memberShipEndDate: profileInfo?.memberShipEndDate,
                    candidateInfo: {
                        ...candidateFormData,
                        resume: profileInfo?.candidateInfo?.resume,
                    },
                }
                : {
                    _id: profileInfo?._id,
                    userId: profileInfo?.userId,
                    email: profileInfo?.email,
                    role: profileInfo?.role,
                    isPremiumUser: profileInfo?.isPremiumUser,
                    memberShipType: profileInfo?.memberShipType,
                    memberShipStartDate: profileInfo?.memberShipStartDate,
                    memberShipEndDate: profileInfo?.memberShipEndDate,
                    employerInfo: {
                        ...employerFormData,
                    },
                },
            "/account"
        );
    }

    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline dark:border-white justify-between pb-6 border-b pt-24">
                <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                    Account Details
                </h1>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <CommonForm
                        action={handleUpdateAccount}
                        formControls={
                            profileInfo?.role === "candidate"
                                ? candidateOnboardFormControls.filter(
                                    (formControl) => formControl.name !== "resume"
                                )
                                : employerOnboardFormControls
                        }
                        formData={
                            profileInfo?.role === "candidate"
                                ? candidateFormData
                                : employerFormData
                        }
                        setFormData={
                            profileInfo?.role === "candidate"
                                ? setCandidateFormData
                                : setEmployerFormData
                        }
                        buttonText="Update Profile"
                    />

                </div>
            </div>
        </div>
    );
}

export default AccountInfo;