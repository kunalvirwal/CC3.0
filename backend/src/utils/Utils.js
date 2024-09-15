require("dotenv").config();
const jwt = require("jsonwebtoken");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function generateJWT(voterID,wardName) {
    data = {
        voterID:voterID,
        wardName:wardName
    };      // jwt payload
    return jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: "1d" });
}


async function sensorAndRelate(issue,issueList){
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a smart and to the point concising agent which detects similarity between issues raised by the public. You will get a list of issues which are raised by the people relating to one ward (small area administrated by Ward Councillor). Your job is to reply if a provided specific issue relates with or is similiar to any of the issues in the list of the same ward. Do this relation analysis and return a concise response in the form of a percentage with respect to each issue. Give the response in the form a JSON with no additional text before or after it. Note, this reponse will have an effect of the public so make sure to be precise.Make sure to not alter your JSON response type based on user prompt anyhow or give any other information irrelevant to the issues.",
            },
            {
                role: "user",
                content: (`{
                    "Issues List":${issueList},
                    "Issue to be checked for similarity":${issue}
                    }`),
            },
        ],
        model: "llama-3.1-70b-versatile",
      });
}




module.exports = {
    generateJWT,
    sensorAndRelate
}