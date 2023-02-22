import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import fetch from 'node-fetch';
import * as fs from 'fs';
import { parse } from 'csv-parse';

// console.log(process.env.API_TOKEN)

if(!process.env.API_TOKEN || !process.env.BLOG_ID || !process.env.SITE_SLUG || !process.env.NATION_SLUG){
  console.log('Some required enviroment variable is not set')
}else{
  getCsvData()
}

function getCsvData(){
  fs.createReadStream("./blog.csv")
  .pipe(parse({ columns: true , bom: true}))
  .on("data", async (row) => {
    const slug = row.name.split(' ').join('_').replace(/[^a-z0-9_]/gi,'').toLowerCase();
    const request = await fetch(`https://${process.env.NATION_SLUG}.nationbuilder.com/api/v1/sites/${process.env.SITE_SLUG}/pages/blogs/${process.env.BLOG_ID}/posts?access_token=${process.env.API_TOKEN}`, {method: 'POST', body:`{"blog_post": {"name": "${row.name}", "status":"published", "slug": "${slug}", "content_after_flip": "${row.content}"}}`, headers: {'Content-Type': 'application/json'}})
    const response = await request.json();
    
  })
}

