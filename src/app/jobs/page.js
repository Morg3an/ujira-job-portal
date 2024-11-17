import { fetchJobsForCandidateAction, fetchJobsForEmployerAction, fetchProfileAction, fetchJobApplicationsForEmployer, fetchJobApplicationsForCandidate, createFilterCategoriesAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";


async function JobsPage({ searchParams }) {
    console.log(searchParams, "Search Parameters");

    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

    const jobList = profileInfo?.role === "candidate"
        ? await fetchJobsForCandidateAction(searchParams)
        : await fetchJobsForEmployerAction(user?.id);

    const getJobApplicationList = profileInfo?.role === "candidate"
        ? await fetchJobApplicationsForCandidate(user?.id)
        : await fetchJobApplicationsForEmployer(user?.id);

    const fetchFilterCategories = await createFilterCategoriesAction();

    return (
        <JobListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
            jobApplications={getJobApplicationList}
            filterCategories={fetchFilterCategories}
        />
    );
}

export default JobsPage;