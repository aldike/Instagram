const Post = require('./models/Post')

const createPost = async (req, res) => {
  try {
    // Assuming you have an authenticated user object in req.user
    const creatorId = req.user.id; // Use "creatorId" instead of "userId"
    const { description, media, creation_date } = req.body;

    // Create a new post with the extracted creatorID
    const post = await Post.create({
      creatorId: creatorId, // Set the creatorId field
      description: description,
      media: media,
      creation_date: creation_date,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const getMyPosts = async (req, res) =>{
    const posts = await Post.findAll({where: {userId: req.user.id}})
    res.status(200).send(posts)
}
const getPost = async (req, res) =>{
    const post = await Post.findByPk(req.params.id, {

    })
    res.status(200).send(post)
}

// const deleteResume = async (req, res) =>{
//     const data = await Resume.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     res.status(200).end()
// }

// const editResume = async (req, res) =>{
//     await Resume.update({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         phone: req.body.phone,
//         position: req.body.position,
//         cityId: req.body.cityId,
//         citizenship: req.body.citizenship,
//         about: req.body.about,
//         birthday: req.body.birthday,
//         gender: req.body.gender,
//         salary: req.body.salary,
//         salary_type: req.body.salary_type,
//         main_language: req.body.main_language,
//         skills: req.body.skills,
//         userId: req.user.id,
//     }, {
//         where: {
//         id: req.body.id
//         }
//     })

//     await WorkingHistory.destroy({
//         where: {
//             resumeId: req.body.id
//         }
//     })
//     await Education.destroy({
//         where: {
//             resumeId: req.body.id
//         }
//     })
//     await ResumeEmploymentType.destroy({
//         where: {
//             resumeId: req.body.id
//         }
//     })
//     await ForeignLanguage.destroy({
//         where: {
//             resumeId: req.body.id
//         }
//     })

//     const resume = {
//         id: req.body.id
//     }
//     if(req.body.workingHistories && req.body.workingHistories.length > 0){
//         req.body.workingHistories.forEach(async history => {
//             await WorkingHistory.create({
//                 resumeId: resume.id,
//                 company_name: history.company_name,
//                 company_description: history.company_description,
//                 responsibilities: history.responsibilities,
//                 start_date: history.start_date,
//                 end_date: history.end_date
//             })
//         });
//     }

//     if(req.body.education && req.body.education.length > 0){
//         req.body.education.forEach(async edu => {
//             await Education.create({
//                 resumeId: resume.id,
//                 level: edu.level,
//                 university_name: edu.university_name,
//                 faculty: edu.faculty,
//                 major: edu.major,
//                 end_date: edu.end_date
//             })
//         });
//     }

//     if(req.body.foreignLanguages && req.body.foreignLanguages.length > 0){
//         req.body.foreignLanguages.forEach(async fln => {
//             await ForeignLanguage.create({
//                 resumeId: resume.id,
//                 level: fln.level,
//                 name: fln.name
//             })
//         });
//     }

//     if(req.body.employmentTypes && req.body.employmentTypes.length > 0){
//         req.body.employmentTypes.forEach(async employmentTypeId => {
//             await ResumeEmploymentType.create({
//                 resumeId: resume.id,
//                 employmentTypeId: employmentTypeId
//             })
//         });
//     }
//     res.status(200).end()
// }
module.exports = {
    createPost,
    getMyPosts,
    getPost,
}