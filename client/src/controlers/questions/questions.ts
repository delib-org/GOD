import axios from 'axios';



export async function activateQuestion(activate: boolean, questionId: string) {
    return new Promise((resolve, reject) => {
        try {
        
            axios.post('/questions/activate', { activate, questionId }).then(({ data }) => {
             
                if (data.ok) {
                    resolve(activate);
                } else {
                    reject(false);
                }
            })


        } catch (e) {
            console.error(e);
            reject(false);
        }
    })

}

export async function createUpdateQuestion(title: string, description: string, image: any, questionId?: string): Promise<any> {
    try {
        const { data } = await axios.post('/questions/create', { title, description, image, questionId })

        if (data) return data.questionId;
        else return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }


}

export function getAllQuestions(){
    return new Promise((resolve, reject)=>{
        axios.post('/questions/get-all', {})
        .then(({ data }) => {
         
          if(Array.isArray(data.result)) resolve(data.result);
          else reject()
        }).catch(e => {
          console.error(e)
          reject();
        })
    })
}