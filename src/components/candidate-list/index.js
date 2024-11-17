"use client"

import { Fragment } from "react";
import { Button } from "../ui/button";
import { getCandidateDetailsByIDAction, updateJobApplicationAction } from "@/actions";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";



const supabaseClient = createClient(
    'https://jxypspeijvdwiiqfqwzo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4eXBzcGVpanZkd2lpcWZxd3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NjQ2ODMsImV4cCI6MjA0NzI0MDY4M30.QqPDsMdYOyEJyYAzp54IydIsTI1Eo8mPy7eeYm7NtLA'
);


function CandidateList({
    jobApplications,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
}) {

    async function handleFetchCandidateDetails(getCurrentCandidateId) {
        console.log("Fetching details for candidate ID:", getCurrentCandidateId);
        const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);

        if (data) {
            console.log("Setting currentCandidateDetails:", data);
            setCurrentCandidateDetails(data);
            setShowCurrentCandidateDetailsModal(true)
        }


        /* useEffect(() => { 
            console.log(currentCandidateDetails); 
        }, [currentCandidateDetails]); */


    }

    console.log("Current Candidate Details", currentCandidateDetails);
    useEffect(() => {
        if (currentCandidateDetails) {
            console.log("Updated Current Candidate Details:", currentCandidateDetails);
        }
    }, [currentCandidateDetails]);


    function handlePreviewResume(currentCandidateDetails) {
        const { data } = supabaseClient.storage.from("ujira-job-portal").getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)

        console.log("resume", data);
        const a = document.createElement('a');
        a.href = data?.publicUrl;
        a.setAttribute('download', 'Resume.pdf');
        a.setAttribute('target', '_blank');
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
    }

    function handlePreviewKndiCredential(currentCandidateDetails) {
        console.log("Current Candidate Details:", currentCandidateDetails);

        const { data } = supabaseClient.storage.from('ujira-job-portal').getPublicUrl(currentCandidateDetails?.candidateInfo?.kndiCredential)

        console.log("KNDI credential", data);
        const a = document.createElement('a');
        a.href = data?.publicUrl;
        a.setAttribute('download', 'KNDI credential.pdf');
        a.setAttribute('target', '_blank');
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);

        /* const resumePath = currentCandidateDetails?.candidateInfo?.kndiCredential;

        if (!resumePath) {
            console.error("Resume path is undefined or invalid.");
            return;
        }

        const { data, error } = supabaseClient.storage
            .from("ujira-job-portal")
            .getPublicUrl(resumePath);

        if (error || !data?.publicUrl) {
            console.error("Error generating public URL for resume:", error);
            return;
        }   

        console.log("Resume Public URL:", data.publicUrl);
        triggerDownload(data.publicUrl, "Resume.pdf"); */
    }

    async function handleUpdateJobStatus(getCurrentStatus) {
        let cpyJobApplicants = [...jobApplications];
        const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex((item) =>
            item.candidateUserID === currentCandidateDetails?.userId
        );

        const jobApplicantsToUpdate = {
            ...cpyJobApplicants[indexOfCurrentJobApplicant],
            status: cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus)
        }
        console.log("Job Aplicants to update", jobApplicantsToUpdate);
        await updateJobApplicationAction(jobApplicantsToUpdate, '/jobs')
    }




    return (
        <Fragment>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {jobApplications && jobApplications.length > 0
                    ? jobApplications.map((jobApplicantItem) => (
                        <div key={jobApplicantItem?.candidateUserID} className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                            <div className="px-4 my-6 flex justify-between items-center">
                                <h3 className="text-lg font-bold dark:text-black">
                                    {jobApplicantItem?.name}
                                </h3>
                                <Button
                                    onClick={() => handleFetchCandidateDetails(jobApplicantItem?.candidateUserID)}
                                    className="dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                                >
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    ))
                    : null}

            </div>
            <Dialog
                open={showCurrentCandidateDetailsModal}
                onOpenChange={() => {
                    setShowCurrentCandidateDetailsModal(false);
                    setCurrentCandidateDetails(null);
                }}
            >
                <DialogContent>
                    <div>
                        <h1 className="text-2xl dark:text-white font-bold text-black">
                            {currentCandidateDetails?.candidateInfo?.name}, {" "}
                            {currentCandidateDetails?.email}
                        </h1>
                        <p className="text-xl dark:text-white font-medium text-black">
                            {currentCandidateDetails?.candidateInfo?.currentCompany}
                        </p>
                        <p className="text-sm dark:text-white font-normal text-black">
                            {currentCandidateDetails?.candidateInfo?.currentJobLocation}
                        </p>
                        <p className="dark:text-white">
                            Total Experience: {currentCandidateDetails?.candidateInfo?.totalExperience}
                        </p>
                        <p className="dark:text-white">
                            Salary: Ksh.{currentCandidateDetails?.candidateInfo?.currentSalary}
                        </p>
                        <p className="dark:text-white">
                            Notice Period: {currentCandidateDetails?.candidateInfo?.noticePeriod}
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <h1 className="dark:text-white">Previous Companies: </h1>
                            <div className="flex flex-wrap items-center gap-4 mt-6">
                                {
                                    currentCandidateDetails?.candidateInfo?.previousCompanies.split(',').map((skillItem, index) => (
                                        <div key={index} className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                            <h2 className="text-[13px] dark:text-black font-medium text-white">{skillItem}</h2>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6">
                            {
                                currentCandidateDetails?.candidateInfo?.skills.split(',').map((skillItem, index) => (
                                    <div key={index} className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                        <h2 className="text-[13px] dark:text-black font-medium text-white">{skillItem}</h2>
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => handlePreviewResume(currentCandidateDetails)}
                            className=" dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                        >
                            Resume
                        </Button>
                        <Button
                            onClick={() => handlePreviewKndiCredential(currentCandidateDetails)}
                            className=" dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                        >
                            KNDI credential
                        </Button>
                        <Button
                            onClick={() => handleUpdateJobStatus('selected')}
                            className=" dark:bg-[#fffa27] disabled:opacity-65 flex h-11 items-center justify-center px-5"
                            disabled={
                                jobApplications.find((item) => item.candidateUserID === currentCandidateDetails?.userId)?.status.includes('selected') ||
                                    jobApplications
                                        .find(
                                            (item) =>
                                                item.candidateUserID === currentCandidateDetails?.userId
                                        )
                                        ?.status.includes("rejected")
                                    ? true
                                    : false
                            }
                        >
                            {
                                jobApplications.find((item) => item.candidateUserID === currentCandidateDetails?.userId)?.status.includes('selected')
                                    ? 'Selected'
                                    : 'Select'
                            }
                        </Button>
                        <Button onClick={() => handleUpdateJobStatus('rejected')} className=" dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                            disabled={
                                jobApplications
                                    .find(
                                        (item) =>
                                            item.candidateUserID === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes("selected") ||
                                    jobApplications
                                        .find(
                                            (item) =>
                                                item.candidateUserID === currentCandidateDetails?.userId
                                        )
                                        ?.status.includes("rejected")
                                    ? true
                                    : false
                            }
                        >
                            {
                                jobApplications
                                    .find(
                                        (item) =>
                                            item.candidateUserID === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes("rejected")
                                    ? "Rejected"
                                    : "Reject"
                            }
                        </Button>
                    </div>
                </DialogContent>
                <DialogFooter>

                </DialogFooter>
            </Dialog>
        </Fragment>

    )
}

export default CandidateList;