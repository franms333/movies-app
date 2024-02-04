export const GetData = async() => {
    let requestBody = {
        query: `
          query {
            getMovies {
              id
              title
              image
            }
          }
        `
    }

    // const response = await fetch('http://localhost:8080/graphql', {
    const response = await fetch('https://movies-app-backend-sepia.vercel.app/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'content-type': 'application/json'
      }
    })

    try {
        if(response.status !== 200 && response.status !== 201){
            throw new Error("Couldn't fetch data, please try later");
        }

        const data = await response.json();
        return {
            data: data.data.getMovies
        }
    } catch (error) {
        console.log(error);
        return {
          data: error
        }
    }
}

export default GetData;