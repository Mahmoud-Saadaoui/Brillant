// Candidate Profile Controllers
export {
  createCandidateProfile,
  getCandidateProfile,
  getCandidateProfileById,
  updateCandidateProfile,
  updateCandidateAvatar,
  uploadCandidateCv,
  deleteCandidateProfile,
} from "./candidate.controller.js";

// Recruiter Profile Controllers
export {
  createRecruiterProfile,
  getRecruiterProfile,
  getRecruiterProfileById,
  updateRecruiterProfile,
  updateRecruiterLogo,
  deleteRecruiterProfile,
} from "./recruiter.controller.js";

// Experience Controllers
export {
  addExperience,
  updateExperience,
  deleteExperience,
} from "./experience.controller.js";

// Education Controllers
export {
  addEducation,
  updateEducation,
  deleteEducation,
} from "./education.controller.js";

// Language Controllers
export {
  addLanguage,
  updateLanguage,
  deleteLanguage,
} from "./language.controller.js";
