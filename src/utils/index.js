import qs from "query-string";

export const employerOnboardFormControls = [
    {
        label: 'Name',
        name: 'name',
        placeholder: "Enter your name",
        componentType: "input"
    },
    {
        label: 'Company Name',
        name: 'companyName',
        placeholder: "Enter your company name",
        componentType: "input"
    },
    {
        label: 'Company Role',
        name: 'companyRole',
        placeholder: "Enter your company role",
        componentType: "input"
    },

]

export const initialEmployerFormData = {
    name: '',
    companyName: '',
    companyRole: ''
}

export const candidateOnboardFormControls = [
    {
        label: 'Resume',
        name: 'resume',
        componentType: "file",
    },
    {
        label: 'Name',
        name: 'name',
        placeholder: "Enter your name",
        componentType: "input",
    },
    {
        label: 'Current Company',
        name: 'currentCompany',
        placeholder: "Enter your current company",
        componentType: "input",
    },
    {
        label: 'Current Job Location',
        name: 'currentJobLocation',
        placeholder: "Enter your current job location",
        componentType: "input",
    },
    {
        label: 'Preferred Job Location',
        name: 'preferredJobLocation',
        placeholder: "Enter your preferred job location",
        componentType: "input",
    },
    {
        label: 'Current Salary',
        name: 'currentSalary',
        placeholder: "Enter your current salary",
        componentType: "input",
    },
    {
        label: 'Notice Period',
        name: 'noticePeriod',
        placeholder: "Enter your notice period",
        componentType: "input",
    },
    {
        label: 'Skills',
        name: 'skills',
        placeholder: "Enter your skills",
        componentType: "input",
    },
    {
        label: 'KNDI practicing license',
        name: 'kndiCredential',
        componentType: "file",
    },
    {
        label: 'Previous Companies',
        name: 'previousCompanies',
        placeholder: "Enter your previous companies",
        componentType: "input",
    },
    {
        label: 'Total Experience',
        name: 'totalExperience',
        placeholder: "Enter your total experience",
        componentType: "input",
    },
    {
        label: 'College/University',
        name: 'collegeUniversity',
        placeholder: "Enter your college/university",
        componentType: "input",
    },
    {
        label: 'College/University Location',
        name: 'collegeUniversityLocation',
        placeholder: "Enter your college/university location",
        componentType: "input",
    },
    {
        label: "Graduation Year",
        name: 'graduationYear',
        placeholder: "Enter your graduation year",
        componentType: "input",
    },
    {
        label: 'LinkedIn Profile',
        name: 'linkedinProfile',
        placeholder: "Enter your linkedin profile",
        componentType: "input",
    },
]

export const initialCandidateFormData = {
    resume: '',
    name: '',
    currentCompany: '',
    currentJobLocation: '',
    preferredJobLocation: '',
    currentSalary: '',
    noticePeriod: '',
    skills: '',
    kndiCredential: '',
    previousCompanies: '',
    totalExperience: '',
    collegeUniversity: '',
    collegeUniversityLocation: '',
    graduationYear: '',
    linkedinProfile: ''
};

export const initialCandidateAccountFormData = {
    name: "",
    currentJobLocation: "",
    preferedJobLocation: "",
    currentSalary: "",
    noticePeriod: "",
    skills: "",
    currentCompany: "",
    kndiCredential: "",
    previousCompanies: "",
    totalExperience: "",
    collegeUniversity: "",
    collegeUniversityLocation: "",
    graduatedYear: "",
    linkedinProfile: "",
};

export const postNewJobFormControls = [
    {
        label: 'Company Name',
        name: 'companyName',
        placeholder: "Company Name",
        componentType: "input",
        disabled: true,
    },
    {
        label: 'Title',
        name: 'title',
        placeholder: "Job Title",
        componentType: "input",
    },
    {
        label: "Type",
        name: "type",
        placeholder: "Job Type",
        componentType: "input",
    },
    {
        label: "Location",
        name: "location",
        placeholder: "Job Location",
        componentType: "input",
    },
    {
        label: "Experience",
        name: "experience",
        placeholder: "Experience",
        componentType: "input",
    },
    {
        label: "Description",
        name: "description",
        placeholder: "Description",
        componentType: "input",
    },
    {
        label: "Skills",
        name: "skills",
        placeholder: "Skills",
        componentType: "input",
    },
    {
        label: 'Application Link',
        name: 'applicationLink',
        placeholder: 'Application Link',
        componentType: 'input',
        type: 'url',
        //required: true,
    },
];

export const initialPostNewJobFormData = {
    companyName: '',
    title: '',
    type: '',
    location: '',
    experience: '',
    description: '',
    skills: '',
    applicationLink: '',
};

export const filterMenuDataArray = [
    {
        id: 'companyName',
        label: 'Company Name'
    },
    {
        id: 'title',
        label: 'Title'
    },
    {
        id: 'type',
        label: 'Type'
    },
    {
        id: 'location',
        label: 'Location'
    }
];

export function formUrlQuery({ params, dataToAdd }) {
    let currentURL = qs.parse(params);

    if (Object.keys(dataToAdd).length > 0) {
        Object.keys(dataToAdd).map((key) => {
            if (dataToAdd[key].length === 0) delete currentURL[key];
            else currentURL[key] = dataToAdd[key].join(",");
        });
    }

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentURL,
        },
        {
            skipNull: true,
        }
    );
}


export const membershipPlans = [
    {
        heading: "Tier 1",
        price: 500,
        type: "Basic",
    },
    {
        heading: "Tier 2",
        price: 1000,
        type: "Silver",
    },
    {
        heading: "Tier 3",
        price: 5000,
        type: "Gold",
    },
];