# Migration content Nation Builder

This is a light weight nodejs script to migrate content from a csv file to Nation Builder

## Requirements

* nodeJS (only tested on v18)
* valid csv file, should be place in root folder and should be called blog.csv (data-example.csv shows how the file should look like)

## installation

```npm i```

or 

```yarn```

Copy .env.sample and save as .env, replace all information with real data

## usage

### import data

```node importer```

### rollback data

```node rollback```

## How it works

The script reads blog.csv file. Parses the data and send the information to Nation Builder. 

The importer script stores all ids of new posts created into a file called imports.js

The rollback script reads the ids from imports.js and remove that content from NB, and finally remove the imports.js file. 



