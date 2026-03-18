// Mock data for the entire application

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  photo?: string;
  initials: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  images: string[];
}

export interface LibraryItem {
  id: string;
  title: string;
  category: 'past-paper' | 'book' | 'notes';
  fileType: 'pdf' | 'docx';
  subject: string;
  classLevel: string;
  fileUrl: string;
  uploadDate: string;
}

export interface TimetableEntry {
  period: number;
  time: string;
  subject: string;
  teacher: string;
}

export interface TimetableDay {
  day: string;
  entries: TimetableEntry[];
}

export interface StudentResult {
  id: string;
  name: string;
  rollNumber: string;
  photo?: string;
  initials: string;
  className: string;
  examType: string;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  position: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export const mockTeachers: Teacher[] = [
  { id: '1', name: 'Muhammad Arif Khan', subject: 'Mathematics', qualification: 'M.Sc Mathematics', experience: '15 years', initials: 'MA' },
  { id: '2', name: 'Syed Rahim Shah', subject: 'Physics', qualification: 'M.Sc Physics', experience: '12 years', initials: 'SR' },
  { id: '3', name: 'Abdul Wahab', subject: 'Chemistry', qualification: 'M.Sc Chemistry', experience: '10 years', initials: 'AW' },
  { id: '4', name: 'Muhammad Ismail', subject: 'English', qualification: 'M.A English', experience: '8 years', initials: 'MI' },
  { id: '5', name: 'Fazal Rahim', subject: 'Urdu', qualification: 'M.A Urdu', experience: '14 years', initials: 'FR' },
  { id: '6', name: 'Zahid Khan', subject: 'Islamiat', qualification: 'M.A Islamiat', experience: '11 years', initials: 'ZK' },
  { id: '7', name: 'Noor Muhammad', subject: 'Computer Science', qualification: 'M.Sc Computer Science', experience: '6 years', initials: 'NM' },
  { id: '8', name: 'Tariq Mehmood', subject: 'Biology', qualification: 'M.Sc Biology', experience: '9 years', initials: 'TM' },
];

export const mockNotices: Notice[] = [
  { id: '1', title: 'Annual Examination Schedule 2026', content: 'Annual examinations for classes 6-10 will commence from April 15, 2026. Detailed schedule is available at the school office.', date: '2026-03-15', priority: 'high' },
  { id: '2', title: 'Parent-Teacher Meeting', content: 'Parents are invited for a meeting on March 25, 2026 at 10:00 AM to discuss student progress.', date: '2026-03-12', priority: 'medium' },
  { id: '3', title: 'Sports Day Announcement', content: 'Annual Sports Day will be held on April 5, 2026. All students must participate in at least one event.', date: '2026-03-10', priority: 'medium' },
  { id: '4', title: 'Fee Submission Deadline', content: 'Last date for fee submission for the current semester is March 31, 2026.', date: '2026-03-08', priority: 'high' },
  { id: '5', title: 'Science Fair Registration', content: 'Students interested in participating in the Science Fair can register by March 20, 2026.', date: '2026-03-05', priority: 'low' },
];

export const mockNews: NewsItem[] = [
  { id: '1', title: 'GHS Babi Khel Students Excel in Board Exams', excerpt: 'Our students achieved remarkable results with 98% pass rate in the recent BISE Peshawar examinations.', content: 'Full article content...', date: '2026-03-10' },
  { id: '2', title: 'New Computer Lab Inaugurated', excerpt: 'State-of-the-art computer lab with 30 systems inaugurated for students of all classes.', content: 'Full article content...', date: '2026-03-05' },
  { id: '3', title: 'Inter-School Quiz Competition Victory', excerpt: 'Our students won first position in the district-level quiz competition held in Peshawar.', content: 'Full article content...', date: '2026-02-28' },
  { id: '4', title: 'Tree Plantation Drive', excerpt: 'School organized a tree plantation drive in which students planted over 200 saplings.', content: 'Full article content...', date: '2026-02-20' },
];

export const mockAlbums: Album[] = [
  { id: '1', name: 'Annual Day 2026', description: 'Celebrations from our Annual Day ceremony', coverImage: '', images: [] },
  { id: '2', name: 'Science Fair 2025', description: 'Student projects and innovations', coverImage: '', images: [] },
  { id: '3', name: 'Sports Day 2025', description: 'Highlights from the annual sports competition', coverImage: '', images: [] },
  { id: '4', name: 'Campus Life', description: 'Day-to-day life at GHS Babi Khel', coverImage: '', images: [] },
];

export const mockLibrary: LibraryItem[] = [
  { id: '1', title: 'Mathematics Past Paper 2025 - 10th Class', category: 'past-paper', fileType: 'pdf', subject: 'Mathematics', classLevel: '10th', fileUrl: '#', uploadDate: '2026-02-15' },
  { id: '2', title: 'Physics Notes Chapter 1-5', category: 'notes', fileType: 'pdf', subject: 'Physics', classLevel: '9th', fileUrl: '#', uploadDate: '2026-02-10' },
  { id: '3', title: 'English Grammar Guide', category: 'book', fileType: 'pdf', subject: 'English', classLevel: 'All', fileUrl: '#', uploadDate: '2026-01-20' },
  { id: '4', title: 'Chemistry Past Paper 2025 - 9th Class', category: 'past-paper', fileType: 'pdf', subject: 'Chemistry', classLevel: '9th', fileUrl: '#', uploadDate: '2026-02-12' },
  { id: '5', title: 'Urdu Literature Notes', category: 'notes', fileType: 'docx', subject: 'Urdu', classLevel: '10th', fileUrl: '#', uploadDate: '2026-01-15' },
];

const periods = [
  { period: 1, time: '8:00 - 8:40' },
  { period: 2, time: '8:40 - 9:20' },
  { period: 3, time: '9:20 - 10:00' },
  { period: 4, time: '10:00 - 10:40' },
  { period: 5, time: '10:40 - 11:00' },
  { period: 6, time: '11:00 - 11:40' },
  { period: 7, time: '11:40 - 12:20' },
  { period: 8, time: '12:20 - 1:00' },
];

export const mockTimetables: Record<string, TimetableDay[]> = {
  '6th': [
    { day: 'Monday', entries: periods.map((p, i) => ({ ...p, subject: ['Math', 'English', 'Urdu', 'Science', 'Break', 'Islamiat', 'Social Studies', 'PT'][i], teacher: ['M. Arif', 'M. Ismail', 'F. Rahim', 'T. Mehmood', '-', 'Z. Khan', 'A. Wahab', '-'][i] })) },
    { day: 'Tuesday', entries: periods.map((p, i) => ({ ...p, subject: ['English', 'Math', 'Science', 'Urdu', 'Break', 'Computer', 'Islamiat', 'Drawing'][i], teacher: ['M. Ismail', 'M. Arif', 'T. Mehmood', 'F. Rahim', '-', 'N. Muhammad', 'Z. Khan', '-'][i] })) },
    { day: 'Wednesday', entries: periods.map((p, i) => ({ ...p, subject: ['Urdu', 'Science', 'Math', 'English', 'Break', 'Social Studies', 'Computer', 'PT'][i], teacher: ['F. Rahim', 'T. Mehmood', 'M. Arif', 'M. Ismail', '-', 'A. Wahab', 'N. Muhammad', '-'][i] })) },
    { day: 'Thursday', entries: periods.map((p, i) => ({ ...p, subject: ['Science', 'Urdu', 'English', 'Math', 'Break', 'Islamiat', 'Drawing', 'Social Studies'][i], teacher: ['T. Mehmood', 'F. Rahim', 'M. Ismail', 'M. Arif', '-', 'Z. Khan', '-', 'A. Wahab'][i] })) },
    { day: 'Friday', entries: periods.map((p, i) => ({ ...p, subject: ['Math', 'Islamiat', 'Urdu', 'English', 'Break', 'Science', 'Computer', 'PT'][i], teacher: ['M. Arif', 'Z. Khan', 'F. Rahim', 'M. Ismail', '-', 'T. Mehmood', 'N. Muhammad', '-'][i] })) },
    { day: 'Saturday', entries: periods.map((p, i) => ({ ...p, subject: ['English', 'Math', 'Islamiat', 'Science', 'Break', 'Urdu', 'Social Studies', '-'][i], teacher: ['M. Ismail', 'M. Arif', 'Z. Khan', 'T. Mehmood', '-', 'F. Rahim', 'A. Wahab', '-'][i] })) },
  ],
  '7th': [],
  '8th': [],
  '9th': [],
  '10th': [],
};
// Copy 6th timetable structure for other classes
['7th', '8th', '9th', '10th'].forEach(cls => {
  mockTimetables[cls] = mockTimetables['6th'].map(day => ({ ...day }));
});

export const mockResults: StudentResult[] = [
  { id: '1', name: 'Ahmad Khan', rollNumber: '101', initials: 'AK', className: '10th', examType: 'Annual-I', obtainedMarks: 920, totalMarks: 1050, percentage: 87.6, position: 1 },
  { id: '2', name: 'Bilal Ahmed', rollNumber: '102', initials: 'BA', className: '10th', examType: 'Annual-I', obtainedMarks: 890, totalMarks: 1050, percentage: 84.8, position: 2 },
  { id: '3', name: 'Farhan Ali', rollNumber: '103', initials: 'FA', className: '10th', examType: 'Annual-I', obtainedMarks: 870, totalMarks: 1050, percentage: 82.9, position: 3 },
  { id: '4', name: 'Hamza Shah', rollNumber: '104', initials: 'HS', className: '10th', examType: 'Annual-I', obtainedMarks: 845, totalMarks: 1050, percentage: 80.5, position: 4 },
  { id: '5', name: 'Imran Khan', rollNumber: '105', initials: 'IK', className: '10th', examType: 'Annual-I', obtainedMarks: 810, totalMarks: 1050, percentage: 77.1, position: 5 },
  { id: '6', name: 'Junaid Afridi', rollNumber: '106', initials: 'JA', className: '10th', examType: 'Annual-I', obtainedMarks: 780, totalMarks: 1050, percentage: 74.3, position: 6 },
  { id: '7', name: 'Khalid Yousafzai', rollNumber: '107', initials: 'KY', className: '10th', examType: 'Annual-I', obtainedMarks: 750, totalMarks: 1050, percentage: 71.4, position: 7 },
  { id: '8', name: 'Luqman Shah', rollNumber: '108', initials: 'LS', className: '10th', examType: 'Annual-I', obtainedMarks: 720, totalMarks: 1050, percentage: 68.6, position: 8 },
  // 9th class
  { id: '9', name: 'Mubashir Khan', rollNumber: '201', initials: 'MK', className: '9th', examType: 'Annual-I', obtainedMarks: 880, totalMarks: 1050, percentage: 83.8, position: 1 },
  { id: '10', name: 'Nasir Ahmad', rollNumber: '202', initials: 'NA', className: '9th', examType: 'Annual-I', obtainedMarks: 850, totalMarks: 1050, percentage: 81.0, position: 2 },
  { id: '11', name: 'Omar Farooq', rollNumber: '203', initials: 'OF', className: '9th', examType: 'Annual-I', obtainedMarks: 830, totalMarks: 1050, percentage: 79.0, position: 3 },
  // 8th class semester
  { id: '12', name: 'Qasim Ali', rollNumber: '301', initials: 'QA', className: '8th', examType: '1st Semester', obtainedMarks: 420, totalMarks: 500, percentage: 84.0, position: 1 },
  { id: '13', name: 'Raheel Khan', rollNumber: '302', initials: 'RK', className: '8th', examType: '1st Semester', obtainedMarks: 395, totalMarks: 500, percentage: 79.0, position: 2 },
  { id: '14', name: 'Saeed Ahmad', rollNumber: '303', initials: 'SA', className: '8th', examType: '1st Semester', obtainedMarks: 380, totalMarks: 500, percentage: 76.0, position: 3 },
];

export const mockAchievements: Achievement[] = [
  { id: '1', title: 'District Science Olympiad - 1st Position', description: 'Our students secured 1st position in the District Science Olympiad 2026.', date: '2026-03-01', category: 'Academic' },
  { id: '2', title: '98% Pass Rate in Board Exams', description: 'GHS Babi Khel achieved 98% pass rate in BISE Peshawar examinations 2025.', date: '2025-09-15', category: 'Academic' },
  { id: '3', title: 'Inter-School Cricket Tournament Winners', description: 'School cricket team won the inter-school tournament at district level.', date: '2026-01-20', category: 'Sports' },
  { id: '4', title: 'Best School Award - KPK Education Department', description: 'Awarded Best Government School in the region by KPK Education Department.', date: '2025-08-14', category: 'Recognition' },
  { id: '5', title: 'National Quiz Competition - 2nd Position', description: 'Students represented the district in national quiz competition and secured 2nd position.', date: '2025-11-10', category: 'Academic' },
];

export const schoolInfo = {
  name: 'GHS Babi Khel',
  fullName: 'Government High School Babi Khel',
  description: 'Government High School Babi Khel is a prestigious educational institution committed to providing quality education and nurturing the potential of every student. Established with the vision of empowering the youth of Babi Khel, our school has been a beacon of knowledge and excellence in the region.',
  mission: 'To provide quality education that empowers students with knowledge, skills, and values necessary for success in life.',
  vision: 'To be the leading educational institution in the region, known for academic excellence and holistic student development.',
  totalStudents: 1200,
  passRate: 98,
  totalTeachers: 45,
  established: 1985,
  address: 'Babi Khel, Khyber Pakhtunkhwa, Pakistan',
  phone: '+92-XXX-XXXXXXX',
  email: 'info@ghsbabikhel.edu.pk',
};
