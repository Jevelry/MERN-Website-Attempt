const express = require("express")
const {google} = require("googleapis")
const cors = require("cors")
const bp = require('body-parser')
const { type } = require("express/lib/response")
const app = express()
app.use(cors())
app.use(bp.json())
app.listen(3001, ()=> {
})
app.get("/", (req,res) => {
})

app.post("/", async (req,res) => {
})

app.post("/submit", async (req,res) => {
    // REMINDER GET FRONTEND TO CHECK FORMAT
    const {name, location, date, comments, score, author} = req.body
    // get authentication data from secrets file
    const auth = new google.auth.GoogleAuth({
        keyFile: "secrets.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    // Create client
    const client = await auth.getClient()
    // Create instance of google sheets
    const googleSheets = google.sheets({
        version: "v4", 
        auth: client
    })
    values = capitalizeWords([name, location, date, comments, score, author])
    try {
        const res = await googleSheets.spreadsheets.values.append({
            spreadsheetId: "17NpdIhg8e5MtouDL28aCkEViSZl-UQSOnjFShQoX-zE",
            range: "Sheet1!A:F",
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [values]
            }
        })
    } catch (err) {
        console.log(err)
    }

})
// Gets name and location of all restaurants
app.get("/getRestaurants", async (req,res) => {
    // get authentication data from secrets file
    const auth = new google.auth.GoogleAuth({
        keyFile: "secrets.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    // Create client
    const client = await auth.getClient()
    // Create instance of google sheets
    const googleSheets = google.sheets({
        version: "v4", 
        auth: client
    })
    const getRows = await googleSheets.spreadsheets.values.get({
        spreadsheetId: "17NpdIhg8e5MtouDL28aCkEViSZl-UQSOnjFShQoX-zE",
        range: "Sheet1!A:B"
    })
    let data = getRows.data.values
    let uniqueArray = Array.from(new Set(data.map(JSON.stringify)), JSON.parse);
    res.send(uniqueArray)
})
function capitalizeWords(arr) {
  return arr.map(element => {
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  });
}
// Gets form data for a particular restaurant
app.get("/name/:nameId/location/:locationId", async (req,res) => {
    // Get url parameters
    const name = req.params.nameId
    const location = req.params.locationId
    // get authentication data from secrets file
    const auth = new google.auth.GoogleAuth({
        keyFile: "secrets.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    // Create client
    const client = await auth.getClient()
    // Create instance of google sheets
    const googleSheets = google.sheets({
        version: "v4", 
        auth: client
    })
    const getRows = await googleSheets.spreadsheets.values.get({
        spreadsheetId: "17NpdIhg8e5MtouDL28aCkEViSZl-UQSOnjFShQoX-zE",
        range: "Sheet1"
    })
    const data = getRows.data.values
    
    let output = []
    for (const entry of data) {
        if (entry[0] === name && entry[1] === location) {
            output.push(entry)
        }
    }
    res.send(output)
})
