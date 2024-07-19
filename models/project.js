// models/Person.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// email & password validation with validate property
// email: {
//     type: String,
//     required: true,
//     unique: true,
//     minLenght:10,
//     lowercase: true,
//     validate: {
//       validator: function(v) {
//         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
//       },
//       message: props=>`${props.value} is not a valid email, Please enter a valid email address`,
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 8,
//     validate: {
//       validator: function(v) {
//         return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(v);
//       },
//       message: 'Password must contain at least one number, one lowercase and one uppercase letter',
//     },
//   },
const projectSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      match: /[a-z]/,
      maxLength: 100,
      lowercase: true,
      trim: true, //
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: {
        values: ["Website", "Mobile App"],
        message: "{VALUE} is not supported",
      },
      default: "Website",
      required: [true, "Why no type?"],
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // duration: {
    //     type: Date,
    //     default: function() {
    //         return this.to + this.from;
    //     }
    // },
    team: {
      projectManager: {
        type: String,
        required: true,
      },
      BDT: {
        type: [String],
        required: true,
      },
      technicalLead: {
        type: [String],
        required: true,
      },
      design: [
        {
          teamMember: {
            type: String,
            required: true,
          },
          pages: [
            {
              name: {
                type: String,
                required: true,
              },
              UXRef: {
                type: String,
                required: true,
              },
              UIRef: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
      backend: [
        {
          teamMember: {
            type: String,
            required: true,
          },
          pages: {
            type: [String],
            required: true,
          },
        },
      ],
      frontend: [
        {
          teamMember: {
            type: String,
            required: true,
          },
          pages: {
            type: [String],
            required: true,
          },
        },
      ],
    },
    requirements: [
      {
        requirementsList: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    UX: [
      {
        UXRef: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
    UI: [
      {
        UIRef: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
    states: [
      {
        stateInfo: {
          type: String,
          enum: {
            values: [
              "Defined", //The project has been created, but the plan has not started and invitations have not been sent to team members.
              "Not Started",
              "Running", //The project has been started and invitations have been sent to team members.
              "Suspended", //The project has been temporarily removed from the active list.
              "Canceled", //The project has been permanently removed from the active list, but project data is still available to team members.
              "Completed",
            ],
            message: "{VALUE} is not supported",
            default: "Not Started",
          },
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    status: [
      {
        statusInfo: {
          type: String,
          enum: {
            values: [
              "Green", //Indicates that there are no risks or obstacles; ready to proceed. This can also indicate the activity progress is on schedule or ahead of schedule.
              "Yellow", //Indicates caution; check before proceeding. This can also indicate the activity progress is slightly behind schedule."Canceled", //The project has been permanently removed from the active list, but project data is still available to team members.
              "Red", //Indicates an alert of high risk; do not proceed. This can also indicate the activity progress has fallen significantly behind schedule.
            ],
            message: "{VALUE} is not supported",
          },
          required: true,
        },
        description: {
          type: String,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    meetings: [
      {
        title: {
          type: String,
        },
        mainPoints: {
          type: String,
        },
        recordLink: {
          type: String,
        },
        remark: {
          type: String,
        },
        attendance: [
          {
            teamMember: {
              type: String,
              required: true,
            },
            description: {
              type: String,
              required: true,
            },
          },
        ],
        date: {
          type: Date,
        },
      },
    ],
    sprints: [
      {
        title: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        description: {
          type: String,
        },
        teamMember: {
          type: [String],
          required: true,
        },
        status: {
          type: String,
          enum: {
            values: [
              "Green", //Indicates that there are no risks or obstacles; ready to proceed. This can also indicate the activity progress is on schedule or ahead of schedule.
              "Yellow", //Indicates caution; check before proceeding. This can also indicate the activity progress is slightly behind schedule."Canceled", //The project has been permanently removed from the active list, but project data is still available to team members.
              "Red", //Indicates an alert of high risk; do not proceed. This can also indicate the activity progress has fallen significantly behind schedule.
            ],
            message: "{VALUE} is not supported",
          },
          required: true,
        },
        remark: {
          type: String,
        },
      },
    ],
    num: {
      type: Number,
      min: [18, "Must be greater than 18, got {VALUE}"],
      max: 65,
    },
  },
  { timestamps: true }
);

// Create a model with the specific schema
const projectModel = mongoose.model("project", projectSchema);
// export the created model
module.exports = projectModel;
