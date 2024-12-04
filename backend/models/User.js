import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowerCase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },

    username: {
      type: String,
      lowerCase: true,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      validate: [
        {
          validator: (value) => validator.isStrongPassword(value),
          message:
            "Password must contain one more alphanumeric character and symbols",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Password waxaa u badashaa hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10); // round

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Login markay tahay passwordkii hash ka ahaa iyo kan userka soo gelinayo is barbardhig.
userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
