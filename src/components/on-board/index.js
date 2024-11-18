"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, employerOnboardFormControls, initialCandidateFormData, initialEmployerFormData } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    'https://jxypspeijvdwiiqfqwzo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4eXBzcGVpanZkd2lpcWZxd3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NjQ2ODMsImV4cCI6MjA0NzI0MDY4M30.QqPDsMdYOyEJyYAzp54IydIsTI1Eo8mPy7eeYm7NtLA'
);

function OnBoard() {

    const [currentTab, setCurrentTab] = useState('candidate');
    const [employerFormData, setEmployerFormData] = useState(initialEmployerFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
    const [file, setFile] = useState(null);

    const currentAuthUser = useUser();
    const { user } = currentAuthUser;

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        event.preventDefault();
        console.log(event.target.files);
    }

    async function handleUploadPdfToSupabase() {
        const { data, error } = await supabaseClient.storage
            .from("ujira-job-portal")
            .upload(`/public/${file.name}`, file, {
                cacheControl: "3600",
                upsert: false,
            });
        console.log(data, error);
        if (data) {
            setCandidateFormData({
                ...candidateFormData,
                resume: data.path,
                kndiCredential: data.path
            });
        }
    }

    useEffect(() => {
        if (file) handleUploadPdfToSupabase();
    }, [file, handleUploadPdfToSupabase]); // Added handleUploadPdfToSupabase to dependency array

    function handleTabChange(value) {
        setCurrentTab(value);
    }

    function handleEmployerFormValid() {
        return employerFormData && employerFormData.name.trim() !== "" && employerFormData.companyName.trim() !== "" && employerFormData.companyRole.trim() !== "";
    }

    function handleCandidateFormValid() {
        const requiredFields = [
            "name", "currentCompany", "currentJobLocation", "preferredJobLocation", "currentSalary",
            "noticePeriod", "skills", "previousCompanies", "totalExperience", "collegeUniversity",
            "collegeUniversityLocation", "graduationYear", "linkedinProfile"
        ];
        return requiredFields.every((field) => candidateFormData[field] && candidateFormData[field].trim() !== "");
    }

    async function createProfile() {
        const data = currentTab === "candidate"
            ? {
                candidateInfo: candidateFormData,
                role: "candidate",
                isPremiumUser: false,
                userId: user?.id,
                email: user?.primaryEmailAddress?.emailAddress,
            }
            : {
                employerInfo: employerFormData,
                role: "employer",
                isPremiumUser: false,
                userId: user?.id,
                email: user?.primaryEmailAddress?.emailAddress,
            };

        await createProfileAction(data, "/onboard");
    }

    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Welcome to onboarding
                        </h1>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="employer">Employer</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                    <CommonForm
                        action={createProfile}
                        formControls={candidateOnboardFormControls}
                        buttonText={"Onboard as a candidate"}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                        isBtnDisabled={!handleCandidateFormValid()}
                        handleFileChange={handleFileChange}
                    />
                </TabsContent>
                <TabsContent value="employer">
                    <CommonForm
                        formControls={employerOnboardFormControls}
                        buttonText={"Onboard as an employer"}
                        formData={employerFormData}
                        setFormData={setEmployerFormData}
                        isBtnDisabled={!handleEmployerFormValid()}
                        action={createProfile}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default OnBoard;
