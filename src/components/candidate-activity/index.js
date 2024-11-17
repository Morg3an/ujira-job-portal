"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({ jobList, jobApplicants }) {
    console.log(jobList, jobApplicants);

    const uniqueStatusArray = [
        ...new Set(
            jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
        ),
    ];

    console.log(uniqueStatusArray);

    return (
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                        Your Activity
                    </h1>
                    <TabsList>
                        {/* Add key prop to each TabsTrigger */}
                        {uniqueStatusArray.map((status, index) => (
                            <TabsTrigger key={index} value={status}>{status}</TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                <div className="pb-24 pt-6">
                    <div className="container mx-auto p-0 space-y-8">
                        <div className="flex flex-col gap-4">
                            {/* Add key prop to each TabsContent */}
                            {uniqueStatusArray.map((status, index) => (
                                <TabsContent key={index} value={status}>
                                    {jobList
                                        .filter(
                                            (jobItem) =>
                                                jobApplicants
                                                    .filter(
                                                        (jobApplication) =>
                                                            jobApplication.status.indexOf(status) > -1
                                                    )
                                                    .findIndex(
                                                        (filteredItemByStatus) =>
                                                            jobItem._id === filteredItemByStatus.jobID
                                                    ) > -1
                                        )
                                        .map((finalFilteredItem, subIndex) => (
                                            <CommonCard
                                                key={subIndex} // Add key prop to CommonCard component
                                                icon={<JobIcon />}
                                                title={finalFilteredItem?.title}
                                                description={finalFilteredItem?.companyName}
                                            />
                                        ))}
                                </TabsContent>
                            ))}
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

export default CandidateActivity;
