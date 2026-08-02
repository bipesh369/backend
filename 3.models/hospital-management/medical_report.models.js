import mongoose from "mongoose"


const mediacalReportSchema = new mongoose.Schema({
   patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    reportTitle: {
      type: String,
      required: true,
      trim: true,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    symptoms: [
      {
        type: String,
        trim: true,
      },
    ],

    medications: [
      {
        medicineName: {
          type: String,
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
      },
    ],

    laboratoryResults: [
      {
        testName: String,
        result: String,
        normalRange: String,
      },
    ],

    vitalSigns: {
      bloodPressure: String,
      heartRate: Number,
      temperature: Number,
      respiratoryRate: Number,
      oxygenSaturation: Number,
      weight: Number,
      height: Number,
    },

    treatmentPlan: {
      type: String,
      trim: true,
    },

    recommendations: {
      type: String,
      trim: true,
    },

    followUpDate: {
      type: Date,
    },

    attachments: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Completed", "Reviewed"],
      default: "Pending",
    },
    
}, {timestamps: true})




export const MedicalReport = mongoose.model("MedicalReport", mediacalReportSchema)