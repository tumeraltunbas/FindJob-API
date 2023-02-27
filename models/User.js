import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:[true, "First Name can not be null"],
        minlength: [2, "First Name can not be less than 2 characters"],
        maxlength: [15, "First Name can not be more than 15 characters"]
    },
    lastName: {
        type:String,
        required:[true, "Last Name can not be null"],
        minlength: [2, "Last Name can not be less than 2 characters"],
        maxlength: [20, "Last Name can not be more than 20 characters"]
    },
    email: {
        type:String,
        required:[true, "Email can not be null"],
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email format must be match with test@example.com"]
    },
    password: {
        type:String,
        required:[true, "Password can not be null"],
        select:false,   
    },
    dateOfBirth: {
        type:Date,
        required:[true, "Date of Birth can not be null"]
    },
    gender:{
        type: Boolean,
        required:[true, "Gender can not be null"]
    },
    role: {
        type:String,
        enum: ["employer", "employee", "admin"],
        required:[true, "Role can not be null"]
    },
    profilePhotoUrl: {
        type:String,
        default: "profile.jpg"
    },
    personalInformations: {
        about: {
            type:String,
            default:null
        },
        website: {
            type:String,
            default:null
        },
        state: {
            type: String,
            enum: ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
            default:null
        },
        city: {
            type: String,
            enum: ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"],
            default:null
        },
        isMarried: {
            type: Boolean,
            default:null
        }
    },
    workExperiences: [
        {
            title: {
                type:String,
                required:[true, "Title can not be null"],
            },
            companyName: {
                type:String,
                required:[true, "Company Name can not be null"]
            },
            employmentType: {
                type:String,
                required:[true, "Employment type can not be null"],
                enum: ["Full Time", "Part Time", "Internship", "My Job"],
            },
            location: {
                type:String,
                required:[true, "Location can not be null"],
            },
            startedAt: {
                type:Date,
                required:[true, "Started At can not be null"]
            },
            endedAt:{
                type:Date,
            },
            description: {
                type:String,
                default:null
            }
        }
    ],
    educationalInformations: [
        {
            schoolName: {
                type:String,
                required:[true, "School Name can not be null"]
            },
            degree: {
                type:String,
                required:[true, "Degree can not be null"],
                enum:["Bachelor's Degree", "Associate Degree", "Master's Degree", "Doctoral Degree", "Highschool Degree"]
            },
            major: {
                type:String,
                required:[true, "Major can not be null"]
            },
            gpa: {
                type: Number,
                default:null
            },
            startedAt: {
                type:Date,
                required:[true, "Started At can not be null"]
            },
            endedAt:{
                type:Date,
                required:[true, "Ended At can not be null"]
            },
        }
    ],
    certificates: [{
        title:{
            type:String,
            required:[true, "Title can not be null"]
        },
        institution: {
            type: String,
            required:[true, "Institution can not be null"],
        },
        date: {
            type: Date,
            required:[true, "Date can not be null"]
        }
    }],
    emailVerificationToken: {
        type:String,
        default:null
    },
    emailVerificationTokenExpires: {
        type:Date,
        default:null,
    },
    isEmailVerified: {
        type:Boolean,
        default:false
    },
    emailVerifiedAt: {
        type:Date,
        default:null
    },
    resetPasswordToken: {
        type:String,
        default:null
    },
    resetPasswordTokenExpires: {
        type:Date,
        default:null
    },
    lastPasswordChangedAt: {
        type:Date,
        default:null
    },
    isBlocked: {
        type:Boolean,
        default:false
    },
    isActive: {
        type:Boolean,
        default:true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    },
});


export const User = mongoose.model("User", UserSchema);