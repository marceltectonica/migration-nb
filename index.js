import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import fetch from 'node-fetch';
import * as fs from 'fs';
import { parse } from 'csv-parse';

console.log(process.env.API_TOKEN)

function getCsvData(){
  fs.createReadStream("./blog.csv")
  .pipe(parse({ columns: true, relax_quotes: false, escape: '\\', ltrim: true, rtrim: true }))
  .on("data", async (row) => {
    console.log(row)
    console.log(row['name'])

    // const request = await fetch('https://tectodevmarcel.nationbuilder.com/api/v1/sites/momentumtest/pages/blogs/39/posts?access_token=opt4H3RV1tvnD3_XB8EbJklGvLh7AFwmJkh_xgIq4ZI', {method: 'POST', body: `{"blog_post": { "name": ${row.name}, "slug": ${row.name}, "status": "published", "content_before_flip": ${row.content}}}`, headers: {'Content-Type': 'application/json'}})
    // const response = await request.json();
    // console.log(response)
  })
}

getCsvData()