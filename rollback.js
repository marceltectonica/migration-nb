import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import fetch from 'node-fetch';
import * as fs from 'fs';


if(!process.env.API_TOKEN || !process.env.BLOG_ID || !process.env.SITE_SLUG || !process.env.NATION_SLUG){
  console.log('Some required enviroment variable is not set')
}
else if(!fs.existsSync("./imports.json")){
  console.log('nothing to rollback')
}else{
  rollBackContent()
}

async function rollBackContent(){
  fs.readFile('./imports.json', (err, data) => {
    if (err) throw err;
    let row = JSON.parse(data);
    for (const item of row) {
      removeItems(item.id)
    }
    fs.rmSync('./imports.json', {
      force: true,
    });
  });
}

async function removeItems(id){
  const request = await fetch(`https://${process.env.NATION_SLUG}.nationbuilder.com/api/v1/sites/${process.env.SITE_SLUG}/pages/blogs/${process.env.BLOG_ID}/posts/${id}/?access_token=${process.env.API_TOKEN}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}})
  // todo show response result
}