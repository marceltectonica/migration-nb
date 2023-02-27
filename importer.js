import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import fetch from 'node-fetch';
import * as fs from 'fs';
import { parse } from 'csv-parse';

// console.log(process.env.API_TOKEN)
if(!process.env.API_TOKEN || !process.env.BLOG_ID || !process.env.SITE_SLUG || !process.env.NATION_SLUG){
  console.log('Some required enviroment variable is not set')
}
else if(fs.existsSync("./imports.json")){
  console.log('launch rollback before need import')
}else{
  getCsvData()
}

async function getCsvData(){
  const records = []
  const parser = fs
  .createReadStream("./data.csv")
  .pipe(parse({
     columns: true , bom: true
  }));
  for await (const row of parser) {
    const slug = row.name.split(' ').join('_').replace(/[^a-z0-9_]/gi,'').toLowerCase();
    try{
      const request = await fetch(`https://${process.env.NATION_SLUG}.nationbuilder.com/api/v1/sites/${process.env.SITE_SLUG}/pages/blogs/${process.env.BLOG_ID}/posts?access_token=${process.env.API_TOKEN}`, {method: 'POST', body:`{"blog_post": 
        {"name": "${row.name}", 
        "status":"published", 
        "slug": "${slug}", 
        "content_before_flip": "<p>${row.content_before_flip}</p>",
        "content_after_flip":"<p>${row.content_before_flip}</p>", 
        "published_at": "${row.published_at}"}
      }`, 
      headers: {'Content-Type': 'application/json'}})
      
      const response = await request.json();
      records.push({id: response.blog_post.id})
      let data = await JSON.stringify(records);
      fs.writeFileSync('imports.json', data);
  
    } catch(e){
      console.log(e)
    }
  }
  
  return
}

