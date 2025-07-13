//Imported required libraries
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//Creation of userSchema

const userSchema = new Schema({

    username: {
            type: String,
            required: true,
            trim: true,
            maxLength: 30,
        },
    firstName: {
        type: String,
        required: [true, 'First Name required'],
        trim: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name required'],
        trim: true,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    phone: {
        type: String,
        validate: {
            validator: function(number) {
                const regex = /^04\d{8}$/
                return regex.test(number)
            },
            message: props => `${props.value} is not a valid phone number!` 
        },
        required: [true, 'User phone number required']
    },
    address: {
        street: {
            type: String,
            required: true,
            maxLength: 30,
        },
        suburb: {
            type: String,
            required: true,
            maxLength: 30,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
            maxLength: 20
        },
        postCode: {
            type: String,
            required: true,
            maxLength: 10,
        }
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return date.toDateString()}
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return date.toDateString()}
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema
    .virtual('fullName')
    .get(function () {
        return `${this.firstName} $${this.lastName}`
    })
    .set(function (names) {
        const first = names.split(' ')[0];
        const last = names.split(' ')[1];
        this.set({ first, last })
    })

//Set up pre-save middleware to hash the password before it's created
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next();
})

//Compare incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;