"use server"

import connectToDB from "@/database"
import Profile from "@/models/profile";
import Application from "@/models/application";
import Feed from "@/models/feed";
import Job from "@/models/job";
import { revalidatePath } from "next/cache";


const stripe = require('stripe')(
    "sk_test_51QLxG0AlEPonyFJmx5CQ5CFzYOSVCdIzOSmlw03NDRQboQd10UJ139LF7Jm05q8T3R0KaeyhtmoU6kZ6RUhBsruF003kI0lZHl"

)
// Create profile action
export async function createProfileAction(formData, pathToReValidate) {
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToReValidate);
}

export async function fetchProfileAction(id) {
    await connectToDB();
    const result = await Profile.findOne({ userId: id });

    return JSON.parse(JSON.stringify(result));
}


// Create a job action
export async function postNewJobAction(formData, pathToReValidate) {
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToReValidate);
}



//Fetch job action
//recruiter
export async function fetchJobsForEmployerAction(id) {
    await connectToDB();
    const result = await Job.find({ employerId: id })

    return JSON.parse(JSON.stringify(result));
}


//candidate
export async function fetchJobsForCandidateAction(filterParams = {}) {
    await connectToDB();
    let updatedParams = {};
    Object.keys(filterParams).forEach((filterKey) => {
        updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
    });
    console.log(updatedParams, "updatedParams");
    const result = await Job.find(
        filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
    );

    return JSON.parse(JSON.stringify(result))
}

//.sort({ createdAt: -1 });

// Create a job application action
export async function createJobApplicationAction(data, pathToReValidate) {
    await connectToDB();

    const result = await Application.create(data);;
    revalidatePath(pathToReValidate);
}


// Fetch job application - candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
    await connectToDB();
    const result = await Application.find({ candidateUserID: candidateID });
    return JSON.parse(JSON.stringify(result));
}


// Fetch job application - employer
export async function fetchJobApplicationsForEmployer(employerID) {
    await connectToDB();
    const result = await Application.find({ employerUserID: employerID });

    return JSON.parse(JSON.stringify(result));
}

//update job application
export async function updateJobApplicationAction(data, pathToReValidate) {
    await connectToDB();
    const {
        employerUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        _id,
        jobAppliedDate,
    } = data;

    await Application.findOneAndUpdate({
        _id: _id,
    }, {
        employerUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        jobAppliedDate,
    }, { new: true })
    revalidatePath(pathToReValidate)
}

// get candidate details by candidateID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
    await connectToDB();
    console.log("Querying candidate profile for ID:", currentCandidateID);
    const result = await Profile.findOne({ userId: currentCandidateID });
    console.log("Query result:", result);
    return JSON.parse(JSON.stringify(result));
}

// Create filter categories
export async function createFilterCategoriesAction() {
    await connectToDB();
    const result = await Job.find({});

    return JSON.parse(JSON.stringify(result));
}


// Update profile action
export async function updateProfileAction(data, pathToRevalidate) {
    await connectToDB();
    const {
        userId,
        role,
        email,
        isPremiumUser,
        memberShipType,
        memberShipStartDate,
        memberShipEndDate,
        employerInfo,
        candidateInfo,
        _id,
    } = data;

    await Profile.findOneAndUpdate(
        {
            _id: _id,
        },
        {
            userId,
            role,
            email,
            isPremiumUser,
            memberShipType,
            memberShipStartDate,
            memberShipEndDate,
            employerInfo,
            candidateInfo,
        },
        { new: true }
    );

    revalidatePath(pathToRevalidate);
}



// Create stripe price id based on tier selection
export async function createPriceIdAction(data) {
    const session = await stripe.prices.create({
        currency: "php",
        unit_amount: data?.amount * 100,
        recurring: {
            interval: "year",
        },
        product_data: {
            name: "Premium Plan",
        },
    });

    return {
        success: true,
        id: session?.id,
    };
}



// Create payment logic
export async function createStripePaymentAction(data) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: data?.lineItems,
        mode: "subscription",
        success_url: `${process.env.URL}/membership` + "?status=success",
        cancel_url: `${process.env.URL}/membership` + "?status=cancel",
    });

    return {
        success: true,
        id: session?.id,
    };
}


// Create post action
export async function createFeedPostAction(data, pathToRevalidate) {
    await connectToDB();
    await Feed.create(data);
    revalidatePath(pathToRevalidate);
}



//  Fetch all posts action
export async function fetchAllFeedPostsAction() {
    await connectToDB();
    const result = await Feed.find({});

    return JSON.parse(JSON.stringify(result));
}

// Update post action
export async function updateFeedPostAction(data, pathToRevalidate) {
    await connectToDB();
    const { userId, userName, message, image, likes, _id } = data;
    await Feed.findOneAndUpdate(
        {
            _id: _id,
        },
        {
            userId,
            userName,
            image,
            message,
            likes,
        },
        { new: true }
    );

    revalidatePath(pathToRevalidate);
}