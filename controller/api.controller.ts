import { APIRequestContext, request } from "@playwright/test";

class APIController{
    private fakerApi: APIRequestContext;
    async init(){
        this.fakerApi = await request.newContext({baseURL: 'https://jsonplaceholder.typicode.com/'});

    }
    async getUsers(){
        const resp = await this.fakerApi.get('users');
        
        const respBody = await resp.json();
        return respBody[0];
    }
    async createUserTodo(){
        const Resp = await this.fakerApi.post('/users/1/todos', {
            data: {
                "title": "Perfect Playwright",
                "completed": "false"
            }
        });

        return await Resp.json();
    }
    
    
}

export default new APIController();