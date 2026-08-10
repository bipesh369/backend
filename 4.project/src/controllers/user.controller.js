import asyncHandler  from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"

const generateAccessAdRefreshTokens = async(userId) =>{
  try {
    const user = User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
   // save refreshToken in database
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
  }
}


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
      throw new ApiError(400, "All fields are required");
      
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist")
  }
 // getting files path
  const avatarLocalPath = req.files?.avatar?.[0]?.path
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path
  
  if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
  }
// upload images on cloudinary
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
   }
// create user object
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"   //syntax of removing password and refreshToken
   )

   if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
    
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
   )

} )

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // send cookie

    const { email, username, password } = req.body

    if (!username || !email) { 
      throw new ApiError(400, "username or password is required")
    }
  //find username or email in mongodb
    const user = User.findOne({
      $or: [{username}, {email}]
    })

    if(!user) {
      throw new ApiError(400, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) {
      throw new ApiError(401,"Invalid user credentials");     
    }

    const { accessToken, refreshToken } = await generateAccessAdRefreshTokens(user._id)

    const loggedInUSeer = User.findById(user._id)
    select("-password -refreshToken")

    const options = {
      httpOnly: true,
      secure: true
    }

    return res
    .status(200)
    .cookies("accessToken", accessToken, options)
    .cookies("refreshToken", refreshToken ,options
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUSeer, accessToken,
            refreshToken
          },
          "User logged in Successfully"
        )
      )
    )
})


export default registerUser
export default loginUser