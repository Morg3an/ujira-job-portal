"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogHeader } from "../ui/dialog";
import { DialogContent, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";


function PostNewJob({ profileInfo, user }) {

    const [showJobDialog, setShowJobDialog] = useState(false);
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName : profileInfo?.employerInfo?.companyName
    });

    

    function handlePostNewBtnValid() {
        return Object.keys(jobFormData).every((control) => jobFormData[control] !== "")
        
    }

    async function createNewJob() {
        await postNewJobAction({
            ...jobFormData,
            employerId: user?.id,
            applicants : []
        }, '/jobs');

        setJobFormData({
            ...initialPostNewJobFormData,
            companyName : profileInfo?.employerInfo?.companyName,
        })
        setShowJobDialog(false);
    }


    return(
        <div className="">
            <Button
                className="disabled:opacity-50 flex h-11 items-center justify-center px-5"
                onClick={() => setShowJobDialog(true)}
            >
                Post A Job
            </Button>
            <Dialog 
                open={showJobDialog} 
                onOpenChange={() => {
                    setShowJobDialog(false);
                    setJobFormData({
                        ...initialPostNewJobFormData,
                        companyName : profileInfo?.employerInfo?.companyName
                    });
                }
                }
            >
                <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Post New Job
                            <div className="grid gap-4 py-4">
                                <CommonForm 
                                    buttonText={'Add Job'}
                                    formData={jobFormData}
                                    setFormData={setJobFormData}
                                    formControls={postNewJobFormControls}
                                    isBtnDisabled={!handlePostNewBtnValid()}
                                    action={createNewJob}
                                />
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );

}

export default PostNewJob;