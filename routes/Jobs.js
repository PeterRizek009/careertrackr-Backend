const express = require('express')


const router = express.Router()

//get Functions from controller 
const { createNewJob, getJobs, getSingleJob, deleteJob, updateJob } = require('../controller/controller')

//Router Routes 

//get all jobs 
router.get('/', getJobs)

//get a job
router.get('/:id', getSingleJob)


//add new Job
router.post('/', createNewJob)


router.delete('/:id', deleteJob)



router.patch('/:id', updateJob)


module.exports = router;