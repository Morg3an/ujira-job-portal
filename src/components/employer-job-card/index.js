"use client"

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";
//import JobApplicants from "../job-applicants";



function EmployerJobCard({ jobItem, jobApplications }) {


  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal] = useState(false);
  

  return (
        <div className="">
            <CommonCard 
                icon={<JobIcon />}
                title={jobItem.title}
                footerContent={
                    <Button
                      onClick={() => setShowApplicantsDrawer(true)}
                      className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
                      disabled={
                        jobApplications.filter((item) => item.jobID === jobItem?._id)
                          .length === 0
                      }
                    >
                      {jobApplications.filter((item) => item.jobID === jobItem?._id).length}{" "} Applications
                    </Button>
                }
            />
            <JobApplicants 
              showApplicantsDrawer={showApplicantsDrawer}
              setShowApplicantsDrawer={setShowApplicantsDrawer}
              currentCandidateDetails={currentCandidateDetails}
              setCurrentCandidateDetails={setCurrentCandidateDetails}
              showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
              setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
              jobItem={jobItem}
              jobApplications={jobApplications.filter((jobApplicationItem) => 
                jobApplicationItem.jobID === jobItem?._id
              )}
            />
        </div>
  );
}

export default EmployerJobCard;


{/* 


     <JobApplicants
                  showApplicantsDrawer={showApplicantsDrawer}
                  setShowApplicantsDrawer={setShowApplicantsDrawer}
                  showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                  setShowCurrentCandidateDetailsModal={
                    setShowCurrentCandidateDetailsModal
                  }
                  currentCandidateDetails={currentCandidateDetails}
                  setCurrentCandidateDetails={setCurrentCandidateDetails}
                  jobItem={jobItem}
                  jobApplications={jobApplications.filter(
                    (jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id
                  )}
      />
*/}