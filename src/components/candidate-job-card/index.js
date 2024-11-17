"use client"

import { Fragment, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
  
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createJobApplicationAction } from "@/actions";


function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
    const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);



    async function handleJobApply() {
        await createJobApplicationAction({
            employerUserID : jobItem?.employerId,
            name : profileInfo?.candidateInfo?.name,
            email : profileInfo?.email,
            candidateUserID : profileInfo?.userId,
            status : ['Applied'],
            jobID : jobItem?._id,
            jobAppliedDate : new Date().toLocaleDateString(),
        }, '/jobs');
        setShowJobDetailsDrawer(false);
    }


    return(
        <Fragment>
            <Drawer open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>
                <CommonCard 
                    icon={<JobIcon />}
                    title={jobItem?.title}
                    description={jobItem?.companyName}
                    footerContent = {
                        <Button
                        onClick={() => setShowJobDetailsDrawer(true)}
                        className=" dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                        >
                        View Details
                        </Button>
                    }
                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between">
                            <DrawerTitle className="text-4xl dark:text-white font-extrabold text-gray-800">{jobItem?.title}</DrawerTitle>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleJobApply}
                                    className=" dark:bg-[#fffa27] disabled:opacity-65 flex h-11 items-center justify-center px-5"
                                    disabled = {
                                        jobApplications.findIndex((item) => item.jobID === jobItem?._id) > -1 
                                        ? true 
                                        : false
                                    }
                                >
                                    {
                                        jobApplications.findIndex((item) => item.jobID === jobItem?._id) > -1 
                                        ? "Applied" 
                                        : "Apply"
                                    }
                                </Button>
                                <Button
                                    onClick={() => setShowJobDetailsDrawer(false)}
                                    className=" dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl dark:text-white font-medium text-gray-600">
                        {
                            jobItem?.description
                        }
                        <span className="text-xl dark:text-white ml-4 font-normal text-gray-500">{jobItem?.location}</span>
                    </DrawerDescription>
                    <div className="w-[150px] mt-6 flex justify-center dark:bg-white items-center h-[40px] bg-black rounded-[4px]">
                        <h2 className="text-xl dark:text-black font-bold text-white">{jobItem?.type}</h2>
                    </div>
                    <h3 className="text-2xl dark:text-white font-medium text-black mt-3">Experience: {jobItem?.experience}</h3>
                    <div className="flex gap-4 mt-6">
                        {
                            jobItem?.skills.split(',').map((skillItem) => (
                                <div className="w-[100px] flex justify-center items-center h-[35px] dark:bg-white bg-black rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white dark:text-black">{skillItem}</h2>
                                </div>
                            ))
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </Fragment>
    );
}


export default CandidateJobCard;