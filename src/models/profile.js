const { default: mongoose } = require("mongoose");



const ProfileSchema = new mongoose.Schema({
    userId : String,
    role : String,
    email : String,
    isPremiumUser : String,
    memberShipType : String,
    memberShipStartDate : String,
    memberShipEndDate : String,
    employerInfo : {
        name : String,
        companyName : String,
        companyRole : String
    }, 
    candidateInfo : {
        name : String,
        currentCompany : String,
        currentJobLocation : String,
        preferredJobLocation : String,
        currentSalary : String,
        noticePeriod : String,
        skills : String,
        kndiCredential : String,
        previousCompanies : String,
        totalExperience : String,
        collegeUniversity : String,
        collegeUniversityLocation : String,
        graduationYear : String,
        linkedinProfile : String,
        resume : String
    }
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

export default Profile;