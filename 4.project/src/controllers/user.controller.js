import asyncHandler  from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.model.js"


const registerUser = asyncHandler( async(req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username and email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in DB
  // remove password and refresh token field from response
  // check for user creation 
  // return response

  const { fullName, email, username, password } = req.body
  console.log(fullName, email)

  // if (fullName === "") {
  //   throw new ApiError(400, "fullname is required")
  // }

  if (
    [fullName, email, username, password].some((field) => 
      field?.trim() === "" )
  ) {
      throw new Error(400, "All fields are required");
      
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist")
  }

} )



export default registerUser