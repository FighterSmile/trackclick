import 'dotenv/config'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const DOC_ID = process.env.DOC_ID
const SHEET_NAME = "Slack_Post"

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets'
  ]
})

const doc = new GoogleSpreadsheet(DOC_ID, serviceAccountAuth)

async function getData (sheetName) {
  await doc.loadInfo()
  console.log(doc.title)
  const sheet = doc.sheetsByTitle[sheetName]
  const rows = await sheet.getRows()

  const result = []

  rows.forEach(row => {
    result.push(row._rawData)
  })
  return result
}
