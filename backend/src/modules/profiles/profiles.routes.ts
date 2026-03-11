import { Router } from 'express';
import { authenticate, uploadAvatar, uploadCV, uploadLogo } from '../../middlewares';
import { isCandidate, isRecruiter } from '../../middlewares/role.middleware';
import {
  // Candidate Profile
  createCandidateProfile,
  getCandidateProfile,
  getCandidateProfileById,
  updateCandidateProfile,
  updateCandidateAvatar,
  uploadCandidateCv,
  deleteCandidateProfile,
  // Recruiter Profile
  createRecruiterProfile,
  getRecruiterProfile,
  getRecruiterProfileById,
  updateRecruiterProfile,
  updateRecruiterLogo,
  deleteRecruiterProfile,
  // Experience
  addExperience,
  updateExperience,
  deleteExperience,
  // Education
  addEducation,
  updateEducation,
  deleteEducation,
  // Language
  addLanguage,
  updateLanguage,
  deleteLanguage,
} from './controllers';

const profilesRouter = Router();

// ==================== CANDIDATE PROFILE ROUTES ====================

// Create, Read, Update, Delete candidate profile (Protected - CANDIDATE only)
profilesRouter.post('/candidate', authenticate, isCandidate, createCandidateProfile);
profilesRouter.get('/candidate', authenticate, isCandidate, getCandidateProfile);
profilesRouter.put('/candidate', authenticate, isCandidate, updateCandidateProfile);
profilesRouter.patch('/candidate/avatar', authenticate, isCandidate, uploadAvatar, updateCandidateAvatar);
profilesRouter.patch('/candidate/cv', authenticate, isCandidate, uploadCV, uploadCandidateCv);
profilesRouter.delete('/candidate', authenticate, isCandidate, deleteCandidateProfile);

// Public candidate profile
profilesRouter.get('/candidate/:id', getCandidateProfileById);

// ==================== EXPERIENCE ROUTES (CANDIDATE ONLY) ====================
profilesRouter.post('/candidate/experience', authenticate, isCandidate, addExperience);
profilesRouter.put('/candidate/experience/:id', authenticate, isCandidate, updateExperience);
profilesRouter.delete('/candidate/experience/:id', authenticate, isCandidate, deleteExperience);

// ==================== EDUCATION ROUTES (CANDIDATE ONLY) ====================
profilesRouter.post('/candidate/education', authenticate, isCandidate, addEducation);
profilesRouter.put('/candidate/education/:id', authenticate, isCandidate, updateEducation);
profilesRouter.delete('/candidate/education/:id', authenticate, isCandidate, deleteEducation);

// ==================== LANGUAGE ROUTES (CANDIDATE ONLY) ====================
profilesRouter.post('/candidate/language', authenticate, isCandidate, addLanguage);
profilesRouter.put('/candidate/language/:id', authenticate, isCandidate, updateLanguage);
profilesRouter.delete('/candidate/language/:id', authenticate, isCandidate, deleteLanguage);

// ==================== RECRUITER PROFILE ROUTES ====================

// Create, Read, Update, Delete recruiter profile (Protected - RECRUITER only)
profilesRouter.post('/recruiter', authenticate, isRecruiter, createRecruiterProfile);
profilesRouter.get('/recruiter', authenticate, isRecruiter, getRecruiterProfile);
profilesRouter.put('/recruiter', authenticate, isRecruiter, updateRecruiterProfile);
profilesRouter.patch('/recruiter/logo', authenticate, isRecruiter, uploadLogo, updateRecruiterLogo);
profilesRouter.delete('/recruiter', authenticate, isRecruiter, deleteRecruiterProfile);

// Public recruiter profile
profilesRouter.get('/recruiter/:id', getRecruiterProfileById);

export default profilesRouter;
