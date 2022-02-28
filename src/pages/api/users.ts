import { NextApiRequest, NextApiResponse } from 'next';

export default (request:NextApiRequest, response: NextApiResponse) => {

    const users = [
        {id: 1, nome: 'Rodrigo'},
        {id: 2, nome: 'João'},
        {id: 3, nome: 'Pedro'},
    ]

    return response.json(users);
}

// API roots são executadas utilizando o conceito de Serverless 

// Estratégias de autenticação
// JWT (Storage)
// Next Auth - indepente de ter um backend
// Cognito, Auth0 - providers de autenticação externos
// 