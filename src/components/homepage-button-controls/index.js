"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

function HomepageButtonControls({ user, profileInfo }) {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [router]); // Added 'router' to the dependency array

    return (
        <div className="flex space-x-4">
            {/* Button for browsing jobs */}
            <Button
                onClick={() => {
                    if (!user) {
                        router.push("/sign-in");
                    } else {
                        router.push(
                            profileInfo?.role === "candidate"
                                ? "/jobs"
                                : "/jobs-dashboard"
                        );
                    }
                }}
                className="flex h-11 items-center justify-center px-5"
            >
                {user
                    ? profileInfo?.role === "candidate"
                        ? "Browse Jobs"
                        : "Jobs Dashboard"
                    : "Find Jobs"}
            </Button>
            {/* Button for activity or posting jobs */}
            <Button
                onClick={() => {
                    if (!user) {
                        router.push("/sign-in");
                    } else {
                        router.push(
                            profileInfo?.role === "candidate"
                                ? "/activity"
                                : "/post-job"
                        );
                    }
                }}
                className="flex h-11 items-center justify-center px-5"
            >
                {user
                    ? profileInfo?.role === "candidate"
                        ? "Your Activity"
                        : "Post New Job"
                    : "Post New Job"}
            </Button>
        </div>
    );
}

export default HomepageButtonControls;
