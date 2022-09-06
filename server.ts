import {graphql, buildSchema} from 'graphql'
import express, {} from 'express'
import {graphqlHTTP} from 'express-graphql'
// import {} from 'apollo'

const schema = buildSchema(`

    type Person {
        name: String
        email: String
    }

    type Developer {
        profile: Person
        experience: Int
    }
    
    type Query {
        isDeveloper: Boolean
        john: Developer
    }
`)

const root: Record<string, () => unknown> = {
    name: () => {
        return "Rodrigo"
    },
    email: () => {
        return "rodrigo@mail.com"
    },
    age: () => {
        return 1.54
    },
    isDeveloper: () => 0,
    john: () => 
    ({
        profile: {        name: 'John',
        email: 'john@mail.com',},
        experience: 1
    })
}

const app = express()

app.use(
    '/', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
)

app.listen(8765)

console.log('Server running at http://localhost:8765')